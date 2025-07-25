// // import React, {useContext, useState, useEffect} from "react";
// // import {Link, NavLink, useNavigate} from "react-router";
// // import {HiMenuAlt3} from "react-icons/hi";
// // import {AuthContext} from "../ContextFiles/AuthContext";
// // import {signOut} from "firebase/auth";
// // import {Auth} from "../FirebaseAuth/FirebaseAuth";
// // import Swal from "sweetalert2";
// // import UserRoleCheck from "../RoleCheck/UserRoleCheck";

// // const NavBAr = () => {
// //   const {role, roleloading} = UserRoleCheck();

// //   console.log(role);

// //   // const [currentTheme, setCurrentTheme] = useState("light");

// //   // useEffect(() => {
// //   //   const saved = localStorage.getItem("theme") || "light";
// //   //   document.documentElement.setAttribute("data-theme", saved);
// //   //   setCurrentTheme(saved);
// //   // }, []);

// //   // const changeTheme = (theme) => {
// //   //   document.documentElement.setAttribute("data-theme", theme);
// //   //   localStorage.setItem("theme", theme);
// //   //   setCurrentTheme(theme);
// //   // };

// //   const {user, loading} = useContext(AuthContext);
// //   const navigate = useNavigate();

// //   const logOut = () => {
// //     navigate("/");
// //     signOut(Auth)
// //       .then(() => {
// //         localStorage.removeItem("accessToken");
// //       })
// //       .catch((error) => {
// //         console.error("Logout failed:", error);
// //       });
// //   };

// //   const pages = (
// //     <>
// //       {[
// //         ...(!roleloading && role === "user"
// //           ? [
// //               {path: "/", name: "Home"},
// //               {path: "/allproduct", name: "All Product"},
// //               {path: "/beAVendor", name: "Be A Vendor"},
// //               {path: "/dashboard", name: "Dashboard"},
// //             ]
// //           : []),

// //         ...(!roleloading && role === "vendor"
// //           ? [
// //               {path: "/vendorAddProduct", name: "Add Product"},
// //               {path: "/vendorMyProduct", name: "My Product"},
// //               {path: "/vendorAdvertisement", name: "Add Advertisement"},
// //               {path: "/dashboard", name: "Dashboard"},
// //             ]
// //           : []),

// //         ...(!roleloading && role === "admin"
// //           ? [
// //               {path: "/allUsers", name: "All Users"},
// //               {path: "/allProducts", name: "All Product"},
// //               {path: "/dashboard", name: "Dashboard"},
// //             ]
// //           : []),
// //       ].map(({path, name}) => (
// //         <NavLink
// //           key={path + name}
// //           to={path}
// //           className="relative px-2 py-1 font-semibold text-black overflow-hidden"
// //         >
// //           {({isActive}) => (
// //             <>
// //               <span
// //                 className={`absolute inset-0 bg-green-600 z-0 transition-transform duration-500 ease-in-out ${
// //                   isActive ? "scale-x-100" : "scale-x-0"
// //                 } origin-left rounded-lg`}
// //               />
// //               <span
// //                 className={`relative z-10 ${
// //                   isActive ? "text-white" : "text-black"
// //                 }`}
// //               >
// //                 {name}
// //               </span>
// //             </>
// //           )}
// //         </NavLink>
// //       ))}
// //     </>
// //   );

// //   const button = (
// //     <>
// //       <Link to="/login">
// //         <button className="btn-primary !p-0 !px-4 !rounded-lg">Login</button>
// //       </Link>
// //       <Link to="/register">
// //         <button className="btn-primary !p-0 !px-4 !rounded-lg">Register</button>
// //       </Link>
// //     </>
// //   );

// //   return (
// //     <div className="sticky top-0 z-50 backdrop-blur-sm bg-green-600/30">
// //       <nav className="flex flex-row justify-between mb-10 pt-1 px-[2%] lg:px-[5%] border-b">
// //         <div className="flex justify-between gap-2 mb-1">
// //           <div className="flex justify-center items-center">
// //             <img
// //               className="h-12 w-20 text-black"
// //               src="https://i.ibb.co/rGgpvbhM/Screenshot-2025-07-21-at-4-48-07-PM-removebg-preview.png"
// //               alt="Logo"
// //             />
// //           </div>
// //         </div>

