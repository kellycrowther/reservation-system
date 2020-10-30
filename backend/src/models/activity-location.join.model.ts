import { DataTypes } from "sequelize";
import { ActivityLocationModelStatic } from "../interfaces/activity-location.join.interface";

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

  return <ActivityLocationModelStatic>(
    sequelize.define("ActivityLocationJoin", attributes, options)
  );
}
