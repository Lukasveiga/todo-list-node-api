const express = require("express");
const middleware = require("./middlewares/index");
const router = require("./routes/index");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(middleware.requestLog);

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`);
});
