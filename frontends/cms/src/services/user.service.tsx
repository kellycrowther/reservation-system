import { useAxios } from "../hooks/useAxios";
import { UserAttributes } from "../interfaces/User";

export const useAuthenticate = () => {
  const res = useAxios<UserAttributes>(
    {
      url: `/api/users/authenticate`,
      method: "POST",
    },
    { immediatelyInvoke: false }
  );

  if (res.data) {
    localStorage.setItem("rsToken", res?.data?.token || "");
  }

  return res;
};
