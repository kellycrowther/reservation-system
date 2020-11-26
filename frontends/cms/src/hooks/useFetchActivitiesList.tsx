import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { Activity } from "../interfaces/Activity";
import { useAsync } from "./useAsyncFetch";
import { useMutation } from "./useMutation";

export const useFetchActivitiesList = (config?: AxiosRequestConfig) => {
  return useAsync(getActivities, config);
};

async function getActivities(
  config?: AxiosRequestConfig
): Promise<AxiosResponse<Array<Activity>>> {
  return axios.get("/api/activities", config);
}

export const useCreateActivity = () => {
  return useMutation(createActivity);
};

async function createActivity({
  data,
  config,
}: {
  data: Activity;
  config?: AxiosRequestConfig;
}): Promise<AxiosResponse<Activity>> {
  return axios.post("/api/activities", data, config);
}
