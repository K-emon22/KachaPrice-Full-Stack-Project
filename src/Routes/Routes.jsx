// import {createBrowserRouter} from "react-router";
// import Root from "../Root/Root";
// import {Children} from "react";
// import Login from "../Components/Authentication/Login/Login";
// import Register from "../Components/Authentication/Register/Register";
// import AllProduct from "../Components/Pages/AllProduct/AllProduct";
// import ProductDetails from "../Components/Pages/ProductDetails/SingleProductDetails/ProductDetails";
// import PrivateRoute from "../Components/ContextFiles/PrivateRoute";
// import ProductPayment from "../Components/Pages/ProductPayment/ProductPayment";
// import Home from "../Components/Pages/HomePage/Home/Home";

// import TermsAndConditions from "../Components/Pages/TermsAndConditions/TermsAndConditions";
// import DashboardLayout from "../Components/UserDashBoard/Dashboard/DashboardLayout";
// import Dashboard from "../Components/UserDashBoard/Pages/DashBoard/Dashboard";
// import MyOrder from "../Components/UserDashBoard/Pages/MyOrder/MyOrder";
// import WishList from "../Components/UserDashBoard/Pages/WishList/WishList";
// import PriceTrend from "../Components/UserDashBoard/Pages/PriceTrend/PriceTrend";
// import Profile from "../Components/UserDashBoard/Pages/Profile/Profile";
// import BeAVendor from "../Components/Pages/BeAVendor/BeAVendor";
// import VendorRoute from "../Components/VENDORDATA/VendorRoute/VendorRoute";
// import VendorAddProduct from "../Components/VENDORDATA/VendorAddProduct/VendorAddProduct";
// import Forbidden from "../Components/ForbiddenPage/Forbidden";
// import CommonUserRoute from "../Components/COMMONUSERROUTE/CommonUserRoute";
// import VendorMyProduct from "../Components/VENDORDATA/VendorMyProduct/VendorMyProduct";
// import VendorAdvertisement from "../Components/VENDORDATA/VendorAdvertisement/VendorAdvertisement";
// import AllUsers from "../Components/ADMINSITE/AllUsers/AllUsers";
// import AllProducts from "../Components/ADMINSITE/AllProducts/AllProducts";
// import AdminRoute from "../Components/ADMINSITE/AdminRoute/AdminRoute";

// export const Routes = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root></Root>,
//     children: [
//       {
//         path: "/",
//         element: <Home></Home>,
//       },
//       {
//         path: "/login",
//         element: <Login></Login>,
//       },
//       {
//         path: "/register",
//         element: <Register></Register>,
//       },
//       {
//         path: "/allproduct",
//         element: (
//           <CommonUserRoute>
//             <AllProduct></AllProduct>
//           </CommonUserRoute>
//         ),
//       },
//       {
//         path: "/BeAVEndor",
//         element: (
//           <PrivateRoute>
//             {" "}
//             <CommonUserRoute>
//               {" "}
//               <BeAVendor></BeAVendor>
//             </CommonUserRoute>
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "/product/:id",
//         element: (
//           <PrivateRoute>
//             <ProductDetails></ProductDetails>
//           </PrivateRoute>
//         ),
//       },

//       {
//         path: "/payment/:id",
//         element: <ProductPayment></ProductPayment>,
//       },
//       {
//         path: "/term",
//         element: <TermsAndConditions></TermsAndConditions>,
//       },
//       {
//         path: "/vendorAddProduct",
//         element: (
//           <PrivateRoute>
//             {" "}
//             <VendorRoute>
//               {" "}
//               <VendorAddProduct></VendorAddProduct>{" "}
//             </VendorRoute>
//           </PrivateRoute>
//         ),
//       },

//       {
//         path: "/vendorMyProduct",
//         element: (
//           <PrivateRoute>
//             <VendorRoute>
//               <VendorMyProduct></VendorMyProduct>
//             </VendorRoute>
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "/vendorAdvertisement",
//         element: (
//           <PrivateRoute>
//             {" "}
//             <VendorRoute>
//               <VendorAdvertisement></VendorAdvertisement>
//             </VendorRoute>
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "/allUsers",
//         element: (
//           <PrivateRoute>
//             {" "}
//             <AdminRoute>
//               {" "}
//               <AllUsers></AllUsers>
//             </AdminRoute>{" "}
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "/allProducts",
//         element: (
//           <PrivateRoute>
//             {" "}
//             <AdminRoute>
//               {" "}
//               <AllProducts></AllProducts>
//             </AdminRoute>{" "}
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "/forbidden",
//         element: <Forbidden></Forbidden>,
//       },
//     ],
//   },
//   {
//     path: "/dashboard",
//     element: (
//       <PrivateRoute>
//         <DashboardLayout />
//       </PrivateRoute>
//     ),
//     children: [
//       {
//         index: true,
//         element: <Dashboard />,
//       },

//       {
//         path: "/dashboard",
//         element: <Dashboard />,
//       },

//       {
//         path: "orders",
//         element: <MyOrder></MyOrder>,
//       },
//       {
//         path: "watchlist",
//         element: <WishList></WishList>,
//       },
//       {
//         path: "trends",
//         element: <PriceTrend></PriceTrend>,
//       },
//     ],
//   },
// ]);

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
import AllUsers from "../Components/ADMINSITE/AllUsers/AllUsers";
import AllProducts from "../Components/ADMINSITE/AllProducts/AllProducts";

// Common User Route
import CommonUserRoute from "../Components/COMMONUSERROUTE/CommonUserRoute";
import VendorEditProduct from "../Components/VENDORDATA/VendorEditProduct/VendorEditProduct";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: (
          <CommonUserRoute>
            <Home />
          </CommonUserRoute>
        ),
      },
      {path: "/login", element: <Login />},
      {path: "/register", element: <Register />},
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
            {" "}
            <VendorRoute>
              {" "}
              <VendorEditProduct></VendorEditProduct>
            </VendorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/allUsers",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/allProducts",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllProducts />
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
    ],
  },
]);
