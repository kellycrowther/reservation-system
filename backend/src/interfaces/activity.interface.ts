import { Model, BuildOptions } from "sequelize";
import { Schedule } from "./schedule.interface";

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

export interface CreateActivityParams {
  name: string;
  schedule: Schedule;
}
