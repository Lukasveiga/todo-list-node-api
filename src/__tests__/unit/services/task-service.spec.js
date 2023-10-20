/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const TaskService = require("../../../services/task-service");
const { NotFoundError } = require("../../../utils/exceptions");

const currentDate = new Date();
const oneDayAgoDate = new Date(currentDate);
oneDayAgoDate.setDate(currentDate.getDate() - 1);
const twoDaysAgoDate = new Date(currentDate);
twoDaysAgoDate.setDate(currentDate.getDate() - 2);

const listTasksTest = [
  {
    title: "valid_title",
    description: "valid_description",
    priority: 1,
    finished: false,
    createdAt: currentDate,
  },
  {
    title: "valid_title",
    description: "valid_description",
    priority: 2,
    finished: false,
    createdAt: twoDaysAgoDate,
  },
  {
    title: "valid_title",
    description: "valid_description",
    priority: 3,
    finished: true,
    createdAt: oneDayAgoDate,
  },
];

const makeTaskRepositorySpy = () => {
  class TaskRepositorySpy {
    async create(body, userId) {
      return this.createTaskTest;
    }

    async findById(taskId, userId) {
      return this.findByIdTaskTest;
    }

    async update(body, taskId, userId) {
      return this.updateTaskTest;
    }

    async findAll(userId) {
      return this.tasksFromDatabase;
    }

    async delete(taskId, userId) {}
  }

  const taskTest = {
    title: "valid_title",
    description: "valid_description",
    priority: "any_priority",
  };

  const taskRepositorySpy = new TaskRepositorySpy();
  taskRepositorySpy.createTaskTest = taskTest;
  taskRepositorySpy.updateTaskTest = taskTest;
  taskRepositorySpy.findByIdTaskTest = taskTest;
  taskRepositorySpy.tasksFromDatabase = listTasksTest;

  return taskRepositorySpy;
};

const makeCacheStorageSpy = () => {
  class CacheStorageSpy {
    async setStaleStatus(key, value, options = null) {
      this.staleStatusTest = true;
    }

    async setRefetchingStatus(key, value, options = null) {
      this.refetchingStatusTest = true;
    }

    async getData(key) {
      return this.tasksFromCache;
    }

    async setData(key, value, options = null) {
      this.tasksFromCache = listTasksTest;
    }

    async isStale(key) {
      return this.staleStatusTest;
    }

    async isRefetching(key) {
      return this.refetchingStatusTest;
    }

    async cleanStaleStatus(key) {
      this.staleStatusTest = null;
    }

    async cleanRefetchingStatus(key) {
      this.refetchingStatusTest = null;
    }
  }

  const cacheStorageSpy = new CacheStorageSpy();
  cacheStorageSpy.staleStatusTest = false;
  cacheStorageSpy.refetchingStatusTest = false;
  cacheStorageSpy.tasksFromCache = listTasksTest;

  return cacheStorageSpy;
};

const makeSut = () => {
  const taskRepositorySpy = makeTaskRepositorySpy();
  const cacheStorageSpy = makeCacheStorageSpy();
  const sut = new TaskService(taskRepositorySpy, cacheStorageSpy);

  return { sut, taskRepositorySpy, cacheStorageSpy };
};

describe("Task Service", () => {
  test("Should return a task body when a new task is created", async () => {
    const { sut, cacheStorageSpy, taskRepositorySpy } = makeSut();

    const task = {
      title: "valid_title",
      description: "valid_description",
      priority: "any_priority",
    };

    const newTask = await sut.create(task, "any_user_id");

    expect(newTask).toEqual(taskRepositorySpy.createTaskTest);
    expect(cacheStorageSpy.staleStatusTest).toBe(true);
  });

  test("Should throw if task was not found when try to update a task", async () => {
    const { sut, taskRepositorySpy } = makeSut();

    taskRepositorySpy.findByIdTaskTest = null;

    const promise = sut.update("any_task_id", "any_user_id");

    expect(promise).rejects.toThrow(new NotFoundError("Task not found."));
  });

  test("Should return a task body when a task is updated ", async () => {
    const { sut, cacheStorageSpy, taskRepositorySpy } = makeSut();

    const task = {
      title: "valid_title",
      description: "valid_description",
      priority: "any_priority",
      finished: true,
    };

    const updatedTask = await sut.update(task, "any_task_id", "any_user_id");

    expect(updatedTask).toEqual(taskRepositorySpy.createTaskTest);
    expect(cacheStorageSpy.staleStatusTest).toBe(true);
  });

  test("Should throw if task was not found when try to delete a task", async () => {
    const { sut, taskRepositorySpy } = makeSut();

    taskRepositorySpy.findByIdTaskTest = null;

    const promise = sut.delete("any_task_id", "any_user_id");

    expect(promise).rejects.toThrow(new NotFoundError("Task not found."));
  });

  test("Should not throw when delete task", async () => {
    const { sut, cacheStorageSpy } = makeSut();

    const promise = sut.delete("any_task_id", "any_user_id");

    expect(promise).resolves.not.toThrow();
    promise.then(() => {
      expect(cacheStorageSpy.staleStatusTest).toBe(true);
    });
  });

  test("Should return a list of tasks from the cache without options", async () => {
    const { sut, cacheStorageSpy } = makeSut();

    const tasksFromCache = await sut.findAll({}, "any_user_id");

    expect(tasksFromCache.length).toBe(2);
    expect(tasksFromCache[0].priority > tasksFromCache[1].priority).toBe(true);
    expect(tasksFromCache[0]).toEqual(cacheStorageSpy.tasksFromCache[1]);
  });

  test("Should return a list of tasks from the cache with options", async () => {
    const { sut } = makeSut();

    const sortByDateCases = ["asc", "desc"];

    for (let sortByDateCase of sortByDateCases) {
      const tasksFromCache = await sut.findAll(
        { finished: true, sortByDate: sortByDateCase },
        "any_user_id"
      );

      expect(tasksFromCache.length).toBe(3);

      if (sortByDateCase === "asc") {
        expect(tasksFromCache[0].createdAt < tasksFromCache[1].createdAt).toBe(
          true
        );
      } else {
        expect(tasksFromCache[0].createdAt > tasksFromCache[1].createdAt).toBe(
          true
        );
      }
    }
  });

  test("Should return a list of tasks from the database and set into cache when has no data into cache", async () => {
    const { sut, cacheStorageSpy } = makeSut();
    cacheStorageSpy.tasksFromCache = null;

    const tasksFromCache = await sut.findAll({}, "any_user_id");

    expect(tasksFromCache.length).toBe(2);
    expect(cacheStorageSpy.staleStatusTest).toBeNull();
    expect(cacheStorageSpy.refetchingStatusTest).toBeNull();
    expect(cacheStorageSpy.tasksFromCache).not.toBeNull();
  });

  test("Should return a list of tasks from the database and set into cache when data into cache is stale and not refetching", async () => {
    const { sut, cacheStorageSpy } = makeSut();
    cacheStorageSpy.staleStatusTest = true;
    cacheStorageSpy.refetchingStatusTest = false;

    const tasksFromCache = await sut.findAll({}, "any_user_id");

    expect(tasksFromCache.length).toBe(2);
    expect(cacheStorageSpy.staleStatusTest).toBeNull();
    expect(cacheStorageSpy.refetchingStatusTest).toBeNull();
    expect(cacheStorageSpy.tasksFromCache).not.toBeNull();
  });
});
