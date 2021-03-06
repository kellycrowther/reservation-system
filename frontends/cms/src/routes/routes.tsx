import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { ActivityCreateUpdate } from "../pages/Activities/AcitivityCreateUpdate";
import { ActivitiesList } from "../pages/Activities/ActivitiesList";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { UserContext } from "../context/userContext";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";
import { Locations } from "../pages/Locations/Locations";
import { Reservations } from "../pages/Reservations/Reservations";
import { Users } from "../pages/Users/Users";
import { ReservationCreateUpdate } from "../pages/Reservations/ReservationCreateUpdate";

const routes = [
  { path: "/", key: "ROOT", exact: true, isPrivate: true, component: <Home /> },
  {
    path: "/reservations",
    key: "res",
    exact: true,
    isPrivate: true,
    component: <Reservations />,
  },
  {
    path: "/reservations/new",
    key: "resNew",
    exact: true,
    isPrivate: true,
    component: <ReservationCreateUpdate />,
  },
  {
    path: "/reservations/:id",
    key: "resId",
    exact: true,
    isPrivate: true,
    component: <ReservationCreateUpdate />,
  },
  {
    path: "/activities",
    key: "activities",
    exact: true,
    isPrivate: true,
    component: <ActivitiesList />,
  },
  {
    path: "/activities/new",
    key: "activitiesNew",
    exact: true,
    isPrivate: true,
    component: <ActivityCreateUpdate />,
  },
  {
    path: "/activities/:id",
    key: "activitiesId",
    exact: true,
    isPrivate: true,
    component: <ActivityCreateUpdate />,
  },
  {
    path: "/locations",
    key: "locations",
    exact: true,
    isPrivate: true,
    component: <Locations />,
  },
  {
    path: "/users",
    key: "users",
    exact: true,
    isPrivate: true,
    component: <Users />,
  },
  {
    path: "/login",
    key: "login",
    exact: true,
    isPrivate: false,
    component: <Login />,
  },
];

export function RenderRoutes() {
  const { user } = useContext(UserContext);

  return (
    <Switch>
      {routes.map((route, i) => {
        return route.isPrivate ? (
          <PrivateRoute
            component={route.component}
            key={route.key}
            path={route.path}
            exact={route.exact}
            isAuthenticated={!!user?.isAuthenticated}
          />
        ) : (
          <Route key={route.key} path={route.path} exact={route.exact}>
            {route.component}
          </Route>
        );
      })}
      <Route path="*" component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}
