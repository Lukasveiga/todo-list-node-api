const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.NODE_ENV === "dev") {
  sequelize = new Sequelize(
    process.env.DB_NAME_DEV,
    process.env.DB_USER_DEV,
    process.env.DB_PASSWORD_DEV,
    {
      dialect: "postgresql",
      host: process.env.DB_HOST_DEV,
      port: process.env.DB_PORT_DEV,
    }
  );
}

if (process.env.NODE_ENV === "test") {
  sequelize = new Sequelize(
    process.env.DB_NAME_TEST,
    process.env.DB_USER_TEST,
    process.env.DB_PASSWORD_TEST,
    {
      dialect: "postgresql",
      logging: false,
      host: process.env.DB_HOST_TEST,
      port: process.env.DB_PORT_TEST,
    }
  );
}

if (process.env.NODE_ENV === "prod") {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      dialect: "postgresql",
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    }
  );
}

sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connection established`);
  })
  .catch((error) => {
    console.log("Database connection error: ", error.message);
  });

module.exports = sequelize;
