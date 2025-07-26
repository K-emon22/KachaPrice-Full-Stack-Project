

// import React, {useContext, useState} from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import {AuthContext} from "../../ContextFiles/AuthContext";
// import {useQuery, useQueryClient} from "@tanstack/react-query";
// import {motion, AnimatePresence} from "framer-motion";
// import {
//   FaCheckCircle,
//   FaTimesCircle,
//   FaTrash,
//   FaClock,
//   FaBullhorn,
// } from "react-icons/fa";

// const BASE_URL = import.meta.env.VITE_API;

// // --- Data Fetching Function for React Query ---
// const fetchAllAdvertisements = async (accessToken) => {
//   const {data} = await axios.get(`${BASE_URL}/all/advertisements`, {
//     headers: {Authorization: `Bearer ${accessToken}`},
//   });
//   return Array.isArray(data) ? data : [];
// };

// // --- Reusable Components ---
// const StatusBadge = ({status}) => {
//   const styles = {
//     pending: {
//       icon: <FaClock />,
//       text: "Pending",
//       className: "bg-yellow-100 text-yellow-800",
//     },
//     approved: {
//       icon: <FaCheckCircle />,
//       text: "Approved",
//       className: "bg-green-100 text-green-800",
//     },
//     rejected: {
//       icon: <FaTimesCircle />,
//       text: "Rejected",
//       className: "bg-red-100 text-red-800",
//     },
//   };
//   const current = styles[status] || styles.pending;
//   return (
//     <div
//       className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full ${current.className}`}
//     >
//       {current.icon}
//       <span>{current.text}</span>
//     </div>
//   );
// };

// const AdRowSkeleton = () => (
//   <tr className="animate-pulse">
//     <td className="p-4">
//       <div className="w-28 h-20 bg-slate-200 rounded-lg"></div>
//     </td>
//     <td className="p-4">
//       <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
//       <div className="h-3 bg-slate-200 rounded w-full"></div>
//       <div className="h-3 bg-slate-200 rounded w-5/6 mt-1"></div>
//     </td>
//     <td className="p-4">
//       <div className="h-4 bg-slate-200 rounded w-full"></div>
//     </td>
//     <td className="p-4">
//       <div className="h-6 bg-slate-200 rounded-full w-24"></div>
//     </td>
//     <td className="p-4">
//       <div className="flex gap-2">
//         <div className="h-9 bg-slate-200 rounded-lg w-24"></div>
//         <div className="h-9 bg-slate-200 rounded-lg w-24"></div>
//       </div>
//     </td>
//   </tr>
// );

// const AdRow = ({ad, index, onStatusChange, onDelete}) => (
//   <motion.tr
//     className="hover:bg-slate-50/50 transition-colors duration-200"
//     variants={{hidden: {opacity: 0, y: 20}, visible: {opacity: 1, y: 0}}}
//     initial="hidden"
//     animate="visible"
//     exit={{opacity: 0, x: -50}}
//     transition={{delay: index * 0.05}}
//   >
//     <td className="p-4 align-middle">
//       <img
//         src={
//           ad.image || "https://placehold.co/120x80/e2e8f0/64748b?text=No+Image"
//         }
//         alt={ad.title}
//         className="w-28 h-20 object-cover rounded-lg shadow-sm"
//       />
//     </td>
//     <td className="p-4 align-top">
//         <p className="font-bold text-slate-800">{ad.title}</p>
//         <div className="max-h-16 overflow-y-auto mt-1 pr-2 scrollbar-thin scrollbar-thumb-slate-200">
//             <p className="text-xs text-slate-500">{ad.description}</p>
//         </div>
//     </td>
//     <td className="p-4 align-middle text-slate-600">
//       {ad.vendorName}
//       <br />
//       <span className="text-xs text-slate-400">{ad.vendorEmail}</span>
//     </td>
//     <td className="p-4 align-middle">
//       <StatusBadge status={ad.status} />
//     </td>
//     <td className="p-4 align-middle">
//       <div className="flex items-center gap-2">
//         {ad.status === "pending" && (
//           <>
//             <motion.button
//               onClick={() => onStatusChange(ad._id, "approved")}
//               className="font-semibold text-sm text-green-600 flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-green-100"
//               whileHover={{scale: 1.05}}
//               whileTap={{scale: 0.95}}
//             >
//               <FaCheckCircle /> Approve
//             </motion.button>
//             <motion.button
//               onClick={() => onStatusChange(ad._id, "rejected")}
//               className="font-semibold text-sm text-orange-600 flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-orange-100"
//               whileHover={{scale: 1.05}}
//               whileTap={{scale: 0.95}}
//             >
//               <FaTimesCircle /> Reject
//             </motion.button>
//           </>
//         )}
//         <motion.button
//           onClick={() => onDelete(ad._id)}
//           className="font-semibold text-sm text-red-600 flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-red-100"
//           whileHover={{scale: 1.05}}
//           whileTap={{scale: 0.95}}
//         >
//           <FaTrash /> Delete
//         </motion.button>
//       </div>
//     </td>
//   </motion.tr>
// );

