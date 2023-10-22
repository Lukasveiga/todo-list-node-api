const UserRepository = require("../repositories/user-repository");
const Encrypter = require("../utils/encrypter");
const UserService = require("../services/user-service");
const UserController = require("../controllers/user-controller");

const userService = new UserService(new UserRepository(), new Encrypter());
const userController = new UserController(userService);

module.exports = userController;
