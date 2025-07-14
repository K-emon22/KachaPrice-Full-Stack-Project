import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { AuthContext } from "../../../ContextFiles/AuthContext";
import { FaEdit, FaTrash } from "react-icons/fa";

const ReviewSection = ({ productId, accessToken }) => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/reviews/${productId}`);
      setReviews(res.data);
      if (user) {
        const existing = res.data.find((rev) => rev.userEmail === user.email);
        if (existing) setUserReview(existing);
        else setUserReview(null);
      }
    } catch {
      // Silent fail
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId, user]);

  const openUpdateModal = () => {
    if (userReview) {
      setSelectedReviewId(userReview._id);
      setRating(userReview.rating);
      setComment(userReview.comment);
    } else {
      setSelectedReviewId(null);
      setRating(0);
      setComment("");
    }
    document.getElementById("updateReviewModal").showModal();
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please login to leave a review.");

    const reviewData = {
      productId,
      userName: user.displayName,
      userEmail: user.email,
      userImage: user.photoURL || "",
      rating,
      comment,
      createdAt: new Date(),
    };

    setLoading(true);
    try {
      const endpoint = selectedReviewId
        ? `http://localhost:3000/reviews/${selectedReviewId}`
        : "http://localhost:3000/reviews";
      const method = selectedReviewId ? "put" : "post";

      const res = await axios[method](endpoint, reviewData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (res.status === 201 || res.status === 200) {
        toast.success(selectedReviewId ? "Review updated!" : "Review submitted!");
        setUserReview(res.data);
        await fetchReviews();
        document.getElementById("updateReviewModal").close();
      }
    } catch {
      toast.error("Could not submit review.");
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
          const res = await axios.delete(`http://localhost:3000/reviews/${reviewId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (res.status === 200) {
            toast.success("Review deleted successfully.");
            setUserReview(null);
            setRating(0);
            setComment("");
            await fetchReviews();
          }
        } catch {
          toast.error("Failed to delete review.");
        }
      }
    });
  };

  return (
    <section className="mx-[2%] lg:mx-[5%] my-16 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-3xl font-extrabold text-green-600 text-center mb-8">
        💬 User Reviews
      </h2>

      {reviews.length === 0 ? (
        <div className="text-center bg-green-50 border border-green-200 p-6 rounded-lg mb-6">
          <p className="text-lg font-medium mb-2">
            No reviews yet. Be the first to review.
          </p>
          {user && (
            <button onClick={openUpdateModal} className="btn btn-primary">
              Add Review
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6 mt-6">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="bg-base-100 border border-gray-200 rounded-lg p-5 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={rev.userImage || "https://via.placeholder.com/40"}
                  alt={rev.userName}
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
                <div>
                  <p className="font-semibold">{rev.userName}</p>
                  <p className="text-sm text-gray-500">{rev.userEmail}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(rev.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <p className="text-yellow-500 text-lg mb-1">
                {"⭐".repeat(rev.rating)}
              </p>
              <p className="text-gray-700">{rev.comment}</p>

              {user && user.email === rev.userEmail && (
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={openUpdateModal}
                    className="btn btn-sm h-10 btn-outline btn-success flex items-center gap-1"
                  >
                    <FaEdit /> Update
                  </button>
                  <button
                    onClick={() => handleDeleteReview(rev._id)}
                    className="btn h-10 btn-sm btn-outline btn-error flex items-center gap-1"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <dialog id="updateReviewModal" className="modal">
        <div className="modal-box w-full max-w-md">
          <h3 className="font-bold text-lg mb-4">
            {userReview ? "Update Your Review" : "Add a Review"}
          </h3>

          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4">
              <label className="block font-medium mb-1">Rating</label>
              <select
                className="select select-bordered w-full"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                required
              >
                <option value="">Select Rating</option>
                {[5, 4, 3, 2, 1].map((star) => (
                  <option key={`star-${star}`} value={star}>
                    {star} Star{star > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Comment</label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Is the price fair or too high?"
                required
              />
            </div>

            <div className="flex justify-end gap-4">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading
                  ? "Submitting..."
                  : userReview
                  ? "Update Review"
                  : "Submit Review"}
              </button>
              <button
                type="button"
                className="btn btn-outline btn-error h-[45px]"
                onClick={() => document.getElementById("updateReviewModal").close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </section>
  );
};

export default ReviewSection;