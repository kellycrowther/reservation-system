import { DataTypes } from "sequelize";

export { model };

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
