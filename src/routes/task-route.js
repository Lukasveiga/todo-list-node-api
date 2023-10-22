const { Router } = require("express");
const taskController = require("../composition-root/task-composition");
const { validateAcessToken } = require("../middlewares");

const router = new Router();

router.use(validateAcessToken);
router.post("/", (req, res) => taskController.create(req, res));
router.get("/", (req, res) => taskController.findAll(req, res));
router.put("/:taskId", (req, res) => taskController.update(req, res));
router.delete("/:taskId", (req, res) => taskController.delete(req, res));

module.exports = router;
