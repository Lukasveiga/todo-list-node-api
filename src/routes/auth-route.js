const { Router } = require("express");
const { requestBodyValidation } = require("../middlewares");
const postLoginSchema = require("../utils/validation/login/post-login-schema");

const AuthController = require("../controllers/auth-controller");
const AuthService = require("../services/auth-service");
const UserRepository = require("../repositories/user-repository");
const Encrypter = require("../utils/encrypter");
const AccessToken = require("../utils/access-token");

const authService = new AuthService(
  new UserRepository(),
  new Encrypter(),
  new AccessToken()
);
const authController = new AuthController(authService);

const router = new Router();

router.post("/", requestBodyValidation(postLoginSchema), authController.login);

module.exports = router;
