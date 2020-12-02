import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { ActivityCreateUpdate } from "../pages/Activities/AcitivityCreateUpdate";
import { ActivitiesList } from "../pages/Activities/ActivitiesList";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { UserContext } from "../context/userContext";

const routes = [
  { path: "/", key: "ROOT", exact: true, component: <Home /> },
  {
    path: "/reservations",
    key: "res",
    exact: true,
    component: () => <p>Reservations List!</p>,
  },
  {
    path: "/activities",
    key: "activities",
    exact: true,
    component: <ActivitiesList />,
  },
  {
    path: "/activities/new",
    key: "activitiesNew",
    exact: true,
    component: <ActivityCreateUpdate />,
  },
  {
    path: "/activities/:id",
    key: "activitiesId",
    exact: true,
    component: <ActivityCreateUpdate />,
  },
  {
    path: "/login",
    key: "login",
    exact: true,
    component: <Login />,
  },
];

export function RenderRoutes() {
  const { user } = useContext(UserContext);

  console.info("USER: ", user);
  return (
    <Switch>
      {routes.map((route, i) => {
        return (
          <Route key={route.key} path={route.path} exact={route.exact}>
            {route.component}
          </Route>
        );
      })}
      <Route path="*" component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}
