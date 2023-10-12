const UserRepository = require("../repositories/user-repository");
const Encrypter = require("../utils/encrypter");
const UserService = require("../services/user-service");
const UserController = require("../controllers/user-controller");

const encrypter = new Encrypter();
const userRepository = new UserRepository();
const userService = new UserService(userRepository, encrypter);
const userController = new UserController(userService);

module.exports = userController;
