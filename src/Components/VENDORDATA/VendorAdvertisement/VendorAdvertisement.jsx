import React, {useContext, useState} from "react";
import {AuthContext} from "../../ContextFiles/AuthContext";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import Swal from "sweetalert2";
import {motion, AnimatePresence} from "framer-motion";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {
  FaPlus,
  FaTimes,
  FaImage,
  FaHeading,
  FaAlignLeft,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import {CgSpinner} from "react-icons/cg";
import "react-toastify/dist/ReactToastify.css";

// NOTE: Replace this with your actual environment variable
const BASE_URL = "http://localhost:4000";

// --- Data Fetching Function for React Query ---
const fetchAds = async (email, accessToken) => {
  const {data} = await axios.get(
    `${BASE_URL}/advertisements?vendorEmail=${email}`,
    {
      headers: {Authorization: `Bearer ${accessToken}`},
    }
  );
  return data;
};

// --- Reusable Components ---
const AdTableRowSkeleton = () => (
  <tr className="animate-pulse">
    <td className="p-4 align-middle">
      <div className="w-28 h-20 bg-slate-200 rounded-lg"></div>
    </td>
    <td className="p-4 align-middle">
      <div className="h-5 bg-slate-200 rounded w-3/4"></div>
    </td>
    <td className="p-4 align-middle">
      <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-slate-200 rounded w-5/6"></div>
    </td>
    <td className="p-4 align-middle">
      <div className="flex gap-3">
        <div className="w-24 h-9 bg-slate-200 rounded-lg"></div>
        <div className="w-24 h-9 bg-slate-200 rounded-lg"></div>
      </div>
    </td>
  </tr>
);

const AdTableRow = ({ad, onEdit, onDelete, index}) => (
  <motion.tr
    className="hover:bg-slate-50/50 transition-colors duration-200"
    variants={{
      hidden: {opacity: 0, y: 20},
      visible: {opacity: 1, y: 0},
    }}
    initial="hidden"
    animate="visible"
    transition={{delay: index * 0.05}}
  >
    <td className="p-4 align-middle">
      <img
        src={
          ad.image || "https://placehold.co/120x80/e2e8f0/64748b?text=No+Image"
        }
        alt={ad.title}
        className="w-28 h-20 object-cover rounded-lg shadow-sm"
      />
    </td>
    <td className="p-4 align-middle font-bold text-slate-800">{ad.title}</td>
    <td className="p-4 align-top text-sm text-slate-600 max-w-sm">
      <div className="h-20 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
        {ad.description}
      </div>
    </td>
    <td className="p-4 align-middle">
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          onClick={() => onEdit(ad)}
          className="font-semibold text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-blue-100"
        >
          <FaEdit /> Update
        </motion.button>
        <motion.button
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          onClick={() => onDelete(ad._id)}
          className="font-semibold text-sm text-red-600 hover:text-red-800 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-red-100"
        >
          <FaTrash /> Delete
        </motion.button>
      </div>
    </td>
  </motion.tr>
);

const AdFormModal = ({isOpen, onClose, onSubmit, ad, isEditMode}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (isEditMode && ad) {
      setFormData({
        title: ad.title,
        description: ad.description,
        image: ad.image || "",
      });
    } else {
      setFormData({title: "", description: "", image: ""});
    }
  }, [isOpen, isEditMode, ad]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg"
            initial={{scale: 0.9, opacity: 0, y: 20}}
            animate={{scale: 1, opacity: 1, y: 0}}
            exit={{scale: 0.9, opacity: 0, y: 20}}
            transition={{duration: 0.3, ease: "easeInOut"}}
          >
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">
                {isEditMode ? "Update" : "Create"} Advertisement
              </h3>
              <motion.button
                whileHover={{scale: 1.1, rotate: 90}}
                whileTap={{scale: 0.9}}
                onClick={onClose}
                className="text-slate-500 hover:text-slate-800"
              >
                <FaTimes size={20} />
              </motion.button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="relative">
                <FaHeading className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ad Title"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div className="relative">
                <FaAlignLeft className="absolute top-6 left-4 text-slate-400" />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Short Description"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="relative">
                <FaImage className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />
                <input
                  name="image"
                  type="url"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Image URL (optional)"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <motion.button
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg bg-slate-200 text-slate-800 font-semibold hover:bg-slate-300 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 w-36 disabled:bg-green-400"
                >
                  {loading ? (
                    <CgSpinner className="animate-spin text-xl" />
                  ) : isEditMode ? (
                    "Update Ad"
                  ) : (
                    "Create Ad"
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const VendorAdvertisement = () => {
  const {user, accessToken, loading: authLoading} = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);

  const {data: ads = [], isLoading: adsLoading} = useQuery({
    queryKey: ["advertisements", user?.email],
    queryFn: () => fetchAds(user.email, accessToken),
    enabled: !!user?.email && !!accessToken,
  });

  const isLoading = authLoading || adsLoading;

  const handleOpenModal = (ad = null) => {
    if (ad) {
      setIsEditMode(true);
      setSelectedAd(ad);
    } else {
      setIsEditMode(false);
      setSelectedAd(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (formData) => {
    const url = isEditMode
      ? `${BASE_URL}/advertisements/${selectedAd._id}`
      : `${BASE_URL}/advertisements`;
    const method = isEditMode ? "put" : "post";

    try {
      await axios[method](
        url,
        {
          ...formData,
          vendorEmail: user.email,
          vendorName: user.displayName,
          vendorImage: user.photoURL,
        },
        {
          headers: {Authorization: `Bearer ${accessToken}`},
        }
      );
      toast.success(
        isEditMode ? "Ad updated successfully!" : "Ad created successfully!"
      );
      queryClient.invalidateQueries({
        queryKey: ["advertisements", user?.email],
      });
      handleCloseModal();
    } catch (err) {
      toast.error(isEditMode ? "Failed to update ad." : "Failed to create ad.");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${BASE_URL}/advertisements/${id}`, {
            headers: {Authorization: `Bearer ${accessToken}`},
          });
          toast.success("Ad deleted successfully!");
          queryClient.invalidateQueries({
            queryKey: ["advertisements", user?.email],
          });
        } catch (error) {
          toast.error("Failed to delete ad.");
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-center mb-8"
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
      >
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800">
            My Advertisements
          </h1>
          <p className="text-lg text-slate-500 mt-1">
            Manage your promotional campaigns.
          </p>
        </div>
        <motion.button
          whileHover={{scale: 1.05, y: -2}}
          whileTap={{scale: 0.95}}
          onClick={() => handleOpenModal()}
          className="mt-4 sm:mt-0 bg-green-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30"
        >
          <FaPlus /> Create New Ad
        </motion.button>
      </motion.div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 table-fixed">
            {/* ✅ FIX: Conditionally render the table head */}
            {(isLoading || ads.length > 0) && (
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-32">
                    Image
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-48">
                    Title
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-52">
                    Actions
                  </th>
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                Array.from({length: 3}).map((_, i) => (
                  <AdTableRowSkeleton key={i} />
                ))
              ) : (
                <AnimatePresence>
                  {ads.map((ad, i) => (
                    <AdTableRow
                      key={ad._id}
                      ad={ad}
                      onEdit={handleOpenModal}
                      onDelete={handleDelete}
                      index={i}
                    />
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
        {!isLoading && ads.length === 0 && (
          <div className="text-center py-16 px-6">
            <motion.div
              initial={{scale: 0.8, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              transition={{delay: 0.2}}
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="mt-2 text-2xl font-semibold text-slate-700">
                No Advertisements Found
              </h3>
              <p className="mt-1 text-slate-500">
                Ready to promote your products? Create your first ad now!
              </p>
            </motion.div>
          </div>
        )}
      </div>

      <AdFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        ad={selectedAd}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default VendorAdvertisement;
