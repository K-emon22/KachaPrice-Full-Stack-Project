import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.warn("Please enter a valid email address.");
      return;
    }

    toast.success("✅ Successfully subscribed!");
    setEmail(""); // clear the input
  };

  return (
    <motion.div
      className="bg-green-50 py-12 mx-[2%] lg:mx-[5%] my-16 rounded-3xl shadow-md"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-4">
          📬 Subscribe for Market Updates
        </h2>
        <p className="text-gray-700 mb-8 text-sm md:text-base">
          Get the latest vegetable price trends, export/import reports, and farmer market news directly to your inbox. No spam — just fresh updates!
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            aria-label="Email address"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 w-full sm:w-80 rounded-full border border-green-300 shadow-sm hover:shadow-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="btn-primary !rounded-full !h-12 shadow-md hover:shadow-lg transition duration-300"
          >
            Subscribe
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default NewsletterSection;