/* eslint-disable no-undef */
const TaskRepository = require("../../../repositories/task-repository");
const sequelize = require("../../../database/connect");

const taskRepository = new TaskRepository();

describe("Task Repository", () => {
  afterAll(async () => {
    await sequelize.sync({ force: true });
  });
  test("", () => {});
});
