const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgresql",
    host: process.env.DB_HOST,
    port: 5432,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connection established`);
  })
  .catch((error) => {
    console.log("Database connection error: ", error.message);
  });

module.exports = sequelize;
