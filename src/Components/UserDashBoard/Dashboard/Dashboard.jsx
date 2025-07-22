// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router";
// import {
//   FaChartBar,
//   FaShoppingCart,
//   FaUser,
//   FaSignOutAlt,
//   FaHome,
// } from "react-icons/fa";
// import { MdOutlineWatchLater, MdOutlineDashboard } from "react-icons/md";
// import { FiMenu, FiX } from "react-icons/fi";
// import Swal from "sweetalert2";
// import { signOut } from "firebase/auth";

// const menuItems = [
//   {
//     icon: <FaHome className="text-2xl transition" />,
//     title: "Home",
//     path: "/",
//   },
//   {
//     icon: <MdOutlineDashboard className="text-2xl transition" />,
//     title: "Dashboard",
//     path: "/dashboard",
//   },
//   {
//     icon: <FaUser className="text-2xl transition" />,
//     title: "Profile",
//     path: "profile",
//   },
//   {
//     icon: <FaShoppingCart className="text-2xl transition" />,
//     title: "orders",
//     path: "orders",
//   },
//   {
//     icon: <MdOutlineWatchLater className="text-2xl transition" />,
//     title: "watchlist",
//     path: "watchlist",
//   },
//   {
//     icon: <FaChartBar className="text-2xl transition" />,
//     title: "Price Trends",
//     path: "trends",
//   },
// ];

// const Dashboard = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const logOut = () => {
//     signOut()
//       .then(() => {
//         localStorage.removeItem("accessToken");
//         navigate("/");
//       })
//       .catch((error) => {
//         console.error("Logout failed:", error);
//       });
//   };

//   const confirmLogout = () => {
//     Swal.fire({
//       title: "Are you sure you want to logout?",
//       text: "You won’t be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logOut();
//         Swal.fire({
//           title: "Logged Out!",
//           text: "Successfully logged out.",
//           icon: "success",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }
//     });
//   };

//   // ✅ Fixed isActive function
//  const isActive = (path) => {
//   const current = location.pathname;

//   if (path === "/") return current === "/";

//   if (path === "/dashboard") {
//     // Make sure it's ONLY active on exact /dashboard
//     return current === "/dashboard";
//   }

//   // Handle nested dashboard subroutes (relative paths like "profile", "orders")
//   return current === `/dashboard/${path}` || current.startsWith(`/dashboard/${path}/`);
// };

//   return (
//    <>
//   <div className="flex h-screen ">
//     {/* Sidebar for lg+ */}
//     <nav className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 shadow z-50 min-h-full">
//       <div className="h-[70px] sticky top-0 z-50 flex items-center justify-center border-b border-r  bg-green-600/30 animated-sea-green">
//         <h1 className="text-xl font-bold w-full text-white px-4">Dashboard</h1>
//       </div>
//       <ul className="flex-1 flex flex-col gap-2 px-4 py-6 text-sm mt-20">
//         {menuItems.map(({ icon, title, path }, idx) => {
//           const active = isActive(path);
//           return (
//             <li
//               key={idx}
//               className={`group rounded-md transition ${
//                 active
//                   ? "bg-green-600 animated-sea-green text-white font-semibold shadow-[inset_5px_0_6px_-4px_rgba(0,0,0,0.4),_inset_-5px_0_6px_-4px_rgba(0,0,0,0.4)]"
//                   : "text-black hover:bg-green-400 hover:text-white font-semibold"
//               }`}
//             >
//               <Link
//                 to={path}
//                 className="flex items-center gap-4 px-3 py-2 w-full"
//               >
//                 {React.cloneElement(icon, {
//                   className: "text-2xl transition group-hover:text-white",
//                 })}
//                 <span>{title}</span>
//               </Link>
//             </li>
//           );
//         })}
//         <li
//           onClick={confirmLogout}
//           role="button"
//           className="group flex items-center gap-4 cursor-pointer text-red-500 hover:text-white hover:bg-red-500 px-3 py-2 rounded-md font-semibold transition"
//         >
//           <FaSignOutAlt className="text-xl transition group-hover:text-white" />
//           <span>Logout</span>
//         </li>
//       </ul>
//     </nav>

//     {/* Main content area */}
//     <div className=" flex flex-col overflow-y-auto">
//       {/* Mobile Navbar */}
//       <div className="lg:hidden animated-sea-green bg-green-600/30 backdrop-blur-sm fixed top-0 left-0 right-0 shadow border-b z-50 flex justify-between items-center px-4 py-3">
//         <div className="text-lg font-semibold text-white ">Dashboard</div>
//         <button
//           onClick={() => setDrawerOpen(true)}
//           aria-label="Open menu"
//           className="text-2xl text-white"
//         >
//           <FiMenu  />
//         </button>
//       </div>

