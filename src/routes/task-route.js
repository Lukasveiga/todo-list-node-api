const { Router } = require("express");
const taskController = require("../composition-root/task-composition");
const { validateAcessToken, urlParamValidation } = require("../middlewares");

const router = new Router();

router.use(validateAcessToken);
router.post("/", (req, res) => taskController.create(req, res));
router.get("/", (req, res) => taskController.findAll(req, res));
router.put("/:taskId", urlParamValidation, (req, res) =>
  taskController.update(req, res)
);
router.delete("/:taskId", urlParamValidation, (req, res) =>
  taskController.delete(req, res)
);

module.exports = router;
