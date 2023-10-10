/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const Authentication = require("../../services/auth-service");
const { NotFoundError, UnauthorizedError } = require("../../utils/exceptions");

const makeUserRepositorySpy = () => {
  class UserRepositorySpy {
    async create(body) {
      const { username, email, password } = body;
      return { username, email, password };
    }
    async findByEmail(email) {
      return this.userByEmail;
    }

    async findByUsername(id) {
      return this.userByUsername;
    }
  }

  const userTest = {
    username: "any_username",
    email: "any_email@email.com",
    password: "any_password",
  };

  const userRepositorySpy = new UserRepositorySpy();
  userRepositorySpy.userByEmail = userTest;
  userRepositorySpy.userByUsername = userTest;

  return userRepositorySpy;
};

const makeEncrypterSpy = () => {
  class EncrypterSpy {
    async compare(providedPassword, userPassword) {
      return this.validPassword;
    }
  }

  const encrypterSpy = new EncrypterSpy();
  encrypterSpy.validPassword = false;

  return encrypterSpy;
};

const makeAccessTokenSpy = () => {
  class AccessTokenSpy {
    async generateAccessToken(id, options) {
      return this.validAcessToken;
    }
  }

  const accessTokenSpy = new AccessTokenSpy();
  accessTokenSpy.validAcessToken = "valid_access_token";

  return accessTokenSpy;
};

const makeSut = () => {
  const userRepositorySpy = makeUserRepositorySpy();
  const encrypterSpy = makeEncrypterSpy();
  const accessTokenSpy = makeAccessTokenSpy();
  const sut = new Authentication(
    userRepositorySpy,
    encrypterSpy,
    accessTokenSpy
  );

  return { sut, userRepositorySpy, encrypterSpy, accessTokenSpy };
};

describe("Authentication Service", () => {
  test("Should throw if user is not found by email", async () => {
    const { sut, userRepositorySpy } = makeSut();
    userRepositorySpy.userByEmail = null;

    const promise = sut.login({
      email: "any_email@email.com",
      password: "any_password",
    });

    expect(promise).rejects.toThrow(new NotFoundError("User not found"));
  });

  test("Should throw if user is not found by username", async () => {
    const { sut, userRepositorySpy } = makeSut();
    userRepositorySpy.userByUsername = null;

    const promise = sut.login({
      username: "any_username",
      password: "any_password",
    });

    expect(promise).rejects.toThrow(new NotFoundError("User not found"));
  });

  test("Should throw if invalid password is provided", async () => {
    const { sut } = makeSut();

    const promise = sut.login({
      username: "any_username",
      password: "any_password",
    });

    expect(promise).rejects.toThrow(
      new UnauthorizedError("Unauthorized access")
    );
  });
});
