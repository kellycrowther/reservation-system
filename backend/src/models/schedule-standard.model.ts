import { DataTypes } from "sequelize";
import { ScheduleStandardModelStatic } from "../interfaces/schedule.interface";

export { model };

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.TEXT,
    },
    name: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    startTime: {
      type: DataTypes.DATE,
    },
    endTime: {
      type: DataTypes.DATE,
    },
  };

  const options = {
    timestamps: true,
  };

  return <ScheduleStandardModelStatic>(
    sequelize.define("ScheduleStandard", attributes, options)
  );
}
