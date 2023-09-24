const UserService = require("../../services/user-service");
const { BadRequestError } = require("../../utils/exceptions");

const makeUserRepositorySpy = () => {
  class UserRepositorySpy {
    async create(body) {
      const { username, email, password } = body;
      return { username, email, password };
    }
    async findByEmail(email) {
      return this.existingEmail;
    }
  }

  const userRepositorySpy = new UserRepositorySpy();
  userRepositorySpy.existingEmail = false;

  return userRepositorySpy;
};

class EncrypterSpy {
  async hash(password) {
    return this.hashedPassword;
  }
}

const makeSut = () => {
  const userRepositorySpy = makeUserRepositorySpy();
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

  test("Should throw if email provided is already registered in db", async () => {
    const { sut, userRepositorySpy } = makeSut();
    userRepositorySpy.existingEmail = true;
    console.log(await userRepositorySpy.findByEmail("a"));
    const userTest = {
      email: "invalid_email@email.com",
    };
    const promise = sut.create(userTest);
    expect(promise).rejects.toThrow(new BadRequestError("User already exists."));
  });
});
