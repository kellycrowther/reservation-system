import { DataTypes } from "sequelize";
import { ActivityModelStatic } from "../interfaces/activity.interface";

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

  return <ActivityModelStatic>sequelize.define("Activity", attributes, options);
}
