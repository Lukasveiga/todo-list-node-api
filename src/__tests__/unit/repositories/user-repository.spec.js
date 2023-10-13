/* eslint-disable no-undef */
const UserRepository = require("../../../repositories/user-repository");
const sequelize = require("../../../database/connect");

const userRepository = new UserRepository();

describe("User Repository", () => {
  afterAll(async () => {
    await sequelize.sync({ force: true });
  });

  test("Should return user body when created a new user", async () => {
    const userTest = {
      username: "valid_username",
      email: "valid_email@email.com",
      password: "valid_password",
    };

    const user = await userRepository.create(userTest);
    delete user.id;
    expect(user).toEqual(userTest);
  });
});