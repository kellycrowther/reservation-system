import { Model, BuildOptions } from "sequelize";

export interface LocationAttributes extends Model {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export type LocationModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): LocationAttributes;
};
