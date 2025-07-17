import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const SortedSix = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchSixProducts();
  }, []);

  const fetchSixProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/lowestSix");
      setProducts(response.data);
    } catch (error) {}
  };

  return (
    <div className="mx-[2%] lg:mx-[5%] my-16 ">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center text-green-600 mb-10"
      >
        🏷️ Fresh Picks from Different Markets
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((veg, index) => {
          const displayDate = veg.createdAt ? new Date(veg.createdAt) : new Date();

          return (
            <motion.div
              key={veg._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              viewport={{ once: false, amount: 0.2 }}
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
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{veg.name}</h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">
                      ৳
                      <span className="text-green-600 font-semibold">{veg.price}</span>
                    </span>{" "}
                    • {veg.market}
                  </p>
                  <p className="text-sm text-gray-500">{displayDate.toLocaleDateString()}</p>
                  <p className="text-gray-700 text-sm line-clamp-2 mt-2" title={veg.description}>
                    {veg.description}
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <p className="text-gray-800 font-medium">{veg.vendor?.name || "Unknown Vendor"}</p>
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

export default SortedSix;