import { useFetch } from "../hooks/useAsyncFetch";
import { useMutation } from "../hooks/useMutation";
import { Reservation, ReservationInput } from "../interfaces/Reservation";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { useAxios } from "../hooks/useAxios";

export function useFetchReservationsList(params?: any) {
  return useFetch<Array<Reservation>>("/api/reservations", params);
}

export function useFetchReservationDetail(id: string, params?: any) {
  return useFetch<Reservation>(`/api/reservations/${id}`, params, {
    immediatelyInvoke: !!id,
  });
}

export const useCreateReservation = () => {
  return useMutation(createReservation);
};

async function createReservation({
  data,
  config,
}: {
  data: ReservationInput;
  config?: AxiosRequestConfig;
}): Promise<AxiosResponse<Reservation>> {
  return axios.post("/api/reservations", data, config);
}

export const useUpdateReservation = (id: string) => {
  return useAxios<Reservation>(
    {
      url: `/api/reservations/${id}`,
      method: "PUT",
    },
    { immediatelyInvoke: false }
  );
};
