import React, { useEffect, useContext } from "react";
import * as jwt from "jsonwebtoken";
import { useFetchUser } from "../../services/user.service";
import { UserContext } from "../../context/userContext";
import { UserAttributes } from "../../interfaces/User";

interface StartAppProps {
  children: React.ReactNode;
}

export const StartApp = ({ children }: StartAppProps) => {
  const token = localStorage.getItem("rsToken");
  const decodedToken = jwt.decode(token || "");
  const { data: user } = useFetchUser(decodedToken?.sub);

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const userContext = {
      ...(user as UserAttributes),
      isAuthenticated: !!user,
      decodedToken: jwt.decode(token || ""),
    };
    setUser(userContext);
  }, [user, setUser, token]);

  return <>{children}</>;
};
