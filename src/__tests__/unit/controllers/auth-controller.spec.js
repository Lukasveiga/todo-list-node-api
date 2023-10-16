/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const AuthController = require("../../../controllers/auth-controller");
const { expect } = require("chai");
const sinon = require("sinon");

const loginTest = {
  user: { username: "valid_username", email: "valid_email@email.com" },
  token: "valid_token",
};

const userTest = {
  username: "valid_username",
  email: "valid_email@email.com",
  password: "valid_password",
};

const makeAuthServiceSpy = () => {
  class AuthServiceSpy {
    async login(body) {
      return this.loginTestBody;
    }
  }

  const authService = new AuthServiceSpy();
  authService.loginTestBody = loginTest;

  return authService;
};

const makeSut = () => {
  const authServiceSpy = makeAuthServiceSpy();
  const sut = new AuthController(authServiceSpy);

  return { sut, authServiceSpy };
};

describe("Auth Controller", () => {
  test("Should return status code 200 and user dto body with access token", async () => {
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const req = {
      body: userTest,
    };

    const { sut } = makeSut();

    await sut.login(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(loginTest)).to.be.true;
  });
});
