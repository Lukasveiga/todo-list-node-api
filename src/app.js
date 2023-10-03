const express = require("express");
const { requestLog } = require("./middlewares/index");
const router = require("./routes/index");
require("express-async-errors");
const helmet = require("helmet");

const app = express();
app.use(helmet());

app.use(express.json());
app.use(requestLog);

app.use("/api/v1", router);

module.exports = { app };