// const AllAdvertisementForAdmin = () => {
//   const {accessToken, loading: authLoading} = useContext(AuthContext);
//   const queryClient = useQueryClient();

//   const {
//     data: ads = [],
//     isLoading: adsLoading,
//     error,
//   } = useQuery({
//     queryKey: ["allAdvertisementsAdmin"],
//     queryFn: () => fetchAllAdvertisements(accessToken),
//     enabled: !!accessToken,
//   });

//   const isLoading = authLoading || adsLoading;

//   const handleStatusChange = async (id, status) => {
//     const confirmResult = await Swal.fire({
//       title: `Are you sure you want to ${status}?`,
//       icon: status === "approved" ? "success" : "warning",
//       showCancelButton: true,
//       confirmButtonColor: status === "approved" ? "#3085d6" : "#d33",
//       confirmButtonText: `Yes, ${status} it!`,
//     });

//     if (confirmResult.isConfirmed) {
//       try {
//         await axios.patch(
//           `${BASE_URL}/advertisements/${id}`,
//           {status},
//           {headers: {Authorization: `Bearer ${accessToken}`}}
//         );
//         queryClient.invalidateQueries({queryKey: ["allAdvertisementsAdmin"]});
//         Swal.fire("Success", `Advertisement has been ${status}!`, "success");
//       } catch (err) {
//         Swal.fire("Error", "Failed to update status", "error");
//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmResult = await Swal.fire({
//       title: "Are you sure?",
//       text: "This will delete the advertisement permanently.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirmResult.isConfirmed) {
//       try {
//         await axios.delete(`${BASE_URL}/advertisements/${id}`, {
//           headers: {Authorization: `Bearer ${accessToken}`},
//         });
//         queryClient.invalidateQueries({queryKey: ["allAdvertisementsAdmin"]});
//         Swal.fire("Deleted!", "Advertisement has been deleted.", "success");
//       } catch (err) {
//         Swal.fire("Error", "Failed to delete advertisement", "error");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen pt-0 my-16 p-4 sm:p-6 lg:p-8">
//       <motion.div
//         className="text-center mb-12"
//         initial={{opacity: 0, y: -20}}
//         animate={{opacity: 1, y: 0}}
//       >
//         <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">
//           Advertisement Management
//         </h1>
//         <p className="text-lg text-slate-500 mt-2">
//           Approve, reject, or remove vendor advertisements.
//         </p>
//       </motion.div>

//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead className="bg-slate-100">
//               <tr>
//                 <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-[15%]">
//                   Banner
//                 </th>
//                 <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-[30%]">
//                   Title & Description
//                 </th>
//                 <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-[20%]">
//                   Vendor
//                 </th>
//                 <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-[15%]">
//                   Status
//                 </th>
//                 <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-[20%]">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {isLoading ? (
//                 Array.from({length: 5}).map((_, i) => <AdRowSkeleton key={i} />)
//               ) : (
//                 <AnimatePresence>
//                   {ads.map((ad, idx) => (
//                     <AdRow
//                       key={ad._id}
//                       ad={ad}
//                       index={idx}
//                       onStatusChange={handleStatusChange}
//                       onDelete={handleDelete}
//                     />
//                   ))}
//                 </AnimatePresence>
//               )}
//             </tbody>
//           </table>
//         </div>
//         {!isLoading && error && (
//           <div className="text-red-500 p-4 text-center">
//             {error.message || "Failed to load advertisements."}
//           </div>
//         )}
//         {!isLoading && !error && ads.length === 0 && (
//           <div className="text-center py-16 px-6">
//             <FaBullhorn className="mx-auto text-5xl text-slate-400 mb-4" />
//             <h3 className="text-2xl font-semibold text-slate-700">
//               No Advertisements Found
//             </h3>
//             <p className="text-slate-500 mt-2">
//               There are currently no advertisements to manage.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllAdvertisementForAdmin;



