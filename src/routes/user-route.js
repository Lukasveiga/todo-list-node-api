const { Router } = require("express");
const controller = require("../controllers/user-controller");

const router = new Router();

router.get("/", controller.test);

module.exports = router;
