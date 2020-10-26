const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const { Sequelize } = require("sequelize");

class Location extends Model {
  async test() {}
}

Location.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

Location.sync({ alter: true });

module.exports = {
  Location,
};
