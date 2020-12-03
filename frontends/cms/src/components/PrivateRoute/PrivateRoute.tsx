import React from "react";
import { Route, Redirect } from "react-router-dom";

interface PrivateRouteProps {
  component: JSX.Element | (() => JSX.Element);
  isAuthenticated: boolean;
  path: string;
  exact: boolean;
}

export const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  path,
  exact,
}: PrivateRouteProps) => {
  return (
    <Route path={path} exact={exact}>
      {isAuthenticated ? Component : <Redirect to="/login" />}
    </Route>
  );
};
