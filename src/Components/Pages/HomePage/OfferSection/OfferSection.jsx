import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import axios from "axios";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

// --- Skeleton Loader for a better UX ---
const OfferSkeleton = () => (
    <div className="bg-slate-200 rounded-2xl w-full h-[400px] animate-pulse"></div>
);

const OfferSection = () => {
  const [offerProducts, setOfferProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API}/alladvertisements`
        );
        const approved = res.data;

        const withOfferText = approved.map((item) => ({
          ...item,
          offerText: item.offerText || "🌟 Special Offer!",
        }));

        setOfferProducts(withOfferText);
      } catch (err) {
        console.error("Failed to fetch ads:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div className="w-full pb-16 px-[2%] lg:px-[5%]">
        {/* ✅ FIX: Added custom styles to reposition Swiper controls */}
        <style>
            {`
                .offer-swiper .swiper-button-next, .offer-swiper .swiper-button-prev {
                    color: #ffffff;
                    background-color: rgba(0, 0, 0, 0.3);
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    transition: background-color 0.3s, opacity 0.3s;
                    opacity: 0; /* Initially hidden */
                }
                .offer-swiper:hover .swiper-button-next, .offer-swiper:hover .swiper-button-prev {
                    opacity: 1; /* Visible on hover */
                }
                .offer-swiper .swiper-button-next:hover, .offer-swiper .swiper-button-prev:hover {
                    background-color: rgba(0, 0, 0, 0.5);
                }
                .offer-swiper .swiper-button-next::after, .offer-swiper .swiper-button-prev::after {
                    font-size: 18px;
                    font-weight: bold;
                }
                .offer-swiper .swiper-pagination-bullet-active {
                    background-color: #ffffff;
                }
            `}
        </style>
        <div className=" ">
            <motion.div 
                className="text-center mb-10"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-3">
                    Exclusive Offers
                </h2>
                <p className="max-w-2xl mx-auto text-lg text-slate-500">
                    Don't miss out on these limited-time deals from our top vendors.
                </p>
            </motion.div>

            {loading ? <OfferSkeleton /> : (
                <Swiper
                    spaceBetween={30}
                    effect={"fade"}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation, EffectFade]}
                    className="w-full rounded-2xl shadow-xl offer-swiper" // ✅ Added a custom class
                    loop={true}
                >
                    {offerProducts.map((product) => (
                        <SwiperSlide key={product._id}>
                            <div className="relative w-full h-[400px] text-white">
                                <img
                                    src={product.image || "https://placehold.co/600x400/e2e8f0/64748b?text=No+Image"}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                                <div className="absolute bg-black/30 bottom-0 left-0 p-8 w-full ">
                                    <motion.span 
                                        className="text-sm bg-yellow-400 px-3 py-1 rounded-full w-max text-gray-800 mb-3 font-medium block"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {product.offerText}
                                    </motion.span>
                                    <motion.h3 
                                        className="text-3xl font-bold"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {product.title}
                                    </motion.h3>
                                    <motion.p 
                                        className="mt-2 text-slate-200 line-clamp-2"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        {product.description}
                                    </motion.p>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <button className="mt-6 bg-white text-slate-800 font-semibold px-6 py-2.5 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2">
                                            View Offer <FaArrowRight />
                                        </button>
                                    </motion.div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    </div>
  );
};

export default OfferSection;
