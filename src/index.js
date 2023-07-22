const express = require("express");
const { connection } = require("./database/connect");
const middleware = require("./middlewares");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(middleware.requestLog);

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`);
});
