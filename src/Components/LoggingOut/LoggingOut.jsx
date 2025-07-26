import React, {useContext, useEffect} from "react";
import {useNavigate} from "react-router";
import {AuthContext} from "../ContextFiles/AuthContext";
import Loader from "../Loader/Loader"; // Your loader component

const LoggingOut = () => {
  const {logout} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // This effect runs once when the component mounts
    logout()
      .then(() => {
        localStorage.removeItem("accessToken");
        // After logout is complete and user is null, navigate to the homepage
        // navigate('/', { replace: true });
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Logout failed during redirect:", error);
        // Still navigate home even if there's an error
        navigate("/", {replace: true});
      });
  }, [logout, navigate]);

  // Show a loader to the user while the logout process happens
  return <Loader />;
};

export default LoggingOut;
