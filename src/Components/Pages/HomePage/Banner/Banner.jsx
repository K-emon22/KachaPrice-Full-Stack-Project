import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {motion} from "framer-motion";
import {Fade} from "react-awesome-reveal";
import {Link} from "react-router";

const slides = [
  {
    id: 1,
    image:
      "https://i.ibb.co/V0d4d7Jt/best-vegetable-grow-in-greenhouse-scaled-jpeg-1920x1080.webp",
    title: "Fresh Local Market Prices",
    subtitle: "Stay updated with daily price trends at your fingertips.",
  },
  {
    id: 2,
    image:
      "https://i.ibb.co/1GWZC8vj/585774-3840x2160-desktop-4k-vegetables-background-photo-1920x1080.jpg",
    title: "Compare Prices Across Markets",
    subtitle: "Make informed decisions with transparent pricing data.",
  },
  {
    id: 3,
    image:
      "https://i.ibb.co/jPvXqWNK/vegetables-2.webp",
    title: "Real-Time Updates",
    subtitle: "Vendors update daily prices to keep you informed.",
  },
];

const Banner = () => {
  return (
    <div className="overflow-hidden px-[1%] rounded-lg">
      {" "}
      {/* Prevent horizontal scroll */}
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        navigation
        pagination={{clickable: true}}
        autoplay={{delay: 4000, disableOnInteraction: false}}
        loop
        className="h-[60vh] relative max-w-full"
        grabCursor={true}
      >
        {slides.map(({id, image, title, subtitle}) => (
          <SwiperSlide key={id}>
            <div className="relative w-full h-full flex justify-center items-center text-center overflow-hidden rounded-lg shadow-2xl">
              {/* Background Image with slow zoom-in */}
              <motion.div
                className="absolute inset-0 bg-center bg-cover rounded-lg"
                style={{backgroundImage: `url(${image})`}}
                initial={{scale: 1}}
                animate={{scale: 1.1}}
                transition={{duration: 10, ease: "easeInOut"}}
              />
              {/* Overlay Gradient for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
              {/* Content */}
              <div className="relative z-10 max-w-4xl px-6 md:px-0">
                <motion.h2
                  initial={{opacity: 0, y: -30}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 1, delay: 0.3, ease: "easeOut"}}
                  className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-xl tracking-wide"
                >
                  {title}
                </motion.h2>
                <Fade cascade duration={1200} triggerOnce>
                  <p className="mt-4 text-lg md:text-2xl text-white drop-shadow-md max-w-xl mx-auto font-light">
                    {subtitle}
                  </p>
                </Fade>
                <Link to={"/allproduct"}>
                  <motion.button
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1, delay: 1.2, ease: "easeOut"}}
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    className="mt-8 btn-primary !rounded-full !h-14 shadow-lg tracking-wide"
                  >
                    Explore Now
                  </motion.button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
