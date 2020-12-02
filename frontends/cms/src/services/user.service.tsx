import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useAxios } from "../hooks/useAxios";
import { UserAttributes } from "../interfaces/User";

export const useAuthenticate = () => {
  const { setUser } = useContext(UserContext);

  const res = useAxios<UserAttributes>(
    {
      url: `/api/users/authenticate`,
      method: "POST",
    },
    { immediatelyInvoke: false }
  );

  useEffect(() => {
    if (res.data) {
      localStorage.setItem("rsToken", res?.data?.token || "");
      setUser(res.data);
    }
  }, [res.data, setUser]);

  return res;
};
