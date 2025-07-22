import {createBrowserRouter} from "react-router";
import Root from "../Root/Root";
import {Children} from "react";
import Login from "../Components/Authentication/Login/Login";
import Register from "../Components/Authentication/Register/Register";
import AllProduct from "../Components/Pages/AllProduct/AllProduct";
import ProductDetails from "../Components/Pages/ProductDetails/SingleProductDetails/ProductDetails";
import PrivateRoute from "../Components/ContextFiles/PrivateRoute";
import ProductPayment from "../Components/Pages/ProductPayment/ProductPayment";
import Home from "../Components/Pages/HomePage/Home/Home";

import TermsAndConditions from "../Components/Pages/TermsAndConditions/TermsAndConditions";
import DashboardLayout from "../Components/UserDashBoard/Dashboard/DashboardLayout";
import Dashboard from "../Components/UserDashBoard/Pages/DashBoard/Dashboard";
import MyOrder from "../Components/UserDashBoard/Pages/MyOrder/MyOrder";
import WishList from "../Components/UserDashBoard/Pages/WishList/WishList";
import PriceTrend from "../Components/UserDashBoard/Pages/PriceTrend/PriceTrend";
import Profile from "../Components/UserDashBoard/Pages/Profile/Profile";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
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
        path: "/payment/:id",
        element: <ProductPayment></ProductPayment>,
      },
      {
        path: "/term",
        element: <TermsAndConditions></TermsAndConditions>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "orders",
        element: <MyOrder></MyOrder>,
      },
      {
        path: "watchlist",
        element: <WishList></WishList>,
      },
      {
        path: "trends",
        element: <PriceTrend></PriceTrend>,
      },
    ],
  },
]);
