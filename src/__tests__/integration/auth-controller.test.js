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

  test("Should return 400 when invalid username are provided", async () => {
    const login = {
      username: "invalid_username",
      password: "any_password",
    };

    const response = await request(app).post("/api/v1/login").send(login);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
  });

  test("Should return 400 when invalid email are provided", async () => {
    const login = {
      email: "invalid_email@email.com",
      password: "any_password",
    };

    const response = await request(app).post("/api/v1/login").send(login);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
  });

  test("Should return 401 when invalid password with email are provided", async () => {
    const login = {
      email: "valid_email@email.com",
      password: "invalid_password",
    };

    const response = await request(app).post("/api/v1/login").send(login);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Unauthorized access");
  });

  test("Should return 401 when invalid password with username are provided", async () => {
    const login = {
      username: "valid_username",
      password: "invalid_password",
    };

    const response = await request(app).post("/api/v1/login").send(login);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Unauthorized access");
  });

  test("Should return 400 when email and username are not provided", async () => {
    const login = {
      password: "invalid_password",
    };

    const response = await request(app).post("/api/v1/login").send(login);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("You must enter with username or email");
  });

  test("Should return 400 when password is not provided", async () => {
    const login = {
      username: "any_username",
    };

    const response = await request(app).post("/api/v1/login").send(login);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Password must be provided");
  });
});
