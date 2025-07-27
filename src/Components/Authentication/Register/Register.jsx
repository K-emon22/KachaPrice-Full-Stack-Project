import {Link, useLocation, useNavigate} from "react-router";
import {useContext, useEffect, useState} from "react";
import {FaGoogle, FaEnvelope, FaLock, FaUser, FaImage} from "react-icons/fa";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../ContextFiles/AuthContext";
import {updateProfile} from "firebase/auth";
import {toast} from "react-toastify";
import Loader from "../../Loader/Loader";
import axios from "axios";
import {motion} from "framer-motion";
import {CgSpinner} from "react-icons/cg";

const Register = () => {
  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const {googleLogin, createUser} = useContext(AuthContext);

  const [loder, setLoder] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({mode: "onChange"});

  useEffect(() => {
    const timer = setTimeout(() => setLoder(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handlePostRegistration = async (user) => {
    const userInfo = {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: new Date().toISOString(),
      role: "user",
    };

    try {
      await axios.post(`${import.meta.env.VITE_API}/allUser`, userInfo);
      const {data} = await axios.get(
        `${import.meta.env.VITE_API}/users/role/${user.email}`
      );
      const role = data?.role || "user";

      if (role === "admin" || role === "vendor") {
        navigate("/", {replace: true});
      } else {
        navigate("/", {replace: true});
      }
    } catch (error) {
      console.error("Post-registration process failed:", error);
      toast.error("An error occurred after registration.");
      navigate("/");
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await createUser(data.email, data.password);
      const user = result.user;

      await updateProfile(user, {
        displayName: data.name,
        photoURL: data.photo,
      });

      const updatedUser = {
        ...user,
        displayName: data.name,
        photoURL: data.photo,
      };
      reset();
      toast.success(`Welcome, ${data.name}! Your account has been created.`);
      await handlePostRegistration(updatedUser);
    } catch (err) {
      const messages = {
        "auth/email-already-in-use": "Email is already in use.",
        "auth/invalid-email": "Invalid email address.",
      };
      toast.error(messages[err.code] || err.message || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsSubmitting(true);
    try {
      const result = await googleLogin();
      const user = result.user;
      toast.success(`Welcome, ${user.displayName}!`);
      await handlePostRegistration(user);
    } catch (err) {
      console.error(err);
      toast.error("Google login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loder) return <Loader />;

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {opacity: 1, transition: {staggerChildren: 0.08}},
  };

  const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0, transition: {type: "spring", stiffness: 100}},
  };

  return (
    <div className=" w-full flex items-center justify-center  p-4 pt-0 my-16 px-[2%] lg:px-[5%] ">
      <motion.div
        className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden"
        initial={{opacity: 0, scale: 0.9}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.5, ease: "easeInOut"}}
      >
        {/* Left Panel */}
        <div className="hidden animated-sea-green md:flex flex-col justify-center p-10 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <motion.h1
            className="text-3xl font-extrabold leading-tight"
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            transition={{delay: 0.2}}
          >
            Join Our Community
          </motion.h1>
          <motion.p
            className="mt-4 text-white"
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            transition={{delay: 0.3}}
          >
            Create an account to get started and explore the best prices.
          </motion.p>
        </div>

        {/* Right Panel (Form) */}
        <div className="p-8 sm:p-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl font-bold text-slate-800 mb-2"
            >
              Create an Account
            </motion.h2>
            <motion.p variants={itemVariants} className="text-slate-500 mb-6">
              Fill in your details to register.
            </motion.p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <motion.div variants={itemVariants} className="relative">
                <FaUser className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />
                <input
                  type="text"
                  {...register("name", {required: "Name is required"})}
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter Your Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />
                <input
                  type="email"
                  {...register("email", {required: "Email is required"})}
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter Your Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <FaImage className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />
                <input
                  type="text"
                  {...register("photo")}
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Photo URL (optional)"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <FaLock className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter Your Password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </motion.div>

              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 disabled:bg-green-400"
                whileHover={{scale: 1.02, y: -2}}
                whileTap={{scale: 0.98}}
              >
                {isSubmitting ? (
                  <CgSpinner className="animate-spin text-xl" />
                ) : (
                  "Register"
                )}
              </motion.button>

              <motion.div
                variants={itemVariants}
                className="relative flex items-center my-4"
              >
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-slate-400 text-sm">
                  OR
                </span>
                <div className="flex-grow border-t border-slate-200"></div>
              </motion.div>

              <motion.button
                variants={itemVariants}
                onClick={loginWithGoogle}
                type="button"
                disabled={isSubmitting}
                className="w-full bg-white text-slate-700 font-bold py-3 px-6 rounded-lg hover:bg-slate-100 transition-all duration-300 flex items-center justify-center gap-3 border border-slate-300"
                whileHover={{scale: 1.02, y: -2}}
                whileTap={{scale: 0.98}}
              >
                <FaGoogle className="text-red-500" />
                Sign up with Google
              </motion.button>
            </form>

            <motion.p
              variants={itemVariants}
              className="text-center text-slate-500 mt-6"
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-600 hover:underline font-semibold"
              >
                Login Now
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
