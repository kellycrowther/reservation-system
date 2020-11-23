import axios, { AxiosResponse } from "axios";
import { useAsync } from "./useAsyncFetch";

export const useFetchActivitiesList = () => {
  return useAsync(getActivities);
};

async function getActivities(): Promise<AxiosResponse<Array<any>>> {
  return axios.get("/api/activities");
}
