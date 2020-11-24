import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { Location } from "../interfaces/Location";
import { useAsync } from "./useAsyncFetch";

export const useFetchLocations = (config?: AxiosRequestConfig) => {
  return useAsync(getLocations, config);
};

async function getLocations(
  config?: AxiosRequestConfig
): Promise<AxiosResponse<Array<Location>>> {
  return axios.get("/api/locations", config);
}
