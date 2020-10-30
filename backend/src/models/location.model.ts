import { DataTypes } from "sequelize";

export { model };

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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

  return sequelize.define("Location", attributes, options);
}
