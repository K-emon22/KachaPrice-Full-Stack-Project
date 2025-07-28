import React, {useContext} from "react";
import {Navigate} from "react-router";
import UserRoleCheck from "../../../Components/RoleCheck/UserRoleCheck";
import Loader from "../../Loader/Loader";
import {AuthContext} from "../../ContextFiles/AuthContext";

const VendorRoute = ({children}) => {
  const {role, roleLoading, error} = UserRoleCheck();
  const {loading} = useContext(AuthContext);
  if (roleLoading || loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-600 p-4">Error: {error}</div>;
  }

  if (role !== "vendor") {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};

export default VendorRoute;
