import { Model, BuildOptions } from "sequelize";

export interface ActivityAttributes extends Model {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export type ActivityModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ActivityAttributes;
};
