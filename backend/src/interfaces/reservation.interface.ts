import { Model, BuildOptions } from "sequelize";

export interface ReservationAttributes extends Model {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export type ReservationModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ReservationAttributes;
};
