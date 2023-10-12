const { Router } = require("express");
const userController = require("../composition-root/user-composition");
const { requestBodyValidation } = require("../middlewares");
const postUserSchema = require("../utils/validation/user/post-user-schema");
const putUserSchema = require("../utils/validation/user/put-user-schema");

const router = new Router();

router.post("/", requestBodyValidation(postUserSchema), (req, res) =>
  userController.create(req, res)
);
router.get("/", (req, res) => userController.detailUser(req, res));
router.put("/", requestBodyValidation(putUserSchema), (req, res) =>
  userController.update(req, res)
);
router.delete("/", (req, res) => userController.delete(req, res));

module.exports = router;
