import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const offerProducts = [
  {
    _id: "6874a4e34c54ff89da39adf0",
    image: "https://i.ibb.co/bMVY6H0t/images-16.jpg",
    name: "Ginger",
    market: "Comilla Bibir Bazar",
    vendor: {
      name: "Abdul Karim",
      image: "https://i.ibb.co/7d2MgSmH/download-1.png"
    },
    offerText: "🔥 Special Price!"
  },
  {
    _id: "6874a4e34c54ff89da39adf1",
    image: "https://i.ibb.co/TtTZHZk/fresh-onion.jpg",
    name: "Onion",
    market: "Karwan Bazar",
    vendor: {
      name: "Rafiqul Islam",
      image: "https://i.ibb.co/7d2MgSmH/download-1.png"
    },
    offerText: "💥 Buy 1 Get 1 Free!"
  }
];

const OfferSection = () => {
  return (
    <div className="my-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        🎯 Special Offers
      </h2>

      <Swiper
        spaceBetween={30}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full"
      >
        {offerProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden border border-blue-200">
              <div className="md:w-1/2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-l-xl"
                />
              </div>

              <div className="p-6 md:w-1/2 flex flex-col justify-center">
                <span className="text-sm bg-yellow-400 px-3 py-1 rounded-full w-max text-gray-800 mb-3 font-medium">
                  {product.offerText}
                </span>
                <h3 className="text-xl font-bold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 mt-1">
                  <strong>Market:</strong> {product.market}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <img
                    src={product.vendor.image}
                    alt={product.vendor.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <p className="text-gray-700 text-sm">
                    <span className="font-medium">Vendor:</span>{" "}
                    {product.vendor.name}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OfferSection;