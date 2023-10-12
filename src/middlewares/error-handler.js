/* eslint-disable no-unused-vars */
const { CustomError } = require("../utils/exceptions");

const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomError) {
    return res.status(error.status).json({ message: error.message });
  }

  console.log(error);
  return res.status(500).json({ message: "Internal server error." });
};

module.exports = errorHandler;
