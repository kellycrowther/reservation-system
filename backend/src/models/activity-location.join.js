const { Sequelize, DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
  };

  const options = {
    timestamps: true,
  };

  return sequelize.define("ActivityLocationJoin", attributes, options);
}
