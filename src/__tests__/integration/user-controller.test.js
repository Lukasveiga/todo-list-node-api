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
});
