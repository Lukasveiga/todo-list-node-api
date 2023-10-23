/* eslint-disable no-unused-vars */
const winston = require("winston");
require("winston-daily-rotate-file");
const { combine, timestamp, json, errors } = winston.format;

const errorFilter = winston.format((info, opts) => {
  return info.level === "error" ? info : false;
});

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: "./src/logs/errors/internal-error-%DATE%.log",
  datePattern: "DD-MM-YYYY HH:mm:ss",
  zippedArchive: true,
  maxSize: "1k",
  maxFiles: "5d",
  createTree: true,
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    errorFilter(),
    errors({ stack: true }),
    timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    json()
  ),
  transports: [fileRotateTransport],
});

module.exports = logger;
