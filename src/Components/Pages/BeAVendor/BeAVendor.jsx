import React, {useContext, useState, useEffect} from "react";
import axios from "axios";
import {AuthContext} from "../../ContextFiles/AuthContext";
import {toast} from "react-toastify";
import {motion} from "framer-motion";

const BeAVendor = () => {
  const {user, accessToken} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [alreadyRequested, setAlreadyRequested] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");

  useEffect(() => {
    if (!email) return;

    const checkVendorRequest = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API}/user/vendor-request?email=${email}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setAlreadyRequested(res.data?.vendorRequest === true);
      } catch (error) {
        console.error("Error checking vendor request:", error);
        setAlreadyRequested(false); 
      }
    };

    checkVendorRequest();
  }, [email, accessToken]);

  const handleVendorRequest = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required.");
      return;
    }
    if (alreadyRequested) {
      toast.warn("You’ve already requested vendor access!");
      return;
    }

    setLoading(true);
    try {
      await axios.patch(
        `${import.meta.env.VITE_API}/users/vendor-request?email=${email}`,
        {vendorRequest: true},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success("Vendor request submitted successfully!");
      setAlreadyRequested(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-[2%] lg:mx-[5%] flex flex-col justify-center items-center">
      <motion.section
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.6, ease: "easeOut"}}
        className="max-w-lg bg-white rounded-2xl shadow-lg p-8 mt-16 mb-16 border border-green-300"
        aria-labelledby="be-a-vendor-title"
        role="form"
      >
        <h2
          id="be-a-vendor-title"
          className="text-3xl font-extrabold mb-6 text-green-700 tracking-wide text-center w-full"
        >
          Become a Vendor
        </h2>
        <p className="mb-8 text-gray-600 text-base leading-relaxed text-center w-full max-w-md">
          Interested in selling on our platform? Request vendor access by
          filling out the form below. We will review your request promptly.
        </p>
        <form
          onSubmit={handleVendorRequest}
          noValidate
          className="w-full max-w-md"
        >
          <label
            htmlFor="name"
            className="block mb-2 font-semibold text-gray-800 select-none"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 transition duration-300"
            required
            autoComplete="name"
            aria-required="true"
          />

          <label
            htmlFor="email"
            className="block mb-2 font-semibold text-gray-800 select-none"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full mb-8 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 transition duration-300"
            required
            autoComplete="email"
            disabled={!!user?.email}
            aria-disabled={!!user?.email}
          />

          <motion.button
            type="submit"
            disabled={loading || alreadyRequested}
            whileHover={{scale: loading || alreadyRequested ? 1 : 1.05}}
            whileTap={{scale: loading || alreadyRequested ? 1 : 0.95}}
            className={`w-full py-3 rounded-xl font-semibold text-white transition duration-300 ${
              alreadyRequested
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-400"
            }`}
            aria-disabled={loading || alreadyRequested}
          >
            {alreadyRequested
              ? "Already Requested"
              : loading
              ? "Submitting..."
              : "Request Vendor Access"}
          </motion.button>
        </form>
      </motion.section>
    </div>
  );
};

export default BeAVendor;
