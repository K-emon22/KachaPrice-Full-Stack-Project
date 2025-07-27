import {createBrowserRouter} from "react-router";
import {Children} from "react";

// Layouts
import Root from "../Root/Root";
import DashboardLayout from "../Components/UserDashBoard/Dashboard/DashboardLayout";

// Authentication
import Login from "../Components/Authentication/Login/Login";
import Register from "../Components/Authentication/Register/Register";
import PrivateRoute from "../Components/ContextFiles/PrivateRoute";

// Pages
import Home from "../Components/Pages/HomePage/Home/Home";
import AllProduct from "../Components/Pages/AllProduct/AllProduct";
import ProductDetails from "../Components/Pages/ProductDetails/SingleProductDetails/ProductDetails";
import ProductPayment from "../Components/Pages/ProductPayment/ProductPayment";
import TermsAndConditions from "../Components/Pages/TermsAndConditions/TermsAndConditions";
import BeAVendor from "../Components/Pages/BeAVendor/BeAVendor";
import Forbidden from "../Components/ForbiddenPage/Forbidden";

// User Dashboard
import Dashboard from "../Components/UserDashBoard/Pages/DashBoard/Dashboard";
import MyOrder from "../Components/UserDashBoard/Pages/MyOrder/MyOrder";
import WishList from "../Components/UserDashBoard/Pages/WishList/WishList";
import PriceTrend from "../Components/UserDashBoard/Pages/PriceTrend/PriceTrend";
import Profile from "../Components/UserDashBoard/Pages/Profile/Profile";

// Vendor
import VendorRoute from "../Components/VENDORDATA/VendorRoute/VendorRoute";
import VendorAddProduct from "../Components/VENDORDATA/VendorAddProduct/VendorAddProduct";
import VendorMyProduct from "../Components/VENDORDATA/VendorMyProduct/VendorMyProduct";
import VendorAdvertisement from "../Components/VENDORDATA/VendorAdvertisement/VendorAdvertisement";

// Admin
import AdminRoute from "../Components/ADMINSITE/AdminRoute/AdminRoute";
import AllUsers from "../Components/ADMINSITE/AllUsers/AllUsersForAdmin";
import AllProducts from "../Components/ADMINSITE/AllProducts/AllProductsForAdmin";

// Common User Route
import CommonUserRoute from "../Components/COMMONUSERROUTE/CommonUserRoute";
import VendorEditProduct from "../Components/VENDORDATA/VendorEditProduct/VendorEditProduct";
import AllUsersForAdmin from "../Components/ADMINSITE/AllUsers/AllUsersForAdmin";
import AllProductsForAdmin from "../Components/ADMINSITE/AllProducts/AllProductsForAdmin";
import AllAdvertisementForAdmin from "../Components/ADMINSITE/AllAdvertisement/AllAdvertisementForAdmin";
import LoggingOut from "../Components/LoggingOut/LoggingOut";
import AdminAllOrder from "../Components/ADMINSITE/AdminAllOrder/AdminAllOrder";
import Error from "../Components/Error/Error";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {path: "/login", element: <Login />},
      {path: "/register", element: <Register />},
      {
        path: "logOut",
        element: <LoggingOut></LoggingOut>,
      },
      {
        path: "/allproduct",
        element: (
          <CommonUserRoute>
            <AllProduct />
          </CommonUserRoute>
        ),
      },
      {
        path: "/BeAVEndor",
        element: (
          <PrivateRoute>
            <CommonUserRoute>
              <BeAVendor />
            </CommonUserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/:id",
        element: <ProductPayment />,
      },
      {
        path: "/term",
        element: <TermsAndConditions />,
      },
      {
        path: "/vendorAddProduct",
        element: (
          <PrivateRoute>
            <VendorRoute>
              <VendorAddProduct />
            </VendorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/vendorMyProduct",
        element: (
          <PrivateRoute>
            <VendorRoute>
              <VendorMyProduct />
            </VendorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/vendorAdvertisement",
        element: (
          <PrivateRoute>
            <VendorRoute>
              <VendorAdvertisement />
            </VendorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "vendorEditProduct/:id",
        element: (
          <PrivateRoute>
            <VendorRoute>
              <VendorEditProduct></VendorEditProduct>
            </VendorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "adminEditProduct/:id",
        element: (
          <AdminRoute>
            <VendorEditProduct />
          </AdminRoute>
        ),
      },
      {
        path: "/allUsers",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllUsersForAdmin></AllUsersForAdmin>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/allProducts",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllProductsForAdmin></AllProductsForAdmin>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/forbidden",
        element: <Forbidden />,
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <Error></Error>,
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
        path: "orders",
        element: <MyOrder />,
      },
      {
        path: "watchlist",
        element: <WishList />,
      },
      {
        path: "trends",
        element: <PriceTrend />,
      },

      {
        path: "vendorMyProduct",
        element: <VendorMyProduct> </VendorMyProduct>,
      },
      {
        path: "advertisements",
        element: <VendorAdvertisement></VendorAdvertisement>,
      },
      {
        path: "manageusers",
        element: <AllUsersForAdmin></AllUsersForAdmin>,
      },
      {
        path: "allproducts",
        element: <AllProductsForAdmin></AllProductsForAdmin>,
      },
      {
        path: "allAdvertisement",
        element: <AllAdvertisementForAdmin></AllAdvertisementForAdmin>,
      },
      {
        path: "allorder",
        element: <AdminAllOrder></AdminAllOrder>,
      },
    ],
  },
]);
