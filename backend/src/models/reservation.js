const { Sequelize, DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  const options = {
    timestamps: true,
    defaultScope: {
      attributes: {
        exclude: ["activityId"],
      },
    },
  };

  return sequelize.define("Reservation", attributes, options);
}
