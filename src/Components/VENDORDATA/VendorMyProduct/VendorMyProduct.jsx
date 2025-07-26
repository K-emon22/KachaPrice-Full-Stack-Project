import React, {useContext, useEffect, useState, useRef} from "react";
import {AuthContext} from "../../ContextFiles/AuthContext";
import axios from "axios";
import {motion, AnimatePresence} from "framer-motion";
import {
  FaStore,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaBoxOpen,
  FaTasks,
  FaClipboardCheck,
  FaEllipsisV,
} from "react-icons/fa";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {Link} from "react-router"; // CORRECTED import
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_API;

// --- Data Fetching ---
const fetchVendorProducts = async (email, accessToken) => {
  const {data} = await axios.get(
    `${BASE_URL}/allProduct/email?email=${email}`,
    {
      headers: {Authorization: `Bearer ${accessToken}`},
    }
  );
  return data;
};

// --- Reusable UI Components ---
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

// --- Table Row Components ---
const ProductTableRowSkeleton = () => (
  <tr className="animate-pulse">
    <td className="p-4 align-middle">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-slate-200 rounded-lg flex-shrink-0"></div>
        <div className="w-full">
          <div className="h-5 bg-slate-200 rounded w-48 mb-2"></div>
          <div className="h-3 bg-slate-200 rounded w-32"></div>
        </div>
      </div>
    </td>
    <td className="p-4 align-middle">
      <div className="h-5 bg-slate-200 rounded w-16"></div>
    </td>
    <td className="p-4 align-middle">
      <div className="h-8 bg-slate-200 rounded-full w-24"></div>
    </td>
    <td className="p-4 align-middle">
      <div className="flex justify-end">
        <div className="h-9 w-9 bg-slate-200 rounded-full"></div>
      </div>
    </td>
  </tr>
);

