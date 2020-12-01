import { Location } from "../interfaces/Location";
import { useFetch } from "./useAsyncFetch";

export const useFetchLocations = (params?: any) => {
  return useFetch<Array<Location>>("/api/locations", params);
};
