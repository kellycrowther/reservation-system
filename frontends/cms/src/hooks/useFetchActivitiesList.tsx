import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { Activity } from "../interfaces/Activity";
import { useFetch } from "./useAsyncFetch";
import { useMutation } from "./useMutation";

export function useFetchActivitiesList(params?: any) {
  return useFetch<Array<Activity>>("/api/activities", params);
}

export const useFetchActivity = (id: string, params?: any) => {
  return useFetch<Activity>(`/api/activities/${id}`, params, {
    immediatelyInvoke: !!id,
  });
};

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
