
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";


const ProductCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
    <div className="bg-slate-200 h-52 w-full"></div>
    <div className="p-5 space-y-4">
      <div className="h-5 bg-slate-200 rounded w-3/4"></div>
      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
      <div className="h-3 bg-slate-200 rounded w-1/3"></div>
      <div className="flex justify-between items-center pt-3">
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        <div className="h-10 bg-slate-200 rounded-full w-28"></div>
      </div>
    </div>
  </div>
);

const AllProduct = () => {
  const [allVeg, setAllVeg] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(true);


  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);


  const searchInputRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search") || "";
    const sortParam = params.get("sort") || "";
    const from = params.get("from");
    const to = params.get("to");

    const formatDate = (isoDate) => (isoDate ? isoDate.split("T")[0] : "");

    setSearchText(search);
    setSort(sortParam);
    setFromDate(formatDate(from));
    setToDate(formatDate(to));
  }, []);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const newParams = new URLSearchParams();
      if (searchText) newParams.set("search", searchText);
      if (sort) newParams.set("sort", sort);
      if (fromDate) newParams.set("from", fromDate);
      if (toDate) newParams.set("to", toDate);

      const newUrl = `${window.location.pathname}?${newParams.toString()}`;
      window.history.replaceState(null, "", newUrl);

      fetchProducts();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchText, sort, fromDate, toDate, page]);


  useEffect(() => {
    if (!loading && searchText && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [loading]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (searchText) queryParams.append("search", searchText);
      if (sort) queryParams.append("sort", sort);
      if (fromDate) queryParams.append("from", `${fromDate}T00:00:00Z`);
      if (toDate) queryParams.append("to", `${toDate}T23:59:59Z`);
      queryParams.append("page", page);
      queryParams.append("limit", limit);

      const res = await axios.get(
        `${import.meta.env.VITE_API}/allProduct/approved?${queryParams}`
      );
      setAllVeg(res.data.products || res.data);
      setTotalProducts(res.data.total || 0);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products.");
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <div className="mx-[2%] lg:mx-[5%] text-black min-h-screen pb-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mt-16 mb-10 text-center text-green-600"
      >
        🛒 Explore Fresh Market Products
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <div className="col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-2">
          <div className="relative w-full">
            <input
              ref={searchInputRef}
              type="text"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setPage(1);
              }}
              placeholder=" Search product or market"
              className="w-full pl-4 pr-20 py-3 rounded-full bg-white/80 backdrop-blur-md border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all placeholder:text-gray-400 text-sm text-gray-700"
            />
            {searchText && (
              <button
                onClick={() => {
                  setSearchText("");
                  setPage(1);
                }}
                className="absolute right-12 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400 hover:text-red-500 transition"
              >
                <IoClose size={20} />
              </button>
            )}
            <span className="absolute right-2 inset-y-0 flex items-center">
              <div className="bg-green-600 hover:bg-green-700 transition p-2 rounded-full shadow-md text-white">
                <FaSearch size={14} />
              </div>
            </span>
          </div>
        </div>

        <div className="w-full">
          <div className="flex items-center justify-between px-3 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-300 shadow-md focus-within:ring-2 focus-within:ring-green-600 transition-all">
            <div className="w-1/2">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => {
                  const newFrom = e.target.value;
                  if (toDate && newFrom > toDate) {
                    toast.error("Start date can't be after end date!");
                    return;
                  }
                  setFromDate(newFrom);
                  setPage(1);
                }}
                className="w-full text-sm text-gray-700 focus:outline-none bg-transparent"
              />
            </div>
            <span className="mx-2 text-gray-400 text-sm select-none">-</span>
            <div className="w-1/2 ">
              <input
                type="date"
                value={toDate}
                onChange={(e) => {
                  const newTo = e.target.value;
                  if (fromDate && newTo < fromDate) {
                    toast.error("End date can't be before start date!");
                    return;
                  }
                  setToDate(newTo);
                  setPage(1);
                }}
                className="w-full text-sm text-gray-700 focus:outline-none bg-transparent"
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="select select-bordered w-full bg-white/80 backdrop-blur-md rounded-full text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">Sort By</option>
            <option value="lowToHigh">Price Low To High</option>
            <option value="highToLow">Price High To Low</option>
          </select>
        </div>
      </div>


      <div className="relative mt-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : allVeg.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4 gap-8">
            {allVeg.map((veg, index) => {
              const displayDate = veg.createdAt
                ? new Date(veg.createdAt)
                : new Date();
              const latestPrice =
                veg.price ??
                (veg.prices?.length > 0
                  ? veg.prices[veg.prices.length - 1].price
                  : "N/A");

              return (
                <motion.div
                  key={veg._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group overflow-hidden"
                >
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={
                        veg.image ||
                        "https://placehold.co/400x300/e2e8f0/64748b?text=No+Image"
                      }
                      alt={veg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <p className="absolute bottom-3 left-4 text-white text-lg font-bold">
                      {veg.market}
                    </p>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-800 line-clamp-1">
                        {veg.name}
                      </h3>
                      <p className="text-sm text-slate-500">
                        Listed on {displayDate.toLocaleDateString()}
                      </p>
                      <p
                        className="text-slate-600 text-sm line-clamp-2 pt-1 text-justify"
                        title={veg.description}
                      >
                        {veg.description}
                      </p>
                      <p className="text-sm text-slate-500 pt-2">
                        Sold by:{" "}
                        <span className="font-semibold text-slate-700">
                          {veg.vendorName || "Unknown Vendor"}
                        </span>
                      </p>
                    </div>

                    <div className="mt-5 flex justify-between items-center">
                      <div className="flex flex-col">
                        <p className="text-sm text-slate-500">Price</p>
                        <p className="text-2xl font-extrabold text-green-600">
                          ৳{latestPrice}
                        </p>
                      </div>
                      <Link
                        to={`/product/${veg._id}`}
                        className="bg-green-600 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 transform group-hover:scale-105 group-hover:bg-green-700 transition-all duration-300"
                      >
                        Details{" "}
                        <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center justify-center mt-20 text-center text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 mb-4 text-green-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">
              No Products Found
            </h2>
            <p className="max-w-xs text-gray-500">
              Try changing your search or filter criteria to find what you’re
              looking for.
            </p>
          </motion.div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1 || loading}
            className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              disabled={loading}
              className={`px-4 py-2 rounded-full transition ${
                p === page
                  ? "bg-green-700 text-white font-bold shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-green-100"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages || loading}
            className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProduct;
