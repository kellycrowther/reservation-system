import { DataTypes } from "sequelize";
import { ScheduleExceptionModelStatic } from "../interfaces/schedule.interface";

export { model };

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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

  return <ScheduleExceptionModelStatic>(
    sequelize.define("ScheduleException", attributes, options)
  );
}
