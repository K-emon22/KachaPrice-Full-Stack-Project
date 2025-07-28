import React, {useContext, useEffect} from "react";
import {useNavigate} from "react-router";
import {AuthContext} from "../ContextFiles/AuthContext";
import Loader from "../Loader/Loader";

const LoggingOut = () => {
  const {logout} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout()
      .then(() => {
        localStorage.removeItem("accessToken");

        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Logout failed during redirect:", error);

        navigate("/", {replace: true});
      });
  }, [logout, navigate]);

  return <Loader />;
};

export default LoggingOut;
