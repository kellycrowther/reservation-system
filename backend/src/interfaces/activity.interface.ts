import { Model, BuildOptions } from "sequelize";
import { Schedule } from "./schedule.interface";

export interface ActivityAttributes extends Model {
  id: string;
  name: string;
  description: string;
  pictureUrl: string;
  capacity: number;
  schedule: Schedule;
}

export type ActivityModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ActivityAttributes;
};

export interface CreateActivityParams {
  name: string;
  schedule: Schedule;
}

export interface ActivityCalendar {
  date: string;
  name: string;
  isActive: boolean;
}
