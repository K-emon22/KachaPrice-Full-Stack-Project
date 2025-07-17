import React, {useContext, useEffect, useState} from "react";
import {useQuery, useQueries, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {AuthContext} from "../../../ContextFiles/AuthContext";
import {FaEye, FaSpinner} from "react-icons/fa";
import {Link} from "react-router";
import {toast} from "react-toastify";
import Swal from "sweetalert2";
import {motion, AnimatePresence} from "framer-motion";
import {RxCross2} from "react-icons/rx";

const BASE_URL = "http://localhost:3000";

const fetchWishlist = async (email) => {
  const {data} = await axios.get(`${BASE_URL}/wishlist/${email}`);
  return data;
};

const fetchProductById = async (id, token) => {
  const {data} = await axios.get(`${BASE_URL}/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const containerVariants = {
  hidden: {opacity: 0, y: 20},
  visible: {
    opacity: 1,
    y: 0,
    transition: {staggerChildren: 0.1, duration: 0.5},
  },
};

const itemVariants = {
  hidden: {opacity: 0, y: 15},
  visible: {opacity: 1, y: 0, transition: {duration: 0.4}},
  hover: {scale: 1.01, boxShadow: "0px 4px 8px rgba(0,0,0,0.15)"},
};

const WishList = () => {
  const {user, accessToken, loading} = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [deletingProductId, setDeletingProductId] = useState(null);

  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }, []);

  const {
    data: wishlist = [],
    isLoading: isWishlistLoading,
    error: wishlistError,
  } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: () => fetchWishlist(user.email),
    refetchOnWindowFocus: false,
  });

  const productQueries = useQueries({
    queries:
      wishlist?.map((item) => ({
        queryKey: ["product", item.productId],
        queryFn: () => fetchProductById(item.productId, accessToken),
        enabled: !!accessToken && !!item.productId,
        refetchOnWindowFocus: false,
      })) || [],
  });

  const isProductsLoading = productQueries.some((q) => q.isLoading);

  const handleRemoveWishlist = async (productId) => {
    setDeletingProductId(productId);
    try {
      await axios.delete(`${BASE_URL}/wishlist/${user.email}/${productId}`, {
        headers: {Authorization: `Bearer ${accessToken}`},
      });
      toast.success("✅ Removed from wishlist successfully");
      queryClient.invalidateQueries(["wishlist", user.email]);
    } catch (err) {
      toast.error("❌ Failed to remove item from wishlist");
    } finally {
      setDeletingProductId(null);
    }
  };

  const confirmRemove = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this from your wishlist.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleRemoveWishlist(productId);
      }
    });
  };

  if (loading || isWishlistLoading || isProductsLoading) {
    return (
      <div className="flex justify-center items-center py-20" role="status" aria-label="Loading wishlist">
        <FaSpinner className="animate-spin text-4xl text-green-600" />
      </div>
    );
  }

  if (wishlistError) {
    return (
      <p className="text-red-600 font-semibold text-center mt-8">
        Failed to load your wishlist. Please try again later.
      </p>
    );
  }

  if (wishlist.length === 0) {
    return (
      <section className="mt-16 px-4 sm:px-6 lg:px-10 text-center text-gray-600">
        <h2 className="text-3xl font-bold text-green-700 mb-6">My Watchlist</h2>
        <p>Your wishlist is currently empty.</p>
      </section>
    );
  }

  return (
    <motion.section
      className="mt-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      aria-label="User Wishlist Section"
    >
      <h2 className="text-3xl font-bold text-green-700 mb-6">❤️ My Watchlist</h2>

      <div className="hidden md:block bg-white rounded-lg shadow border border-black overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-green-600 text-white sticky top-0 z-10">
            <tr>
              <th className="text-left px-3 py-2 border-b border-green-700">#</th>
              <th className="text-left px-3 py-2 border-b border-green-700">Product</th>
              <th className="text-left px-3 py-2 border-b border-green-700">Market</th>
              <th className="text-left px-3 py-2 border-b border-green-700">Latest Price</th>
              <th className="text-left px-3 py-2 border-b border-green-700">Added On</th>
              <th className="text-left px-3 py-2 border-b border-green-700">Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {wishlist.map((item, idx) => {
                const productQuery = productQueries[idx];
                const product = productQuery?.data;
                if (!product) return null;
                const addedAt = item.createdAt;

                return (
                  <motion.tr
                    key={item._id}
                    className={`hover:bg-green-50 ${idx % 2 === 0 ? "bg-white" : "bg-green-50"} cursor-pointer`}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    whileHover="hover"
                  >
                    <td className="px-3 py-2 border-b border-gray-200">{idx + 1}</td>
                    <td className="px-3 py-2 border-b border-gray-200">{product.name || "N/A"}</td>
                    <td className="px-3 py-2 border-b border-gray-200">{product.market || "N/A"}</td>
                    <td className="px-3 py-2 border-b border-gray-200">৳{product.price ?? "N/A"}</td>
                    <td className="px-3 py-2 border-b border-gray-200">{addedAt ? new Date(addedAt).toLocaleString() : "N/A"}</td>
                    <td className="px-3 py-2 border-b border-gray-200">
                      <div className="flex gap-2">
                        <Link
                          to={`/product/${product._id}`}
                          className="text-white bg-green-600 hover:bg-green-700 p-2 rounded-md inline-flex items-center justify-center transition"
                          title={`See Details for ${product.name}`}
                          aria-label={`See Details for ${product.name}`}
                        >
                          <FaEye className="text-lg" />
                        </Link>
                        <button
                          onClick={() => confirmRemove(product._id)}
                          disabled={deletingProductId === product._id}
                          className={`text-white p-2 rounded-md inline-flex items-center justify-center transition ${
                            deletingProductId === product._id ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                          }`}
                          title={`Remove ${product.name} from Wishlist`}
                          aria-label={`Remove ${product.name} from Wishlist`}
                        >
                          <RxCross2 className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4 mt-4">
        <AnimatePresence>
          {wishlist.map((item, idx) => {
            const productQuery = productQueries[idx];
            const product = productQuery?.data;
            if (!product) return null;
            const addedAt = item.createdAt;

            return (
              <motion.div
                key={item._id}
                className="bg-white rounded-lg shadow border border-black p-4 cursor-pointer"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0px 6px 12px rgba(0,0,0,0.15)",
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-green-700">Wishlist #{idx + 1}</span>
                  <Link
                    to={`/product/${product._id}`}
                    className="inline-flex items-center justify-center rounded-md bg-green-600 px-3 py-1 text-white hover:bg-green-700 transition"
                    title={`View details for ${product.name}`}
                    aria-label={`View details for ${product.name}`}
                  >
                    <FaEye />
                  </Link>
                </div>
                <div className="text-gray-700 space-y-1">
                  <p><span className="font-semibold">Product:</span> {product.name}</p>
                  <p><span className="font-semibold">Market:</span> {product.market}</p>
                  <p><span className="font-semibold">Latest Price:</span> ৳{product.price ?? "N/A"}</p>
                  <p><span className="font-semibold">Added On:</span> {addedAt ? new Date(addedAt).toLocaleString() : "N/A"}</p>
                </div>
                <button
                  onClick={() => confirmRemove(product._id)}
                  disabled={deletingProductId === product._id}
                  className={`mt-3 w-full text-white p-2 rounded-md inline-flex items-center justify-center transition ${
                    deletingProductId === product._id ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                  }`}
                  aria-label={`Remove ${product.name} from Wishlist`}
                >
                  ❌ Remove from watchlist
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default WishList;