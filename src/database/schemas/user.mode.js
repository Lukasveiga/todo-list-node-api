const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../connect");

const User = sequelize.define("tb_user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
