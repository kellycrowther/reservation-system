import { Model, BuildOptions } from "sequelize";

export interface UserAttributes extends Model {
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
