/* eslint-disable no-undef */
const UserRepository = require("../../../repositories/user-repository");
const sequelize = require("../../../database/connect");

const userRepository = new UserRepository();

const userTest = {
  username: "valid_username",
  email: "valid_email@email.com",
  password: "valid_password",
};

describe("User Repository", () => {
  afterAll(async () => {
    await sequelize.sync({ force: true });
  });

  test("Should return user body when created a new user", async () => {
    const user = await userRepository.create(userTest);
    delete user.id;
    expect(user).toEqual(userTest);
  });

  test("Should return user body when user is found by id", async () => {
    const user = await userRepository.findById(1);
    delete user.id;
    expect(user).toEqual(userTest);
  });

  test("Should return null when user is not found by id", async () => {
    const user = await userRepository.findById(2);
    expect(user).toBeNull();
  });

  test("Should return user body when user is found by email", async () => {
    const user = await userRepository.findByEmail("valid_email@email.com");
    delete user.id;
    expect(user).toEqual(userTest);
  });

  test("Should return null when user is not found by email", async () => {
    const user = await userRepository.findByEmail("invalid_email@email.com");
    expect(user).toBeNull();
  });

  test("Should return user body when user is found by username", async () => {
    const user = await userRepository.findByUsername("valid_username");
    delete user.id;
    expect(user).toEqual(userTest);
  });

  test("Should return null when user is not found by username", async () => {
    const user = await userRepository.findByUsername("invalid_username");
    expect(user).toBeNull();
  });

  test("Should return user body when user is updated", async () => {
    const user = await userRepository.update(
      {
        username: "valid_username_update",
      },
      1
    );
    expect(user.username).toEqual("valid_username_update");
  });

  test("Should return null if user is not updated", async () => {
    const user = await userRepository.update(
      {
        username: "any_username_update",
      },
      2
    );
    expect(user).toBeNull();
  });
});
