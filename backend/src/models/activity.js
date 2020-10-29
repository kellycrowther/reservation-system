const { Sequelize, DataTypes } = require("sequelize");
// const { Location } = require("./location");

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
  };

  return sequelize.define("Activity", attributes, options);
}
