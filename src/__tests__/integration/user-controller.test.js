/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const app = require("../../app");
const sequelize = require("../../database/connect");

describe("User Controller", () => {
  afterAll(async () => {
    await sequelize.sync({ force: true });
  });

  test("", () => {});
});
