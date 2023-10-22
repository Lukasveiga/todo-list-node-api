const { NotFoundError } = require("../utils/exceptions");

class TaskService {
  constructor(taskRepository, cacheStorage) {
    this.taskRepository = taskRepository;
    this.cacheStorage = cacheStorage;
  }

  async create(body, userId) {
    const { title, description, priority } = body;

    const newTask = await this.taskRepository.create(
      { title, description, priority },
      userId
    );

    await this.cacheStorage.setStaleStatus(`findAll(${userId})`, "true");

    return newTask;
  }

  async update(body, taskId, userId) {
    const task = await this.taskRepository.findById(taskId, userId);

    if (!task) {
      throw new NotFoundError("Task not found.");
    }

    const { title, description, priority, finished } = body;

    const updateParams = {};

    if (title) {
      updateParams.title = title;
    }

    if (description) {
      updateParams.description = description;
    }

    if (priority) {
      updateParams.priority = priority;
    }

    if (finished !== null) {
      updateParams.finished = finished;
      if (finished) {
        updateParams.finishedAt = Date.now();
      }
    }

    const updatedTask = await this.taskRepository.update(
      updateParams,
      taskId,
      userId
    );

    await this.cacheStorage.setStaleStatus(`findAll(${userId})`, "true");

    return updatedTask;
  }

  async delete(taskId, userId) {
    const task = await this.taskRepository.findById(taskId, userId);

    if (!task) {
      throw new NotFoundError("Task not found.");
    }

    await this.cacheStorage.setStaleStatus(`findAll(${userId})`, "true");

    await this.taskRepository.delete(taskId, userId);
  }

  async findAll(options, userId) {
    const { finished, sortByDate } = options;

    let tasks;

    const tasksFromCache = await this.cacheStorage.getData(
      `findAll(${userId})`
    );

    const isTasksFromCacheStale = await this.cacheStorage.isStale(
      `findAll(${userId})`
    );

    const isRefetching = await this.cacheStorage.isRefetching(
      `findAll(${userId})`
    );

    if ((isTasksFromCacheStale && !isRefetching) || !tasksFromCache) {
      await this.cacheStorage.setRefetchingStatus(
        `findAll(${userId})`,
        "true",
        { EX: 10 }
      );
      tasks = await this.taskRepository.findAll(userId);
      await this.cacheStorage.setData(`findAll(${userId})`, tasks, { EX: 900 });
      await this.cacheStorage.cleanStaleStatus(`findAll(${userId})`);
      await this.cacheStorage.cleanRefetchingStatus(`findAll(${userId})`);
    } else {
      tasks = tasksFromCache;
    }

    tasks.sort((a, b) => {
      return b.priority - a.priority;
    });

    if (!finished) {
      tasks = tasks.filter((task) => !task.finished);
    }

    if (sortByDate) {
      tasks.sort((a, b) => {
        if (sortByDate === "asc") {
          return a.createdAt - b.createdAt;
        } else if (sortByDate === "desc") {
          return b.createdAt - a.createdAt;
        }
      });
    }

    return tasks;
  }
}

module.exports = TaskService;
