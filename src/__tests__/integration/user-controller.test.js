/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { app } = require("../../app");
const request = require("supertest");
const sequelize = require("../../database/connect");

let token;

describe("User Controller", () => {
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

  test("should create new user and return status 201", async () => {
    const userTest = {
      username: "valid_username2",
      email: "valid_email2@email.com",
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

  test("should return status code 401 when try to access protected routes without access token", async () => {
    const requestCases = [].concat(
      await request(app).get("/api/v1/user"),
      await request(app).put("/api/v1/user"),
      await request(app).delete("/api/v1/user")
    );

    for (const requestCase of requestCases) {
      expect(requestCase.status).toBe(401);
      expect(requestCase.body.message).toBe("Unauthorized access");
    }
  });

  test("should return status code 401 when try to access protected routes with invalid access token", async () => {
    const invalidToken = "invalid_token";

    const requestCases = [].concat(
      await request(app)
        .get("/api/v1/user")
        .set("Authorization", `Bearer ${invalidToken}`),
      await request(app)
        .put("/api/v1/user")
        .set("Authorization", `Bearer ${invalidToken}`),
      await request(app)
        .delete("/api/v1/user")
        .set("Authorization", `Bearer ${invalidToken}`)
    );

    for (const requestCase of requestCases) {
      expect(requestCase.status).toBe(401);
      expect(requestCase.body.message).toBe("Unauthorized access");
    }
  });

  test("should return status code 200 and user details when valid access token is provided", async () => {
    const response = await request(app)
      .get("/api/v1/user")
      .set("Authorization", `Bearer ${token}`);

    const { id, ...user } = response.body;

    expect(response.status).toBe(200);
    expect(user).toEqual({
      username: "valid_username",
      email: "valid_email@email.com",
    });
  });

  test("should return status code 400 if empty body is provided to update user", async () => {
    const response = await request(app)
      .put("/api/v1/user")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "You must enter at least one field (username, email, password)"
    );
  });

  test("should return status code 400 when empty params are provided to update user", async () => {
    const updateCases = [].concat(
      await request(app)
        .put("/api/v1/user")
        .set("Authorization", `Bearer ${token}`)
        .send({ username: "" }),
      await request(app)
        .put("/api/v1/user")
        .set("Authorization", `Bearer ${token}`)
        .send({ email: "" }),
      await request(app)
        .put("/api/v1/user")
        .set("Authorization", `Bearer ${token}`)
        .send({ password: "" })
    );

    const fields = ["Username", "Email", "Password"];
    let index = 0;

    for (const updateCase of updateCases) {
      expect(updateCase.status).toBe(400);
      expect(updateCase.body.message).toBe(`${fields[index]} cannot be empty`);

      index++;
    }
  });

  test("should return status code 400 when invalid password is provided to update user", async () => {
    const invalidPassword = "123";

    const response = await request(app)
      .put("/api/v1/user")
      .set("Authorization", `Bearer ${token}`)
      .send({ password: invalidPassword });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Password must be at least 5 characters long"
    );
  });

  test("should return status code 400 when invalid email is provided to update user", async () => {
    const response = await request(app)
      .put("/api/v1/user")
      .set("Authorization", `Bearer ${token}`)
      .send({ email: "invalid_email" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid email");
  });

  test("should return status code 204 when valid access token is provided to delete user", async () => {
    const response = await request(app)
      .delete(`/api/v1/user`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
