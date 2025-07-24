import React, {useEffect, useState, useContext} from "react";
import {
  FaHeart,
  FaStar,
  FaShoppingCart,
  FaWallet,
  FaBox,
  FaClock,
  FaBullhorn,
} from "react-icons/fa";
import {AuthContext} from "../../../ContextFiles/AuthContext";
import axios from "axios";
import {Link} from "react-router";
import {motion} from "framer-motion";
import Profile from "../Profile/Profile";
import UserRoleCheck from "../../../RoleCheck/UserRoleCheck";

const BASE_URL = import.meta.env.VITE_API;

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const cardHover = {
  scale: 1.05,
  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.12)",
  transition: {duration: 0.3},
};

const fadeInUp = {
  initial: {opacity: 0, y: 20},
  animate: {opacity: 1, y: 0, transition: {duration: 0.6}},
};

const Dashboard = () => {
  const {user, accessToken} = useContext(AuthContext);

  const [wishlistCount, setWishlistCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [recentReviews, setRecentReviews] = useState([]);
  const [spendingSummary, setSpendingSummary] = useState(0);
  const [vendorTotalProduct, setVendorTotalProduct] = useState([]);
  const [vendorTotalmoney, setVendorTotalmoney] = useState(0);
const[vendorAds,setVendorAds]=useState([])
console.log(vendorAds);

  
  const vendorWatingProduct = vendorTotalProduct.filter(
    (wait) => wait.status === "pending"
  ).length;
  console.log(vendorWatingProduct);
  console.log(vendorTotalmoney);

  const {role} = UserRoleCheck();

  const getAuthConfig = (needAuth) => {
    if (needAuth && accessToken) {
      return {
        headers: {Authorization: `Bearer ${accessToken}`},
      };
    }
    return {};
  };

  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }, []);

  useEffect(() => {
    if (user?.email) {
      // Common data for all roles or specific roles can be fetched here
      axios
        .get(`${BASE_URL}/product/wishlist/${user.email}`, getAuthConfig(false))
        .then((res) => setWishlistCount(res.data.length))
        .catch((err) => console.error("Failed to fetch wishlist", err));

      axios
        .get(`${BASE_URL}/payments/user/${user.email}`, getAuthConfig(true))
        .then((res) => {
          setSpendingSummary(res.data.totalAmount || 0);
          setOrdersCount(res.data.totalPayments || 0);
        })
        .catch((err) => {
          console.error("Failed to fetch user payments", err);
          setSpendingSummary(0);
          setOrdersCount(0);
        });

      axios
        .get(`${BASE_URL}/reviews/user/${user.email}`, getAuthConfig(true))
        .then((res) => setRecentReviews(res.data.reviews || []))
        .catch((err) => console.error("Failed to fetch user reviews", err));

      axios
        .get(`${BASE_URL}/allProduct/email?email=${user.email}`, {
          headers: {Authorization: `Bearer ${accessToken}`},
        })
        .then((res) => setVendorTotalProduct(res.data));
      axios
        .get(`${BASE_URL}/payments/vendor/${user.email}`, {
          headers: {Authorization: `Bearer ${accessToken}`},
        })
        .then((res) => setVendorTotalmoney(res.data));

      axios.get(`${BASE_URL}/advertisements?vendorEmail=${user?.email}`, {
        headers: {Authorization: `Bearer ${accessToken}`},
      }).then(res=> setVendorAds(res.data))
    }
  }, [user, accessToken]);

  return (
    <motion.div
      className="p-6 mt-16 pt-0 lg:mt-26 space-y-10 max-w-6xl mx-auto"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700">
          Welcome, {user?.displayName || "User"}!
        </h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Here's your personalized dashboard overview.
        </p>
      </div>

      <Profile />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {/* USER ROLE CARDS */}
        {role === "user" && (
          <>
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

            <motion.div
              className="bg-white rounded-xl shadow p-6 text-center cursor-pointer"
              whileHover={cardHover}
            >
              <motion.div
                className="mx-auto mb-2 bg-indigo-100 p-2 rounded-full inline-block"
                animate={floatAnimation}
                transition={{...floatAnimation.transition, delay: 0.3}}
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

            <motion.div
              className="bg-white rounded-xl shadow p-6 text-center cursor-pointer"
              whileHover={cardHover}
            >
              <motion.div
                className="mx-auto mb-2 bg-yellow-100 p-2 rounded-full inline-block"
                animate={floatAnimation}
                transition={{...floatAnimation.transition, delay: 0.6}}
              >
                <FaStar className="text-4xl text-yellow-500" />
              </motion.div>
              <h2 className="text-xl font-semibold">My Reviews</h2>
              <p className="text-3xl font-bold">{recentReviews.length}</p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow p-6 text-center cursor-pointer"
              whileHover={cardHover}
            >
              <motion.div
                className="mx-auto mb-2 bg-green-100 p-2 rounded-full inline-block"
                animate={floatAnimation}
                transition={{...floatAnimation.transition, delay: 1.2}}
              >
                <FaWallet className="text-4xl text-green-600" />
              </motion.div>
              <h2 className="text-xl font-semibold">This Month's Spend</h2>
              <p className="text-3xl font-bold">
                ৳{spendingSummary.toFixed(2)}
              </p>
            </motion.div>
          </>
        )}

        {/* VENDOR ROLE CARDS */}
        {role === "vendor" && (
          <>
            <motion.div
              className="bg-white rounded-xl shadow p-6 text-center cursor-pointer"
              whileHover={cardHover}
            >
              <motion.div
                className="mx-auto mb-2 bg-blue-100 p-2 rounded-full inline-block"
                animate={floatAnimation}
              >
                <FaBox className="text-4xl text-blue-500" />
              </motion.div>
              <h2 className="text-xl font-semibold">Total Products</h2>
              <p className="text-3xl font-bold">{vendorTotalProduct.length}</p>
              <Link
                to="/dashboard/vendorMyProduct"
                className="mt-2 inline-block text-green-600 text-sm hover:underline"
              >
                View Products
              </Link>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow p-6 text-center cursor-pointer"
              whileHover={cardHover}
            >
              <motion.div
                className="mx-auto mb-2 bg-orange-100 p-2 rounded-full inline-block"
                animate={floatAnimation}
                transition={{...floatAnimation.transition, delay: 0.3}}
              >
                <FaClock className="text-4xl text-orange-500" />
              </motion.div>
              <h2 className="text-xl font-semibold">Pending Products</h2>
              <p className="text-3xl font-bold">{vendorWatingProduct}</p>
              <Link
                to="/dashboard/vendorMyProduct"
                className="mt-2 inline-block text-green-600 text-sm hover:underline"
              >
                View Pending
              </Link>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow p-6 text-center cursor-pointer"
              whileHover={cardHover}
            >
              <motion.div
                className="mx-auto mb-2 bg-purple-100 p-2 rounded-full inline-block"
                animate={floatAnimation}
                transition={{...floatAnimation.transition, delay: 0.6}}
              >
                <FaBullhorn className="text-4xl text-purple-500" />
              </motion.div>
              <h2 className="text-xl font-semibold">Advertisements</h2>
              <p className="text-3xl font-bold">{vendorAds.length}</p>
              <Link
                to="advertisements"
                className="mt-2 inline-block text-green-600 text-sm hover:underline"
              >
                Manage Ads
              </Link>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow p-6 text-center cursor-pointer"
              whileHover={cardHover}
            >
              <motion.div
                className="mx-auto mb-2 bg-green-100 p-2 rounded-full inline-block"
                animate={floatAnimation}
                transition={{...floatAnimation.transition, delay: 1.2}}
              >
                <FaWallet className="text-4xl text-green-600" />
              </motion.div>
              <h2 className="text-xl font-semibold">Total Sold</h2>
              <p className="text-3xl font-bold">
                <span className="text-green-600">৳</span>{" "}
                {vendorTotalmoney?.totalEarnings}
              </p>
            </motion.div>
          </>
        )}
      </div>

      <motion.div
        className="mt-10 text-center border rounded-xl p-6 bg-white shadow-md"
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.7, delay: 1.5}}
      >
        {role === "user" && (
          <div>
            {" "}
            <h3 className="text-xl font-semibold mb-2 text-gray-700">
              Coming Soon: Purchase Insights
            </h3>
            <p className="text-gray-500 text-sm">
              You'll soon be able to view your order stats and trends visually!
            </p>
          </div>
        )}

        {role === "vendor" && (
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">
              Coming Soon: Sales Analytics
            </h3>

            <p className="text-gray-500 text-sm">
              Track your total earnings, top-selling products, and performance
              trends with detailed insights — launching soon!
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
