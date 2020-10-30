import { DataTypes } from "sequelize";
import { LocationModelStatic } from "../interfaces/location.interface";

export { model };

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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

  return <LocationModelStatic>sequelize.define("Location", attributes, options);
}
