const { DataTypes } = require("sequelize");
const database = require("../connect");

class UserModel {
  constructor(database) {
    this.database = database;
  }

  generateModel() {
    return this.database.define(
      "tb_user",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      { timestamps: false }
    );
  }
}

const userModel = new UserModel(database);

module.exports = userModel;
