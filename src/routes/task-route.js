const { Router } = require("express");
const taskController = require("../composition-root/task-composition");
const {
  validateAcessToken,
  urlParamValidation,
  requestBodyValidation,
} = require("../middlewares");
const postTaskSchema = require("../utils/validation/task/post-task-schema");
const putTaskSchema = require("../utils/validation/task/put-task-schema");

const router = new Router();

router.use(validateAcessToken);
router.post("/", requestBodyValidation(postTaskSchema), (req, res) =>
  taskController.create(req, res)
);
router.get("/", (req, res) => taskController.findAll(req, res));
router.put(
  "/:taskId",
  urlParamValidation,
  requestBodyValidation(putTaskSchema),
  (req, res) => taskController.update(req, res)
);
router.delete("/:taskId", urlParamValidation, (req, res) =>
  taskController.delete(req, res)
);

module.exports = router;
