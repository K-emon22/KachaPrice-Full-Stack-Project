import React, { useContext } from "react";
import {Navigate} from "react-router";
import UserRoleCheck from "../../../Components/RoleCheck/UserRoleCheck"; // your custom hook for role
import Loader from "../../Loader/Loader"; // optional: your loading spinner component
import { AuthContext } from "../../ContextFiles/AuthContext";

const VendorRoute = ({children}) => {
  const {role, roleLoading, error} = UserRoleCheck();
const {loading}=useContext(AuthContext)
  if (roleLoading||loading) {
    // Show loading spinner or something while checking role
    return <Loader />;
  }

  if (error) {
    // Optionally show error message if role fetch failed
    return <div className="text-red-600 p-4">Error: {error}</div>;
  }

  if (role !== "vendor") {
    // If not vendor, redirect to forbidden page or show forbidden message
    return <Navigate to="/forbidden" replace />;
  }

  // If vendor, render child components (protected content)
  return children;
};

export default VendorRoute;
