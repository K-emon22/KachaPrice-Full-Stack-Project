import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router";
import {motion} from "framer-motion";
import {AuthContext} from "../../../ContextFiles/AuthContext";
import UserRoleCheck from "../../../RoleCheck/UserRoleCheck";
import Loader from "../../../Loader/Loader";
import AOS from "aos";
import "aos/dist/aos.css";
import {FaUserShield, FaStore, FaArrowRight} from "react-icons/fa";

import Banner from "../Banner/Banner";
import SortedSix from "../SortedSix/SortedSix";
import OfferSection from "../OfferSection/OfferSection";
import NewsSection from "../NewsSection/NewsSection";
import NewsletterSection from "../NewsletterSection/NewsletterSection";

const AdminVendorHomepage = ({role, user}) => {
  const welcomeText = `Welcome, ${user?.displayName || role}!`;
  const description = `Your ${role} dashboard is ready for you.`;
  const Icon = role === "admin" ? FaUserShield : FaStore;

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col justify-center items-center text-center p-4 ">
      <motion.div
        className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl max-w-2xl w-full"
        initial={{opacity: 0, scale: 0.9}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.5, ease: "easeOut"}}
      >
        <motion.div
          className="mx-auto w-20 h-20 mb-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center justify-center rounded-full"
          initial={{scale: 0}}
          animate={{scale: 1}}
          transition={{delay: 0.2, type: "spring", stiffness: 150}}
        >
          <Icon size={40} />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">
          {welcomeText}
        </h1>
        <p className="mt-4 text-lg text-slate-600">{description}</p>
        <Link to="/dashboard">
          <motion.button
            className="mt-8 bg-green-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 flex items-center gap-2 mx-auto"
            whileHover={{scale: 1.05, y: -2}}
            whileTap={{scale: 0.95}}
          >
            Go to Dashboard <FaArrowRight />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

const UserHomepage = () => {
  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    const timer = setTimeout(() => {
      setLoading2(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (loading2) {
    return <Loader />;
  }

  return (
    <div className="bg-slate-50 ">
      <div>
        <Banner />
      </div>
      <div>
        <SortedSix />
      </div>
      <div>
        <OfferSection />
      </div>
      <div>
        <NewsSection />
      </div>
      <div>
        <NewsletterSection />
      </div>
    </div>
  );
};

const Home = () => {
  const {user, loading: authLoading} = useContext(AuthContext);
  const {role, roleLoading} = UserRoleCheck();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({top: 0, behavior: "smooth"});
  }, []);

  if (authLoading || roleLoading) {
    return <Loader />;
  }

  if (role === "admin" || role === "vendor") {
    return <AdminVendorHomepage role={role} user={user} />;
  }

  return <UserHomepage />;
};

export default Home;
