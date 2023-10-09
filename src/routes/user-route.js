const { Router } = require("express");

const userModel = require("../database/model/user");
const UserRepository = require("../repositories/user-repository");
const Encrypter = require("../utils/encrypter");
const UserService = require("../services/user-service");
const UserController = require("../controllers/user-controller");

const userRepository = new UserRepository(userModel);
const userService = new UserService(userRepository, new Encrypter());
const userController = new UserController(userService);

const router = new Router();

router.post("/", userController.create);
router.get("/", userController.detailUser);
router.put("/", userController.update);
router.delete("/", userController.delete);

module.exports = router;
