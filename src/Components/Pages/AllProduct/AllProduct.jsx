import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router";
import {motion} from "framer-motion";
import {FaSearch} from "react-icons/fa";
import {IoClose} from "react-icons/io5";
import Loader from "../../Loader/Loader";

const AllProduct = () => {
  const [allVeg, setAllVeg] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(true);
  console.log(allVeg);
  
  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }, []);
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchText, sort, fromDate, toDate]);

  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (searchText) queryParams.append("search", searchText);
      if (sort) queryParams.append("sort", sort);
      if (fromDate) queryParams.append("from", fromDate);
      if (toDate) queryParams.append("to", toDate);

      const response = await axios.get(
        `http://localhost:3000/allProduct?${queryParams}`
      );
      setAllVeg(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="mx-[2%] lg:mx-[5%] text-black min-h-screen">
      <motion.h1
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.6}}
        className="text-4xl font-bold mt-16 mb-10 text-center text-green-600"
      >
        🛒 Explore Fresh Market Products
      </motion.h1>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {/* Search */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-2">
          <div className="relative w-full">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder=" Search product or market"
              className="w-full pl-4 pr-20 py-3 rounded-full bg-white/80 backdrop-blur-md border border-gray-300 shadow-md
                focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent
                transition-all placeholder:text-gray-400 text-sm text-gray-700"
            />
            {searchText && (
              <button
                onClick={() => setSearchText("")}
                className="absolute right-10 inset-y-0 flex items-center justify-center text-gray-400 hover:text-red-500 transition"
              >
                <IoClose size={16} />
              </button>
            )}
            <span className="absolute right-2 inset-y-0 flex items-center">
              <div className="bg-green-600 hover:bg-green-700 transition p-2 rounded-full shadow-md text-white">
                <FaSearch size={14} />
              </div>
            </span>
          </div>
        </div>

        {/* Date Range */}
        <div className="w-full">
          <div className="flex items-center justify-between px-3 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-300 shadow-md focus-within:ring-2 focus-within:ring-green-600 transition-all">
            <div className="w-1/2 pr-1">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full text-sm text-gray-700 focus:outline-none bg-transparent"
              />
            </div>
            <span className="mx-2 text-gray-400 text-sm select-none">to</span>
            <div className="w-1/2 pl-1">
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full text-sm text-gray-700 focus:outline-none bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Sort */}
        <div className="w-full">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="select select-bordered w-full bg-white/80 backdrop-blur-md rounded-full text-gray-700 shadow-md
              focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">Sort By</option>
            <option value="lowToHigh">Price Low To High</option>
            <option value="highToLow">Price High To Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-8">
        {allVeg.map((veg, index) => {
          const displayDate = veg.createdAt
            ? new Date(veg.createdAt)
            : new Date();

          return (
            <motion.div
              key={veg._id}
              initial={{opacity: 0, y: 30}}
              whileInView={{opacity: 1, y: 0}}
              transition={{delay: index * 0.05, duration: 0.4}}
              viewport={{once: false, amount: 0.2}}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="relative overflow-hidden rounded-t-2xl h-48 group">
                <img
                  src={veg.image}
                  alt={veg.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <div className="p-5 flex flex-col justify-between flex-grow">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {veg.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">
                      ৳
                      <span className="text-green-600 font-semibold">
                        {veg.price}
                      </span>
                    </span>{" "}
                    • {veg.market}
                  </p>
                  <p className="text-sm text-gray-500">
                    {displayDate.toLocaleDateString()}
                  </p>
                  <p
                    className="text-gray-700 text-sm line-clamp-2 mt-2"
                    title={veg.description}
                  >
                    {veg.description}
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <p className="text-gray-800 font-medium">
                      {veg.vendor?.name || "Unknown Vendor"}
                    </p>
                  </div>
                  <Link to={`/product/${veg._id}`} className="btn-primary">
                    See More
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProduct;
