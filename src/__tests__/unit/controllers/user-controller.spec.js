/* eslint-disable no-unused-vars */
const UserController = require("../../../controllers/user-controller");
const { expect } = require("chai");
const sinon = require("sinon");

const makeUserServiceSpy = () => {
  class UserServiceSpy {
    async create(body) {
      return this.serviceUserTest;
    }
  }

  const userTest = {
    username: "valid_username",
    email: "valid_email@email.com",
    password: "valid_password",
  };

  const userServiceSpy = new UserServiceSpy();
  userServiceSpy.userTest = userTest;

  return userServiceSpy;
};

const makeSut = () => {
  const userServiceSpy = makeUserServiceSpy();
  const sut = new UserController(userServiceSpy);

  return { sut, userServiceSpy };
};

describe("User Controller", () => {
  test("", () => {});
});
