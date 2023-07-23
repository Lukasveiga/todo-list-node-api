const mysql = require("mysql2");
const { Sequelize } = require("sequelize");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  port: process.env.MYSQL_PORT || "3306",
  password: process.env.MYSQL_PASSWORD || "root",
});

connection.connect((error) => {
  if (error) throw error;
  console.log(`Connecting to database: ${process.env.MYSQL_DATABASE}`);
});

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  }
);

module.exports = sequelize;
