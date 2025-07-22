import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import {AuthContext} from "../../../ContextFiles/AuthContext";

const colors = [
  "#3182ce",
  "#e53e3e",
  "#38a169",
  "#d69e2e",
  "#805ad5",
  "#dd6b20",
];

const normalizeDate = (input) => {
  let dateObj;
  if (typeof input === "string") {
    dateObj = new Date(input);
  } else if (input?.$date) {
    dateObj = new Date(input.$date);
  } else {
    dateObj = new Date(input);
  }
  if (isNaN(dateObj)) return null;
  return dateObj.toISOString().split("T")[0];
};

const ProductCompare = ({productId}) => {
  const {accessToken} = useContext(AuthContext);
  const [prices, setPrices] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [priceDiff, setPriceDiff] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        if (!accessToken) {
          setError("You must be logged in to view this data.");
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_API}/allProduct/approved/${productId}`,
          {
            headers: {Authorization: `Bearer ${accessToken}`},
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

        const basePrice = {date: baseDate, price: product.price};

        const normalizedPrices = (product.prices || [])
          .map((p) => {
            const date = normalizeDate(p.date);
            if (!date || p.price == null) return null;
            return {date, price: p.price};
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
        if (err.response?.status === 401) {
          setError("Unauthorized. Please login to continue.");
        } else if (err.response) {
          setError(`Failed to fetch product data: ${err.response.statusText}`);
        } else {
          setError("Failed to fetch product data.");
        }
      }
    };

    fetchPrices();
  }, [productId, accessToken]);

  useEffect(() => {
    if (!selectedDate || prices.length === 0) {
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

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10 text-center text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <section className=" my-16 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-extrabold text-green-600 text-center mb-8">
        📊 Price Trend Comparison
      </h2>

      {!prices.length ? (
        <p className="text-center text-gray-500 text-lg">
          No price data available.
        </p>
      ) : (
        <>
          <label
            htmlFor="date-select"
            className="block mb-3 font-semibold text-gray-700 text-center"
          >
            Select a previous date to compare:
          </label>
          <div className="flex justify-center mb-6">
            <select
              id="date-select"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              {prices.slice(0, -1).map(({date}, index) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>

          {priceDiff !== null && (
            <p
              className={`text-center text-lg font-semibold mb-8 ${
                priceDiff > 0
                  ? "text-red-600"
                  : priceDiff < 0
                  ? "text-green-600"
                  : "text-gray-600"
              }`}
            >
              Price has{" "}
              {priceDiff > 0
                ? `increased by ৳${priceDiff.toFixed(2)}`
                : priceDiff < 0
                ? `decreased by ৳${Math.abs(priceDiff).toFixed(2)}`
                : "not changed"}{" "}
              since {selectedDate}.
            </p>
          )}

          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={prices}
              margin={{top: 15, right: 20, left: 0, bottom: 5}}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="date"
                tick={{fontSize: 12, fill: "#4a5568"}}
                padding={{left: 10, right: 10}}
              />
              <YAxis
                width={50}
                tick={{fontSize: 12, fill: "#4a5568"}}
                tickFormatter={(value) => `৳${value}`}
              />
              <Tooltip
                formatter={(value) => `৳${value.toFixed(2)}`}
                contentStyle={{borderRadius: "8px", borderColor: "#c6f6d5"}}
              />
              <Legend wrapperStyle={{fontWeight: "bold", color: "#2f855a"}} />
              <Bar
                dataKey="price"
                radius={[8, 8, 0, 0]}
                isAnimationActive={true}
                fill="#38a169"
              >
                {prices.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </section>
  );
};

export default ProductCompare;
