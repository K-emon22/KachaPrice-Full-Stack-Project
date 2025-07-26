// // import {Link, useLocation, useNavigate} from "react-router";
// // import {Fade} from "react-awesome-reveal";
// // import {useContext, useEffect, useState} from "react";
// // import {FaGoogle} from "react-icons/fa";
// // import {useForm} from "react-hook-form";
// // import {AuthContext} from "../../ContextFiles/AuthContext";
// // import {toast} from "react-toastify";
// // import Loader from "../../Loader/Loader";
// // import axios from "axios";

// // const Login = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const from = location.state?.from?.pathname || "/";

// //   const [loder, setLoder] = useState(true);
// //   const {googleLogin, loginWithPass} = useContext(AuthContext);

// //   const {
// //     register,
// //     handleSubmit,
// //     formState: {errors},
// //     reset,
// //   } = useForm();

// //   const saveUserToDatabase = async (user) => {
// //     const userInfo = {
// //       name: user.displayName || "Anonymous",
// //       email: user.email,
// //       role: "user",
// //     };
// //     try {
// //       await axios.post(`${import.meta.env.VITE_API}/allUser`, userInfo);
// //     } catch (error) {
// //       console.error("User save failed", error);
// //     }
// //   };

// //   const onSubmit = async ({email, password}) => {
// //     try {
// //       const result = await loginWithPass(email, password);
// //       const user = result.user;

// //       // No token setting here

// //       await saveUserToDatabase(user);

// //       reset();
// //       navigate(from, {replace: true});
// //     } catch (err) {
// //       toast.error(err.message || "Login failed.");
// //     }
// //   };

// //   const loginWithGoogle = async () => {
// //     try {
// //       const result = await googleLogin();
// //       const user = result.user;

// //       // No token setting here

// //       await saveUserToDatabase(user);

// //       navigate(from, {replace: true});
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Google login failed. Try again.");
// //     }
// //   };

// //   useEffect(() => {
// //     setTimeout(() => setLoder(false), 500);
// //   }, []);

// //   if (loder) return <Loader />;

// //   return (
// //     <div className="px-[2%] lg:px-[5%] flex flex-col justify-center items-center bg-white ">
// //       <Fade direction="down" cascade duration={800}>
// //         <h1 className="text-3xl sm:text-5xl font-bold text-center text-green-600 dark:text-green-400 mb-6">
// //           Login Now
// //         </h1>
// //       </Fade>

// //       <div className="flex w-full justify-center min-h-[calc(100vh-200px)] items-center">
// //         <form
// //           onSubmit={handleSubmit(onSubmit)}
// //           className="flex flex-col justify-center items-center backdrop-blur-sm bg-green-100/30 dark:bg-green-900/20 p-5 sm:p-10 md:p-20 rounded-lg shadow shadow-green-300 dark:shadow-green-800 md:gap-2 w-3/4 lg:max-w-3xl"
// //         >
// //           <input
// //             type="email"
// //             {...register("email", {
// //               required: "Email is required",
// //               pattern: {
// //                 value: /^\S+@\S+$/i,
// //                 message: "Invalid email format",
// //               },
// //             })}
// //             className="border-2 border-green-400 p-2 h-10 lg:h-12 font-semibold rounded-lg w-full bg-green-50/60 dark:bg-green-800/40 text-black dark:text-white placeholder:text-white"
// //             placeholder="Enter Your Email"
// //           />
// //           {errors.email && (
// //             <p className="text-red-500 text-sm mt-1 w-full">
// //               {errors.email.message}
// //             </p>
// //           )}

// //           <input
// //             type="password"
// //             {...register("password", {
// //               required: "Password is required",
// //               minLength: {
// //                 value: 6,
// //                 message: "Password must be at least 6 characters",
// //               },
// //               validate: {
// //                 hasUpper: (value) =>
// //                   /[A-Z]/.test(value) || "Must include an uppercase letter",
// //                 hasLower: (value) =>
// //                   /[a-z]/.test(value) || "Must include a lowercase letter",
// //               },
// //             })}
// //             className="border-2 border-green-400 p-2 h-10 lg:h-12 font-semibold rounded-lg w-full bg-green-50/60 dark:bg-green-800/40 text-black dark:text-white placeholder:text-white mt-4"
// //             placeholder="Enter Your Password"
// //           />
// //           {errors.password && (
// //             <p className="text-red-500 text-sm mt-1 w-full">
// //               {errors.password.message}
// //             </p>
// //           )}

// //           <button
// //             onClick={loginWithGoogle}
// //             type="button"
// //             className="flex items-center justify-center gap-2 mt-8 font-bold border-2 border-green-300 w-full h-10 lg:h-12 bg-green-100 dark:bg-green-800 text-gray-900 dark:text-white hover:bg-green-500 hover:text-white rounded-full transition"
// //           >
// //             <FaGoogle size={20} />
// //             <span>Login With Google</span>
// //           </button>

