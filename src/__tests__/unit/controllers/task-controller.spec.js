/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const TaskController = require("../../../controllers/task-controller");
const { expect } = require("chai");
const sinon = require("sinon");

const taskTest = {
  title: "valid_title",
  description: "valid_description",
  priority: "any_priority",
};

const makeTaskServiceSpy = () => {
  class TaskServiceSpy {
    async create(body, userId) {
      return this.serviceTaskTest;
    }
  }

  const taskServiceSpy = new TaskServiceSpy();
  taskServiceSpy.serviceTaskTest = taskTest;

  return taskServiceSpy;
};

const makeSut = () => {
  const taskServiceSpy = makeTaskServiceSpy();
  const sut = new TaskController(taskServiceSpy);

  return { sut, taskServiceSpy };
};

describe("", () => {
  test("", () => {});
});
