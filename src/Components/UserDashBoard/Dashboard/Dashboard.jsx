import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  FaChartBar,
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { MdOutlineWatchLater, MdOutlineDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";

const menuItems = [
  {
    icon: <FaHome className="text-2xl transition" />,
    title: "Home",
    path: "/",
  },
  {
    icon: <MdOutlineDashboard className="text-2xl transition" />,
    title: "Dashboard",
    path: "dashboard",
  },
  {
    icon: <FaUser className="text-2xl transition" />,
    title: "Profile",
    path: "profile",
  },
  {
    icon: <FaShoppingCart className="text-2xl transition" />,
    title: "orders",
    path: "orders",
  },
  {
    icon: <MdOutlineWatchLater className="text-2xl transition" />,
    title: "watchlist",
    path: "watchlist",
  },
  {
    icon: <FaChartBar className="text-2xl transition" />,
    title: "Price Trends",
    path: "trends",
  },
];

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const logOut = () => {
    signOut()
      .then(() => {
        localStorage.removeItem("accessToken");
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const confirmLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
        Swal.fire({
          title: "Logged Out!",
          text: "Successfully logged out.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // ✅ Fixed isActive function
  const isActive = (path) => {
    const current = location.pathname;

    if (path === "/") return current === "/";

    if (path === "dashboard") {
      return current === "/dashboard"; // exact match only
    }

    return current === `/dashboard/${path}` || current.startsWith(`/dashboard/${path}/`);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 backdrop-blur-sm bg-green-600/30 md:h-[50px] lg:h-[70px] shadow border-b z-50 px-[2%] lg:px-[5%] items-center">
        <div className="w-full flex justify-center items-center">
          <ul className="flex justify-between w-full items-center gap-8 text-sm">
            {menuItems.map(({ icon, title, path }, idx) => {
              const active = isActive(path);

              return (
                <li
                  key={idx}
                  className={`group rounded-md transition ${
                    active
                      ? "font-semibold border-b-4 border-green-600 shadow-[inset_5px_0_6px_-4px_rgba(0,0,0,0.4),_inset_-5px_0_6px_-4px_rgba(0,0,0,0.4)]"
                      : "text-black font-semibold border-b-4 border-transparent hover:border-green-600"
                  }`}
                >
                  <Link
                    to={path}
                    className="flex items-center gap-2 w-full px-3 py-2 "
                  >
                    {React.cloneElement(icon, {
                      className: "text-2xl transition",
                    })}
                    <span className="hidden lg:inline">{title}</span>
                  </Link>
                </li>
              );
            })}

            <li
              onClick={confirmLogout}
              role="button"
              className="group flex flex-row gap-2 items-center cursor-pointer text-red-500 hover:text-white hover:bg-red-500 px-3 py-1 rounded-md font-semibold transition"
            >
              <FaSignOutAlt className="text-2xl transition group-hover:text-white" />
              <span className="text-xs mt-1 hidden lg:inline">Logout</span>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className="md:hidden bg-green-600/30 backdrop-blur-sm fixed top-0 left-0 right-0 shadow border-b z-50 flex justify-between items-center px-4 py-3">
        <div className="text-lg font-semibold text-black">Dashboard</div>
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          className="text-2xl text-black"
        >
          <FiMenu />
        </button>
      </div>

      {/* Drawer Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-3 border-b bg-green-600/30">
          <div className="text-lg font-semibold text-black">Menu</div>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className="text-2xl text-black"
          >
            <FiX />
          </button>
        </div>

        <ul className="flex flex-col gap-4 p-4 text-sm">
          {menuItems.map(({ icon, title, path }, idx) => {
            const active = isActive(path);

            return (
              <li
                key={idx}
                className={`group rounded-md transition ${
                  active
                    ? "bg-green-600 text-white font-semibold shadow-[inset_5px_0_6px_-4px_rgba(0,0,0,0.4),_inset_-5px_0_6px_-4px_rgba(0,0,0,0.4)]"
                    : "text-black hover:bg-green-400 hover:text-white font-semibold"
                }`}
              >
                <Link
                  to={path}
                  className="flex items-center gap-4 px-3 py-2 w-full"
                  onClick={() => setDrawerOpen(false)}
                >
                  {React.cloneElement(icon, {
                    className: "text-2xl transition group-hover:text-white",
                  })}
                  <span>{title}</span>
                </Link>
              </li>
            );
          })}

          <li
            onClick={() => {
              confirmLogout();
              setDrawerOpen(false);
            }}
            role="button"
            className="group flex items-center gap-4 cursor-pointer text-red-500 hover:text-white hover:bg-red-500 px-3 py-2 rounded-md font-semibold transition"
          >
            <FaSignOutAlt className="text-xl transition group-hover:text-white" />
            <span>Logout</span>
          </li>
        </ul>
      </div>

      {/* Backdrop */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 bg-black/70 z-40"
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Dashboard;