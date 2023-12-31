/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const UserController = require("../../../controllers/user-controller");
const { expect } = require("chai");
const sinon = require("sinon");

const userTest = {
  username: "valid_username",
  email: "valid_email@email.com",
  password: "valid_password",
};

const makeUserServiceSpy = () => {
  class UserServiceSpy {
    async create(body) {
      return this.serviceUserTest;
    }

    async update(body, id) {
      return this.serviceUserTest;
    }

    async delete(id) {
      return this.serviceUserTest;
    }
  }
  const { password, ...user } = userTest;

  const userServiceSpy = new UserServiceSpy();
  userServiceSpy.serviceUserTest = user;

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

    const req = {
      body: userTest,
    };

    const { sut } = makeSut();

    await sut.create(req, res);

    const { password, ...user } = userTest;

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(user)).to.be.true;
  });

  test("Should return status code 200 and user body dto when get a user details", async () => {
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const { password, ...user } = userTest;

    const req = {
      user: user,
    };

    const { sut } = makeSut();

    await sut.detailUser(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(user)).to.be.true;
  });

  test("Should return status code 200 and user body dto when update a user", async () => {
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const req = {
      body: userTest,
      user: { id: "any_id" },
    };

    const { sut } = makeSut();

    await sut.update(req, res);

    const { password, ...user } = userTest;

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(user)).to.be.true;
  });

  test("Should return status code 204 and no body content when delete user", async () => {
    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.spy(),
    };

    const req = {
      user: { id: "any_id" },
    };

    const { sut } = makeSut();

    await sut.delete(req, res);

    expect(res.status.calledWith(204)).to.be.true;
    expect(res.send.calledOnce).to.be.true;
    expect(res.send.calledWith()).to.be.true;
  });
});
