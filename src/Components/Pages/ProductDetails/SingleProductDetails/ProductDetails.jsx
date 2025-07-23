import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router"; // ✅ Corrected import
import { AuthContext } from "../../../ContextFiles/AuthContext";
import { toast } from "react-toastify";
import ReviewSection from "../ReviewSection/ReviewSection";
import ProductCompare from "../ProductCompare/ProductCompare";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaHeart, FaCheck } from "react-icons/fa";

// ✅ Professional Skeleton Loader for the Details Page
const ProductDetailsSkeleton = () => (
  <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Skeleton */}
        <div className="bg-slate-200 rounded-xl w-full h-80 md:h-full"></div>
        {/* Details Skeleton */}
        <div className="flex flex-col">
          <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2 mb-6"></div>
          <div className="space-y-3 mb-6">
            <div className="h-3 bg-slate-200 rounded w-full"></div>
            <div className="h-3 bg-slate-200 rounded w-full"></div>
            <div className="h-3 bg-slate-200 rounded w-5/6"></div>
          </div>
          <div className="h-10 bg-slate-200 rounded w-1/3 mb-8"></div>
          <div className="mt-auto flex gap-4">
            <div className="h-12 bg-slate-200 rounded-full flex-1"></div>
            <div className="h-12 bg-slate-200 rounded-full flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProductDetails = () => {
  const { id } = useParams();
  const { user, loading, accessToken } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [addingWatchlist, setAddingWatchlist] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (loading || !user || !accessToken) return;

    const fetchProduct = async () => {
      setIsFetching(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/allProduct/approved/${id}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        setProduct(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch product");
      } finally {
        setIsFetching(false);
      }
    };

    const checkWishlist = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API}/product/wishlist/${user.email}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const wishlistItems = res.data || [];
        const found = wishlistItems.some((item) => item.productId === id);
        setIsWishlisted(found);
      } catch (err) {
        console.error("Failed to check wishlist:", err);
      }
    };

    fetchProduct();
    checkWishlist();
  }, [loading, user, id, accessToken]);

  const handleWatchlist = async () => {
    if (!user || !accessToken) {
      toast.error("You must be logged in to add to watchlist.");
      return;
    }

    setAddingWatchlist(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/product/wishlist`,
        { productId: product._id, userEmail: user.email },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      toast.success(res.data.message || "Added to watchlist!");
      setIsWishlisted(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add to watchlist");
    } finally {
      setAddingWatchlist(false);
    }
  };

  if (isFetching) return <ProductDetailsSkeleton />;

  if (error) return <p className="text-center mt-20 text-red-600 font-semibold">{error}</p>;

  if (!product) return <p className="text-center mt-20 text-gray-600">No product data available.</p>;

  return (
    <div className="min-h-screen  py-10">
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <motion.div 
              className="w-full h-80 md:h-full rounded-xl overflow-hidden shadow-lg group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={product.image || "https://placehold.co/600x600/e2e8f0/64748b?text=No+Image"}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>

            {/* Product Details */}
            <div className="flex flex-col">
              <div>
                <p className="text-sm font-semibold text-green-600 uppercase tracking-wider">{product.market || "General Market"}</p>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 my-2">{product.name}</h1>
                <p className="text-slate-500 mb-6 text-justify">{product.description}</p>
                <div className="mb-6">
                  <p className="text-sm text-slate-500">Current Price</p>
                  <p className="text-5xl font-bold text-slate-800">
                    ৳<span className="text-green-600">{product.price}</span>
                  </p>
                </div>
              </div>
              
              <div className="mt-auto pt-6 border-t border-slate-200">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={product.vendorImage || `https://api.dicebear.com/8.x/initials/svg?seed=${product.vendorName || 'V'}`}
                    alt={product.vendorName || "Vendor"}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-slate-800">{product.vendorName || "Unknown Vendor"}</p>
                    {/* ✅ Added vendorEmail here */}
                    <p className="text-sm text-slate-500">{product.vendorEmail || "No email provided"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link
                    to={`/payment/${product._id}`}
                    className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                  >
                    <FaShoppingCart /> Buy Now
                  </Link>
                  <button
                    onClick={handleWatchlist}
                    disabled={addingWatchlist || isWishlisted}
                    className={`w-full font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                      isWishlisted
                        ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                        : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {isWishlisted ? (
                        <motion.span key="wishlisted" className="flex items-center gap-2" initial={{opacity:0}} animate={{opacity:1}}>
                          <FaCheck /> Watchlisted
                        </motion.span>
                      ) : addingWatchlist ? (
                        <motion.span key="adding" className="flex items-center gap-2" initial={{opacity:0}} animate={{opacity:1}}>
                          <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" /> Adding...
                        </motion.span>
                      ) : (
                        <motion.span key="add" className="flex items-center gap-2" initial={{opacity:0}} animate={{opacity:1}}>
                          <FaHeart /> Add to Watchlist
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Sections */}
        <div className="mt-12">
          <ProductCompare productId={product._id} />
        </div>
        <div className="mt-12">
          <ReviewSection productId={product._id} accessToken={accessToken} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
