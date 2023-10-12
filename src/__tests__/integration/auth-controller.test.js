/* eslint-disable no-undef */
const { app } = require("../../app");
const request = require("supertest");
const sequelize = require("../../database/connect");

describe("Auth Controller", () => {
  beforeAll(async () => {
    const userTest = {
      username: "valid_username",
      email: "valid_email@email.com",
      password: "valid_password",
    };
    await request(app).post("/api/v1/user").send(userTest);
  });

  afterAll(async () => {
    await sequelize.sync({ force: true });
  });
  test("", () => {});
});
