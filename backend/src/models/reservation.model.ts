import { DataTypes } from "sequelize";
import { ReservationModelStatic } from "../interfaces/reservation.interface";

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
    defaultScope: {
      attributes: {
        exclude: ["activityId"],
      },
    },
  };

  return <ReservationModelStatic>(
    sequelize.define("Reservation", attributes, options)
  );
}
