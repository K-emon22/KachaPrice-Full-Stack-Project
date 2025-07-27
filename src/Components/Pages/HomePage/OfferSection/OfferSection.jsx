// import React, {useEffect, useState} from "react";
// import {Swiper, SwiperSlide} from "swiper/react";
// import {Autoplay, Pagination, Navigation, EffectFade} from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/effect-fade";
// import axios from "axios";
// import {motion} from "framer-motion";
// import {FaArrowRight} from "react-icons/fa";

// // --- Skeleton Loader for a better UX ---
// const OfferSkeleton = () => (
//   <div className="bg-slate-200 rounded-2xl w-full h-[400px] animate-pulse"></div>
// );

// const OfferSection = () => {
//   const [offerProducts, setOfferProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOffers = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API}/alladvertisements`
//         );
//         const approved = res.data;

//         const withOfferText = approved.map((item) => ({
//           ...item,
//           offerText: item.offerText || "🌟 Special Offer!",
//         }));

//         setOfferProducts(withOfferText);
//       } catch (err) {
//         console.error("Failed to fetch ads:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOffers();
//   }, []);

//   return (
//     <div className="w-full pb-16 px-[2%] lg:px-[5%]">
//       {/* ✅ FIX: Added custom styles to reposition Swiper controls */}
//       <style>
//         {`
//                 .offer-swiper .swiper-button-next, .offer-swiper .swiper-button-prev {
//                     color: #ffffff;
//                     background-color: rgba(0, 0, 0, 0.3);
//                     width: 40px;
//                     height: 40px;
//                     border-radius: 50%;
//                     transition: background-color 0.3s, opacity 0.3s;
//                     opacity: 0; /* Initially hidden */
//                 }
//                 .offer-swiper:hover .swiper-button-next, .offer-swiper:hover .swiper-button-prev {
//                     opacity: 1; /* Visible on hover */
//                 }
//                 .offer-swiper .swiper-button-next:hover, .offer-swiper .swiper-button-prev:hover {
//                     background-color: rgba(0, 0, 0, 0.5);
//                 }
//                 .offer-swiper .swiper-button-next::after, .offer-swiper .swiper-button-prev::after {
//                     font-size: 18px;
//                     font-weight: bold;
//                 }
//                 .offer-swiper .swiper-pagination-bullet-active {
//                     background-color: #ffffff;
//                 }
//             `}
//       </style>
//       <div className=" ">
//         <motion.div
//           className="text-center mb-10"
//           initial={{opacity: 0, y: -20}}
//           whileInView={{opacity: 1, y: 0}}
//           viewport={{once: true, amount: 0.5}}
//           transition={{duration: 0.5}}
//         >
//           <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-3">
//             Exclusive Offers
//           </h2>
//           <p className="max-w-2xl mx-auto text-lg text-slate-500">
//             Don't miss out on these limited-time deals from our top vendors.
//           </p>
//         </motion.div>

//         {loading ? (
//           <OfferSkeleton />
//         ) : (
//           <Swiper
//             spaceBetween={30}
//             effect={"fade"}
//             autoplay={{delay: 4000, disableOnInteraction: false}}
//             pagination={{clickable: true}}
//             navigation={true}
//             modules={[Autoplay, Pagination, Navigation, EffectFade]}
//             className="w-full rounded-2xl shadow-xl offer-swiper" // ✅ Added a custom class
//             loop={true}
//           >
//             {offerProducts.map((product) => (
//               <SwiperSlide key={product._id}>
//                 <div className="relative w-full h-[400px] text-white">
//                   <img
//                     src={
//                       product.image ||
//                       "https://placehold.co/600x400/e2e8f0/64748b?text=No+Image"
//                     }
//                     alt={product.title}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
//                   <div className="absolute bg-black/30 bottom-0 left-0 p-8 w-full ">
//                     <motion.span
//                       className="text-sm bg-yellow-400 px-3 py-1 rounded-full w-max text-gray-800 mb-3 font-medium block"
//                       initial={{opacity: 0, y: 10}}
//                       animate={{opacity: 1, y: 0}}
//                       transition={{delay: 0.2}}
//                     >
//                       {product.offerText}
//                     </motion.span>
//                     <motion.h3
//                       className="text-3xl font-bold"
//                       initial={{opacity: 0, y: 10}}
//                       animate={{opacity: 1, y: 0}}
//                       transition={{delay: 0.3}}
//                     >
//                       {product.title}
//                     </motion.h3>
//                     <motion.p
//                       className="mt-2 text-slate-200 line-clamp-2"
//                       initial={{opacity: 0, y: 10}}
//                       animate={{opacity: 1, y: 0}}
//                       transition={{delay: 0.4}}
//                     >
//                       {product.description}
//                     </motion.p>
//                     <motion.div
//                       initial={{opacity: 0, y: 10}}
//                       animate={{opacity: 1, y: 0}}
//                       transition={{delay: 0.5}}
//                     >
//                       <button className="mt-6 bg-white text-slate-800 font-semibold px-6 py-2.5 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2">
//                         View Offer <FaArrowRight />
//                       </button>
//                     </motion.div>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OfferSection;

