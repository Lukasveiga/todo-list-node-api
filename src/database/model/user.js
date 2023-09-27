const { DataTypes } = require("sequelize");

class UserModel {
  constructor(database) {
    this.database = database;
  }

  generateModel(database) {
    return database.define(
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

module.exports = UserModel;
