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

    async update(body, taskId, userId) {
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

describe("Task Controller", () => {
  test("Should return status code 201 and task body when is created a new task", async () => {
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const req = {
      body: taskTest,
      user: {
        id: 1,
      },
    };

    const { sut } = makeSut();

    await sut.create(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(taskTest)).to.be.true;
  });

  test("Should return status code 200 and task body when is updated task", async () => {
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const req = {
      body: taskTest,
      user: {
        id: 1,
      },
      params: {
        taskId: 1,
      },
    };

    const { sut } = makeSut();

    await sut.update(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(taskTest)).to.be.true;
  });
});
