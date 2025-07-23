import axios from "axios";
import React, {useEffect, useState} from "react";
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
import {motion} from "framer-motion";
import {FaArrowTrendUp, FaArrowTrendDown} from "react-icons/fa6";

const PriceTrend = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceData, setPriceData] = useState([]);
  const [priceTrend, setPriceTrend] = useState(null);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API;

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
      setPriceData([{date: moment().format("MMM DD"), price: product.price}]);
      setPriceTrend(null);
    }
  };

  useEffect(() => {
    setLoading(true);
    const from = moment().subtract(30, "days").toISOString();
    const to = moment().endOf("day").toISOString();

    axios
      .get(`${API}/allProduct/approved`, {
        params: { from, to, page: 1, limit: 100 },
      })
      .then((res) => {
        setProducts(res.data.products);
        if (res.data.products.length > 0) {
          const firstProduct = res.data.products[0];
          setSelectedProduct(firstProduct);
          updatePriceData(firstProduct);
        }
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, [API]);

  const handleProductClick = (product) => {
    if (selectedProduct?._id === product._id) return;
    setLoading(true);
    setSelectedProduct(product);
    setTimeout(() => {
      updatePriceData(product);
      setLoading(false);
    }, 300);
  };

  // ✅ Define chart colors based on the price trend
  const chartColor = priceTrend >= 0 ? "#e53e3e" : "#16a34a"; // Red for up, Green for down
  const gradientId = `colorPrice_${selectedProduct?._id}`; // Unique ID for gradient

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:p-8">
        <main className="col-span-1  space-y-6">
          <div className="sticky top-[102px] z-20 mb-10 lg:mb-5">
            <div className="relative bg-white/40 backdrop-blur-xl border border-slate-200/50  rounded-xl shadow-lg p-3">
              <h3 className="text-sm font-bold text-slate-800 mb-1.5 text-center sm:text-left px-1">
                Select Product
              </h3>
              <div className="relative">
                <div className="flex gap-2.5 overflow-x-auto scrollbar-hide">
                  {products.map((product) => (
                    <button
                      key={product._id}
                      onClick={() => handleProductClick(product)}
                      className={`flex-shrink-0 flex flex-col items-center gap-1 w-[72px] p-1.5 rounded-lg transition-all duration-200 group ${
                        selectedProduct?._id === product._id
                          ? "bg-green-600 text-white shadow-md"
                          : "bg-slate-100 hover:bg-slate-200"
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-12 h-12 object-cover rounded-md transition-transform duration-300 ${
                          selectedProduct?._id === product._id
                            ? "scale-105"
                            : "group-hover:scale-105"
                        }`}
                      />
                      <span
                        className={`text-xs font-semibold w-full text-center truncate transition-colors ${
                          selectedProduct?._id === product._id
                            ? "text-white"
                            : "text-slate-700"
                        }`}
                      >
                        {product.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
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
                      initial={{opacity: 0, y: 10}}
                      animate={{opacity: 1, y: 0}}
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
                        margin={{top: 10, right: 30, left: 0, bottom: 0}}
                      >
                        <defs>
                          {/* ✅ Gradient color is now dynamic */}
                          <linearGradient
                            id={gradientId}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor={chartColor}
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor={chartColor}
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
                          stroke={chartColor} // ✅ Stroke color is now dynamic
                          strokeWidth={2}
                          fillOpacity={1}
                          fill={`url(#${gradientId})`} // ✅ Fill uses the dynamic gradient
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
