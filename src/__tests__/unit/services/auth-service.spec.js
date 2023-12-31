/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const AuthService = require("../../../services/auth-service");
const {
  NotFoundError,
  UnauthorizedError,
} = require("../../../utils/exceptions");

const makeUserRepositorySpy = () => {
  class UserRepositorySpy {
    async create(body) {
      const { username, email, password } = body;
      return { username, email, password };
    }
    async findByEmail(email) {
      return this.userByEmail;
    }

    async findByUsername(username) {
      return this.userByUsername;
    }

    async findAllTasks(id) {
      return this.listOfTasks;
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

const makeCacheStorageSpy = () => {
  class CacheStorageSpy {
    async setData(key, value, options = null) {
      return this.tasksFromCache;
    }
  }

  const cacheStorageSpy = new CacheStorageSpy();

  return cacheStorageSpy;
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
    generate(id, options) {
      return this.validAcessToken;
    }
  }

  const accessTokenSpy = new AccessTokenSpy();
  accessTokenSpy.validAcessToken = "valid_access_token";

  return accessTokenSpy;
};

const makeSut = () => {
  const cacheStorageSpy = makeCacheStorageSpy();
  const userRepositorySpy = makeUserRepositorySpy();
  const encrypterSpy = makeEncrypterSpy();
  const accessTokenSpy = makeAccessTokenSpy();
  const sut = new AuthService(
    userRepositorySpy,
    encrypterSpy,
    accessTokenSpy,
    cacheStorageSpy
  );

  return { sut, userRepositorySpy, encrypterSpy, accessTokenSpy };
};

describe("Authentication Service", () => {
  test("Should throw if user is not found by email", async () => {
    const { sut, userRepositorySpy } = makeSut();
    userRepositorySpy.userByEmail = null;

    const promise = sut.login({
      email: "invalid_email@email.com",
      password: "any_password",
    });

    expect(promise).rejects.toThrow(new NotFoundError("User not found"));
  });

  test("Should throw if user is not found by username", async () => {
    const { sut, userRepositorySpy } = makeSut();
    userRepositorySpy.userByUsername = null;

    const promise = sut.login({
      username: "invalid_username",
      password: "any_password",
    });

    expect(promise).rejects.toThrow(new NotFoundError("User not found"));
  });

  test("Should throw if invalid password is provided", async () => {
    const { sut } = makeSut();

    const promise = sut.login({
      username: "any_username",
      password: "invalid_password",
    });

    expect(promise).rejects.toThrow(
      new UnauthorizedError("Unauthorized access")
    );
  });

  test("Should return user body dto and access token if login with username is successful", async () => {
    const { sut, encrypterSpy, accessTokenSpy, userRepositorySpy } = makeSut();
    encrypterSpy.validPassword = true;

    const result = await sut.login({
      username: "valid_username",
      password: "valid_password",
    });

    const user = userRepositorySpy.userByUsername;
    delete user.password;

    expect(result).toEqual({ user, token: accessTokenSpy.validAcessToken });
  });

  test("Should return user body dto and access token if login with email is successful", async () => {
    const { sut, encrypterSpy, accessTokenSpy, userRepositorySpy } = makeSut();
    encrypterSpy.validPassword = true;

    const result = await sut.login({
      email: "valid_email@email.com",
      password: "valid_password",
    });

    const user = userRepositorySpy.userByEmail;
    delete user.password;

    expect(result).toEqual({ user, token: accessTokenSpy.validAcessToken });
  });

  test("Should throw if invalid dependencies are provided", async () => {
    const invalid = {};

    const userTest = {
      email: "any_email@email.com",
      password: "any_password",
    };

    const userRepositorySpy = makeUserRepositorySpy();
    const encrypterSpy = makeEncrypterSpy();
    const accessTokenSpy = makeAccessTokenSpy();
    const cacheStorageSpy = makeCacheStorageSpy();

    const suts = [].concat(
      new AuthService(invalid, encrypterSpy, accessTokenSpy, cacheStorageSpy),
      new AuthService(
        userRepositorySpy,
        invalid,
        accessTokenSpy,
        cacheStorageSpy
      ),
      new AuthService(
        userRepositorySpy,
        encrypterSpy,
        invalid,
        cacheStorageSpy
      ),
      new AuthService(userRepositorySpy, encrypterSpy, accessTokenSpy, invalid)
    );

    for (const sut of suts) {
      const promise = sut.login(userTest);
      expect(promise).rejects.toThrow();
    }
  });
});