// //           <button
// //             type="submit"
// //             className="bg-green-500 text-white font-bold w-full h-10 lg:h-12 rounded-full mt-2 hover:bg-green-600 transition"
// //           >
// //             Login
// //           </button>

// //           <p className="text-center text-black mt-4">
// //             Don&apos;t have an account?
// //             <Link
// //               to={"/register"}
// //               className="text-green-600 hover:underline ml-1 font-semibold"
// //             >
// //               <br className="sm:hidden" /> Register Now
// //             </Link>
// //           </p>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;
// import {Link, useLocation, useNavigate} from "react-router";
// import {Fade} from "react-awesome-reveal";
// import {useContext, useEffect, useState} from "react";
// import {FaGoogle} from "react-icons/fa";
// import {useForm} from "react-hook-form";
// import {AuthContext} from "../../ContextFiles/AuthContext";
// import {toast} from "react-toastify";
// import Loader from "../../Loader/Loader";
// import axios from "axios";

// const Login = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const from = location.state?.from?.pathname || "/";

//   const [loder, setLoder] = useState(true);
//   const {googleLogin, loginWithPass} = useContext(AuthContext);

//   const {
//     register,
//     handleSubmit,
//     formState: {errors},
//     reset,
//   } = useForm();

//   const saveUserToDatabase = async (user) => {
//     const userInfo = {
//       name: user.displayName || "Anonymous",
//       email: user.email,
//       role: "user",
//     };
//     try {
//       await axios.post(`${import.meta.env.VITE_API}/allUser`, userInfo);
//     } catch (error) {
//       console.error("User save failed", error);
//     }
//   };

//   const getRoleAndRedirect = async (email) => {
//     try {
//       const {data} = await axios.get(
//         `${import.meta.env.VITE_API}/users/role/${email}`
//       );
//       const role = data?.role || "user";

//       // 🔽 Role-based navigation
//       if (role === "admin") {
//         navigate("/", {replace: true});
//       } else if (role === "vendor") {
//         navigate("/", {replace: true});
//       } else if (role === "user") {
//         navigate("/", {replace: true});
//       } else {
//         // Fallback for unknown roles
//         navigate("/", {replace: true});
//       }
//     } catch (err) {
//       console.error("Role fetch failed", err);
//       navigate("/", {replace: true});
//     }
//   };

//   const onSubmit = async ({email, password}) => {
//     try {
//       const result = await loginWithPass(email, password);
//       const user = result.user;

//       await saveUserToDatabase(user);
//       reset();

//       await getRoleAndRedirect(user.email);
//     } catch (err) {
//       toast.error(err.message || "Login failed.");
//     }
//   };

//   const loginWithGoogle = async () => {
//     try {
//       const result = await googleLogin();
//       const user = result.user;

//       await saveUserToDatabase(user);
//       await getRoleAndRedirect(user.email);
//     } catch (err) {
//       console.error(err);
//       toast.error("Google login failed. Try again.");
//     }
//   };

//   useEffect(() => {
//     setTimeout(() => setLoder(false), 500);
//   }, []);

//   if (loder) return <Loader />;

//   return (
//     <div className="px-[2%] lg:px-[5%] flex flex-col justify-center items-center bg-white ">
//       <Fade direction="down" cascade duration={800}>
//         <h1 className="text-3xl sm:text-5xl font-bold text-center text-green-600 dark:text-green-400 mb-6">
//           Login Now
//         </h1>
//       </Fade>

//       <div className="flex w-full justify-center min-h-[calc(100vh-200px)] items-center">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="flex flex-col justify-center items-center backdrop-blur-sm bg-green-100/30 dark:bg-green-900/20 p-5 sm:p-10 md:p-20 rounded-lg shadow shadow-green-300 dark:shadow-green-800 md:gap-2 w-3/4 lg:max-w-3xl"
//         >
//           <input
//             type="email"
//             {...register("email", {
//               required: "Email is required",
//               pattern: {
//                 value: /^\S+@\S+$/i,
//                 message: "Invalid email format",
//               },
//             })}
//             className="border-2 border-green-400 p-2 h-10 lg:h-12 font-semibold rounded-lg w-full bg-green-50/60 dark:bg-green-800/40 text-black dark:text-white placeholder:text-white"
//             placeholder="Enter Your Email"
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mt-1 w-full">
//               {errors.email.message}
//             </p>
//           )}

