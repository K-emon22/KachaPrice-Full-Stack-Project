import React, {useContext, useState, useEffect} from "react";
import {AuthContext} from "../../../ContextFiles/AuthContext";
import {motion, AnimatePresence} from "framer-motion";
import {FaUserEdit, FaPhoneAlt, FaMapMarkerAlt, FaCamera} from "react-icons/fa";
import {MdEmail, MdEdit, MdClose, MdLink} from "react-icons/md";
import {toast} from "react-toastify";
import {updateProfile, getAuth} from "firebase/auth";
import Lottie from "lottie-react";
import LottieFiles from "../../../../../public/Dashboard Data Visualization.json";

const Profile = () => {
  const {user} = useContext(AuthContext);
  const Auth = getAuth();

  const [name, setName] = useState(user?.displayName || "Anonymous User");
  const [email] = useState(user?.email || "No email provided");
  const [photo, setPhoto] = useState(
    user?.photoURL || `https://api.dicebear.com/8.x/initials/svg?seed=${name}`
  );
  const [phone] = useState("017xxxxxxxx"); 
  const [address] = useState("Dhaka, Bangladesh"); 
  const [showNameModal, setShowNameModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleSaveName = async (newName) => {
    if (!newName.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }
    try {
      await updateProfile(Auth.currentUser, {displayName: newName});
      setName(newName);
      toast.success("Name updated successfully!");
      setShowNameModal(false);
    } catch (error) {
      toast.error("Failed to update name.");
      console.error("Name update error:", error);
    }
  };

  const handleSaveImage = async (_file, url) => {
    if (!url.trim()) {
      toast.error("Please provide a valid image URL.");
      return;
    }
    try {
      await updateProfile(Auth.currentUser, {photoURL: url});
      setPhoto(url);
      toast.success("Profile image updated!");
      setShowImageModal(false);
    } catch (error) {
      toast.error("Failed to update profile image.");
      console.error("Image save error:", error);
    }
  };

  const infoItemVariants = {
    hidden: {opacity: 0, x: -20},
    visible: {opacity: 1, x: 0, transition: {type: "spring", stiffness: 100}},
  };

  return (
    <div className="w-full   ">
      <motion.div
        className="w-full bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 justify-between"
        initial={{opacity: 0, y: 50}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5, ease: "easeOut"}}
      >
        {/* Left: Profile Image */}
        <div className="w-full  bg-green-100 p-5 flex flex-col items-center justify-center space-y-4 border-b md:border-b-0 md:border-r border-slate-200">
          <div className="relative group w-40 h-40">
            <img
              src={photo}
              alt="Profile"
              className="w-full h-full rounded-full object-cover shadow-lg"
            />
            <button
              onClick={() => setShowImageModal(true)}
              className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full flex items-center justify-center text-white text-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"
              aria-label="Change profile photo"
            >
              <FaCamera />
            </button>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800">{name}</h2>
            <p className="text-sm text-slate-500">{user?.email}</p>
          </div>
        </div>

        {/* Right: User Details */}
        <div className="w-full p-5 xl:border-r-2 border-r-green-200 border-dashed">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-700">
              Profile Details
            </h3>
            <button
              onClick={() => setShowNameModal(true)}
              className="flex items-center gap-2 text-sm text-green-600 font-semibold hover:text-green-800 transition-colors"
            >
              <MdEdit /> Edit Name
            </button>
          </div>

          <motion.div
            className="space-y-6"
            variants={{visible: {transition: {staggerChildren: 0.1}}}}
            initial="hidden"
            animate="visible"
          >
            <InfoItem
              icon={<MdEmail />}
              label="Email Address"
              value={email}
              variants={infoItemVariants}
            />
            <InfoItem
              icon={<FaPhoneAlt />}
              label="Phone Number"
              value={phone}
              variants={infoItemVariants}
            />
            <InfoItem
              icon={<FaMapMarkerAlt />}
              label="Address"
              value={address}
              variants={infoItemVariants}
            />
          </motion.div>
        </div>

        <div className="w-full h-full hidden xl:block ">
          <Lottie
            animationData={LottieFiles}
            loop={true}
            style={{width: "100%", height: "100%"}}
          />
        </div>
      </motion.div>

      {/* Modals */}
      <NameEditModal
        isOpen={showNameModal}
        onClose={() => setShowNameModal(false)}
        onSave={handleSaveName}
        currentName={name}
      />
      <ImageEditModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        onSave={handleSaveImage}
        currentPhoto={photo}
      />
    </div>
  );
};

// Info Item Component
const InfoItem = ({icon, label, value, variants}) => (
  <motion.div className="flex items-center gap-4" variants={variants}>
    <div className="w-10 h-10 flex-shrink-0 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-xl">
      {icon}
    </div>
    <div>
      <p className="text-xs text-slate-500 font-medium">{label}</p>
      <p className="text-base font-semibold text-slate-700">{value}</p>
    </div>
  </motion.div>
);

// Name Edit Modal
const NameEditModal = ({isOpen, onClose, onSave, currentName}) => {
  const [name, setName] = useState(currentName);

  useEffect(() => {
    setName(currentName);
  }, [currentName, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalBackdrop onClick={onClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md space-y-4"
            initial={{y: 60, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            exit={{y: 60, opacity: 0}}
            transition={{type: "spring", stiffness: 150, damping: 20}}
          >
            <h3 className="text-xl font-bold text-green-700">Edit Your Name</h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
              placeholder="Enter your full name"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => onSave(name)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Save
              </button>
            </div>
          </motion.div>
        </ModalBackdrop>
      )}
    </AnimatePresence>
  );
};

// Image Edit Modal (Link Only)
const ImageEditModal = ({isOpen, onClose, onSave, currentPhoto}) => {
  const [preview, setPreview] = useState(currentPhoto);
  const [urlInput, setUrlInput] = useState("");

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setUrlInput(url);
    setPreview(url);
  };

  const resetState = () => {
    setPreview(currentPhoto);
    setUrlInput("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalBackdrop onClick={resetState}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-lg space-y-4"
            initial={{y: 60, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            exit={{y: 60, opacity: 0}}
            transition={{type: "spring", stiffness: 150, damping: 20}}
          >
            <h3 className="text-xl font-bold text-green-700">
              Update Profile Photo
            </h3>

            <div className="relative">
              <MdLink className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={urlInput}
                onChange={handleUrlChange}
                placeholder="Paste an image URL"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
              />
            </div>

            {preview && (
              <div className="flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                />
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={resetState}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => onSave(null, urlInput)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Save Image
              </button>
            </div>
          </motion.div>
        </ModalBackdrop>
      )}
    </AnimatePresence>
  );
};

// Modal Backdrop
const ModalBackdrop = ({children, onClick}) => (
  <motion.div
    className="fixed inset-0 bg-white/10 backdrop-blur-2xl flex justify-center items-center z-50 p-4"
    onClick={onClick}
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
  >
    {children}
  </motion.div>
);

export default Profile;