// //         <div className="my-auto hidden [@media(min-width:850px)]:block">
// //           <div className="flex gap-3 text-[12px] xl:gap-8 lg:text-[16px] font-semibold mb-1.5">
// //             {pages}
// //           </div>
// //         </div>

// //         <div className="[@media(min-width:850px)]:hidden my-auto">
// //           <h1 className="my-auto font-bold hidden sm:block text-3xl ">
// //             𝙺𝚊𝚌𝚑𝚊Price
// //           </h1>
// //         </div>

// //         <div className="flex flex-row gap-3 items-center mb-1">
// //           {/* <div className="hidden [@media(min-width:850px)]:block my-1">
// //             <select
// //               value={currentTheme}
// //               onChange={(e) => changeTheme(e.target.value)}
// //               className="select select-bordered rounded-full border-e-2 border-black"
// //             >
// //               <option value="light">🌞</option>
// //               <option value="dark">🌙</option>
// //               <option value="forest">🌲</option>
// //               <option value="aqua">💧</option>
// //               <option value="luxury">💎</option>
// //               <option value="coffee">☕</option>
// //             </select>
// //           </div> */}

// //           {loading ? (
// //             <span className="loading h-[50px] w-[40px] loading-ring my-auto"></span>
// //           ) : user ? (
// //             <div className="dropdown dropdown-end">
// //               <div tabIndex={0} role="button">
// //                 <img
// //                   className="h-10 my-auto rounded-full"
// //                   src={user?.photoURL}
// //                   alt=""
// //                   referrerPolicy="no-referrer"
// //                 />
// //               </div>
// //               <ul
// //                 tabIndex={0}
// //                 className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm mt-3 border-2"
// //               >
// //                 <li className="font-bold mb-5 text-center mt-3">
// //                   {user?.displayName || "User"}
// //                 </li>
// //                 <button
// //                   onClick={() => {
// //                     Swal.fire({
// //                       title: "Are you sure You Want To Logout?",
// //                       text: "You won’t be able to revert this!",
// //                       icon: "warning",
// //                       showCancelButton: true,
// //                       confirmButtonColor: "#d33",
// //                       cancelButtonColor: "#3085d6",
// //                       confirmButtonText: "Yes, Logout",
// //                     }).then((result) => {
// //                       if (result.isConfirmed) {
// //                         logOut();
// //                         Swal.fire({
// //                           title: "Logged Out!",
// //                           text: "Successfully Logged Out.",
// //                           icon: "success",
// //                           showConfirmButton: true,
// //                         });
// //                       }
// //                     });
// //                   }}
// //                   className="btnnnnn"
// //                 >
// //                   Logout
// //                 </button>
// //               </ul>
// //             </div>
// //           ) : (
// //             <div className="space-x-3 hidden [@media(min-width:850px)]:block pb-1">
// //               {button}
// //             </div>
// //           )}

// //           <div className="[@media(min-width:850px)]:hidden my-auto">
// //             <div className="dropdown dropdown-end">
// //               <div tabIndex={0} role="button" className="m-1">
// //                 <HiMenuAlt3 size={35} className="mt-1.5" />
// //               </div>
// //               <ul
// //                 tabIndex={0}
// //                 className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm border-2 mt-3"
// //               >
// //                 <div className="flex flex-col font-semibold space-y-1">
// //                   {pages}

// //                   {/* <div className="mt-4">
// //                     <label className="text-sm font-semibold mb-1 block">
// //                       Theme:
// //                     </label>
// //                     <select
// //                       value={currentTheme}
// //                       onChange={(e) => changeTheme(e.target.value)}
// //                       className="select select-bordered w-full max-w-xs"
// //                     >
// //                       <option value="light">🌞 Light</option>
// //                       <option value="dark">🌙 Dark</option>
// //                       <option value="forest">🌲 Forest</option>
// //                       <option value="aqua">💧 Aqua</option>
// //                       <option value="luxury">💎 Luxury</option>
// //                       <option value="coffee">☕ Coffee</option>
// //                     </select>
// //                   </div> */}

