/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { app } = require("../../app");
const request = require("supertest");
const sequelize = require("../../database/connect");

let token;

describe("Task Controller", () => {
  beforeAll(async () => {
    const userLogin = {
      username: "valid_username",
      email: "valid_email@email.com",
      password: "valid_password",
    };
    await request(app).post("/api/v1/user").send(userLogin);

    const loginResponse = await request(app)
      .post("/api/v1/login")
      .send({ username: "valid_username", password: "valid_password" });

    token = loginResponse.body.token;
  });
  afterAll(async () => {
    await sequelize.sync({ force: true });
  });

  test("Should create new task and return status 201", async () => {});
});
