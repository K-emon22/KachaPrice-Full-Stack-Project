import React, { useEffect, useState, useContext } from "react";
import {
  FaHeart,
  FaStar,
  FaShoppingCart,
  FaEye,
  FaWallet,
} from "react-icons/fa";
import { AuthContext } from "../../../ContextFiles/AuthContext";
import axios from "axios";
import { Link } from "react-router";
import { motion } from "framer-motion";

const BASE_URL = "http://localhost:3000";

const floatAnimation = {
  y: [0, -10, 0], // Move up 10px and back down
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const cardHover = {
  scale: 1.05,
  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.12)",
  transition: { duration: 0.3 },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Dashboard = () => {
  const { user, accessToken } = useContext(AuthContext);

  const [wishlistCount, setWishlistCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [recentReviews, setRecentReviews] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState(3); // Placeholder
  const [spendingSummary, setSpendingSummary] = useState(0);

  const getAuthConfig = (needAuth) => {
    if (needAuth && accessToken) {
      return {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
    }
    return {};
  };

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${BASE_URL}/wishlist/${user.email}`, getAuthConfig(false))
        .then((res) => setWishlistCount(res.data.length))
        .catch((err) => console.error("Failed to fetch wishlist", err));

      axios
        .get(`${BASE_URL}/payments/total-amount`, getAuthConfig(true))
        .then((res) => {
          setSpendingSummary(res.data.totalAmount || 0);
        })
        .catch((err) => {
          console.error("Failed to fetch total amount", err);
          setSpendingSummary(0);
        });

      axios
        .get(`${BASE_URL}/payments`, getAuthConfig(true))
        .then((res) => {
          setOrdersCount(res.data.length);
        })
        .catch((err) => {
          if (err.response?.status === 404) setOrdersCount(0);
          else console.error("Failed to fetch orders", err);
        });
    }

    axios
      .get(`${BASE_URL}/reviews`)
      .then((res) => setRecentReviews(res.data))
      .catch((err) => console.error("Failed to fetch reviews", err));
  }, [user, accessToken]);

  return (
    <motion.div
      className="p-6 space-y-10 max-w-6xl mx-auto"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      {/* Welcome Text */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700">
          Welcome, {user?.displayName || "User"}!
        </h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Here's your personalized dashboard overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {/* Wishlist */}
        <motion.div
          className="bg-white rounded-xl shadow p-6 text-center cursor-pointer"
          whileHover={cardHover}
        >
          <motion.div
            className="mx-auto mb-2 bg-pink-100 p-2 rounded-full inline-block"
            animate={floatAnimation}
          >
            <FaHeart className="text-4xl text-pink-500" />
          </motion.div>
          <h2 className="text-xl font-semibold">Watchlist</h2>
          <p className="text-3xl font-bold">{wishlistCount}</p>
          <Link
            to="/dashboard/watchlist"
            className="mt-2 inline-block text-green-600 text-sm hover:underline"
          >
            View Watchlist
          </Link>
        </motion.div>

        {/* Orders */}
        <motion.div
          className="bg-white rounded-xl shadow p-6 text-center cursor-pointer"
          whileHover={cardHover}
        >
          <motion.div
            className="mx-auto mb-2 bg-indigo-100 p-2 rounded-full inline-block"
            animate={floatAnimation}
            transition={{ ...floatAnimation.transition, delay: 0.3 }}
          >
            <FaShoppingCart className="text-4xl text-indigo-500" />
          </motion.div>
          <h2 className="text-xl font-semibold">My Orders</h2>
          <p className="text-3xl font-bold">{ordersCount}</p>
          <Link
            to="/dashboard/orders"
            className="mt-2 inline-block text-green-600 text-sm hover:underline"
          >
            View Orders
          </Link>
        </motion.div>

        {/* Reviews */}
        <motion.div
          className="bg-white rounded-xl shadow p-6 text-center cursor-pointer"
          whileHover={cardHover}
        >
          <motion.div
            className="mx-auto mb-2 bg-yellow-100 p-2 rounded-full inline-block"
            animate={floatAnimation}
            transition={{ ...floatAnimation.transition, delay: 0.6 }}
          >
            <FaStar className="text-4xl text-yellow-500" />
          </motion.div>
          <h2 className="text-xl font-semibold">My Reviews</h2>
          <p className="text-3xl font-bold">{recentReviews.length}</p>
          <Link
            to="/dashboard/reviews"
            className="mt-2 inline-block text-green-600 text-sm hover:underline"
          >
            Manage Reviews
          </Link>
        </motion.div>

        {/* Recently Viewed */}
        <motion.div
          className="bg-white rounded-xl shadow p-6 text-center cursor-pointer"
          whileHover={cardHover}
        >
          <motion.div
            className="mx-auto mb-2 bg-blue-100 p-2 rounded-full inline-block"
            animate={floatAnimation}
            transition={{ ...floatAnimation.transition, delay: 0.9 }}
          >
            <FaEye className="text-4xl text-blue-500" />
          </motion.div>
          <h2 className="text-xl font-semibold">Recently Viewed</h2>
          <p className="text-3xl font-bold">{recentlyViewed}</p>
        </motion.div>

        {/* Spending Summary */}
        <motion.div
          className="bg-white rounded-xl shadow p-6 text-center cursor-pointer"
          whileHover={cardHover}
        >
          <motion.div
            className="mx-auto mb-2 bg-green-100 p-2 rounded-full inline-block"
            animate={floatAnimation}
            transition={{ ...floatAnimation.transition, delay: 1.2 }}
          >
            <FaWallet className="text-4xl text-green-600" />
          </motion.div>
          <h2 className="text-xl font-semibold">This Month's Spend</h2>
          <p className="text-3xl font-bold">৳{spendingSummary.toFixed(2)}</p>
        </motion.div>
      </div>

      {/* Chart Placeholder */}
      <motion.div
        className="mt-10 text-center border rounded-xl p-6 bg-white shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.5 }}
      >
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          Coming Soon: Purchase Insights
        </h3>
        <p className="text-gray-500 text-sm">
          You'll soon be able to view your order stats and trends visually!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;