const express = require("express");
const { requestLog, errorHandler } = require("./middlewares");
const { userRoute } = require("./routes");
require("express-async-errors");
const helmet = require("helmet");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(requestLog);

app.use("/api/v1", userRoute);

app.use(errorHandler);

module.exports = { app };
