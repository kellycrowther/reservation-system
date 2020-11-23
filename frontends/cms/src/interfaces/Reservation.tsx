import { Activity } from "./Activity";
import { Location } from "./Location";

export interface Reservation {
  id: string;
  name: string;
  quantity: number;
  startTime: string;
  updatedAt: string;
  createdAt: string;
  userId: string;
  locationId: string;
  location: Location;
  activity: Activity;
}
