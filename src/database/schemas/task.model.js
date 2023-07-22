const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../connect");

const Taks = sequelize.define("tb_task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  finishedAt: {
    type: DataTypes.DATE,
  },
  finished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  priority: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});
