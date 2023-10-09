const { Router } = require("express");
const requestBodyValidation = require("../middlewares/request-body-validation");

const userModel = require("../database/model/user");
const UserRepository = require("../repositories/user-repository");
const Encrypter = require("../utils/encrypter");
const UserService = require("../services/user-service");
const UserController = require("../controllers/user-controller");

const userRepository = new UserRepository(userModel);
const userService = new UserService(userRepository, new Encrypter());
const userController = new UserController(userService);

const router = new Router();

router.post("/", requestBodyValidation, userController.create);
router.get("/", userController.detailUser);
router.put("/", requestBodyValidation, userController.update);
router.delete("/", userController.delete);

module.exports = router;
