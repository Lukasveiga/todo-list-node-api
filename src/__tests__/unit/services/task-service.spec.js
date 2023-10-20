/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const TaskService = require("../../../services/task-service");
const { NotFoundError } = require("../../../utils/exceptions");

const createdAt = new Date();

const listTasksTest = [
  {
    title: "valid_title",
    description: "valid_description",
    priority: "any_priority",
    finished: false,
    createdAt,
  },
  {
    title: "valid_title",
    description: "valid_description",
    priority: "any_priority",
    finished: true,
    createdAt: createdAt.getDate() + 1,
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

  return taskRepositorySpy;
};

const makeCacheStorageSpy = () => {
  class CacheStorageSpy {
    async setStaleStatus(key, value) {
      this.staleStatusTest = true;
    }

    async getData(key) {
      return this.tasksFromCache;
    }

    async isStale(key) {
      return this.staleStatusTest;
    }

    async isRefetching(key) {
      return this.refetchingStatusTest;
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
    const { sut } = makeSut();

    const tasksFromCache = await sut.findAll({}, "any_user_id");

    expect(tasksFromCache[0]).toEqual(tasksFromCache[0]);
  });
});
