const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const { Sequelize } = require("sequelize");

class Reservation extends Model {
  async test() {}
}

Reservation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = {
  Reservation,
};
