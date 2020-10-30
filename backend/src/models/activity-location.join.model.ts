import { DataTypes } from "sequelize";

export { model };

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  };

  const options = {
    timestamps: true,
  };

  return sequelize.define("ActivityLocationJoin", attributes, options);
}
