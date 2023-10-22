const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
require("express-async-errors");

const { requestLog, errorHandler } = require("./middlewares");
const { userRoute, authRoute, taskRoute } = require("./routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLog);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/login", authRoute);
app.use("/api/v1/task", taskRoute);

app.use(errorHandler);

module.exports = { app };
