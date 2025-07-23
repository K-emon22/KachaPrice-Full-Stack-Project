import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { AuthContext } from "../../../ContextFiles/AuthContext";
import { motion } from "framer-motion";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

// --- Professional Skeleton Loader ---
const ProductCompareSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-pulse">
    <div className="h-8 bg-slate-200 rounded w-1/2 mx-auto mb-4"></div>
    <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto mb-8"></div>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
      <div className="h-6 bg-slate-200 rounded w-48"></div>
      <div className="h-12 bg-slate-200 rounded-full w-48"></div>
    </div>
    <div className="h-6 bg-slate-200 rounded w-1/3 mx-auto mb-8"></div>
    <div className="h-[350px] bg-slate-200 rounded-xl"></div>
  </div>
);

// --- Main Component ---
const colors = ["#3182ce", "#e53e3e", "#38a169", "#d69e2e", "#805ad5", "#dd6b20"];

const normalizeDate = (input) => {
  let dateObj;
  if (typeof input === "string") dateObj = new Date(input);
  else if (input?.$date) dateObj = new Date(input.$date);
  else dateObj = new Date(input);
  if (isNaN(dateObj)) return null;
  return dateObj.toISOString().split("T")[0];
};

const ProductCompare = ({ productId }) => {
  const { accessToken } = useContext(AuthContext);
  const [prices, setPrices] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [priceDiff, setPriceDiff] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      setIsFetching(true);
      try {
        if (!accessToken) {
          setError("You must be logged in to view this data.");
          return;
        }
        const res = await axios.get(
          `${import.meta.env.VITE_API}/allProduct/approved/${productId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const product = res.data;
        if (!product.createdAt || product.price == null) {
          setError("Product data missing price or creation date.");
          return;
        }
        const baseDate = normalizeDate(product.createdAt);
        if (!baseDate) {
          setError("Invalid creation date format.");
          return;
        }
        const basePrice = { date: baseDate, price: product.price };
        const normalizedPrices = (product.prices || [])
          .map((p) => {
            const date = normalizeDate(p.date);
            if (!date || p.price == null) return null;
            return { date, price: p.price };
          })
          .filter(Boolean);
        const mergedPrices = [...normalizedPrices, basePrice];
        const sortedPrices = mergedPrices.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setPrices(sortedPrices);
        if (sortedPrices.length > 1) {
          setSelectedDate(sortedPrices[sortedPrices.length - 2].date);
        } else {
          setSelectedDate("");
        }
        setError(null);
      } catch (err) {
        setError("Failed to fetch product data.");
      } finally {
        setIsFetching(false);
      }
    };
    if (productId) fetchPrices();
  }, [productId, accessToken]);

  useEffect(() => {
    if (!selectedDate || prices.length < 2) {
      setPriceDiff(null);
      return;
    }
    const latestPrice = prices[prices.length - 1]?.price;
    const selectedPriceObj = prices.find((p) => p.date === selectedDate);
    if (selectedPriceObj && latestPrice != null) {
      setPriceDiff(latestPrice - selectedPriceObj.price);
    } else {
      setPriceDiff(null);
    }
  }, [selectedDate, prices]);

  if (isFetching) return <ProductCompareSkeleton />;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">
        Price Trend Comparison
      </h2>
      <p className="text-slate-500 text-center mb-8">
        See how the current price compares to previous dates.
      </p>

      {prices.length < 2 ? (
        <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl">
          <p className="text-slate-500">Not enough historical data to compare prices.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col  items-center justify-center gap-4 mb-6">
            <label htmlFor="date-select" className="font-semibold text-slate-700">
              Compare current price with:
            </label>
            <select
              id="date-select"
              className="select select-bordered bg-slate-100 rounded-full focus:ring-2 focus:ring-green-500"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              {prices.slice(0, -1).map(({ date }) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>

          {priceDiff !== null && (
            <motion.div
              key={selectedDate}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center mb-8"
            >
              <div
                className={`flex items-center gap-2 text-lg font-bold px-4 py-2 rounded-full ${
                  priceDiff > 0
                    ? "bg-red-100 text-red-600"
                    : priceDiff < 0
                    ? "bg-green-100 text-green-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {priceDiff > 0 ? (
                  <FaArrowTrendUp />
                ) : priceDiff < 0 ? (
                  <FaArrowTrendDown />
                ) : null}
                <span>
                  {priceDiff > 0
                    ? `Increased by ৳${priceDiff.toFixed(2)}`
                    : priceDiff < 0
                    ? `Decreased by ৳${Math.abs(priceDiff).toFixed(2)}`
                    : "No Change"}
                </span>
              </div>
            </motion.div>
          )}

          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={prices}
                margin={{ top: 15, right: 20, left: 0, bottom: 5 }}
                barCategoryGap="20%"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#4a5568" }}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis
                  width={50}
                  tick={{ fontSize: 12, fill: "#4a5568" }}
                  tickFormatter={(value) => `৳${value}`}
                />
                <Tooltip
                  formatter={(value) => `৳${value.toFixed(2)}`}
                  contentStyle={{
                    borderRadius: "8px",
                    borderColor: "#e2e8f0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar dataKey="price" radius={[8, 8, 0, 0]}>
                  {prices.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCompare;
