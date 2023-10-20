/* eslint-disable no-undef */
const TaskRepository = require("../../../repositories/task-repository");
const UserRepository = require("../../../repositories/user-repository");
const sequelize = require("../../../database/connect");

const taskRepository = new TaskRepository();
const userRepository = new UserRepository();

const taskTest = {
  title: "valid_title",
  description: "any_description",
  priority: 1,
};

const userTest = {
  username: "valid_username",
  email: "valid_email@email.com",
  password: "valid_password",
};

let userId;
let taskId;

describe("Task Repository", () => {
  beforeAll(async () => {
    const user = await userRepository.create(userTest);
    userId = user.id;
  });
  afterAll(async () => {
    await sequelize.sync({ force: true });
  });
  test("Should return task body when is created a new task", async () => {
    const task = await taskRepository.create(taskTest, userId);

    taskId = task.id;

    const { title, description, priority } = task;

    expect({ title, description, priority }).toEqual(taskTest);
  });
});