const ProductTableRow = ({product, index, onDelete, isLast, totalItems}) => {
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

  // NEW: Dynamic positioning and animation logic
  const getMenuConfig = () => {
    if (totalItems === 1) {
      return {
        positionClasses: "right-full mr-2 top-1/2 -translate-y-1/2",
        animation: {
          initial: {opacity: 0, x: 10},
          animate: {opacity: 1, x: 0},
          exit: {opacity: 0, x: 10},
        },
      };
    }
    return {
      positionClasses: isLast
        ? "bottom-full mb-2 right-0"
        : "top-full mt-2 right-0",
      animation: {
        initial: {opacity: 0, y: isLast ? 10 : -10},
        animate: {opacity: 1, y: 0},
        exit: {opacity: 0, y: isLast ? 10 : -10},
      },
    };
  };

  const {positionClasses, animation} = getMenuConfig();

  return (
    <motion.tr
      layout
      className="hover:bg-slate-50 transition-colors duration-200"
      variants={{
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0},
      }}
      initial="hidden"
      animate="visible"
      exit={{opacity: 0, x: -50, transition: {duration: 0.3}}}
      transition={{delay: index * 0.05}}
    >
      <td className="p-4 align-middle">
        <div className="flex items-center gap-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0 shadow-sm"
          />
          <div>
            <p className="font-bold text-slate-800">{product.name}</p>
            <p className="text-sm text-slate-500 flex items-center gap-1.5">
              <FaStore size={12} /> {product.market}
            </p>
          </div>
        </div>
      </td>
      <td className="p-4 align-middle font-semibold text-green-600">
        ৳{product.price}
      </td>
      <td className="p-4 align-middle">
        <StatusBadge status={product.status} />
      </td>
      <td className="p-4 align-middle">
        <div className="relative flex justify-end" ref={menuRef}>
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
              >
                <ul className="p-1">
                  <li>
                    <Link
                      to={`/product/${product._id}`}
                      className="w-full text-left font-semibold text-sm text-blue-600 flex items-center gap-2 px-3 py-2 hover:bg-blue-50 rounded-md"
                      onClick={() => setMenuOpen(false)}
                    >
                      <FaEye /> View
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/vendorEditProduct/${product._id}`}
                      className="w-full text-left font-semibold text-sm text-green-600 flex items-center gap-2 px-3 py-2 hover:bg-green-50 rounded-md"
                      onClick={() => setMenuOpen(false)}
                    >
                      <FaEdit /> Edit
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        onDelete(product._id);
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

// --- Main Component ---
const VendorMyProduct = () => {
  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }, []);

  const {user, accessToken, loading: authLoading} = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {data: products = [], isLoading: productsLoading} = useQuery({
    queryKey: ["vendorProducts", user?.email],
    queryFn: () => fetchVendorProducts(user.email, accessToken),
    enabled: !!user?.email && !!accessToken,
  });

  const isLoading = authLoading || productsLoading;

  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the product.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (confirmResult.isConfirmed) {
      Swal.fire({
        title: "Deleting...",
        text: "Please wait.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });
      try {
        await axios.delete(`${BASE_URL}/allProduct/${id}`, {
          headers: {Authorization: `Bearer ${accessToken}`},
        });
        await queryClient.invalidateQueries({
          queryKey: ["vendorProducts", user?.email],
        });
        Swal.fire("Deleted!", "Product deleted successfully.", "success");
      } catch (error) {
        console.error("Delete failed:", error);
        Swal.fire("Error", "Failed to delete product.", "error");
      }
    }
  };

  const productStats = {
    total: products.length,
    approved: products.filter((p) => p.status === "approved").length,
    pending: products.filter((p) => p.status === "pending").length,
  };

  return (
    <div className="min-h-screen pt-0 mt-16 p-4 sm:p-6 lg:p-8">
      {/* --- Header --- */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-center mb-8"
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
            My Product Listings
          </h1>
          <p className="mt-1 max-w-2xl text-md text-slate-500">
            Manage all the products you've added to the marketplace.
          </p>
        </div>
        {/* <Link to="/vendorAddProduct">
          <motion.button
            className="mt-4 w-full sm:w-auto sm:mt-0 bg-green-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 hover:shadow-xl"
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
          >
            <FaPlus /> Add New Product
          </motion.button>
        </Link> */}
        {!isLoading && products.length > 0 && (
          <Link to="/dashboard/vendorAddProduct">
            <motion.button
              className="mt-4 w-full sm:w-auto sm:mt-0 bg-green-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 hover:shadow-xl"
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
            >
              <FaPlus /> Add New Product
            </motion.button>
          </Link>
        )}
      </motion.div>

      {/* --- Main Content Area --- */}
      {isLoading ? (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <tbody className="divide-y divide-slate-100">
                {Array.from({length: 4}).map((_, i) => (
                  <ProductTableRowSkeleton key={i} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : products.length === 0 ? (
        <motion.div
          className="text-center py-16 px-6 bg-white rounded-2xl shadow-sm"
          initial={{opacity: 0, scale: 0.95}}
          animate={{opacity: 1, scale: 1}}
        >
          <FaBoxOpen className="mx-auto text-5xl text-slate-400 mb-4" />
          <h3 className="text-2xl font-semibold text-slate-700">
            No Products Found
          </h3>
          <p className="text-slate-500 mt-2">
            Get started by adding your first product!
          </p>
          <Link
            to="/vendorAddProduct"
            className="mt-6 inline-block bg-green-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Add a Product
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-8">
          {/* --- Products Table (Scrollable) --- */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-4 text-left font-semibold text-slate-600 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="p-4 text-left font-semibold text-slate-600 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="p-4 text-left font-semibold text-slate-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="p-4 text-right font-semibold text-slate-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <AnimatePresence>
                    {products.map((product, index) => (
                      <ProductTableRow
                        key={product._id}
                        product={product}
                        index={index}
                        onDelete={handleDelete}
                        isLast={index === products.length - 1}
                        totalItems={products.length} // Pass total item count
                      />
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>

          {/* --- Statistics Section --- */}
          <motion.div
            className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-xl shadow-lg p-6 grid grid-cols-3 gap-6 text-center"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.2}}
          >
            <div className="flex flex-col items-center">
              <FaTasks className="text-3xl text-green-200 mb-2" />
              <p className="text-4xl font-bold">{productStats.total}</p>
              <div className="mt-auto">
                <p className="text-sm text-green-200">Total Products</p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <FaClipboardCheck className="text-3xl text-green-200 mb-2" />
              <p className="text-4xl font-bold">{productStats.approved}</p>
              <div className="mt-auto">
                <p className="text-sm text-green-200">Approved</p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <FaClock className="text-3xl text-green-200 mb-2" />
              <p className="text-4xl font-bold">{productStats.pending}</p>
              <div className="mt-auto">
                {" "}
                <p className="text-sm text-green-200">Pending</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default VendorMyProduct;
