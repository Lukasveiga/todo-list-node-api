const { Router } = require("express");
const authController = require("../composition-root/auth-composition");
const { requestBodyValidation } = require("../middlewares");
const postLoginSchema = require("../utils/validation/login/post-login-schema");

const router = new Router();

router.post("/", requestBodyValidation(postLoginSchema), (req, res) =>
  authController.login(req, res)
);

module.exports = router;
