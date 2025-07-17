import React, { useContext, useEffect } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../ContextFiles/AuthContext";
import { FaSpinner, FaEye } from "react-icons/fa";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const BASE_URL = "http://localhost:3000";

const fetchOrders = async (accessToken) => {
  const res = await axios.get(`${BASE_URL}/payments`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data || [];
};

const fetchProductById = async (productId, accessToken) => {
  const res = await axios.get(`${BASE_URL}/product/${productId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, duration: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  hover: { scale: 1.03, boxShadow: "0px 4px 8px rgba(0,0,0,0.15)" },
};

const MyOrder = () => {
  const { user, accessToken, loading } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const {
    data: orders = [],
    isLoading: loadingOrders,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: () => fetchOrders(accessToken),
    enabled: !!user?.email && !!accessToken,
    refetchOnWindowFocus: false,
  });

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

  if (loading || loadingOrders || loadingProducts) {
    return (
      <div
        className="flex justify-center items-center py-20"
        role="status"
        aria-label="Loading orders"
      >
        <FaSpinner className="animate-spin text-4xl text-green-600" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="mt-16 px-4 sm:px-6 lg:px-10 text-center text-gray-600">
        <h2 className="text-3xl font-bold text-green-700 mb-6">🧾 My Orders</h2>
        <p>You haven’t placed any orders yet.</p>
      </section>
    );
  }

  return (
    <motion.section
      className="mt-10 "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-3xl font-bold text-green-700 mb-6">🧾 My Orders</h2>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-green-600 text-white sticky top-0 z-10">
            <tr>
              <th className="text-left px-3 py-2 border-b border-green-700">#</th>
              <th className="text-left px-3 py-2 border-b border-green-700">Product</th>
              <th className="text-left px-3 py-2 border-b border-green-700">Market</th>
              <th className="text-left px-3 py-2 border-b border-green-700">Price</th>
              <th className="text-left px-3 py-2 border-b border-green-700">Date</th>
              <th className="text-left px-3 py-2 border-b border-green-700">Transaction ID</th>
              <th className="text-left px-3 py-2 border-b border-green-700">Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {orders.map((order, idx) => {
                const productQuery = productQueries[idx];
                const productData = productQuery?.data;

                const productName = productData?.name || order.productName || "N/A";
                const marketName = productData?.market || productData?.marketName || "N/A";
                const productId = order.productId;

                return (
                  <motion.tr
                    key={order._id}
                    className={`hover:bg-green-50 ${
                      idx % 2 === 0 ? "bg-white" : "bg-green-50"
                    } cursor-pointer`}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    whileHover="hover"
                  >
                    <td className="px-3 py-2 border-b border-gray-200">{idx + 1}</td>
                    <td className="px-3 py-2 border-b border-gray-200">{productName}</td>
                    <td className="px-3 py-2 border-b border-gray-200">{marketName}</td>
                    <td className="px-3 py-2 border-b border-gray-200">
                      ৳{order.price || order.amount}
                    </td>
                    <td className="px-3 py-2 border-b border-gray-200">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="px-3 py-2 border-b border-gray-200 text-sm text-green-700 break-all">
                      {order.transactionId || "N/A"}
                    </td>
                    <td className="px-3 py-2 border-b border-gray-200">
                      <Link
                        to={`/product/${productId}`}
                        className="text-white bg-green-600 hover:bg-green-700 p-2 rounded-md inline-flex items-center justify-center transition"
                        title="View Details"
                      >
                        <FaEye className="text-lg" />
                      </Link>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>

            <motion.tr
              className="font-semibold bg-green-100 text-green-800"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <td className="px-3 py-2 border-t border-green-300">Total</td>
              <td colSpan={2} className="px-3 py-2 border-t border-green-300">
                {orders.length} Products
              </td>
              <td className="px-3 py-2 border-t border-green-300">
                ৳
                {orders.reduce(
                  (sum, order) => sum + (order.price || order.amount || 0),
                  0
                )}
              </td>
              <td colSpan={3} className="border-t border-green-300"></td>
            </motion.tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 mt-4">
        <AnimatePresence>
          {orders.map((order, idx) => {
            const productQuery = productQueries[idx];
            const productData = productQuery?.data;

            const productName = productData?.name || order.productName || "N/A";
            const marketName = productData?.market || productData?.marketName || "N/A";
            const productId = order.productId;

            return (
              <motion.div
                key={order._id}
                className="bg-white rounded-lg shadow border border-gray-200 p-4 cursor-pointer"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover={{ scale: 1.03, boxShadow: "0px 6px 12px rgba(0,0,0,0.15)" }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-green-700">Order #{idx + 1}</span>
                  <Link
                    to={`/product/${productId}`}
                    className="inline-flex items-center justify-center rounded-md bg-green-600 px-3 py-1 text-white hover:bg-green-700 transition"
                    title={`View details for ${productName}`}
                    aria-label={`View details for ${productName}`}
                  >
                    <FaEye />
                  </Link>
                </div>
                <div className="text-gray-700 space-y-1">
                  <p>
                    <span className="font-semibold">Product:</span> {productName}
                  </p>
                  <p>
                    <span className="font-semibold">Market:</span> {marketName}
                  </p>
                  <p>
                    <span className="font-semibold">Price:</span> ৳{order.price || order.amount || 0}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p className="break-words max-w-full">
                    <span className="font-semibold">Transaction ID:</span>{" "}
                    {order.transactionId || "N/A"}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        <motion.div
          className="bg-green-100 text-green-800 font-semibold rounded-lg p-4 shadow mt-4 text-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          Total: {orders.length} Products | ৳
          {orders.reduce(
            (sum, order) => sum + (order.price || order.amount || 0),
            0
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MyOrder;