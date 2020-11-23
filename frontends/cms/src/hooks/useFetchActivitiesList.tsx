import axios, { AxiosResponse } from "axios";
import { Activity } from "../interfaces/Activity";
import { useAsync } from "./useAsyncFetch";

export const useFetchActivitiesList = () => {
  return useAsync(getActivities);
};

async function getActivities(): Promise<AxiosResponse<Array<Activity>>> {
  return axios.get("/api/activities");
}
