import React, { createContext, useState } from "react";
import { UserAttributes } from "../interfaces/User";

interface IUserProvider {
  children: React.ReactNode;
}

interface IUserContext {
  user: UserAttributes | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserAttributes | undefined>>;
  logout: Function;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProvider) => {
  const [user, setUser] = useState<UserAttributes>();

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem("rsToken");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
