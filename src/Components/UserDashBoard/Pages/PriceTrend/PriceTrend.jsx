import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { motion } from "framer-motion";

const PriceTrend = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceData, setPriceData] = useState([]);
  const [priceTrend, setPriceTrend] = useState(null);
  const [loading, setLoading] = useState(false);

  const updatePriceData = (product) => {
    if (product.prices && product.prices.length > 0) {
      let combinedPrices = product.prices.map((entry) => ({
        date: entry.date,
        price: entry.price,
      }));

      combinedPrices.sort((a, b) => new Date(a.date) - new Date(b.date));

      combinedPrices.push({
        date: new Date().toISOString(),
        price: product.price,
      });

      const formatted = combinedPrices.map((entry) => ({
        date: moment(entry.date).format("MMM DD"),
        price: entry.price,
      }));

      setPriceData(formatted);

      const firstPrice = combinedPrices[0].price;
      const lastPrice = product.price;
      const change = ((lastPrice - firstPrice) / firstPrice) * 100;
      setPriceTrend(change.toFixed(1));
    } else {
      setPriceData([
        {
          date: moment().format("MMM DD"),
          price: product.price,
        },
      ]);
      setPriceTrend(null);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/allProduct")
      .then((res) => {
        setProducts(res.data);

        if (res.data.length > 0) {
          const firstProduct = res.data[0];
          setSelectedProduct(firstProduct);
          updatePriceData(firstProduct);
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const handleProductClick = (product) => {
    if (selectedProduct?._id === product._id) return; // prevent reloading same product
    setLoading(true);
    setSelectedProduct(product);
    // Simulate loading delay for demo (if your updatePriceData is sync, loading would be too fast otherwise)
    setTimeout(() => {
      updatePriceData(product);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 min-h-screen">
      {/* Sidebar for md+ */}
      <div className="hidden md:flex flex-col w-1/4 bg-white shadow rounded-xl pt-0 px-4 pb-4 max-h-screen overflow-y-auto">
        <h3 className="text-lg font-bold text-green-700 sticky top-0 bg-white z-10 border-b border-green-300 py-2">
          🛒 All Products
        </h3>
        <ul className="space-y-2 flex-1">
          {products.map((product) => (
            <li
              key={product._id}
              onClick={() => handleProductClick(product)}
              className={`cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg border ${
                selectedProduct?._id === product._id
                  ? "bg-green-100 border-green-600 text-green-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-10 h-10 object-cover rounded-md border"
              />
              <span>{product.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Horizontal scrollable product selector for small screens */}
    <div className="md:hidden w-full bg-white shadow rounded-xl pt-0 px-2 pb-2 overflow-x-auto whitespace-nowrap sticky top-0 z-20 border-b border-green-300 mb-4">
  <h3 className="text-lg font-bold text-green-700 mb-2 text-center">
    🛒 All Products
  </h3>

  {/* Wrapper that centers the nav */}
  <div className="flex justify-center">
    <nav className="flex gap-3 overflow-x-auto whitespace-nowrap px-2 w-[260px] sm:w-[350px]">
      {products.map((product) => (
        <button
          key={product._id}
          onClick={() => handleProductClick(product)}
          className={`inline-flex flex-col items-center min-w-[80px] px-2 py-1 rounded-lg border ${
            selectedProduct?._id === product._id
              ? "bg-green-100 border-green-600 text-green-700 font-semibold"
              : "border-transparent hover:border-green-400 hover:bg-green-50"
          }`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 object-cover rounded-md border mb-1"
          />
          <span className="text-xs truncate max-w-[80px]">{product.name}</span>
        </button>
      ))}
    </nav>
  </div>
</div>

      {/* Chart and product details */}
      <div className="flex flex-col w-full md:w-3/4 bg-white shadow rounded-xl p-4">
        {selectedProduct ? (
          <>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-20 h-20 object-cover rounded-md border"
              />
              <div>
                <h2 className="text-xl font-semibold text-green-700">
                  📈 {selectedProduct.name}
                </h2>
                <p className="text-sm text-gray-600">
                  📍 {selectedProduct.market}
                </p>
                <p className="text-sm text-gray-600">
                  👤 {selectedProduct.vendor?.name}
                </p>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-[60vh]">
                <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : priceData.length > 0 ? (
              <div style={{ height: "60vh", width: "100%" }} className="flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={priceData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis unit="৳" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#16a34a"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-center text-gray-500">No price history available.</p>
            )}

            {/* Trend summary with reversed color + shadow + animation */}
            <div className="mt-10 pt-4 border-t border-gray-200 text-center text-sm font-medium">
              {priceTrend !== null ? (
                <motion.div
                  key={priceTrend} // animates on change
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
                  className={`inline-block px-3 py-1 rounded-lg font-semibold
                    ${
                      priceTrend < 0
                        ? "text-green-600 bg-green-100 shadow-lg"
                        : "text-red-600 bg-red-100 shadow-lg"
                    }
                    text-shadow-md
                    `}
                >
                  Trend:{" "}
                  <span>
                    {priceTrend > 0 ? "+" : ""}
                    {priceTrend}%
                  </span>{" "}
                  since the first recorded price.
                </motion.div>
              ) : (
                <span className="text-gray-500">No price trend available.</span>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Select a product to see price trend.</p>
        )}
      </div>
    </div>
  );
};

export default PriceTrend;  