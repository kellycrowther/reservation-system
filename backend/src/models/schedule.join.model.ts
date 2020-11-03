import { DataTypes } from "sequelize";
import { ScheduleJoinModelStatic } from "../interfaces/schedule.interface";

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

  return <ScheduleJoinModelStatic>(
    sequelize.define("ScheduleJoin", attributes, options)
  );
}
