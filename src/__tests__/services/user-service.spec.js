const UserService = require("../../services/user-service");

class UserRepositorySpy {
  async create(body) {
    const { username, email, password } = body;
    return { username, email, password };
  }
  async findByEmail(email) {
    return false;
  }
}

class EncrypterSpy {
  async hash(password) {
    return this.hashedPassword;
  }
}

const makeSut = () => {
  const userRepositorySpy = new UserRepositorySpy();
  const encrypterSpy = new EncrypterSpy();
  const sut = new UserService(userRepositorySpy, encrypterSpy);
  return { sut, userRepositorySpy, encrypterSpy };
};

describe("User Service", () => {
  test("Should return user dto body when create a new user", async () => {
    const { sut } = makeSut();
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
