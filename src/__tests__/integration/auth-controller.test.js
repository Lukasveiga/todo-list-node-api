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
  test("Should return 200 when login with valid email and password are provided", async () => {
    const login = {
      email: "valid_email@email.com",
      password: "valid_password",
    };

    const response = await request(app).post("/api/v1/login").send(login);

    expect(response.status).toBe(200);
    expect(response.body.token).not.toBeNull();
  });

  test("Should return 200 when login with valid username and password are provided", async () => {
    const login = {
      username: "valid_username",
      password: "valid_password",
    };

    const response = await request(app).post("/api/v1/login").send(login);

    expect(response.status).toBe(200);
    expect(response.body.token).not.toBeNull();
  });
});
