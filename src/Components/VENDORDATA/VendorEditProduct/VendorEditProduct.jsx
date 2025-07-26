import React, {useEffect, useState, useContext} from "react";
import {useParams, useNavigate} from "react-router";
import axios from "axios";
import {AuthContext} from "../../ContextFiles/AuthContext";
import Swal from "sweetalert2";
import {motion} from "framer-motion";
import {
  FaBox,
  FaDollarSign,
  FaStore,
  FaImage,
  FaAlignLeft,
  FaSave,
} from "react-icons/fa";
import {CgSpinner} from "react-icons/cg";

const BASE_URL = import.meta.env.VITE_API;

// --- Reusable Components ---
const FormInput = ({
  icon,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  required = true,
}) => (
  <motion.div
    className="relative"
    variants={{
      hidden: {opacity: 0, y: 15},
      visible: {opacity: 1, y: 0, transition: {duration: 0.4}},
    }}
  >
    <div className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400">
      {icon}
    </div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
      value={value}
      onChange={onChange}
      required={required}
    />
  </motion.div>
);

const EditProductSkeleton = () => (
  <div className="max-w-3xl w-full bg-white p-8 rounded-2xl shadow-lg animate-pulse">
    <div className="text-center mb-8">
      <div className="h-8 bg-slate-200 rounded w-1/2 mx-auto mb-3"></div>
      <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto"></div>
    </div>
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-12 bg-slate-200 rounded-lg"></div>
        <div className="h-12 bg-slate-200 rounded-lg"></div>
        <div className="h-12 bg-slate-200 rounded-lg"></div>
        <div className="h-12 bg-slate-200 rounded-lg"></div>
      </div>
      <div className="h-28 bg-slate-200 rounded-lg"></div>
      <div className="h-12 bg-slate-200 rounded-lg"></div>
    </div>
  </div>
);

const VendorEditProduct = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {accessToken} = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    market: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    if (!id || !accessToken) return;
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/allProduct/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const product = res.data;
        setFormData({
          name: product.name || "",
          price: product.price || "",
          market: product.market || "",
          image: product.image || "",
          description: product.description || "",
        });
      } catch (err) {
        console.error("Error fetching product:", err);
        toast.error("Could not load product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, accessToken]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const updatedData = {
      ...formData,
      price: Number(formData.price),
    };

    try {
      const res = await axios.put(`${BASE_URL}/allProduct/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data.modifiedCount > 0) {
        await Swal.fire("Success!", "Product updated successfully!", "success");
        // navigate("/dashboard/vendorMyProduct");
      } else {
        Swal.fire(
          "No Changes",
          "You haven't made any changes to the product.",
          "info"
        );
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire("Error", "Failed to update product.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className=" pt-0 mt-16 flex items-center justify-center p-4">
      {loading ? (
        <EditProductSkeleton />
      ) : (
        <motion.div
          className="max-w-3xl w-full bg-white p-8 rounded-2xl shadow-lg"
          variants={{
            hidden: {opacity: 0, y: 20},
            visible: {
              opacity: 1,
              y: 0,
              transition: {staggerChildren: 0.1},
            },
          }}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="text-center mb-8"
            variants={{hidden: {opacity: 0}, visible: {opacity: 1}}}
          >
            <h2 className="text-3xl font-bold text-gray-800">
              Edit Product Listing
            </h2>
            <p className="text-gray-500 mt-2">
              Update the details for your product below.
            </p>
          </motion.div>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormInput
                icon={<FaBox />}
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
              />
              <FormInput
                icon={<FaDollarSign />}
                name="price"
                placeholder="Current Price"
                type="number"
                value={formData.price}
                onChange={handleChange}
              />
              <FormInput
                icon={<FaStore />}
                name="market"
                placeholder="Market Name"
                value={formData.market}
                onChange={handleChange}
              />
              <FormInput
                icon={<FaImage />}
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
              />
            </div>

            <motion.div
              className="relative"
              variants={{
                hidden: {opacity: 0, y: 15},
                visible: {opacity: 1, y: 0},
              }}
            >
              <div className="absolute top-6 left-4 text-gray-400">
                <FaAlignLeft />
              </div>
              <textarea
                name="description"
                placeholder="Product Description"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div
              variants={{hidden: {opacity: 0}, visible: {opacity: 1}}}
            >
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 rounded-lg transition-all duration-300 font-semibold text-white flex items-center justify-center bg-green-600 hover:bg-green-700 hover:shadow-lg hover:-translate-y-1 active:scale-95 disabled:bg-green-400 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <CgSpinner className="animate-spin text-2xl mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    Update Product
                  </>
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default VendorEditProduct;
