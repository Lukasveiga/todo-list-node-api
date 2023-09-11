const UserService = require("../../services/user-service");

class UserRepositorySpy {
  async create(body) {
    const { username, email, password } = body;
    return { username, email, password };
  }
}

const userRepositorySpy = new UserRepositorySpy();

describe("User Service", () => {
  test("Should return user dto body when create a new user", async () => {
    const sut = new UserService(userRepositorySpy);
    const userTest = {
      username: "any_username",
      email: "any_email@email.com",
      password: "any_password",
    };
    const userDTO = await sut.create(userTest);
    expect(userDTO).toEqual({
      username: "any_username",
      email: "any_email@email.com",
    });
  });
});
