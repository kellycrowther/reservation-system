import { useContext, useEffect } from "react";
import * as jwt from "jsonwebtoken";
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
      const user = {
        ...res.data,
        isAuthenticated: true,
        decodedToken: jwt.decode(res?.data?.token || ""),
      };
      setUser(user);
    }
  }, [res.data, setUser]);

  return res;
};
