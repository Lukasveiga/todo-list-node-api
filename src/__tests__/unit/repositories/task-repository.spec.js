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

  test("Should return task body when task is found by id", async () => {
    const task = await taskRepository.findById(taskId, userId);

    const { title, description, priority } = task;

    expect({ title, description, priority }).toEqual(taskTest);
  });

  test("Should return null when task is not found by id", async () => {
    const task = await taskRepository.findById(5, userId);

    expect(task).toBeNull();
  });

  test("Should return a list of tasks when try to find all tasks", async () => {
    const tasks = await taskRepository.findAll(1);

    const { title, description, priority } = tasks[0];

    expect(tasks.length !== 0).toBe(true);
    expect({ title, description, priority }).toEqual(taskTest);
  });

  test("Should return task body when task is updated", async () => {
    const updateTaskTest = {
      title: "update_title",
      description: "update_description",
      priority: 2,
    };
    const updatedTask = await taskRepository.update(
      updateTaskTest,
      taskId,
      userId
    );

    const { title, description, priority } = updatedTask;

    expect({ title, description, priority }).toEqual(updateTaskTest);
  });

  test("Should return null when task is not found by id when trying to update the task", async () => {
    const updateTaskTest = {
      title: "update_title",
      description: "update_description",
      priority: 2,
    };
    const updatedTask = await taskRepository.update(updateTaskTest, 5, userId);

    expect(updatedTask).toBeNull();
  });
});
