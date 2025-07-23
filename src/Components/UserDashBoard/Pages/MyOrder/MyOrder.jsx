import React, { useContext, useEffect } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../ContextFiles/AuthContext";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const BASE_URL = import.meta.env.VITE_API;

// --- Data Fetching Functions ---
const fetchOrders = async (accessToken, email) => {
  const res = await axios.get(`${BASE_URL}/payments/user/${email}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

const fetchProductById = async (productId, accessToken) => {
  const res = await axios.get(`${BASE_URL}/allProduct/approved/${productId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

// --- Reusable Components ---
const OrderItemSkeleton = () => (
  <div className="bg-white p-4 rounded-xl shadow-sm animate-pulse">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-slate-200 rounded-lg flex-shrink-0"></div>
        <div className="w-full">
          <div className="h-5 bg-slate-200 rounded w-48 mb-2"></div>
          <div className="h-3 bg-slate-200 rounded w-32"></div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 sm:mt-0 sm:gap-8">
        <div className="h-8 bg-slate-200 rounded w-20"></div>
        <div className="h-8 bg-slate-200 rounded w-24"></div>
        <div className="h-10 bg-slate-200 rounded-full w-24"></div>
      </div>
    </div>
  </div>
);

const OrderItem = ({ order, productData, index }) => {
  const productName = productData?.name || order.productName || "N/A";
  const marketName = productData?.market || "N/A";
  const productImage = productData?.image || 'https://placehold.co/100x100/e2e8f0/64748b?text=N/A';
  const productId = order.productId;
  
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.div
      className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.05 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        {/* Product Info */}
        <div className="flex items-center gap-4 flex-grow">
          <img src={productImage} alt={productName} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
          <div>
            <p className="font-bold text-slate-800 line-clamp-1">{productName}</p>
            <p className="text-sm text-slate-500">{marketName}</p>
          </div>
        </div>

        {/* Details & Action */}
        <div className="flex items-center justify-between mt-4 sm:mt-0 sm:justify-end sm:gap-8 flex-shrink-0">
          <div className="text-left">
            <p className="text-xs text-slate-500">Price</p>
            <p className="font-semibold text-green-600">৳{order.price || order.amount}</p>
          </div>
          <div className="text-left">
            <p className="text-xs text-slate-500">Date</p>
            <p className="text-sm text-slate-600">{formattedDate}</p>
          </div>
          <Link
            to={`/product/${productId}`}
            className="text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded-full inline-flex items-center justify-center gap-2 transition transform hover:scale-105"
            title="View Details"
          >
            <FaEye />
            <span className="text-sm font-semibold hidden sm:inline">View</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};


const MyOrder = () => {
  const { user, accessToken, loading } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const {
    data: orderData = {},
    isLoading: loadingOrders,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: () => fetchOrders(accessToken, user?.email),
    enabled: !!user?.email && !!accessToken,
    refetchOnWindowFocus: false,
  });

  const orders = orderData?.payments || [];
  const totalAmount = orderData?.totalAmount || 0;

  const productQueries = useQueries({
    queries:
      orders.length > 0
        ? orders.map((order) => ({
            queryKey: ["product", order.productId],
            queryFn: () => fetchProductById(order.productId, accessToken),
            enabled: !!order.productId && !!accessToken,
            refetchOnWindowFocus: false,
          }))
        : [],
  });

  const loadingProducts = productQueries.some((q) => q.isLoading);
  const isLoading = loading || loadingOrders || loadingProducts;

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-2">My Orders</h2>
          <p className="text-slate-500 mb-8">Here is a list of all your past purchases.</p>
        </motion.div>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => <OrderItemSkeleton key={i} />)}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <p className="text-slate-500">You haven’t placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {orders.map((order, idx) => (
                <OrderItem
                  key={order._id}
                  order={order}
                  productData={productQueries[idx]?.data}
                  index={idx}
                />
              ))}
            </AnimatePresence>
            
            <motion.div 
              className="bg-green-600 text-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: orders.length * 0.05 + 0.2 }}
            >
              <div>
                <p className="text-lg font-semibold">Order Summary</p>
                <p className="text-green-200 text-sm">You've made {orders.length} orders.</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <p className="text-sm text-green-200">Total Amount Spent</p>
                <p className="text-3xl font-bold">৳{totalAmount.toFixed(2)}</p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
