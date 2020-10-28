const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const { Sequelize } = require("sequelize");
const { User } = require("./user.model");

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
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

// Relationships
Reservation.belongsTo(User, { foreignKey: "userId" });

// Init table
Reservation.sync({ alter: true });

module.exports = {
  Reservation,
};
