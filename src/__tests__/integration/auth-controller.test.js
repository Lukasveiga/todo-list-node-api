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
  test("Should return 200 when valid email and password are provided", async () => {
    const login = {
      email: "valid_email@email.com",
      password: "valid_password",
    };

    const response = await request(app).post("/api/v1/login").send(login);

    expect(response.status).toBe(200);
    expect(response.body.token).not.toBeNull();
  });

  test("Should return 200 when valid username and password are provided", async () => {
    const login = {
      username: "valid_username",
      password: "valid_password",
    };

    const response = await request(app).post("/api/v1/login").send(login);

    expect(response.status).toBe(200);
    expect(response.body.token).not.toBeNull();
  });

  test("Should return 404 when invalid username is provided", async () => {
    const login = {
      username: "invalid_username",
      password: "any_password",
    };

    const response = await request(app).post("/api/v1/login").send(login);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
  });

  test("Should return 404 when invalid email is provided", async () => {
    const login = {
      email: "invalid_email@email.com",
      password: "any_password",
    };

    const response = await request(app).post("/api/v1/login").send(login);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
  });

  test("Should return 401 when invalid password with email is provided", async () => {
    const login = {
      email: "valid_email@email.com",
      password: "invalid_password",
    };

    const response = await request(app).post("/api/v1/login").send(login);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Unauthorized access");
  });

  test("Should return 401 when invalid password with username is provided", async () => {
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

  test("Should return 400 when empty username or email is provided", async () => {
    const loginCases = [].concat(
      { email: "", password: "any_password" },
      { username: "", password: "any_password" }
    );

    const fields = ["Email", "Username"];
    let index = 0;

    for (const loginCase of loginCases) {
      const response = await request(app).post("/api/v1/login").send(loginCase);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(`${fields[index]} cannot be empty`);
      index++;
    }
  });

  test("Should return 400 when invalid email is provided", async () => {
    const login = {
      email: "invalid_email",
      password: "any_password",
    };

    const response = await request(app).post("/api/v1/login").send(login);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid email");
  });
});
