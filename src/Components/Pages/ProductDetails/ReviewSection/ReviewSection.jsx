import React, { useContext, useEffect, useState, memo } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { AuthContext } from "../../../ContextFiles/AuthContext";
import { FaEdit, FaTrash, FaStar, FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// --- Reusable, Memoized Modal Component ---
const ReviewModal = memo(({ isOpen, onClose, onSubmit, existingReview, productId, user, loading }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (existingReview) {
        setRating(existingReview.rating);
        setComment(existingReview.comment);
      } else {
        setRating(0);
        setComment("");
      }
    }
  }, [existingReview, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }
    const reviewData = {
      productId,
      rating,
      comment,
      userName: user.displayName,
      userEmail: user.email,
      userImage: user.photoURL || "",
    };
    onSubmit(reviewData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-lg space-y-4"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
          >
            <h3 className="text-xl font-bold text-green-700">
              {existingReview ? "Update Your Review" : "Share Your Thoughts"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-medium mb-2 text-slate-700">Your Rating</label>
                <div className="flex items-center gap-2 text-3xl">
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <motion.button
                        type="button"
                        key={starValue}
                        onClick={() => setRating(starValue)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaStar
                          className={`cursor-pointer transition-colors ${
                            starValue <= rating
                              ? "text-yellow-400"
                              : "text-slate-300 hover:text-yellow-200"
                          }`}
                        />
                      </motion.button>
                    );
                  })}
                </div>
              </div>
              <div className="mb-6">
                <label className="block font-medium mb-2 text-slate-700">Your Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
                  rows="4"
                  placeholder="What did you like or dislike?"
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 w-32 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex justify-center items-center disabled:bg-green-400"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    existingReview ? "Update" : "Submit"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});


const ReviewSection = ({ productId, accessToken }) => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API;

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API}/reviews/${productId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      // Sort reviews to show the newest first
      const sortedReviews = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setReviews(sortedReviews);
      if (user) {
        const existing = sortedReviews.find((rev) => rev.userEmail === user.email);
        setUserReview(existing || null);
      }
    } catch {
      // fail silently on fetch error
    }
  };

  useEffect(() => {
    if (productId && accessToken) {
      fetchReviews();
    }
  }, [productId, user, accessToken]);

  const handleReviewSubmit = async (reviewData) => {
    setLoading(true);
    try {
      const endpoint = userReview
        ? `${API}/reviews/${userReview._id}`
        : `${API}/reviews`;
      const method = userReview ? "put" : "post";

      await axios[method](endpoint, reviewData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      
      toast.success(userReview ? "Review updated!" : "Review submitted!");
      await fetchReviews(); // Refetch to get the latest list
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not submit review.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API}/reviews/${reviewId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          toast.success("Review deleted successfully.");
          await fetchReviews();
        } catch {
          toast.error("Failed to delete review.");
        }
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-slate-800">User Reviews</h2>
        {user && (
          <motion.button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-green-600 text-white font-semibold px-4 py-2 rounded-full hover:bg-green-700 transition-colors transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {userReview ? <FaEdit /> : <FaPlus />}
            {userReview ? "Edit Your Review" : "Add a Review"}
          </motion.button>
        )}
      </div>

      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((rev) => (
            <motion.div
              key={rev._id}
              className="border-b border-slate-200 pb-6 last:border-b-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start gap-4">
                <img
                  src={rev.userImage || `https://api.dicebear.com/8.x/initials/svg?seed=${rev.userName}`}
                  alt={rev.userName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                    <div>
                      <p className="font-bold text-slate-800">{rev.userName}</p>
                      <p className="text-xs text-slate-400">
                        {new Date(rev.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400 mt-2 sm:mt-0">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < rev.rating ? 'text-yellow-400' : 'text-slate-300'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 mt-2 text-justify">{rev.comment}</p>
                  {user && user.email === rev.userEmail && (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleDeleteReview(rev._id)}
                        className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1 transition-colors"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl">
          <p className="text-slate-500">No reviews yet. Be the first to share your thoughts!</p>
        </div>
      )}
      
      <ReviewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleReviewSubmit}
        existingReview={userReview}
        productId={productId}
        user={user}
        loading={loading}
      />
    </div>
  );
};

export default ReviewSection;
