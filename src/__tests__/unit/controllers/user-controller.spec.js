/* eslint-disable no-undef */
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
  };

  const userServiceSpy = new UserServiceSpy();
  userServiceSpy.serviceUserTest = userTest;

  return userServiceSpy;
};

const makeSut = () => {
  const userServiceSpy = makeUserServiceSpy();
  const sut = new UserController(userServiceSpy);

  return { sut, userServiceSpy };
};

describe("User Controller", () => {
  test("Should return status code 201 and user body dto when create new user", async () => {
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const user = {
      username: "valid_username",
      email: "valid_email@email.com",
      password: "valid_password",
    };

    const req = {
      body: user,
    };

    const { sut } = makeSut();

    await sut.create(req, res);

    delete user.password;

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(user)).to.be.true;
  });
});