import React, {useContext, useState, useEffect, useRef} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {AuthContext} from "../../ContextFiles/AuthContext";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {motion, AnimatePresence} from "framer-motion";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaTrash,
  FaClock,
  FaBullhorn,
  FaEllipsisV,
} from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API;

// --- Data Fetching Function for React Query ---
const fetchAllAdvertisements = async (accessToken) => {
  const {data} = await axios.get(`${BASE_URL}/all/advertisements`, {
    headers: {Authorization: `Bearer ${accessToken}`},
  });
  return Array.isArray(data) ? data : [];
};

// --- Reusable Components ---
const StatusBadge = ({status}) => {
  const styles = {
    pending: {
      icon: <FaClock />,
      text: "Pending",
      className: "bg-yellow-100 text-yellow-800",
    },
    approved: {
      icon: <FaCheckCircle />,
      text: "Approved",
      className: "bg-green-100 text-green-800",
    },
    rejected: {
      icon: <FaTimesCircle />,
      text: "Rejected",
      className: "bg-red-100 text-red-800",
    },
  };
  const current = styles[status] || styles.pending;
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full ${current.className}`}
    >
      {current.icon}
      <span>{current.text}</span>
    </div>
  );
};

const AdRowSkeleton = () => (
  <tr className="animate-pulse">
    <td className="p-4">
      <div className="w-28 h-20 bg-slate-200 rounded-lg"></div>
    </td>
    <td className="p-4">
      <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-slate-200 rounded w-full"></div>
    </td>
    <td className="p-4">
      <div className="h-4 bg-slate-200 rounded w-full"></div>
    </td>
    <td className="p-4">
      <div className="h-6 bg-slate-200 rounded-full w-24"></div>
    </td>
    <td className="p-4 align-middle">
        <div className="flex justify-end">
            <div className="h-9 w-9 bg-slate-200 rounded-full"></div>
        </div>
    </td>
  </tr>
);

const AdRow = ({ad, index, onStatusChange, onDelete, isLast, totalItems}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getMenuConfig = () => {
        if (totalItems === 1) {
            return {
                positionClasses: "right-full mr-2 top-1/2 -translate-y-1/2",
                animation: {
                    initial: { opacity: 0, x: 10 },
                    animate: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: 10 },
                },
            };
        }
        return {
            positionClasses: isLast ? "bottom-full mb-2 right-0" : "top-full mt-2 right-0",
            animation: {
                initial: { opacity: 0, y: isLast ? 10 : -10 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: isLast ? 10 : -10 },
            },
        };
    };

    const { positionClasses, animation } = getMenuConfig();

    return (
        <motion.tr
            className="hover:bg-slate-50/50 transition-colors duration-200"
            variants={{hidden: {opacity: 0, y: 20}, visible: {opacity: 1, y: 0}}}
            initial="hidden"
            animate="visible"
            exit={{opacity: 0, x: -50}}
            transition={{delay: index * 0.05}}
        >
            <td className="p-4 align-middle">
                <img
                    src={ad.image || "https://placehold.co/120x80/e2e8f0/64748b?text=No+Image"}
                    alt={ad.title}
                    className="w-28 h-20 object-cover rounded-lg shadow-sm"
                />
            </td>
            <td className="p-4 align-top">
                <p className="font-bold text-slate-800">{ad.title}</p>
                <div className="max-h-16 overflow-y-auto mt-1 pr-2 scrollbar-thin scrollbar-thumb-slate-200">
                    <p className="text-xs text-slate-500">{ad.description}</p>
                </div>
            </td>
            <td className="p-4 align-middle text-slate-600">
                {ad.vendorName}
                <br />
                <span className="text-xs text-slate-400">{ad.vendorEmail}</span>
            </td>
            <td className="p-4 align-middle">
                <StatusBadge status={ad.status} />
            </td>
            <td className="p-4 align-middle">
                <div className="relative flex w-full justify-end" ref={menuRef}>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 rounded-full hover:bg-slate-200 transition-colors"
                    >
                        <FaEllipsisV className="text-slate-600" />
                    </button>
                    <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                className={`absolute w-40 bg-white rounded-lg shadow-xl border z-10 overflow-hidden ${positionClasses}`}
                                initial={animation.initial}
                                animate={animation.animate}
                                exit={animation.exit}
                                transition={{ duration: 0.15 }}
                            >
                                <ul className="p-1">
                                    {ad.status === "pending" && (
                                        <>
                                            <li>
                                                <button
                                                    onClick={() => {
                                                        onStatusChange(ad._id, "approved");
                                                        setMenuOpen(false);
                                                    }}
                                                    className="w-full text-left font-semibold text-sm text-green-600 flex items-center gap-2 px-3 py-2 hover:bg-green-50 rounded-md"
                                                >
                                                    <FaCheckCircle /> Approve
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => {
                                                        onStatusChange(ad._id, "rejected");
                                                        setMenuOpen(false);
                                                    }}
                                                    className="w-full text-left font-semibold text-sm text-orange-600 flex items-center gap-2 px-3 py-2 hover:bg-orange-50 rounded-md"
                                                >
                                                    <FaTimesCircle /> Reject
                                                </button>
                                            </li>
                                        </>
                                    )}
                                    <li>
                                        <button
                                            onClick={() => {
                                                onDelete(ad._id);
                                                setMenuOpen(false);
                                            }}
                                            className="w-full text-left font-semibold text-sm text-red-600 flex items-center gap-2 px-3 py-2 hover:bg-red-50 rounded-md"
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </td>
        </motion.tr>
    );
};

const AllAdvertisementForAdmin = () => {
  const {accessToken, loading: authLoading} = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {
    data: ads = [],
    isLoading: adsLoading,
    error,
  } = useQuery({
    queryKey: ["allAdvertisementsAdmin"],
    queryFn: () => fetchAllAdvertisements(accessToken),
    enabled: !!accessToken,
  });

  const isLoading = authLoading || adsLoading;

  const handleStatusChange = async (id, status) => {
    const confirmResult = await Swal.fire({
      title: `Are you sure you want to ${status}?`,
      icon: status === "approved" ? "success" : "warning",
      showCancelButton: true,
      confirmButtonColor: status === "approved" ? "#3085d6" : "#d33",
      confirmButtonText: `Yes, ${status} it!`,
    });

    if (confirmResult.isConfirmed) {
      try {
        await axios.patch(
          `${BASE_URL}/advertisements/${id}`,
          {status},
          {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        queryClient.invalidateQueries({queryKey: ["allAdvertisementsAdmin"]});
        Swal.fire("Success", `Advertisement has been ${status}!`, "success");
      } catch (err) {
        Swal.fire("Error", "Failed to update status", "error");
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the advertisement permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmResult.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/advertisements/${id}`, {
          headers: {Authorization: `Bearer ${accessToken}`},
        });
        queryClient.invalidateQueries({queryKey: ["allAdvertisementsAdmin"]});
        Swal.fire("Deleted!", "Advertisement has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to delete advertisement", "error");
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
          Advertisement Management
        </h1>
        <p className="text-lg text-slate-500 mt-2">
          Approve, reject, or remove vendor advertisements.
        </p>
      </motion.div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Banner
                </th>
                <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Title & Description
                </th>
                <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="p-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                Array.from({length: 5}).map((_, i) => <AdRowSkeleton key={i} />)
              ) : (
                <AnimatePresence>
                  {ads.map((ad, idx) => (
                    <AdRow
                      key={ad._id}
                      ad={ad}
                      index={idx}
                      onStatusChange={handleStatusChange}
                      onDelete={handleDelete}
                      isLast={idx === ads.length - 1}
                      totalItems={ads.length}
                    />
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
        {!isLoading && error && (
          <div className="text-red-500 p-4 text-center">
            {error.message || "Failed to load advertisements."}
          </div>
        )}
        {!isLoading && !error && ads.length === 0 && (
          <div className="text-center py-16 px-6">
            <FaBullhorn className="mx-auto text-5xl text-slate-400 mb-4" />
            <h3 className="text-2xl font-semibold text-slate-700">
              No Advertisements Found
            </h3>
            <p className="text-slate-500 mt-2">
              There are currently no advertisements to manage.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAdvertisementForAdmin;