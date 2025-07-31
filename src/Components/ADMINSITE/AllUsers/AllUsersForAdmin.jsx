import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {AuthContext} from "../../ContextFiles/AuthContext";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {motion, AnimatePresence} from "framer-motion";

import {
  FaUserShield,
  FaUser,
  FaUserTie,
  FaUsers,
  FaSearch,
} from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API;

const fetchUsers = async (accessToken, searchText) => {
  const {data} = await axios.get(`${BASE_URL}/allUser`, {
    headers: {Authorization: `Bearer ${accessToken}`},
    params: {search: searchText},
  });
  return Array.isArray(data) ? data : [];
};

const UserRowSkeleton = () => (
  <tr className="animate-pulse">
    <td className="p-4">
      <div className="h-10 w-10 bg-slate-200 rounded-full"></div>
    </td>
    <td className="p-4">
      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
    </td>
    <td className="p-4">
      <div className="h-4 bg-slate-200 rounded w-full"></div>
    </td>
    <td className="p-4">
      <div className="h-6 bg-slate-200 rounded-full w-20"></div>
    </td>
    <td className="p-4">
      <div className="h-9 bg-slate-200 rounded-lg w-28"></div>
    </td>
    <td className="p-4">
      <div className="h-9 bg-slate-200 rounded-lg w-28"></div>
    </td>
  </tr>
);

const UserRow = ({user, index, onMakeAdmin, onMakeVendor}) => {
  const roleIcons = {
    admin: <FaUserShield className="text-red-500" />,
    vendor: <FaUserTie className="text-blue-500" />,
    user: <FaUser className="text-slate-500" />,
  };

  return (
    <motion.tr
      className="hover:bg-slate-50/50 transition-colors duration-200"
      variants={{
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0},
      }}
      initial="hidden"
      animate="visible"
      transition={{delay: index * 0.05}}
    >
      <td className="p-4 align-middle">
        <img
          src={
            user.photoURL ||
            `https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`
          }
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      </td>

      <td className="p-4 align-middle font-bold text-slate-800 break-words">
        {user.name || "N/A"}
      </td>

      <td className="p-4 align-middle text-slate-600 break-words">
        {user.email}
      </td>
      <td className="p-4 align-middle">
        <span className="flex items-center gap-2 capitalize">
          {roleIcons[user.role] || roleIcons.user}
          {user.role || "user"}
        </span>
      </td>
      <td className="p-4 align-middle">
        {user.vendorRequest ? (
          <motion.button
            onClick={() => onMakeVendor(user._id)}
            className="bg-green-600 text-black mx-auto justify-center text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-green-700 transition-all flex items-center gap-1.5 shadow-sm hover:shadow-md"
            whileHover={{scale: 1.05, y: -1}}
            whileTap={{scale: 0.95}}
          >
            Approve Vendor
          </motion.button>
        ) : (
          <div className=" text-black bg-green-100 text-sm font-semibold px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5">
            No
          </div>
        )}
      </td>
      <td className="p-4 align-middle ">
        {user.role !== "admin" ? (
          <motion.button
            onClick={() => onMakeAdmin(user._id)}
            className="bg-slate-200 text-slate-800 w-full text-center justify-center mx-auto text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-300 transition-all flex items-center gap-1.5"
            whileHover={{scale: 1.05, y: -1}}
            whileTap={{scale: 0.95}}
          >
            Make Admin
          </motion.button>
        ) : (
          <div className="bg-green-100 w-full text-black text-sm font-semibold px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5">
            Already Admin
          </div>
        )}
      </td>
    </motion.tr>
  );
};

const AllUsersForAdmin = () => {
  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }, []);

  const {accessToken, loading: authLoading} = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading: usersLoading,
    error,
  } = useQuery({
    queryKey: ["allUsers", searchText],
    queryFn: () => fetchUsers(accessToken, searchText),
    enabled: !!accessToken,
  });

  const isLoading = authLoading || usersLoading;

  const handleMakeAdmin = async (userId) => {
    const confirmResult = await Swal.fire({
      title: "Make this user an Admin?",
      text: "This will grant them administrative privileges.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    });

    if (confirmResult.isConfirmed) {
      try {
        const res = await axios.put(
          `${BASE_URL}/user/admin/${userId}`,
          {},
          {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        if (res.data.success) {
          Swal.fire("Success!", "User has been promoted to Admin.", "success");
          queryClient.invalidateQueries({queryKey: ["allUsers", searchText]});
        } else {
          Swal.fire(
            "Failed",
            res.data.message || "Could not update user.",
            "error"
          );
        }
      } catch (err) {
        console.error("Error making admin:", err);
        Swal.fire(
          "Error",
          "Something went wrong. Ensure the backend route exists.",
          "error"
        );
      }
    }
  };

  const handleMakeVendor = async (userId) => {
    const confirmResult = await Swal.fire({
      title: "Make this user a Vendor?",
      text: "This will approve their vendor request.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make vendor!",
    });

    if (confirmResult.isConfirmed) {
      try {
        const res = await axios.put(
          `${BASE_URL}/user/vendor/${userId}`,
          {},
          {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        if (res.data.success) {
          Swal.fire("Success!", "User has been promoted to Vendor.", "success");
          queryClient.invalidateQueries({queryKey: ["allUsers", searchText]});
        } else {
          Swal.fire(
            "Failed",
            res.data.message || "Could not update user.",
            "error"
          );
        }
      } catch (err) {
        console.error("Error making vendor:", err);
        Swal.fire(
          "Error",
          "Something went wrong. Ensure the backend route exists.",
          "error"
        );
      }
    }
  };

  return (
    <div className="min-h-screen pt-0 my-16 p-4 sm:p-6 lg:p-8">
      <motion.div
        className="text-center mb-12"
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">
          User Management
        </h1>
        <p className="text-lg text-slate-500 mt-2">
          View and manage all users on the platform.
        </p>
      </motion.div>

      <div className="relative mb-6 max-w-md mx-auto">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FaSearch className="text-slate-400" />
        </span>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Avatar
                </th>
                <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Vendor Request
                </th>
                <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Make Admin
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                Array.from({length: 5}).map((_, i) => (
                  <UserRowSkeleton key={i} />
                ))
              ) : (
                <AnimatePresence>
                  {users.map((user, idx) => (
                    <UserRow
                      key={user._id}
                      user={user}
                      index={idx}
                      onMakeAdmin={handleMakeAdmin}
                      onMakeVendor={handleMakeVendor}
                    />
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>

        {!isLoading && error && (
          <div className="text-red-500 p-4 text-center">
            {error.message || "Failed to load users."}
          </div>
        )}
  
        {!isLoading && !error && users.length === 0 && (
          <div className="text-center py-16 px-6">
            <FaUsers className="mx-auto text-5xl text-slate-400 mb-4" />
            <h3 className="text-2xl font-semibold text-slate-700">
              No Users Found
            </h3>
            <p className="text-slate-500 mt-2">
              There are no users matching your search.
            </p>
          </div> 
        )}
      </div>
    </div>
  );
};

export default AllUsersForAdmin;
