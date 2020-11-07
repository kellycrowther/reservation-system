import { DataTypes } from "sequelize";
import { ScheduleWeekdayModelStatic } from "../interfaces/schedule.interface";

export { model };

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    day: {
      type: DataTypes.INTEGER,
    },
  };

  const options = {
    timestamps: true,
  };

  return <ScheduleWeekdayModelStatic>(
    sequelize.define("ScheduleWeekday", attributes, options)
  );
}
