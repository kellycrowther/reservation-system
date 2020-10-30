import { Model, BuildOptions } from "sequelize";

export interface ActivityLocationAttributes extends Model {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export type ActivityLocationModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ActivityLocationAttributes;
};
