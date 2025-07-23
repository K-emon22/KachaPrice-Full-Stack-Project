import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router"; // ✅ Corrected import
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

// ✅ Professional Skeleton Loader for the Product Card
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

const SortedSix = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    fetchSixProducts();
  }, []);

  const fetchSixProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API}/allProduct/sortedsix`);
      // Ensure the response structure is handled correctly
      setProducts(response.data.products || response.data); 
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Fresh Picks from Our Markets
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500">
            Hand-selected daily essentials, brought to you from the best local vendors.
          </p>
        </motion.div>

        {/* ✅ Conditional Rendering for Skeleton vs. Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : (
            products.map((veg, index) => {
              const displayDate = veg.createdAt ? new Date(veg.createdAt) : new Date();

              return (
                <motion.div
                  key={veg._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: false, amount: 0.2 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group overflow-hidden"
                >
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={veg.image || 'https://placehold.co/400x300/e2e8f0/64748b?text=No+Image'}
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
                      <h3 className="text-xl font-bold text-slate-800 line-clamp-1">{veg.name}</h3>
                      <p className="text-sm text-slate-500">
                        Listed on {displayDate.toLocaleDateString()}
                      </p>
                      <p className="text-slate-600 text-sm line-clamp-2 pt-1 text-justify" title={veg.description}>
                        {veg.description}
                      </p>
                      {/* ✅ Added vendorName here */}
                      <p className="text-sm text-slate-500 pt-2">
                        Sold by: <span className="font-semibold text-slate-700">{veg.vendorName || "Unknown Vendor"}</span>
                      </p>
                    </div>

                    <div className="mt-5 flex justify-between items-center">
                      <div className="flex flex-col">
                         <p className="text-sm text-slate-500">Price</p>
                         <p className="text-2xl font-extrabold text-green-600">
                           ৳{veg.price}
                         </p>
                      </div>
                      <Link to={`/product/${veg._id}`} className="bg-green-600 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 transform group-hover:scale-105 group-hover:bg-green-700 transition-all duration-300">
                        Details <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div> 
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default SortedSix;
