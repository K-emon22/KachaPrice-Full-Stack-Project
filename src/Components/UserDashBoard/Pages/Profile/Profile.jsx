import React, { useContext, useState } from "react";
import { AuthContext } from "../../../ContextFiles/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserEdit, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { Auth, Storage } from "../../../FirebaseAuth/FirebaseAuth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [email] = useState(user?.email || "");
  const [photo, setPhoto] = useState(user?.photoURL || "https://i.pravatar.cc/150?img=3");
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [phone] = useState("017xxxxxxxx");
  const [address] = useState("Dhaka, Bangladesh");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
      setSelectedFile(file);
    }
  };

  const handleSaveName = async () => {
    try {
      await updateProfile(Auth.currentUser, { displayName: name });
      toast.success("Name updated!");
      setShowNameModal(false);
    } catch (error) {
      toast.error("Failed to update name.");
    }
  };

  const handleSaveImage = async () => {
    try {
      if (selectedFile) {
        const storageRef = ref(Storage, `profileImages/${Auth.currentUser.uid}_${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);
        uploadTask.on("state_changed", null, 
          (error) => toast.error("Image upload failed."), 
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(Auth.currentUser, { photoURL: downloadURL });
            setPhoto(downloadURL);
            toast.success("Image updated!");
            setShowImageModal(false);
            setPreview(null);
            setSelectedFile(null);
          }
        );
      } else if (preview) {
        await updateProfile(Auth.currentUser, { photoURL: preview });
        setPhoto(preview);
        toast.success("Image updated via link!");
        setShowImageModal(false);
        setPreview(null);
      } else {
        toast.error("No image selected or link provided.");
      }
    } catch {
      toast.error("Failed to update profile image.");
    }
  };
  
  return (
    <motion.div
      className="w-full min-h-screen p-6 flex justify-center items-center "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="w-full max-w-4xl bg-gradient-to-br from-green-50 to-green-100  rounded-3xl shadow-2xl p-8 md:p-12 space-y-8"
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        {/* Profile Info Section */}
        <div className="flex flex-col  items-center justify-between gap-8">
          {/* Profile Image */}
          <div className="relative group w-40 h-40">
            <img
              src={preview || photo}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-green-600 shadow-lg"
            />
            <motion.button
              onClick={() => setShowImageModal(true)}
              whileHover={{ scale: 1.1 }}
              animate={{ scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 2 } }}
              className="absolute bottom-1 right-1 bg-white text-green-600 border border-green-600 rounded-full p-[6px] hover:bg-green-600 hover:text-white transition"
            >
              <FaUserEdit />
            </motion.button>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="text-2xl md:text-3xl font-bold text-green-700 flex items-center justify-center md:justify-start gap-2">
              {name}
              <motion.button
                onClick={() => setShowNameModal(true)}
                whileHover={{ scale: 1.2 }}
                animate={{ scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 2 } }}
                className="text-green-600 hover:text-green-800"
              >
                <MdEdit />
              </motion.button>
            </div>
            <p className="text-gray-700 text-lg flex items-center justify-center md:justify-start gap-2">
              <MdEmail className="text-green-600" /> {email}
            </p>
            <p className="text-gray-700 text-lg flex items-center justify-center md:justify-start gap-2">
              <FaPhoneAlt className="text-green-600" /> {phone}
            </p>
            <p className="text-gray-700 text-lg flex items-center justify-center md:justify-start gap-2">
              <FaMapMarkerAlt className="text-green-600" /> {address}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Name Modal */}
      <AnimatePresence>
        {showNameModal && (
          <Modal title="Edit Name" onClose={() => setShowNameModal(false)} onSave={handleSaveName}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </Modal>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <Modal title="Update Profile Photo" onClose={() => {
            setShowImageModal(false);
            setPreview(null);
            setSelectedFile(null);
          }} onSave={handleSaveImage}>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
            <input
              type="text"
              placeholder="Or paste image URL"
              onChange={(e) => {
                setPreview(e.target.value);
                setSelectedFile(null);
              }}
              className="w-full px-3 py-2 border rounded-lg focus:ring-green-400"
            />
            {preview && (
              <img src={preview} alt="Preview" className="w-24 h-24 rounded-full mx-auto border mt-2" />
            )}
          </Modal>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Reusable Modal Component
const Modal = ({ title, children, onClose, onSave }) => (
  <motion.div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md space-y-4"
      initial={{ y: 60 }}
      animate={{ y: 0 }}
      exit={{ y: 60 }}
    >
      <h3 className="text-xl font-bold text-green-600">{title}</h3>
      {children}
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Save
        </button>
      </div>
    </motion.div>
  </motion.div>
);

export default Profile;