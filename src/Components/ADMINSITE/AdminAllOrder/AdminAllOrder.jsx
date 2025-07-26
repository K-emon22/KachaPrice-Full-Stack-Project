import React, {useContext, useEffect, useMemo} from "react";
import {useQuery, useQueries} from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import {AuthContext} from "../../ContextFiles/AuthContext";
import {motion, AnimatePresence} from "framer-motion";
import {FaBox, FaUserCircle} from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API;

const fetchPayments = async (accessToken) => {
  const {data} = await axios.get(`${BASE_URL}/payments`, {
    headers: {Authorization: `Bearer ${accessToken}`},
  });
  return data.data || [];
};

const fetchProductById = async (productId, accessToken) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/allProduct/${productId}`, {
      headers: {Authorization: `Bearer ${accessToken}`},
    });
    return data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

const OrderRowSkeleton = () => (
  <tr className="animate-pulse">
    <td className="p-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 bg-slate-200 rounded-full"></div>
        <div>
          <div className="h-4 bg-slate-200 rounded w-24 mb-1"></div>
          <div className="h-3 bg-slate-200 rounded w-32"></div>
        </div>
      </div>
    </td>
    <td className="p-4">
      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
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
  </tr>
);

const OrderRow = ({payment, product, isLoadingProduct, index}) => {
  return (
    <motion.tr
      className="hover:bg-slate-50/50 transition-colors duration-200"
      variants={{hidden: {opacity: 0, y: 20}, visible: {opacity: 1, y: 0}}}
      initial="hidden"
      animate="visible"
      transition={{delay: index * 0.05}}
    >
      <td className="p-4 align-middle">
        <div className="flex items-center gap-3">
          <img
            src={`https://api.dicebear.com/8.x/initials/svg?seed=${payment.name}`}
            alt={payment.name}
            className="w-10 h-10 rounded-full bg-slate-200"
          />
          <div>
            <p className="font-semibold text-slate-800">{payment.name}</p>
            <p className="text-xs text-slate-500">{payment.email}</p>
          </div>
        </div>
      </td>
      <td className="p-4 align-middle font-bold text-green-600">
        ৳{payment.amount}
      </td>
      <td
        className={`p-4 align-middle text-slate-700 ${
          product ? "font-bold text-lg" : "text-red-500"
        }`}
      >
        {isLoadingProduct ? "Loading..." : product?.name || "Product Removed"}
      </td>
      <td className="p-4 align-middle text-xs text-slate-500">
        {payment.transactionId}
      </td>
      <td className="p-4 align-middle text-sm text-slate-500">
        {moment(payment.createdAt).format("LLL")}
      </td>
    </motion.tr>
  );
};

const AdminAllOrder = () => {
  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }, []);

  const {accessToken, loading: authLoading} = useContext(AuthContext);

  const {
    data: payments = [],
    isLoading: isLoadingPayments,
    error: paymentsError,
  } = useQuery({
    queryKey: ["allPayments"],
    queryFn: () => fetchPayments(accessToken),
    enabled: !!accessToken,
  });

  const productIds = useMemo(() => {
    const ids = payments.map((p) => p.productId).filter(Boolean);
    return [...new Set(ids)];
  }, [payments]);

  const productQueries = useQueries({
    queries: productIds.map((productId) => ({
      queryKey: ["product", productId],
      queryFn: () => fetchProductById(productId, accessToken),
      enabled: !!accessToken,
      retry: false,
    })),
  });

  const productsMap = useMemo(() => {
    const map = new Map();
    productQueries.forEach((query) => {
      if (query.data) {
        map.set(query.data._id, query.data);
      }
    });
    return map;
  }, [productQueries]);

  const isLoading = authLoading || isLoadingPayments;

  return (
    <div className="min-h-screen pt-0 my-16 p-4 sm:p-6 lg:p-8">
      <motion.div
        className="text-center mb-12"
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">
          All Customer Orders
        </h1>
        <p className="text-lg text-slate-500 mt-2">
          A complete record of all transactions on the platform.
        </p>
      </motion.div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                Array.from({length: 5}).map((_, i) => (
                  <OrderRowSkeleton key={i} />
                ))
              ) : (
                <AnimatePresence>
                  {payments.map((payment, idx) => (
                    <OrderRow
                      key={payment._id}
                      payment={payment}
                      product={productsMap.get(payment.productId)}
                      isLoadingProduct={productQueries.some(
                        (q) => q.isFetching
                      )}
                      index={idx}
                    />
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
        {!isLoading && paymentsError && (
          <div className="text-red-500 p-4 text-center">
            {paymentsError.message || "Failed to load orders."}
          </div>
        )}
        {!isLoading && !paymentsError && payments.length === 0 && (
          <div className="text-center py-16 px-6">
            <FaBox className="mx-auto text-5xl text-slate-400 mb-4" />
            <h3 className="text-2xl font-semibold text-slate-700">
              No Orders Found
            </h3>
            <p className="text-slate-500 mt-2">
              There are currently no customer orders to display.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAllOrder;
