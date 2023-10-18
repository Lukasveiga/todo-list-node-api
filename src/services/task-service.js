const { NotFoundError, BadRequestError } = require("../utils/exceptions");

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

    await this.cacheStorage.setStaleStatus(`findAll(${userId}):stale`, "true");

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

    if (!updatedTask) {
      throw new BadRequestError("Was not possible to update task.");
    }

    await this.cacheStorage.setStaleStatus(`findAll(${userId}):stale`, "true");

    return updatedTask;
  }

  async delete(taskId, userId) {
    const task = this.taskRepository.findById(taskId, userId);

    if (!task) {
      throw new NotFoundError("Task not found.");
    }

    await this.cacheStorage.setStaleStatus(`findAll(${userId}):stale`, "true");

    await this.taskRepository.delete(taskId, userId);
  }
}

module.exports = TaskService;
