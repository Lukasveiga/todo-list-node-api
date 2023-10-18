/* eslint-disable no-undef */
const TaskService = require("../../../services/task-service");

const makeTaskRepositorySpy = () => {
  class TaskRepositorySpy {}

  const taskRepositorySpy = new TaskRepositorySpy();

  return taskRepositorySpy;
};

const makeCacheStorageSpy = () => {
  class CacheStorageSpy {}

  const cacheStorageSpy = new CacheStorageSpy();

  return cacheStorageSpy;
};

const makeSut = () => {
  const taskRepositorySpy = makeTaskRepositorySpy();
  const cacheStorageSpy = makeCacheStorageSpy();
  const sut = new TaskService(taskRepositorySpy, cacheStorageSpy);

  return { sut, taskRepositorySpy, cacheStorageSpy };
};

describe("Task Service", () => {
  test("", () => {});
});
