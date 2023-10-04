const { Router } = require("express");

const router = new Router();

router.get("/", (req, res) => {
  res.send("Test");
});

module.exports = router;
