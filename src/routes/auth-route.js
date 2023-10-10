const { Router } = require("express");

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

router.post("/", authController.login);

module.exports = router;
