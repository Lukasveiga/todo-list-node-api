const { CustomError } = require("../utils/exceptions");

const requestLog = (req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
};

const errorHandler = (req, res, next) => {
  if (error instanceof CustomError) {
    return res.status(error.status).json({ message: error.message });
  }

  return res.status(500).json({ message: "Internal server error." });
};

module.exports = { requestLog, errorHandler };
