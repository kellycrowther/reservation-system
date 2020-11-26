import { Schedule } from "./Schedule";

export interface Activity {
  id: string;
  name: string;
  description: string;
  capacity: number;
  pictureUrl: string;
  createdAt: string;
  updatedAt: string;
  locations: Location[];
  schedule: Schedule;
}
