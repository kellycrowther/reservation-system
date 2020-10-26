const { Model, DataTypes } = require("sequelize");
const { Sequelize } = require("../db");
const sequelize = require("../db");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    defaultScope: {
      attributes: {
        exclude: ["hash"],
      },
    },
    scopes: {
      withHash: { attributes: {} },
    },
  }
);

User.sync({ alter: true });

module.exports = {
  User,
};
