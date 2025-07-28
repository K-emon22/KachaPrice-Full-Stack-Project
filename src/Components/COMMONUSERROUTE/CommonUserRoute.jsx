import React, {useContext} from "react";
import {Navigate} from "react-router";
import UserRoleCheck from "../RoleCheck/UserRoleCheck";
import Loader from "../Loader/Loader";
import {AuthContext} from "../ContextFiles/AuthContext";

const CommonUserRoute = ({children}) => {
  const {role, roleLoading, error} = UserRoleCheck();
  const {loading} = useContext(AuthContext);
  if (roleLoading || loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-600 p-4">Error: {error}</div>;
  }

  if (role !== "user") {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};

export default CommonUserRoute;
