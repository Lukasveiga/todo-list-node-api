const { Router } = require("express");
const requestBodyValidation = require("../middlewares/request-body-validation");
const postUserSchema = require("../utils/validation/user/post-user-schema");
const putUserSchema = require("../utils/validation/user/put-user-schema");

const userModel = require("../database/model/user");
const UserRepository = require("../repositories/user-repository");
const Encrypter = require("../utils/encrypter");
const UserService = require("../services/user-service");
const UserController = require("../controllers/user-controller");

const userRepository = new UserRepository(userModel);
const userService = new UserService(userRepository, new Encrypter());
const userController = new UserController(userService);

const router = new Router();

router.post("/", requestBodyValidation(postUserSchema), userController.create);
router.get("/", userController.detailUser);
router.put("/", requestBodyValidation(putUserSchema), userController.update);
router.delete("/", userController.delete);

module.exports = router;
