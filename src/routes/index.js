const { Router } = require("express");
const controller = require("../controllers/index");

const router = new Router();

router.get("/", controller.test);

module.exports = router;
