import React, {useContext, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router";
import {FaChartBar, FaShoppingCart, FaSignOutAlt, FaHome} from "react-icons/fa";
import {
  MdOutlineWatchLater,
  MdOutlineDashboard,
  MdStorefront,
  MdOutlineStorefront,
  MdAdminPanelSettings,
} from "react-icons/md";
import {FiMenu, FiX} from "react-icons/fi";
import Swal from "sweetalert2";
import {signOut} from "firebase/auth";
import {motion, AnimatePresence} from "framer-motion";
import {AuthContext} from "../../ContextFiles/AuthContext";
import UserRoleCheck from "../../RoleCheck/UserRoleCheck";
import {useMemo} from "react";
import {MdAddShoppingCart} from "react-icons/md";
import {MdCampaign} from "react-icons/md";
import {VscDiffAdded} from "react-icons/vsc";
import {RiAdvertisementLine} from "react-icons/ri";
const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {logout} = useContext(AuthContext);
  const {role, roleLoading} = UserRoleCheck();
  const MenuItemSkeleton = () => (
    <li className="flex items-center gap-4 px-3 py-2 w-full animate-pulse">
      <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
      <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
    </li>
  );
  const menuItems = useMemo(() => {
    if (roleLoading) return [];

    const baseItems = [
      {
        icon: <MdOutlineDashboard className="text-2xl transition" />,
        title: "Dashboard",
        path: "/dashboard",
      },
    ];

    const userItems = [
      {
        icon: <FaHome className="text-2xl transition" />,
        title: "Home",
        path: "/",
      },
      {
        icon: <FaShoppingCart className="text-2xl transition" />,
        title: "Orders",
        path: "orders",
      },
      {
        icon: <MdOutlineWatchLater className="text-2xl transition" />,
        title: "Watchlist",
        path: "watchlist",
      },
      {
        icon: <FaChartBar className="text-2xl transition" />,
        title: "Price Trends",
        path: "trends",
      },
    ];

    const vendorItems = [
      {
        icon: <MdStorefront className="text-2xl transition" />,
        title: "My Products",
        path: "vendorMyProduct",
      },
      {
        icon: <RiAdvertisementLine className="text-2xl transition" />,
        title: "My advertisements",
        path: "advertisements",
      },
      {
        icon: <VscDiffAdded size={24} />,
        title: "Add Product",
        path: "/vendorAddProduct",
      },
    ];

    const adminItems = [
      {
        icon: <MdAdminPanelSettings className="text-2xl transition" />,
        title: "All Users",
        path: "manageusers",
      },

      {
        icon: <MdAdminPanelSettings className="text-2xl transition" />,
        title: "All Products",
        path: "allproducts",
      },
      {
        icon: <MdAdminPanelSettings className="text-2xl transition" />,
        title: "All Order",
        path: "allorder",
      },
      {
        icon: <MdAdminPanelSettings className="text-2xl transition" />,
        title: "All Advertisement",
        path: "allAdvertisement",
      },
    ];

    if (role === "admin") return [...baseItems, ...adminItems];
    if (role === "vendor") return [...baseItems, ...vendorItems];
    return [...baseItems, ...userItems];
  }, [role, roleLoading]);

  // const logOut = () => {
  //   logout() // this is from context
  //     .then(() => {
  //       localStorage.removeItem("accessToken");
  //       navigate("/");
  //     })
  //     .catch((error) => console.error("Logout error:", error));
  // };

  const logOut = () => {
    // 1. Navigate to the public homepage FIRST.
    navigate("/logOut");
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
        logOut(); // ✅ fix here
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

  const isActive = (path) => {
    const current = location.pathname;
    if (path === "/") return current === "/";
    if (path === "/dashboard") return current === "/dashboard";
    return (
      current === `/dashboard/${path}` ||
      current.startsWith(`/dashboard/${path}/`)
    );
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar for lg+ */}
        {/* The ONLY change is here: 'sticky' is now 'fixed' */}
        <nav className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 shadow h-screen fixed top-0 z-50">
          {/* Header - Fixed height */}
          <div className="h-[70px] flex items-center justify-center border-b animated-sea-green">
            <h1 className="text-xl font-bold w-full text-white px-4">
              Dashboard
            </h1>
          </div>

          {/* Menu List - No Scroll */}
          <ul className="flex-1 flex flex-col gap-3 px-4 py-6 text-sm">
            {roleLoading ? (
              <>
                <MenuItemSkeleton />
                <MenuItemSkeleton />
                <MenuItemSkeleton />
                <MenuItemSkeleton />
              </>
            ) : (
              menuItems.map(({icon, title, path}, idx) => {
                const active = isActive(path);
                return (
                  <motion.li
                    key={idx}
                    initial={{opacity: 0, x: -20}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.3, delay: idx * 0.05}}
                    className={`group rounded-md transition ${
                      active
                        ? "bg-green-600 animated-sea-green text-white font-semibold shadow-[inset_5px_0_6px_-4px_rgba(0,0,0,0.4),_inset_-5px_0_6px_-4px_rgba(0,0,0,0.4)]"
                        : "text-black hover:bg-green-400 hover:text-white font-semibold"
                    }`}
                  >
                    <Link
                      to={path}
                      className="flex items-center gap-4 px-3 py-2 w-full"
                    >
                      {React.cloneElement(icon, {
                        className: "text-2xl transition group-hover:text-white",
                      })}
                      <span>{title}</span>
                    </Link>
                  </motion.li>
                );
              })
            )}

            {/* Logout Button */}
            {!roleLoading && (
              <motion.li
                onClick={confirmLogout}
                role="button"
                initial={{opacity: 0, x: -20}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.3, delay: menuItems.length * 0.05}}
                className="group flex items-center gap-4 cursor-pointer text-red-500 hover:text-white hover:bg-red-500 px-3 py-2 rounded-md font-semibold transition mt-auto"
              >
                <FaSignOutAlt className="text-xl transition group-hover:text-white" />
                <span>Logout</span>
              </motion.li>
            )}
          </ul>
        </nav>

        {/* Main content area */}
        <div className="flex flex-col lg:ml-64  overflow-y-auto">
          {/* Mobile Navbar */}
          <div className="lg:hidden animated-sea-green bg-green-600/30 backdrop-blur-sm fixed top-0 left-0 right-0 shadow border-b z-50 flex justify-between items-center px-4 py-3">
            <div className="text-lg font-semibold text-white ">Dashboard</div>
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="text-2xl text-white"
            >
              <FiMenu />
            </button>
          </div>

          {/* Drawer Menu */}
          <div className=" lg:hidden">
            <AnimatePresence>
              {drawerOpen && (
                <>
                  <motion.div
                    initial={{x: "100%"}}
                    animate={{x: 0}}
                    exit={{x: "100%"}}
                    transition={{duration: 0.3}}
                    className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50"
                  >
                    <div className="flex items-center justify-between p-3   border-b bg-green-600/30 animated-sea-green">
                      <div className="text-lg font-semibold text-black">
                        Menu
                      </div>
                      <button
                        onClick={() => setDrawerOpen(false)}
                        aria-label="Close menu"
                        className="text-2xl text-black"
                      >
                        <FiX />
                      </button>
                    </div>

                    <ul className="flex flex-col gap-4 p-4 text-sm">
                      {menuItems.map(({icon, title, path}, idx) => {
                        const active = isActive(path);
                        return (
                          <motion.li
                            key={idx}
                            initial={{opacity: 0, x: 20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.3, delay: idx * 0.05}}
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
                                className:
                                  "text-2xl transition group-hover:text-white",
                              })}
                              <span>{title}</span>
                            </Link>
                          </motion.li>
                        );
                      })}

                      <motion.li
                        onClick={() => {
                          confirmLogout();
                          setDrawerOpen(false);
                        }}
                        role="button"
                        initial={{opacity: 0, x: 20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{
                          duration: 0.3,
                          delay: menuItems.length * 0.05,
                        }}
                        className="group flex items-center gap-4 cursor-pointer text-red-500 hover:text-white hover:bg-red-500 px-3 py-2 rounded-md font-semibold transition"
                      >
                        <FaSignOutAlt className="text-xl transition group-hover:text-white" />
                        <span>Logout</span>
                      </motion.li>
                    </ul>
                  </motion.div>

                  {/* Backdrop */}
                  <motion.div
                    onClick={() => setDrawerOpen(false)}
                    initial={{opacity: 0}}
                    animate={{opacity: 0.7}}
                    exit={{opacity: 0}}
                    className="fixed inset-0 bg-black z-40"
                    aria-hidden="true"
                  />
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
