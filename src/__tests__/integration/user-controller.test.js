/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { app } = require("../../app");
const request = require("supertest");
const sequelize = require("../../database/connect");

describe("User Controller", () => {
  afterAll(async () => {
    await sequelize.sync({ force: true });
  });

  test("should create new user and return status 201", async () => {
    const userTest = {
      username: "valid_username",
      email: "valid_email@email.com",
      password: "valid_password",
    };
    const response = await request(app).post("/api/v1/user").send(userTest);

    delete userTest.password;

    const { username, email } = response.body;

    expect(response.status).toBe(201);
    expect({ username, email }).toEqual(userTest);
  });

  test("should return status code 400 for username already exist", async () => {
    const userTest = {
      username: "valid_username",
      email: "valid_email2@email.com",
      password: "valid_password",
    };
    const response = await request(app).post("/api/v1/user").send(userTest);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User already exists.");
  });

  test("should return status code 400 for email already exist", async () => {
    const userTest = {
      username: "valid_username2",
      email: "valid_email@email.com",
      password: "valid_password",
    };
    const response = await request(app).post("/api/v1/user").send(userTest);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User already exists.");
  });
});
