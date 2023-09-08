const express = require("express");
const { requestLog } = require("./middlewares/index");
const router = require("./routes/index");

const app = express();

app.use(express.json());
app.use(requestLog);

app.use("/api/v1", router);

module.exports = { app };
