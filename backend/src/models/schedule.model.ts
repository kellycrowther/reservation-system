import { DataTypes } from "sequelize";
import { ScheduleModelStatic } from "../interfaces/schedule.interface";

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

  return <ScheduleModelStatic>sequelize.define("Schedule", attributes, options);
}
