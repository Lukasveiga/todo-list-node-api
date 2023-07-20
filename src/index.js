const express = require("express");
require("dotenv").config();

require("./database/connect");

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`);
});
