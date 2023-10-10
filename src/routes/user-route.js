const { Router } = require("express");
const { requestBodyValidation } = require("../middlewares");
const postUserSchema = require("../utils/validation/user/post-user-schema");
const putUserSchema = require("../utils/validation/user/put-user-schema");

const UserRepository = require("../repositories/user-repository");
const Encrypter = require("../utils/encrypter");
const UserService = require("../services/user-service");
const UserController = require("../controllers/user-controller");

const userService = new UserService(new UserRepository(), new Encrypter());
const userController = new UserController(userService);

const router = new Router();

router.post("/", requestBodyValidation(postUserSchema), userController.create);
router.get("/", userController.detailUser);
router.put("/", requestBodyValidation(putUserSchema), userController.update);
router.delete("/", userController.delete);

module.exports = router;