import React, {useEffect, useState} from "react";
import {Swiper, SwiperSlide, useSwiperSlide} from "swiper/react";
import {Autoplay, Pagination, Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import {motion} from "framer-motion";
import {FaArrowRight} from "react-icons/fa";
import {Link} from "react-router";

// --- Skeleton Loader ---
const OfferSkeleton = () => (
  <div className="bg-slate-200 rounded-2xl w-full h-[500px] md:h-[400px] animate-pulse"></div>
);

// --- Individual Slide Component with Advanced Animations ---
const OfferSlide = ({product}) => {
  const {isActive} = useSwiperSlide();

  const imageVariants = {
    inactive: {scale: 1, transition: {duration: 0.7, ease: "easeOut"}},
    active: {scale: 1.1, transition: {duration: 6, ease: "easeOut"}},
  };

  const textContainerVariants = {
    inactive: {opacity: 0},
    active: {
      opacity: 1,
      transition: {staggerChildren: 0.1, delayChildren: 0.3},
    },
  };

  const textItemVariants = {
    inactive: {opacity: 0, y: 20},
    active: {
      opacity: 1,
      y: 0,
      transition: {duration: 0.5, ease: "easeOut"},
    },
  };

  return (
    <div className="relative w-full h-[500px] md:h-[400px] flex flex-col md:flex-row animated-sea-green text-white rounded-2xl overflow-hidden">
      {/* Text Panel */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col justify-center p-6 pb-20 md:p-8 lg:p-12 order-2 md:order-1"
        variants={textContainerVariants}
        initial="inactive"
        animate={isActive ? "active" : "inactive"}
      >
        {/* --- NEW: Header for mobile layout --- */}
        <div className="flex justify-between items-center mb-4">
          <motion.span
            className="text-sm bg-yellow-400 px-3 py-1 rounded-full self-start text-slate-900 font-semibold block"
            variants={textItemVariants}
          >
            {product.offerText || "🌟 Special Offer!"}
          </motion.span>

          {/* Mobile-only Button */}
          <motion.div variants={textItemVariants} className="sm:hidden">
            <Link to={"/allproduct"}>
              {" "}
              <button className="text-xs bg-white text-slate-900 font-semibold px-4 py-1.5 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1.5">
                View <FaArrowRight size={10} />
              </button>
            </Link>
          </motion.div>
        </div>

        <motion.h3
          className="text-3xl md:text-3xl lg:text-4xl font-bold leading-tight"
          variants={textItemVariants}
        >
          {product.title}
        </motion.h3>
        <motion.p
          className="mt-3 text-slate-300 line-clamp-2 max-w-lg"
          variants={textItemVariants}
        >
          {product.description}
        </motion.p>

        {/* Desktop-only Button */}
        <motion.div variants={textItemVariants} className="hidden sm:block">
          <Link to={"/allproduct"}>
            {" "}
            <button className="mt-8 text-sm md:text-base bg-white text-slate-900 font-semibold px-5 py-2.5 md:px-6 md:py-3 rounded-lg hover:bg-slate-200 transition-transform duration-300 hover:scale-105 flex items-center gap-2 shadow-lg">
              View Offer <FaArrowRight />
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Image Panel */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full order-1 md:order-2">
        <div className="w-full h-full overflow-hidden">
          <motion.img
            src={
              product.image ||
              "https://placehold.co/800x800/e2e8f0/64748b?text=No+Image"
            }
            alt={product.title}
            className="w-full h-full object-cover"
            variants={imageVariants}
            initial="inactive"
            animate={isActive ? "active" : "inactive"}
          />
        </div>
      </div>
    </div>
  );
};

// --- Main Section Component ---
const OfferSection = () => {
  const [offerProducts, setOfferProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API}/alladvertisements`
        );
        setOfferProducts(res.data);
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
      <style>
        {`
          .offer-swiper .swiper-button-next, .offer-swiper .swiper-button-prev {
              color: #ffffff;
              background-color: rgba(0, 0, 0, 0.2);
              width: 44px;
              height: 44px;
              border-radius: 50%;
              transition: background-color 0.3s, opacity 0.3s, transform 0.3s;
              opacity: 0;
              transform: scale(0.8);
          }
          .offer-swiper:hover .swiper-button-next, .offer-swiper:hover .swiper-button-prev {
              opacity: 1;
              transform: scale(1);
          }
          .offer-swiper .swiper-button-next:hover, .offer-swiper .swiper-button-prev:hover {
              background-color: rgba(0, 0, 0, 0.4);
          }
          .offer-swiper .swiper-button-next::after, .offer-swiper .swiper-button-prev::after {
              font-size: 20px;
              font-weight: bold;
          }
          .offer-swiper .swiper-pagination {
              bottom: 20px !important;
          }
          .offer-swiper .swiper-pagination-bullet {
              background-color: rgba(255, 255, 255, 0.5);
              width: 8px;
              height: 8px;
              transition: all 0.3s;
          }
          .offer-swiper .swiper-pagination-bullet-active {
              background-color: #ffffff;
              width: 24px;
              border-radius: 5px;
          }
        `}
      </style>
      <div>
        <motion.div
          className="text-center mb-10"
          initial={{opacity: 0, y: -20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.5}}
          transition={{duration: 0.5}}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-3">
            Exclusive Offers
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-500">
            Don't miss out on these limited-time deals from our top vendors.
          </p>
        </motion.div>

        {loading ? (
          <OfferSkeleton />
        ) : (
          <Swiper
            spaceBetween={30}
            autoplay={{delay: 5000, disableOnInteraction: false}}
            pagination={{clickable: true}}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="w-full offer-swiper"
            loop={true}
          >
            {offerProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <OfferSlide product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default OfferSection;
