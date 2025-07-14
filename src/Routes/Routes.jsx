import {createBrowserRouter} from "react-router";
import Root from "../Root/Root";
import {Children} from "react";
import Login from "../Components/Authentication/Login/Login";
import Register from "../Components/Authentication/Register/Register";
import AllProduct from "../Components/Pages/AllProduct/AllProduct";
import ProductDetails from "../Components/Pages/ProductDetails/SingleProductDetails/ProductDetails";
import PrivateRoute from "../Components/ContextFiles/PrivateRoute";
import ProductPayment from "../Components/Pages/ProductPayment/ProductPayment";

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
      {
        path: "/allproduct",
        element: <AllProduct></AllProduct>,
      },
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: <ProductPayment></ProductPayment>,
      },
    ],
  },
]);