// //                   {user ? (
// //                     <div className="w-full">
// //                       <hr className="mb-2 mt-4" />
// //                       <button
// //                         onClick={() => {
// //                           Swal.fire({
// //                             title: "Are you sure You Want To Logout?",
// //                             text: "You won’t be able to revert this!",
// //                             icon: "warning",
// //                             showCancelButton: true,
// //                             confirmButtonColor: "#d33",
// //                             cancelButtonColor: "#3085d6",
// //                             confirmButtonText: "Yes, Logout",
// //                           }).then((result) => {
// //                             if (result.isConfirmed) {
// //                               logOut();
// //                               Swal.fire({
// //                                 title: "Logged Out!",
// //                                 text: "Successfully Logged Out.",
// //                                 icon: "success",
// //                                 showConfirmButton: true,
// //                               });
// //                             }
// //                           });
// //                         }}
// //                         className="btnnnnn w-full"
// //                       >
// //                         Logout
// //                       </button>
// //                     </div>
// //                   ) : (
// //                     <div className="w-full">
// //                       <hr className="mt-2" />
// //                       <div className="  mt-5 flex justify-between">
// //                         {button}
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               </ul>
// //             </div>
// //           </div>
// //         </div>
// //       </nav>
// //     </div>
// //   );
// // };

// // export default NavBAr;

// import React, {useContext, useState, useEffect} from "react";
// import {Link, NavLink, useNavigate} from "react-router";
// import {HiMenuAlt3, HiX} from "react-icons/hi";
// import {AuthContext} from "../ContextFiles/AuthContext";
// import {signOut} from "firebase/auth";
// import {Auth} from "../FirebaseAuth/FirebaseAuth";
// import Swal from "sweetalert2";
// import UserRoleCheck from "../RoleCheck/UserRoleCheck";
// import { motion, AnimatePresence } from "framer-motion";

// // --- Reusable Sidebar Component ---
// const Sidebar = ({ isOpen, setIsOpen, pages, user, handleLogout, button }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             className="fixed inset-0 bg-black/50 z-50 lg:hidden"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setIsOpen(false)}
//           />
//           <motion.div
//             className="fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 flex flex-col p-6"
//             initial={{ x: "-100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "-100%" }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           >
//             <div className="flex justify-between items-center mb-8">
//                <img
//                   className="h-12 w-20"
//                   src="https://i.ibb.co/rGgpvbhM/Screenshot-2025-07-21-at-4-48-07-PM-removebg-preview.png"
//                   alt="Logo"
//                 />
//               <button onClick={() => setIsOpen(false)} className="text-2xl text-slate-600 hover:text-slate-900">
//                 <HiX />
//               </button>
//             </div>
//             <div className="flex flex-col gap-4 text-lg">
//               {pages}
//             </div>
//             <div className="mt-auto pt-6 border-t">
//               {user ? (
//                  <button onClick={handleLogout} className="btnnnnn w-full">Logout</button>
//               ) : (
//                 <div className="flex flex-col gap-3">{button}</div>
//               )}
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// const NavBAr = () => {
//   const {role, roleloading} = UserRoleCheck();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   console.log(role);

//   // const [currentTheme, setCurrentTheme] = useState("light");

//   // useEffect(() => {
//   //   const saved = localStorage.getItem("theme") || "light";
//   //   document.documentElement.setAttribute("data-theme", saved);
//   //   setCurrentTheme(saved);
//   // }, []);

//   // const changeTheme = (theme) => {
//   //   document.documentElement.setAttribute("data-theme", theme);
//   //   localStorage.setItem("theme", theme);
//   //   setCurrentTheme(theme);
//   // };

//   const {user, loading} = useContext(AuthContext);
//   const navigate = useNavigate();

//   const logOut = () => {
//     navigate("/");
//     signOut(Auth)
//       .then(() => {
//         localStorage.removeItem("accessToken");
//       })
//       .catch((error) => {
//         console.error("Logout failed:", error);
//       });
//   };

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Are you sure You Want To Logout?",
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
//           text: "Successfully Logged Out.",
//           icon: "success",
//           showConfirmButton: true,
//         });
//       }
//     });
//   };

