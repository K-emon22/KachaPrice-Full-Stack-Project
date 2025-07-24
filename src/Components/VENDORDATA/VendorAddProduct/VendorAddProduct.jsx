import React, { useContext, useState } from "react";
import { AuthContext } from "../../ContextFiles/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaBox, FaDollarSign, FaStore, FaImage, FaAlignLeft, FaPaperPlane } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// The FormInput component is defined outside the main component
// to prevent it from being re-created on every render, which preserves focus.
const FormInput = ({ icon, name, placeholder, type = "text", value, onChange, required = true }) => (
    <motion.div className="relative" variants={itemVariants}>
      <div className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        value={value}
        onChange={onChange}
        required={required}
      />
    </motion.div>
  );


const VendorAddProduct = () => {
  const { user, accessToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_API;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    market: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const product = {
      ...formData,
      price: parseFloat(formData.price),
      status: "pending",
      createdAt: new Date().toISOString(),
      role: "vendor",
      prices: [],
      vendorName: user?.displayName || "Unknown Vendor",
      vendorEmail: user?.email,
      vendorImage: user?.photoURL || "https://i.ibb.co/TDfc7yYp/images-8.png",
    };

    try {
      const res = await axios.post(`${BASE_URL}/allProduct`, product, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.status === 200 || res.status === 201) {
        toast.success("Product added successfully!");
        toast.info("Your product is awaiting admin approval.");
        setFormData({
          name: "",
          price: "",
          market: "",
          image: "",
          description: "",
        });
      } else {
        toast.error(`❌ Error: ${res.data.error || "Something went wrong"}`);
      }
    } catch (err) {
      toast.error(`⚠️ Network error: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        className="max-w-3xl w-full bg-white p-8 rounded-2xl shadow-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-gray-800">Create New Product Listing</h2>
          <p className="text-gray-500 mt-2">Fill in the details below to add a new product to the marketplace.</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormInput icon={<FaBox />} name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} />
            <FormInput icon={<FaDollarSign />} name="price" placeholder="Initial Price" type="number" value={formData.price} onChange={handleChange} />
            <FormInput icon={<FaStore />} name="market" placeholder="Market Name" value={formData.market} onChange={handleChange} />
            <FormInput icon={<FaImage />} name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
          </div>

          <motion.div className="relative" variants={itemVariants}>
            <div className="absolute top-5 left-3 text-gray-400">
              <FaAlignLeft />
            </div>
            <textarea
              name="description"
              placeholder="Product Description"
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg transition-all duration-300 font-semibold text-white flex items-center justify-center bg-green-600 hover:bg-green-700 hover:shadow-lg hover:-translate-y-1 active:scale-95 disabled:bg-green-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <CgSpinner className="animate-spin text-2xl mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <FaPaperPlane className="mr-2" />
                  Add Product
                </>
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default VendorAddProduct;
