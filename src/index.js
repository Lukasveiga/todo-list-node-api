const express = require("express");
const middleware = require("./middlewares");
const connection = require("./database/connect");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

connection;

app.use(express.json());

app.use(middleware.requestLog);

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`);
});
