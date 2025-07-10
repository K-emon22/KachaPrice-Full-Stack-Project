import React from "react";
import {Outlet} from "react-router";
import NavBAr from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Root = () => {
  return (
    <div>
      <NavBAr></NavBAr>
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>

      <ToastContainer
        toastClassName={" border-4 font-bold text-gray-900"}
        style={{
          marginTop: "45px",
        }}
      />
    </div>
  );
};

export default Root;
