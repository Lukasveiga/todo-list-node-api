const { Router } = require("express");
const controller = require("../controllers/user-controller");

const router = new Router();

router.get("/", (req, res) => {
  res.send("Test");
});

module.exports = router;
