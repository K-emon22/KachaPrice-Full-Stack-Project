import {createBrowserRouter} from "react-router";
import Root from "../Root/Root";
import {Children} from "react";
import Login from "../Components/Authentication/Login/Login";
import Register from "../Components/Authentication/Register/Register";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);
