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
  locationId: number;
  location: Location;
  activity: Activity;
  activityId: string;
}

export interface ReservationInput {
  name: string;
  userId: string;
  activityId: string;
  locationId: number;
  startTime: string;
  quantity: number;
}
