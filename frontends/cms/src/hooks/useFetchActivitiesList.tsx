import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { Activity } from "../interfaces/Activity";
import { useAsync } from "./useAsyncFetch";

export const useFetchActivitiesList = (config?: AxiosRequestConfig) => {
  return useAsync(getActivities, config);
};

async function getActivities(
  config?: AxiosRequestConfig
): Promise<AxiosResponse<Array<Activity>>> {
  return axios.get("/api/activities", config);
}