//       {/* Drawer Menu (already correct) */}
//       <div
//         className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
//           drawerOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex items-center justify-between p-3 border-b bg-green-600/30 animated-sea-green">
//           <div className="text-lg font-semibold text-black">Menu</div>
//           <button
//             onClick={() => setDrawerOpen(false)}
//             aria-label="Close menu"
//             className="text-2xl text-black"
//           >
//             <FiX />
//           </button>
//         </div>

//         <ul className="flex flex-col gap-4 p-4 text-sm">
//           {menuItems.map(({ icon, title, path }, idx) => {
//             const active = isActive(path);

//             return (
//               <li
//                 key={idx}
//                 className={`group rounded-md transition ${
//                   active
//                     ? "bg-green-600 text-white font-semibold shadow-[inset_5px_0_6px_-4px_rgba(0,0,0,0.4),_inset_-5px_0_6px_-4px_rgba(0,0,0,0.4)]"
//                     : "text-black hover:bg-green-400 hover:text-white font-semibold"
//                 }`}
//               >
//                 <Link
//                   to={path}
//                   className="flex items-center gap-4 px-3 py-2 w-full"
//                   onClick={() => setDrawerOpen(false)}
//                 >
//                   {React.cloneElement(icon, {
//                     className: "text-2xl transition group-hover:text-white",
//                   })}
//                   <span>{title}</span>
//                 </Link>
//               </li>
//             );
//           })}

//           <li
//             onClick={() => {
//               confirmLogout();
//               setDrawerOpen(false);
//             }}
//             role="button"
//             className="group flex items-center gap-4 cursor-pointer text-red-500 hover:text-white hover:bg-red-500 px-3 py-2 rounded-md font-semibold transition"
//           >
//             <FaSignOutAlt className="text-xl transition group-hover:text-white" />
//             <span>Logout</span>
//           </li>
//         </ul>
//       </div>

//       {/* Drawer Backdrop */}
//       {drawerOpen && (
//         <div
//           onClick={() => setDrawerOpen(false)}
//           className="fixed inset-0 bg-black/70 z-40"
//           aria-hidden="true"
//         />
//       )}


      
//     </div>
//   </div>
// </>
//   );
// };

// export default Dashboard;
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
import { motion, AnimatePresence } from "framer-motion"; // ✅ animation imports

const menuItems = [
  {
    icon: <FaHome className="text-2xl transition" />,
    title: "Home",
    path: "/",
  },
  {
    icon: <MdOutlineDashboard className="text-2xl transition" />,
    title: "Dashboard",
    path: "/dashboard",
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

  const isActive = (path) => {
    const current = location.pathname;
    if (path === "/") return current === "/";
    if (path === "/dashboard") return current === "/dashboard";
    return current === `/dashboard/${path}` || current.startsWith(`/dashboard/${path}/`);
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar for lg+ */}
        <nav className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 shadow z-50 min-h-full">
          <div className="h-[70px] sticky top-0 z-50 flex items-center justify-center border-b border-r bg-green-600/30 animated-sea-green">
            <h1 className="text-xl font-bold w-full text-white px-4">Dashboard</h1>
          </div>
          <ul className="flex-1 flex flex-col gap-3 px-4 py-6 text-sm mt-20">
            {menuItems.map(({ icon, title, path }, idx) => {
              const active = isActive(path);
              return (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className={`group rounded-md transition ${
                    active
                      ? "bg-green-600 animated-sea-green text-white font-semibold shadow-[inset_5px_0_6px_-4px_rgba(0,0,0,0.4),_inset_-5px_0_6px_-4px_rgba(0,0,0,0.4)]"
                      : "text-black hover:bg-green-400 hover:text-white font-semibold"
                  }`}
                >
                  <Link to={path} className="flex items-center gap-4 px-3 py-2 w-full">
                    {React.cloneElement(icon, {
                      className: "text-2xl transition group-hover:text-white",
                    })}
                    <span>{title}</span>
                  </Link>
                </motion.li>
              );
            })}
            <motion.li
              onClick={confirmLogout}
              role="button"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: menuItems.length * 0.05 }}
              className="group flex items-center gap-4 cursor-pointer text-red-500 hover:text-white hover:bg-red-500 px-3 py-2 rounded-md font-semibold transition"
            >
              <FaSignOutAlt className="text-xl transition group-hover:text-white" />
              <span>Logout</span>
            </motion.li>
          </ul>
        </nav>

        {/* Main content area */}
        <div className="flex flex-col overflow-y-auto">
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
          <AnimatePresence>
            {drawerOpen && (
              <>
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.3 }}
                  className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50"
                >
                  <div className="flex items-center justify-between p-3 border-b bg-green-600/30 animated-sea-green">
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
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
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
                        </motion.li>
                      );
                    })}

                    <motion.li
                      onClick={() => {
                        confirmLogout();
                        setDrawerOpen(false);
                      }}
                      role="button"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: menuItems.length * 0.05 }}
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black z-40"
                  aria-hidden="true"
                />
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Dashboard;