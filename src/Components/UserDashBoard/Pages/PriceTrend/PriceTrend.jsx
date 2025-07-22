import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

const PriceTrend = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceData, setPriceData] = useState([]);
  const [priceTrend, setPriceTrend] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setPriceData([{ date: moment().format("MMM DD"), price: product.price }]);
      setPriceTrend(null);
    }
  };

  useEffect(() => {
    setLoading(true);
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
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleProductClick = (product) => {
    if (selectedProduct?._id === product._id) return;
    setLoading(true);
    setSelectedProduct(product);
    setTimeout(() => {
      updatePriceData(product);
      setLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:p-8">
        <main className="col-span-1 lg:col-span-3 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">
              Select Product
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
              {products.map((product) => (
                <button
                  key={product._id}
                  onClick={() => handleProductClick(product)}
                  className={`flex-shrink-0 flex flex-col items-center gap-2 w-24 p-2 rounded-lg transition-all duration-200 ${
                    selectedProduct?._id === product._id
                      ? "bg-green-100 ring-2 ring-green-500"
                      : "bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <span className="text-xs font-semibold text-slate-700 truncate w-full text-center">
                    {product.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center bg-white rounded-xl shadow-sm h-[70vh]">
              <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : selectedProduct ? (
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-16 h-16 object-cover rounded-lg shadow-md"
                  />
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {selectedProduct.market} • by{" "}
                      {selectedProduct.vendor?.name || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-baseline gap-4 bg-slate-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-slate-500 font-medium">
                      Current Price
                    </p>
                    <p className="text-4xl font-bold text-green-600">
                      ৳{selectedProduct.price}
                    </p>
                  </div>
                  {priceTrend !== null && (
                    <motion.div
                      key={priceTrend}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-center gap-1 font-semibold text-sm px-2 py-1 rounded-full ${
                        priceTrend >= 0
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {priceTrend >= 0 ? (
                        <FaArrowTrendUp />
                      ) : (
                        <FaArrowTrendDown />
                      )}
                      <span>{Math.abs(priceTrend)}%</span>
                    </motion.div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Price History
                </h3>
                {priceData.length > 1 ? (
                  <div className="h-[50vh] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={priceData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="colorPrice"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#16a34a"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#16a34a"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                        <YAxis unit="৳" stroke="#94a3b8" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e0e0e0",
                            borderRadius: "0.5rem",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke="#16a34a"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorPrice)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-[50vh] flex items-center justify-center bg-slate-50 rounded-lg">
                    <p className="text-slate-500">
                      Not enough data for a price trend.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center bg-white rounded-xl shadow-sm h-[70vh]">
              <p className="text-slate-500">
                Select a product to view its price trend.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PriceTrend;