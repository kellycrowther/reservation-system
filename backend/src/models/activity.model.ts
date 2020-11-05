import { AttributeType, DataTypes } from "sequelize";
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
    description: {
      type: DataTypes.TEXT,
    },
    pictureUrl: {
      type: DataTypes.STRING,
    },
    capacity: {
      type: DataTypes.INTEGER,
      isInt: true,
    },
  };

  const options = {
    timestamps: true,
  };

  return <ActivityModelStatic>sequelize.define("Activity", attributes, options);
}