//   const pages = (
//     <>
//       {[
//         ...(!roleloading && (role === "user" || role === "guest" || !role)
//           ? [
//               {path: "/", name: "Home"},
//               {path: "/allproduct", name: "All Product"},
//               {path: "/beAVendor", name: "Be A Vendor"},
//               {path: "/dashboard", name: "Dashboard"},
//             ]
//           : []),

//         ...(!roleloading && role === "vendor"
//           ? [
//               {path: "/dashboard/vendorAddProduct", name: "Add Product"},
//               {path: "/dashboard/vendorMyProduct", name: "My Product"},
//               {path: "/dashboard/vendorAdvertisement", name: "Add Advertisement"},
//               {path: "/dashboard", name: "Dashboard"},
//             ]
//           : []),

//         ...(!roleloading && role === "admin"
//           ? [
//               {path: "/dashboard/allUsers", name: "All Users"},
//               {path: "/dashboard/allProducts", name: "All Product"},
//               {path: "/dashboard", name: "Dashboard"},
//             ]
//           : []),
//       ].map(({path, name}) => (
//         <NavLink
//           key={path + name}
//           to={path}
//           onClick={() => setIsSidebarOpen(false)}
//           className="relative px-2 py-1 font-semibold text-black overflow-hidden"
//         >
//           {({isActive}) => (
//             <>
//               <span
//                 className={`absolute inset-0 bg-green-600 z-0 transition-transform duration-500 ease-in-out ${
//                   isActive ? "scale-x-100" : "scale-x-0"
//                 } origin-left rounded-lg`}
//               />
//               <span
//                 className={`relative z-10 ${
//                   isActive ? "text-white" : "text-black"
//                 }`}
//               >
//                 {name}
//               </span>
//             </>
//           )}
//         </NavLink>
//       ))}
//     </>
//   );

//   const button = (
//     <>
//       <Link to="/login">
//         <button className="btn-primary !p-0 !px-4 !rounded-lg w-full text-center">Login</button>
//       </Link>
//       <Link to="/register">
//         <button className="btn-primary !p-0 !px-4 !rounded-lg w-full text-center">Register</button>
//       </Link>
//     </>
//   );

//   return (
//     <>
//       <div className="sticky top-0 z-40 backdrop-blur-sm bg-green-600/30">
//         <nav className="flex flex-row justify-between pt-1 px-[2%] lg:px-[5%] border-b">
//           <div className="flex justify-between gap-2 mb-1">
//             <div className="flex justify-center items-center">
//               <img
//                 className="h-12 w-20 text-black"
//                 src="https://i.ibb.co/rGgpvbhM/Screenshot-2025-07-21-at-4-48-07-PM-removebg-preview.png"
//                 alt="Logo"
//               />
//             </div>
//           </div>

//           <div className="my-auto hidden lg:flex">
//             <div className="flex gap-3 text-[12px] xl:gap-8 lg:text-[16px] font-semibold mb-1.5">
//               {pages}
//             </div>
//           </div>

//           <div className="lg:hidden my-auto">
//             <h1 className="my-auto font-bold hidden sm:block text-3xl ">
//               𝙺𝚊𝚌𝚑𝚊Price
//             </h1>
//           </div>

//           <div className="flex flex-row gap-3 items-center mb-1">
//             {loading ? (
//               <span className="loading h-[50px] w-[40px] loading-ring my-auto"></span>
//             ) : user ? (
//               <div className="dropdown dropdown-end">
//                 <div tabIndex={0} role="button">
//                   <img
//                     className="h-10 my-auto rounded-full"
//                     src={user?.photoURL}
//                     alt=""
//                     referrerPolicy="no-referrer"
//                   />
//                 </div>
//                 <ul
//                   tabIndex={0}
//                   className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm mt-3 border-2"
//                 >
//                   <li className="font-bold mb-5 text-center mt-3">
//                     {user?.displayName || "User"}
//                   </li>
//                   <button
//                     onClick={handleLogout}
//                     className="btnnnnn"
//                   >
//                     Logout
//                   </button>
//                 </ul>
//               </div>
//             ) : (
//               <div className="space-x-3 hidden lg:flex pb-1">
//                 {button}
//               </div>
//             )}

