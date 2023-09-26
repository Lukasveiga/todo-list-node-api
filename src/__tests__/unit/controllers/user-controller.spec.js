const UserController = require("../../../controllers/user-controller");

const makeUserServiceSpy = () => {
  class UserServiceSpy {}

  return new UserServiceSpy();
};

const makeSut = () => {
  const userServiceSpy = makeUserServiceSpy();
  const sut = new UserController(userServiceSpy);
  return { sut, userServiceSpy };
};

describe("User Controller", () => {
  test("", () => {});
});
