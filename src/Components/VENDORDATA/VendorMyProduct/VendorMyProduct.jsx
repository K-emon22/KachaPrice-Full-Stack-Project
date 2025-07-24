import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../ContextFiles/AuthContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStore,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router"; // Corrected import
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_API;

const fetchVendorProducts = async (email, accessToken) => {
  const { data } = await axios.get(
    `${BASE_URL}/allProduct/email?email=${email}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return data;
};

const StatusBadge = ({ status }) => {
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

const ProductListItemSkeleton = () => (
  <div className="bg-white p-4 rounded-xl shadow-sm animate-pulse">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4 flex-grow">
        <div className="w-16 h-16 bg-slate-200 rounded-lg flex-shrink-0"></div>
        <div className="w-full">
          <div className="h-5 bg-slate-200 rounded w-48 mb-2"></div>
          <div className="h-3 bg-slate-200 rounded w-32"></div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 sm:mt-0 sm:gap-8 flex-shrink-0">
        <div className="h-8 bg-slate-200 rounded w-20"></div>
        <div className="h-8 bg-slate-200 rounded-full w-24"></div>
        <div className="flex gap-2">
          <div className="h-10 w-10 bg-slate-200 rounded-full"></div>
          <div className="h-10 w-10 bg-slate-200 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
);

const ProductListItem = ({ product, index, onDelete }) => (
  <motion.div
    layout // Add layout prop for smooth removal animation
    className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, x: -50, transition: { duration: 0.3 } } // Animate out to the left
    }}
    initial="hidden"
    animate="visible"
    exit="exit"
    transition={{ delay: index * 0.05 }}
  >
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4 flex-grow">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />
        <div>
          <p className="font-bold text-slate-800 line-clamp-1">{product.name}</p>
          <p className="text-sm text-slate-500 flex items-center gap-1.5">
            <FaStore size={12} /> {product.market}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 sm:mt-0 sm:justify-end sm:gap-6 flex-shrink-0">
        <div className="text-left">
          <p className="text-xs text-slate-500">Price</p>
          <p className="font-semibold text-green-600">৳{product.price}</p>
        </div>
        <div className="text-left">
          <p className="text-xs text-slate-500 mb-1">Status</p>
          <StatusBadge status={product.status} />
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={`/product/${product._id}`}
            className="w-9 h-9 flex items-center justify-center bg-slate-100 hover:bg-blue-500 text-slate-600 hover:text-white rounded-full transition-all"
            title="See Details"
          >
            <FaEye />
          </Link>

          <Link
            to={`/vendorEditProduct/${product._id}`}
            className="w-9 h-9 flex items-center justify-center bg-slate-100 hover:bg-green-500 text-slate-600 hover:text-white rounded-full transition-all"
            title="Edit"
          >
            <FaEdit />
          </Link>

          <button
            onClick={() => onDelete(product._id)}
            className="w-9 h-9 flex items-center justify-center bg-slate-100 hover:bg-red-500 text-slate-600 hover:text-white rounded-full transition-all"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

const VendorMyProduct = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { user, accessToken, loading: authLoading } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {
    data: products = [],
    isLoading: productsLoading,
  } = useQuery({
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
        title: 'Deleting...',
        text: 'Please wait.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const res = await axios.delete(`${BASE_URL}/allProduct/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // ✅ FIX: Check the HTTP status code for success instead of deletedCount
        if (res.status === 200 || res.status === 204) {
          // ✅ Wait for the invalidation to complete, which triggers a refetch
          await queryClient.invalidateQueries({ queryKey: ["vendorProducts", user?.email] });
          Swal.fire("Deleted!", "Product deleted successfully.", "success");
        } else {
          // This block will now correctly handle cases where the server
          // responds with a success status but no deletedCount.
          Swal.fire(
            "Not Deleted",
            "The server did not confirm the deletion.",
            "info"
          );
        }
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
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-3">
          My Product Listings
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-500">
          Manage and track the status of all the products you've added to the
          marketplace.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductListItemSkeleton key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <motion.div
          className="text-center py-16 px-6 bg-white rounded-2xl shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h3 className="text-2xl font-semibold text-slate-700">
            No Products Found
          </h3>
          <p className="text-slate-500 mt-2">
            You haven't added any products yet. Get started by adding your first one!
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
          <motion.div layout className="space-y-4">
            <AnimatePresence>
              {products.map((product, index) => (
                <ProductListItem
                  key={product._id}
                  product={product}
                  index={index}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="bg-green-600 text-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: products.length * 0.05 + 0.2 }}
          >
            <div>
              <p className="text-lg font-semibold">Listings Summary</p>
              <p className="text-green-200 text-sm">
                You have {productStats.total} total products.
              </p>
            </div>
            <div className="flex gap-6">
              <div>
                <p className="text-sm text-green-200">Approved</p>
                <p className="text-3xl font-bold">{productStats.approved}</p>
              </div>
              <div>
                <p className="text-sm text-green-200">Pending</p>
                <p className="text-3xl font-bold">{productStats.pending}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default VendorMyProduct;
