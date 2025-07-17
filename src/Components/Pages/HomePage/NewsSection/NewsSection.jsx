import React from "react";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";

const newsArticles = [
  {
    id: 1,
    title: "🥦 Vegetable Prices Drop Across Local Markets",
    image: "https://i.ibb.co/WvX4mwyw/market-800x600.jpg",
    date: "2025-07-13",
    summary:
      "Due to last week's consistent rainfall and increased supply, prices of key vegetables like tomatoes, eggplants, and potatoes have dropped significantly across Dhaka and Chittagong. Experts from India stated this regional surplus is impacting South Asian trade routes. Bangladesh exported 1,200 tons of surplus potatoes to Nepal and Bhutan this week, while import volume dropped by 18% from India. Local market authorities expect this trend to ease inflation temporarily, though they warn farmers may face losses if prices keep falling.",
  },
  {
    id: 2,
    title: "🍅 Tomato Surplus in Northern Districts",
    image: "https://i.ibb.co/fzBjNwDV/tomato-1689156482-600x300.jpg",
    date: "2025-07-12",
    summary:
      "Rangpur and Dinajpur experienced a record-breaking tomato harvest this season. Local farmers sold over 8,500 tons in just 6 days. According to the Ministry of Agriculture, Bangladesh is now considering exporting tomatoes to the UAE and Malaysia. Meanwhile, Pakistan's agri department expressed concern about regional oversupply.",
  },
  {
    id: 3,
    title: "🌽 Vendors Slash Prices Ahead of Weekly Market Day",
    image: "https://i.ibb.co/ZR72YW8L/farmer-market-2-600x300.jpg",
    date: "2025-07-11",
    summary:
      "Karwan Bazar and Bibir Bazar vendors announced major price cuts ahead of Friday’s haat. Ginger dropped to BDT 78/kg, garlic to BDT 95/kg, and green chilies are now BDT 60/kg. Export requests from Qatar and Oman increased 30%. Economists say it's a good sign for seasonal vendors.",
  },
];

const NewsSection = () => {
  return (
    <div className="my-16 px-[2%] lg:px-[5%] overflow-hidden">
      <Fade cascade damping={0.1}>
        <h2 className="text-3xl font-bold text-green-600 text-center mb-10">
          📰 Vegetable Market News
        </h2>
      </Fade>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-2">
        {/* Left Column - Featured Article */}
        <motion.div
          className="bg-white rounded-2xl shadow flex flex-col h-full"
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-80 md:h-[400px] rounded-t-2xl overflow-hidden">
            <img
              src={newsArticles[0].image}
              alt={newsArticles[0].title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6 flex flex-col justify-between ">
            <h3 className="text-xl font-semibold text-gray-900">
              {newsArticles[0].title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(newsArticles[0].date).toLocaleDateString()}
            </p>
            <p className="text-gray-700 text-sm mt-3">{newsArticles[0].summary}</p>
          </div>
        </motion.div>

        {/* Right Column - Two Articles Stacked */}
        <div className="flex flex-col justify-between gap-6">
          {newsArticles.slice(1).map((article, index) => (
            <motion.div
              key={article.id}
              className="bg-white rounded-2xl shadow flex flex-col flex-grow"
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
            >
              <div className="h-44 md:h-52 rounded-t-2xl overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 flex flex-col justify-between flex-grow">
                <h3 className="text-lg font-semibold text-gray-900">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(article.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 text-sm mt-3">{article.summary}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSection;