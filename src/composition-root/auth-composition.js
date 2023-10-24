const AuthController = require("../controllers/auth-controller");
const AuthService = require("../services/auth-service");
const UserRepository = require("../repositories/user-repository");
const Encrypter = require("../utils/encrypter");
const AccessToken = require("../utils/access-token");
const CacheStorage = require("../database/cache/cache-storage");

const authService = new AuthService(
  new UserRepository(),
  new Encrypter(),
  new AccessToken(),
  new CacheStorage()
);
const authController = new AuthController(authService);

module.exports = authController;
