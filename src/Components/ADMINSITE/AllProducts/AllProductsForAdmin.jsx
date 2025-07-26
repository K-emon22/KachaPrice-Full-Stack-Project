import React, {useContext, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {Link} from "react-router";
import {AuthContext} from "../../ContextFiles/AuthContext";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {motion, AnimatePresence} from "framer-motion";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaTrash,
  FaClock,
  FaBoxOpen,
  FaEllipsisV,
  FaEdit,
} from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API;

// --- Data Fetching Function for React Query ---
const fetchAllProducts = async (accessToken, page = 1, limit = 10) => {
  const {data} = await axios.get(
    `${BASE_URL}/allProduct?page=${page}&limit=${limit}`,
    {
      headers: {Authorization: `Bearer ${accessToken}`},
    }
  );
  return data; // Expects an object like { products: [], total: 0 }
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

const ProductRowSkeleton = () => (
  <tr className="animate-pulse">
    <td className="p-4">
      <div className="w-28 h-20 bg-slate-200 rounded-lg"></div>
    </td>
    <td className="p-4">
      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
    </td>
    <td className="p-4">
      <div className="h-4 bg-slate-200 rounded w-full"></div>
    </td>
    <td className="p-4">
      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
    </td>
    <td className="p-4">
      <div className="h-6 bg-slate-200 rounded-full w-24"></div>
    </td>
    <td className="p-4">
      <div className="flex justify-end">
        <div className="h-9 w-24 bg-slate-200 rounded-lg"></div>
      </div>
    </td>
  </tr>
);

const ProductRow = ({product, index, onStatusChange, onDelete, isLast}) => {
  const [menuOpen, setMenuOpen] = useState(false);

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
          src={product.image}
          alt={product.name}
          className="w-28 h-20 object-cover rounded-lg shadow-sm"
        />
      </td>
      <td className="p-4 align-middle font-bold text-slate-800">
        {product.name}
      </td>
      <td className="p-4 align-middle text-slate-600">
        {product.vendorName}
        <br />
        <span className="text-xs text-slate-400">{product.vendorEmail}</span>
      </td>
      <td className="p-4 align-middle font-semibold text-slate-700">
        ৳
        <span className="font-bold text-green-600 text-lg">
          {product.price}
        </span>
      </td>
      <td className="p-4 align-middle">
        <StatusBadge status={product.status} />
      </td>
      <td className="p-4 align-middle">
        <div className="relative flex justify-end">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
            className="p-2 rounded-full hover:bg-slate-200 transition-colors"
          >
            <FaEllipsisV className="text-slate-600" />
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className={`absolute right-0 ${
                  isLast ? "bottom-full mb-2" : "top-full mt-2"
                } w-40 bg-white rounded-lg shadow-xl border z-10 overflow-hidden`}
                initial={{opacity: 0, y: isLast ? 10 : -10}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: isLast ? 10 : -10}}
              >
                {product.status === "pending" && (
                  <>
                    <button
                      onClick={() => {
                        onStatusChange(product._id, "approved");
                        setMenuOpen(false);
                      }}
                      className="w-full text-left font-semibold text-sm text-green-600 flex items-center gap-2 px-3 py-2 hover:bg-green-50"
                    >
                      <FaCheckCircle /> Approve
                    </button>
                    <button
                      onClick={() => {
                        onStatusChange(product._id, "rejected");
                        setMenuOpen(false);
                      }}
                      className="w-full text-left font-semibold text-sm text-orange-600 flex items-center gap-2 px-3 py-2 hover:bg-orange-50"
                    >
                      <FaTimesCircle /> Reject
                    </button>
                  </>
                )}
                <Link
                  to={`/dashboard/update-product/${product._id}`}
                  className="w-full text-left font-semibold text-sm text-blue-600 flex items-center gap-2 px-3 py-2 hover:bg-blue-50"
                >
                  <FaEdit /> Update
                </Link>
                <button
                  onClick={() => {
                    onDelete(product._id);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left font-semibold text-sm text-red-600 flex items-center gap-2 px-3 py-2 hover:bg-red-50"
                >
                  <FaTrash /> Delete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </td>
    </motion.tr>
  );
};

const Pagination = ({currentPage, totalPages, onPageChange}) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm font-semibold bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`w-9 h-9 rounded-full font-semibold transition-colors ${
            currentPage === number
              ? "bg-green-600 text-white"
              : "bg-slate-200 text-slate-600 hover:bg-slate-300"
          }`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm font-semibold bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

const AllProductsForAdmin = () => {
  const {accessToken, loading: authLoading} = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const {
    data,
    isLoading: productsLoading,
    error,
  } = useQuery({
    queryKey: ["allProductsAdmin", currentPage],
    queryFn: () => fetchAllProducts(accessToken, currentPage, productsPerPage),
    enabled: !!accessToken,
    keepPreviousData: true,
  });

  const products = data?.products || [];
  const totalProducts = data?.total || 0;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const isLoading = authLoading || productsLoading;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({top: 0, behavior: "smooth"});
  };

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
          `${BASE_URL}/allProduct/${id}`,
          {status},
          {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        queryClient.invalidateQueries({queryKey: ["allProductsAdmin"]});
        Swal.fire("Success", `Product has been ${status}!`, "success");
      } catch (err) {
        Swal.fire("Error", "Failed to update status", "error");
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the product permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmResult.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/allProduct/${id}`, {
          headers: {Authorization: `Bearer ${accessToken}`},
        });
        queryClient.invalidateQueries({queryKey: ["allProductsAdmin"]});
        Swal.fire("Deleted!", "Product has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to delete product", "error");
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
          Product Management
        </h1> 
        <p className="text-lg text-slate-500 mt-2">
          Approve, reject, or remove product listings from all vendors.
        </p>
      </motion.div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Price
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
                Array.from({length: 5}).map((_, i) => (
                  <ProductRowSkeleton key={i} />
                ))
              ) : (
                <AnimatePresence>
                  {products.map((product, idx) => (
                    <ProductRow
                      key={product._id}
                      product={product}
                      index={idx}
                      onStatusChange={handleStatusChange}
                      onDelete={handleDelete}
                      isLast={idx === products.length - 1}
                    />
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
        {!isLoading && error && (
          <div className="text-red-500 p-4 text-center">
            {error.message || "Failed to load products."}
          </div>
        )}
        {!isLoading && !error && products.length === 0 && (
          <div className="text-center py-16 px-6">
            <FaBoxOpen className="mx-auto text-5xl text-slate-400 mb-4" />
            <h3 className="text-2xl font-semibold text-slate-700">
              No Products Found
            </h3>
            <p className="text-slate-500 mt-2">
              There are currently no products to manage.
            </p>
          </div>
        )}
      </div>
      {!isLoading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default AllProductsForAdmin;
