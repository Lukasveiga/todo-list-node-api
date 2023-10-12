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

  test("should return status code 400 when is not provided a param", async () => {
    const userCases = [].concat(
      {},
      {
        username: "any_username",
      },
      {
        email: "any_email@email.com",
      },
      {
        password: "any_password",
      },
      {
        username: "any_username",
        email: "any_email@email.com",
      },
      {
        username: "any_username",
        password: "any_password",
      },
      {
        email: "any_email@email.com",
        password: "any_password",
      }
    );

    for (const userCase of userCases) {
      const response = await request(app).post("/api/v1/user").send(userCase);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "All fields are required (username, email and password)"
      );
    }
  });

  test("should return status code 400 when invalid email is provided", async () => {
    const userTest = {
      username: "valid_username2",
      email: "invalid_email",
      password: "valid_password",
    };
    const response = await request(app).post("/api/v1/user").send(userTest);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid email");
  });

  test("should return status code 400 when invalid password is provided", async () => {
    const invalid_password = "123";
    const userTest = {
      username: "valid_username2",
      email: "any_email@email.com",
      password: invalid_password,
    };
    const response = await request(app).post("/api/v1/user").send(userTest);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Password must be at least 5 characters long"
    );
  });

  test("should return status code 400 when empty params are provided", async () => {
    const userCases = [].concat(
      {
        username: "",
        email: "any_email@email.com",
        password: "any_password",
      },
      {
        username: "any_username",
        email: "",
        password: "any_password",
      },
      {
        username: "any_username",
        email: "any_email@email.com",
        password: "",
      }
    );

    const fields = ["Username", "Email", "Password"];
    let index = 0;
    for (const userCase of userCases) {
      const response = await request(app).post("/api/v1/user").send(userCase);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(`${fields[index]} cannot be empty`);

      index++;
    }
  });
});
