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

  test("Should return status code 401 when try to access protected routes without access token", async () => {
    const requestCases = [].concat(
      await request(app).post("/api/v1/task"),
      await request(app).get("/api/v1/task"),
      await request(app).put("/api/v1/task"),
      await request(app).delete("/api/v1/task")
    );

    for (const requestCase of requestCases) {
      expect(requestCase.status).toBe(401);
      expect(requestCase.body.message).toBe("Unauthorized access");
    }
  });

  test("Should return status code 400 when required params are not provided to create a new task", async () => {
    const requestCases = [].concat(
      {},
      { priority: 1 },
      { title: "valid_title" },
      { description: "valid_description" }
    );

    for (const requestCase of requestCases) {
      const response = await request(app)
        .post("/api/v1/task")
        .set("Authorization", `Bearer ${token}`)
        .send(requestCase);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Title and description are required");
    }
  });

  test("Should return status code 400 when empty params are provided to create a new task", async () => {
    const requestCases = [].concat(
      { title: "valid_title", description: "", priority: 1 },
      { title: "", description: "valid_description", priority: 1 }
    );

    const params = ["Description", "Title"];
    let index = 0;

    for (const requestCase of requestCases) {
      const response = await request(app)
        .post("/api/v1/task")
        .set("Authorization", `Bearer ${token}`)
        .send(requestCase);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(`${params[index]} cannot be empty`);
      index++;
    }
  });

  test("Should return status code 400 when invalid priority values are provided to create a new task", async () => {
    const requestCases = [].concat(
      { title: "valid_title", description: "valid_description", priority: "" },
      { title: "valid_title", description: "valid_description", priority: -1 },
      { title: "valid_title", description: "valid_description", priority: 6 }
    );

    const messages = [
      "Priority must be a number",
      "Priority must be between 0 and 5",
      "Priority must be between 0 and 5",
    ];
    let index = 0;

    for (const requestCase of requestCases) {
      const response = await request(app)
        .post("/api/v1/task")
        .set("Authorization", `Bearer ${token}`)
        .send(requestCase);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(messages[index]);
      index++;
    }
  });
});
