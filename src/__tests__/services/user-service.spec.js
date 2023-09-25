const UserService = require("../../services/user-service");
const { BadRequestError, NotFoundError } = require("../../utils/exceptions");

const makeUserRepositorySpy = () => {
  class UserRepositorySpy {
    async create(body) {
      const { username, email, password } = body;
      return { username, email, password };
    }
    async findByEmail(email) {
      return this.userByEmail;
    }

    async findById(id) {
      return this.userById;
    }

    async update(body, id) {
      return this.userUpdated;
    }
  }

  const userTest = {
    username: "any_username",
    email: "any_email@email.com",
    password: "any_password",
  };

  const userRepositorySpy = new UserRepositorySpy();
  userRepositorySpy.userByEmail = userTest;
  userRepositorySpy.userById = userTest;
  userRepositorySpy.userUpdated = userTest;

  return userRepositorySpy;
};

const makeEncrypterSpy = () => {
  class EncrypterSpy {
    async hash(password) {
      return this.hashedPassword;
    }
  }

  const encrypterSpy = new EncrypterSpy();
  encrypterSpy.hashedPassword = "";

  return encrypterSpy;
};

const makeSut = () => {
  const userRepositorySpy = makeUserRepositorySpy();
  const encrypterSpy = makeEncrypterSpy();
  const sut = new UserService(userRepositorySpy, encrypterSpy);
  return { sut, userRepositorySpy, encrypterSpy };
};

describe("User Service", () => {
  test("Should return user dto body when create a new user", async () => {
    const { sut, userRepositorySpy } = makeSut();
    userRepositorySpy.userByEmail = null;
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
    userRepositorySpy.userByEmail = true;

    const userTest = {
      email: "invalid_email@email.com",
    };
    const promise = sut.create(userTest);
    expect(promise).rejects.toThrow(new BadRequestError("User already exists."));
  });

  test("Should return hashed password when call hash method from Encrypter", async () => {
    const { encrypterSpy } = makeSut();
    encrypterSpy.hashedPassword = "hashed_password";

    const hashedPassword = await encrypterSpy.hash("any_password");
    expect(hashedPassword).toEqual(encrypterSpy.hashedPassword);
  });

  test("Should return user dto when user is found by id", async () => {
    const { sut, userRepositorySpy } = makeSut();

    const userDTO = await sut.findById("valid_id");
    expect(userDTO).toEqual({
      username: userRepositorySpy.userById.username,
      email: userRepositorySpy.userById.email,
    });
  });

  test("Should throw if user is not found by id", async () => {
    const { sut, userRepositorySpy } = makeSut();
    userRepositorySpy.userById = null;

    const promise = sut.findById("invalid_id");
    expect(promise).rejects.toThrow(new NotFoundError("User not found."));
  });

  test("Should return user dto when user is found by email", async () => {
    const { sut, userRepositorySpy } = makeSut();

    const userDTO = await sut.findByEmail("valid_email@email.com");
    expect(userDTO).toEqual({
      username: userRepositorySpy.userByEmail.username,
      email: userRepositorySpy.userByEmail.email,
    });
  });

  test("Should throw if user is not found by email", async () => {
    const { sut, userRepositorySpy } = makeSut();
    userRepositorySpy.userByEmail = null;

    const promise = sut.findByEmail("invalid_email@email.com");
    expect(promise).rejects.toThrow(new NotFoundError("User not found."));
  });

  test("Should throw if user is not found when update user", async () => {
    const { sut, userRepositorySpy } = makeSut();
    userRepositorySpy.userById = null;

    const promise = sut.update({}, "any_id");
    expect(promise).rejects.toThrow(new NotFoundError("User not found."));
  });

  test("Should throw if if email provided is already registered in db when update user", async () => {
    const { sut } = makeSut();

    const promise = sut.update({ email: "any_email@2email.com" }, "any_id");
    expect(promise).rejects.toThrow(new BadRequestError("Email already registered."));
  });

  test("Should return updated user dto when update user", async () => {
    const { sut, userRepositorySpy } = makeSut();
    userRepositorySpy.userByEmail = null;

    const updatedUser = await sut.update({}, "any_id");
    expect(updatedUser).toEqual({
      username: userRepositorySpy.userUpdated.username,
      email: userRepositorySpy.userUpdated.email,
    });
  });

  test("Should throw if user is not found when delete user", async () => {
    const { sut, userRepositorySpy } = makeSut();
    userRepositorySpy.userById = null;

    const promise = sut.update({}, "any_id");
    expect(promise).rejects.toThrow(new NotFoundError("User not found."));
  });

  test("Should throw if invalid dependencies is provided", async () => {
    const invalid = {};
    const userRepositorySpy = makeUserRepositorySpy();
    const encrypterSpy = makeEncrypterSpy();
    const userTest = {
      username: "any_username",
      email: "any_email@email.com",
      password: "any_password",
    };

    const suts = [].concat(
      new UserService(invalid, encrypterSpy),
      new UserService(userRepositorySpy, invalid)
    );

    for (const sut of suts) {
      const promise = sut.create(userTest);
      expect(promise).rejects.toThrow();
    }
  });
});
