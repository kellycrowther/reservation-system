import { Model, BuildOptions } from "sequelize";
import { ActivityModelStatic } from "./activity.interface";
import { LocationAttributes } from "./location.interface";

export interface ReservationAttributes extends Model {
  id: string;
  name: string;
  quantity: number;
  startTime: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  locationId: number;
  location: LocationAttributes;
}

export type ReservationModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ReservationAttributes;
};
