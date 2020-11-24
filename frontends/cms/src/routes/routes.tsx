import React from "react";
import { Switch, Route } from "react-router-dom";
import { ActivityCreateUpdate } from "../components/Activities/AcitivityCreateUpdate";
import { ActivitiesList } from "../components/Activities/ActivitiesList";
import { Home } from "../components/Home/Home";

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
];

export function RenderRoutes() {
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