//             <div className="lg:hidden my-auto">
//               <button onClick={() => setIsSidebarOpen(true)} className="m-1">
//                   <HiMenuAlt3 size={35} className="mt-1.5" />
//               </button>
//             </div>
//           </div>
//         </nav>
//       </div>
//       <Sidebar
//         isOpen={isSidebarOpen}
//         setIsOpen={setIsSidebarOpen}
//         pages={pages}
//         user={user}
//         handleLogout={handleLogout}
//         button={button}
//       />
//     </>
//   );
// };

// export default NavBAr;

import React, {useContext, useState, useEffect} from "react";
import {Link, NavLink, useNavigate} from "react-router";
import {HiMenuAlt3, HiX} from "react-icons/hi";
import {AuthContext} from "../ContextFiles/AuthContext";
import {signOut} from "firebase/auth";
import {Auth} from "../FirebaseAuth/FirebaseAuth";
import Swal from "sweetalert2";
import UserRoleCheck from "../RoleCheck/UserRoleCheck";
import {motion, AnimatePresence} from "framer-motion";

// --- Reusable Sidebar Component ---
const Sidebar = ({isOpen, setIsOpen, pages, user, handleLogout, button}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 flex flex-col p-6 pt-0"
            initial={{x: "100%"}}
            animate={{x: 0}}
            exit={{x: "100%"}}
            transition={{type: "spring", stiffness: 300, damping: 30}}
          >
            <div className="flex justify-between items-center mb-8  border-b-2 pb-2">
              <img
                className="h-12 w-20"
                src="https://i.ibb.co/rGgpvbhM/Screenshot-2025-07-21-at-4-48-07-PM-removebg-preview.png"
                alt="Logo"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl text-slate-600 hover:text-slate-900"
              >
                <HiX size={35} />
              </button>
            </div>

            <div className="flex flex-col gap-4 text-lg ">{pages}</div>
            <div className="mt-auto pt-6 border-t">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="btn bg-red-500 rounded-lg text-white font-bold text-lg w-full"
                >
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-3">{button}</div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const NavBAr = () => {
  const {role, roleLoading} = UserRoleCheck();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  console.log(role);

  // const [currentTheme, setCurrentTheme] = useState("light");

  // useEffect(() => {
  //   const saved = localStorage.getItem("theme") || "light";
  //   document.documentElement.setAttribute("data-theme", saved);
  //   setCurrentTheme(saved);
  // }, []);

  // const changeTheme = (theme) => {
  //   document.documentElement.setAttribute("data-theme", theme);
  //   localStorage.setItem("theme", theme);
  //   setCurrentTheme(theme);
  // };

  const {user, loading} = useContext(AuthContext);
  const navigate = useNavigate();

  const logOut = () => {
    navigate("/");
    signOut(Auth)
      .then(() => {
        localStorage.removeItem("accessToken");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure You Want To Logout?",
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
          text: "Successfully Logged Out.",
          icon: "success",
          showConfirmButton: true,
        });
      }
    });
  };

  const pages = (
    <>
      {[
        ...(!roleLoading && (role === "user" || role === "guest" || !role)
          ? [
              {path: "/", name: "Home"},
              {path: "/allproduct", name: "All Product"},
              {path: "/beAVendor", name: "Be A Vendor"},
              {path: "/dashboard", name: "Dashboard"},
            ]
          : []),

        ...(!roleLoading && role === "vendor"
          ? [
              {path: "/vendorAddProduct", name: "Add Product"},
              {path: "/vendorMyProduct", name: "My Product"},
              {path: "/vendorAdvertisement", name: "Add Advertisement"},
              {path: "/dashboard", name: "Dashboard"},
            ]
          : []),

        ...(!roleLoading && role === "admin"
          ? [
              {path: "/allUsers", name: "All Users"},
              {path: "/allProducts", name: "All Product"},
              {path: "/dashboard", name: "Dashboard"},
            ]
          : []),
      ].map(({path, name}) => (
        <NavLink
          key={path + name}
          to={path}
          onClick={() => setIsSidebarOpen(false)}
          className="relative px-2 py-1 font-semibold text-black overflow-hidden"
        >
          {({isActive}) => (
            <>
              <span
                className={`absolute inset-0 border-b-4 border-l-2 border-r-5 border-t-1 bg-gradient-to-br from-green-500 to-emerald-600 border-green-950 z-0 transition-transform duration-500 ease-in-out ${
                  isActive ? "scale-x-100  " : "scale-x-0"
                } origin-left rounded-lg`}
              />
              <span
                className={`relative z-10 ${
                  isActive ? "text-white  " : "text-black"
                }`}
              >
                {name}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </>
  );

  const button = (
    <>
      <Link to="/login">
        <button className="btn-primary  !p-0 !px-4 !rounded-lg w-full text-center">
          Login
        </button>
      </Link>
      <Link to="/register">
        <button className="btn-primary !p-0 !px-4 !rounded-lg w-full text-center">
          Register
        </button>
      </Link>
    </>
  );

  return (
    <>
      <div className="sticky top-0 z-40 backdrop-blur-sm bg-gradient-to-br from-green-500 to-emerald-600">
        <nav className="flex flex-row justify-between pt-1 px-[2%] lg:px-[5%] border-b">
          <div className="flex justify-between gap-2 mb-1">
            <div className="flex justify-center items-center">
              <img
                className="h-12 w-20 text-black"
                src="https://i.ibb.co/rGgpvbhM/Screenshot-2025-07-21-at-4-48-07-PM-removebg-preview.png"
                alt="Logo"
              />
            </div>
          </div>

          <div className="my-auto hidden lg:flex">
            <div className="flex gap-3  xl:gap-8  font-semibold mb-1.5">
              {pages}
            </div>
          </div>

          <div className="lg:hidden my-auto">
            <h1 className="my-auto font-bold hidden sm:block text-3xl ">
              𝙺𝚊𝚌𝚑𝚊Price
            </h1>
          </div>

          <div className="flex flex-row gap-3 items-center mb-1">
            {loading ? (
              <span className="loading h-[50px] w-[40px] loading-ring my-auto"></span>
            ) : user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button">
                  <img
                    className="h-10 my-auto rounded-full"
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/pjWdS54Z/1-spider-man-no-way-home-poster.webp"
                    }
                    alt={user?.displayName || "User"}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu backdrop-blur-2xl bg-white/92 rounded-sm rounded-box z-1 w-52 p-2 shadow-sm mt-3 border-2"
                >
                  <li className="font-bold mb-5 text-center mt-3 text-xl">
                    {user?.displayName || "User"}
                  </li>
                  <button
                    onClick={handleLogout}
                    className="btn bg-red-500   rounded-lg text-white font-bold text-lg w-full"
                  >
                    Logout
                  </button>
                </ul>
              </div>
            ) : (
              <div className="space-x-3 hidden lg:flex  ">{button}</div>
            )}

            <div className="lg:hidden my-auto">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="m-1 relative w-8 h-8 flex items-center justify-center"
              >
                <AnimatePresence initial={false} mode="wait">
                  {isSidebarOpen ? (
                    <motion.div
                      key="close"
                      initial={{rotate: 90, opacity: 0}}
                      animate={{rotate: 0, opacity: 1}}
                      exit={{rotate: -90, opacity: 0}}
                      transition={{duration: 0.2}}
                    >
                      <HiX size={35} className="mt-1.5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="open"
                      initial={{rotate: -90, opacity: 0}}
                      animate={{rotate: 0, opacity: 1}}
                      exit={{rotate: 90, opacity: 0}}
                      transition={{duration: 0.2}}
                    >
                      <HiMenuAlt3 size={35} className="mt-1.5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>
      </div>
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        pages={pages}
        user={user}
        handleLogout={handleLogout}
        button={button}
      />
    </>
  );
};

export default NavBAr;
