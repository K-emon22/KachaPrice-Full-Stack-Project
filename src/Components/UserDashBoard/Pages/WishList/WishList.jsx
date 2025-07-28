import React, {useContext, useEffect, useState} from "react";
import {useQuery, useQueries, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {AuthContext} from "../../../ContextFiles/AuthContext";
import {FaEye, FaTrash, FaPlus} from "react-icons/fa";
import {Link} from "react-router"; 
import {toast} from "react-toastify";
import Swal from "sweetalert2";
import {motion, AnimatePresence} from "framer-motion";

const BASE_URL = import.meta.env.VITE_API;

const fetchWishlist = async (email, token) => {
  const {data} = await axios.get(`${BASE_URL}/product/wishlist/${email}`, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return data;
};

const fetchProductById = async (id, token) => {
  const {data} = await axios.get(`${BASE_URL}/allProduct/approved/${id}`, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return data;
};


const WishlistItemSkeleton = () => (
  <div className="bg-white p-4 rounded-xl shadow-sm animate-pulse">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-slate-200 rounded-lg flex-shrink-0"></div>
        <div className="w-full">
          <div className="h-5 bg-slate-200 rounded w-48 mb-2"></div>
          <div className="h-3 bg-slate-200 rounded w-32"></div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 sm:mt-0 sm:gap-8">
        <div className="h-8 bg-slate-200 rounded w-20"></div>
        <div className="h-10 bg-slate-200 rounded-full w-24"></div>
        <div className="h-10 bg-slate-200 rounded-full w-10"></div>
      </div>
    </div>
  </div>
);

const WishlistItem = ({item, productData, onRemove, isDeleting, index}) => {
  const product = productData;
  if (!product) return null;

  const addedAt = new Date(item.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
      variants={{
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0},
      }}
      layout
      initial="hidden"
      animate="visible"
      exit={{opacity: 0, x: -50, transition: {duration: 0.3}}}
      transition={{delay: index * 0.05}}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        {/* Product Info */}
        <div className="flex items-center gap-4 flex-grow">
          <img
            src={
              product.image ||
              "https://placehold.co/100x100/e2e8f0/64748b?text=N/A"
            }
            alt={product.name}
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
          />
          <div>
            <p className="font-bold text-slate-800 line-clamp-1">
              {product.name}
            </p>
            <p className="text-sm text-slate-500">{product.market}</p>
            <p className="text-xs text-slate-400 mt-1">Added on {addedAt}</p>
          </div>
        </div>


        <div className="flex items-center justify-between mt-4 sm:mt-0 sm:justify-end sm:gap-6 flex-shrink-0">
          <div className="text-left">
            <p className="text-xs text-slate-500">Current Price</p>
            <p className="font-semibold text-lg text-green-600">
              ৳{product.price ?? "N/A"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={`/product/${product._id}`}
              className="text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded-full inline-flex items-center justify-center gap-2 transition transform hover:scale-105"
              title="View Details"
            >
              <FaEye />
              <span className="text-sm font-semibold hidden sm:inline">
                View
              </span>
            </Link>

            <Link
              to={"/allproduct"}
              className="text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded-full inline-flex items-center justify-center gap-2 transition transform hover:scale-105"
            >
              <FaPlus />
              <span className="text-sm font-semibold hidden sm:inline">
                Add more
              </span>
            </Link>

            <button
              onClick={onRemove}
              disabled={isDeleting}
              className="text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-full inline-flex items-center justify-center gap-2 transition transform hover:scale-105 disabled:bg-red-300 disabled:cursor-not-allowed"
              title="Remove from Wishlist"
            >
              {isDeleting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {" "}
                  <FaTrash />{" "}
                  <span className="text-sm font-semibold hidden sm:inline">
                    Delete
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
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
    enabled: !!user?.email && !!accessToken,
    queryFn: () => fetchWishlist(user.email, accessToken),
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
  const isLoading = loading || isWishlistLoading || isProductsLoading;

  const handleRemoveWishlist = async (productId) => {
    setDeletingProductId(productId);
    try {
      await axios.delete(`${BASE_URL}/wishlist/${user.email}/${productId}`, {
        headers: {Authorization: `Bearer ${accessToken}`},
      });
      toast.success("Removed from wishlist successfully");
      // Optimistically update the UI before refetching
      queryClient.setQueryData(["wishlist", user.email], (oldData) =>
        oldData.filter((item) => item.productId !== productId)
      );
      queryClient.invalidateQueries(["wishlist", user.email]);
    } catch (err) {
      toast.error("Failed to remove item from wishlist");
    } finally {
      setDeletingProductId(null);
    }
  };

  const confirmRemove = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be removed from your wishlist.",
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

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            My Wishlist
          </h2>
          <p className="text-slate-500 mb-8">
            Products you're keeping an eye on.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({length: 3}).map((_, i) => (
              <WishlistItemSkeleton key={i} />
            ))}
          </div>
        ) : wishlist.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <p className="text-slate-500 mb-6">Your wishlist is empty.</p>
            <Link
              to="/allproduct"
              className="bg-green-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-700 transition-colors inline-flex items-center gap-2"
            >
              <FaPlus /> Add Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {wishlist.map((item, idx) => (
                <WishlistItem
                  key={item.productId}
                  item={item}
                  productData={productQueries[idx]?.data}
                  onRemove={() => confirmRemove(item.productId)}
                  isDeleting={deletingProductId === item.productId}
                  index={idx}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

       
      </div>
    </div>
  );
};

export default WishList;
