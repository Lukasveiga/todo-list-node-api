const { Sequelize, DataTypes } = require("sequelize");
const User = require("./user");
const database = require("../database/connect");

const Task = database.define("tb_task", {
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
    defaultValue: Date.now(),
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

// ORM
Task.belongsTo(User, {
  constraint: true,
  foreignKey: "id_user",
});

User.hasMany(Task, {
  foreignKey: "id_user",
});

module.exports = Task;