//           <input
//             type="password"
//             {...register("password", {
//               required: "Password is required",
//               minLength: {
//                 value: 6,
//                 message: "Password must be at least 6 characters",
//               },
//               validate: {
//                 hasUpper: (value) =>
//                   /[A-Z]/.test(value) || "Must include an uppercase letter",
//                 hasLower: (value) =>
//                   /[a-z]/.test(value) || "Must include a lowercase letter",
//               },
//             })}
//             className="border-2 border-green-400 p-2 h-10 lg:h-12 font-semibold rounded-lg w-full bg-green-50/60 dark:bg-green-800/40 text-black dark:text-white placeholder:text-white mt-4"
//             placeholder="Enter Your Password"
//           />
//           {errors.password && (
//             <p className="text-red-500 text-sm mt-1 w-full">
//               {errors.password.message}
//             </p>
//           )}

//           <button
//             onClick={loginWithGoogle}
//             type="button"
//             className="flex items-center justify-center gap-2 mt-8 font-bold border-2 border-green-300 w-full h-10 lg:h-12 bg-green-100 dark:bg-green-800 text-gray-900 dark:text-white hover:bg-green-500 hover:text-white rounded-full transition"
//           >
//             <FaGoogle size={20} />
//             <span>Login With Google</span>
//           </button>

//           <button
//             type="submit"
//             className="bg-green-500 text-white font-bold w-full h-10 lg:h-12 rounded-full mt-2 hover:bg-green-600 transition"
//           >
//             Login
//           </button>

//           <p className="text-center text-black mt-4">
//             Don&apos;t have an account?
//             <Link
//               to={"/register"}
//               className="text-green-600 hover:underline ml-1 font-semibold"
//             >
//               <br className="sm:hidden" /> Register Now
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { Link, useLocation, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../ContextFiles/AuthContext";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";
import axios from "axios";
import { motion } from "framer-motion";
import { CgSpinner } from "react-icons/cg";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [loder, setLoder] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { googleLogin, loginWithPass } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const saveUserToDatabase = async (user) => {
    const userInfo = {
      name: user.displayName || "Anonymous",
      email: user.email,
      role: "user",
    };
    try {
      await axios.post(`${import.meta.env.VITE_API}/allUser`, userInfo);
    } catch (error) {
      console.error("User save failed", error);
    }
  };

  const getRoleAndRedirect = async (email) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/users/role/${email}`
      );
      const role = data?.role || "user";

      if (role === "admin" || role === "vendor") {
        navigate("/", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("Role fetch failed", err);
      navigate("/", { replace: true });
    }
  };

  const onSubmit = async ({ email, password }) => {
    setIsSubmitting(true);
    try {
      const result = await loginWithPass(email, password);
      const user = result.user;

      await saveUserToDatabase(user);
      reset();
      toast.success(`Welcome back, ${user.displayName || 'User'}!`);
      await getRoleAndRedirect(user.email);
    } catch (err) {
      toast.error(err.message || "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsSubmitting(true);
    try {
      const result = await googleLogin();
      const user = result.user;

      await saveUserToDatabase(user);
      toast.success(`Welcome, ${user.displayName}!`);
      await getRoleAndRedirect(user.email);
    } catch (err) {
      console.error(err);
      toast.error("Google login failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setTimeout(() => setLoder(false), 500);
  }, []);

  if (loder) return <Loader />;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
      <motion.div
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Left Panel */}
        <div className="animated-sea-green hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <motion.h1 
            className="text-4xl font-extrabold leading-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome Back!
          </motion.h1>
          <motion.p 
            className="mt-4 text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Log in to access your dashboard and manage your products.
          </motion.p>
        </div>





        {/* Right Panel (Form) */}
        <div className="p-8 sm:p-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-slate-800 mb-2">
              Login to Your Account
            </motion.h2>
            <motion.p variants={itemVariants} className="text-slate-500 mb-8">
              Enter your credentials to continue.
            </motion.p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <motion.div variants={itemVariants} className="relative">
                <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full pl-12 pr-4 py-3 bg-slate-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter Your Email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <FaLock className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />
                <input
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  className="w-full pl-12 pr-4 py-3 bg-slate-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter Your Password"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </motion.div>

              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 disabled:bg-green-400"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? <CgSpinner className="animate-spin text-xl" /> : "Login"}
              </motion.button>

              <motion.div variants={itemVariants} className="relative flex items-center my-6">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-slate-400 text-sm">OR</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </motion.div>

              <motion.button
                variants={itemVariants}
                onClick={loginWithGoogle}
                type="button"
                disabled={isSubmitting}
                className="w-full bg-white text-slate-700 font-bold py-3 px-6 rounded-lg hover:bg-slate-100 transition-all duration-300 flex items-center justify-center gap-3 border border-slate-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaGoogle className="text-red-500" />
                Sign in with Google
              </motion.button>
            </form>

            <motion.p variants={itemVariants} className="text-center text-slate-500 mt-8">
              Don't have an account?{" "}
              <Link to="/register" className="text-green-600 hover:underline font-semibold">
                Register Now
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
