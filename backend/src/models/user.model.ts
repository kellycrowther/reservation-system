import { DataTypes } from "sequelize";
import { UserModelStatic } from "../interfaces/user.interface";

export { model };

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  const options = {
    timestamps: true,
    defaultScope: {
      attributes: {
        exclude: ["hash", "password"],
      },
    },
    scopes: {
      withHash: { attributes: {} },
    },
  };

  return <UserModelStatic>sequelize.define("User", attributes, options);
}
