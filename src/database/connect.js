const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST ?? "localhost",
  port: process.env.MYSQL_PORT ?? 3306,
  database: process.env.MYSQL_DATABASE ?? "test",
  user: process.env.MYSQL_USER ?? "root",
  password: process.env.MYSQL_PASSWORD ?? "root",
});

connection.connect((err) => {
  if (err) {
    console.log("Error in connection with mysql: " + err.message);
  } else {
    console.log("Connection established with mysql");
  }
});

module.exports = { connection };
