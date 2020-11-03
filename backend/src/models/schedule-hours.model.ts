import { DataTypes } from "sequelize";
import { ScheduleHourModelStatic } from "../interfaces/schedule.interface";

export { model };

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    hour: {
      type: DataTypes.INTEGER,
    },
    minutes: {
      type: DataTypes.INTEGER,
    },
  };

  const options = {
    timestamps: true,
  };

  return <ScheduleHourModelStatic>(
    sequelize.define("ScheduleHours", attributes, options)
  );
}
