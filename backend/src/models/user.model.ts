import { Sequelize, DataTypes, Model, BuildOptions } from "sequelize";

export { model };

interface UserAttributes extends Model {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

// Need to declare the static model so `findOne` etc. use correct types.
export type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserAttributes;
};

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
