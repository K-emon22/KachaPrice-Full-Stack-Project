// // import {Link, useNavigate, useLocation} from "react-router"; // use *react-router-dom*
// // import {useContext, useEffect, useState} from "react";
// // import {FaGoogle} from "react-icons/fa";
// // import {useForm} from "react-hook-form";
// // import {AuthContext} from "../../ContextFiles/AuthContext";
// // import {updateProfile} from "firebase/auth";
// // import {toast} from "react-toastify";
// // import Loader from "../../Loader/Loader";
// // import {Fade} from "react-awesome-reveal";
// // import axios from "axios";

// // const Register = () => {
// //   const {googleLogin, createUser} = useContext(AuthContext);
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const from = location.state?.from?.pathname || "/";

// //   const [loading, setLoading] = useState(true);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [createdAt, setCreatedAt] = useState("");
// //   const userRole = "user";

// //   const {
// //     register,
// //     handleSubmit,
// //     formState: {errors},
// //     reset,
// //   } = useForm({mode: "onChange"});

// //   useEffect(() => {
// //     const timer = setTimeout(() => setLoading(false), 500);
// //     const date = new Date();
// //     const formattedDate = date.toLocaleDateString("en-GB", {
// //       day: "2-digit",
// //       month: "long",
// //       year: "numeric",
// //     });
// //     setCreatedAt(formattedDate);
// //     return () => clearTimeout(timer);
// //   }, []);

// //   const saveUserToDatabase = async (userData) => {
// //     try {
// //       await axios.post(`${import.meta.env.VITE_API}/allUser`, userData);
// //     } catch (error) {
// //       console.error("User save failed", error);
// //     }
// //   };

// //   const onSubmit = async (data) => {
// //     setSubmitting(true);
// //     try {
// //       const result = await createUser(data.email, data.password);
// //       const user = result.user;

// //       await updateProfile(user, {
// //         displayName: data.name,
// //         photoURL: data.photo,
// //       });

// //       // No token setting here

// //       await saveUserToDatabase({
// //         name: data.name,
// //         email: data.email,
// //         photoURL: data.photo,
// //         createdAt,
// //         role: userRole,
// //       });

// //       reset();
// //       navigate(from, {replace: true});
// //     } catch (err) {
// //       const messages = {
// //         "auth/email-already-in-use": "Email is already in use.",
// //         "auth/invalid-email": "Invalid email address.",
// //       };
// //       toast.error(messages[err.code] || err.message || "Registration failed.", {
// //         style: {background: "#fecaca"},
// //       });
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   const loginWithGoogle = async () => {
// //     setSubmitting(true);
// //     try {
// //       const result = await googleLogin();
// //       const user = result.user;

// //       // No token setting here

// //       await saveUserToDatabase({
// //         name: user.displayName || "Anonymous",
// //         email: user.email,
// //         photoURL: user.photoURL,
// //         createdAt: new Date().toLocaleDateString("en-GB", {
// //           day: "2-digit",
// //           month: "long",
// //           year: "numeric",
// //         }),
// //         role: userRole,
// //       });

// //       navigate(from, {replace: true});
// //     } catch {
// //       toast.error("Google login failed. Please try again.", {
// //         style: {background: "#fecaca"},
// //       });
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   if (loading) return <Loader />;

// //   return (
// //     <div className="px-[2%] lg:px-[5%] flex flex-col justify-center items-center bg-white ">
// //       <Fade direction="down" cascade duration={800}>
// //         <h1 className="text-3xl sm:text-5xl font-bold text-center text-green-600 dark:text-green-400 mb-6">
// //           Register Now
// //         </h1>
// //       </Fade>

// //       <div className="flex w-full justify-center min-h-[calc(100vh-200px)] items-center">
// //         <form
// //           onSubmit={handleSubmit(onSubmit)}
// //           className="flex flex-col justify-center items-center backdrop-blur-sm bg-green-100/30 dark:bg-green-900/20 p-5 sm:p-10 md:p-20 rounded-lg shadow shadow-green-300 dark:shadow-green-800 md:gap-2 w-3/4 lg:max-w-3xl"
// //         >
// //           <input
// //             type="text"
// //             placeholder="Enter Your Name"
// //             {...register("name", {
// //               required: "Name is required",
// //               minLength: {
// //                 value: 2,
// //                 message: "Name must be at least 2 characters",
// //               },
// //             })}
// //             className="border-2 border-green-400 p-2 h-10 lg:h-12 font-semibold rounded-lg w-full bg-green-50/60 dark:bg-green-800/40 text-black dark:text-white placeholder:text-white"
// //           />
// //           {errors.name && (
// //             <p className="text-red-500 text-sm mt-1 w-full">
// //               {errors.name.message}
// //             </p>
// //           )}

// //           <input
// //             type="email"
// //             placeholder="Enter Your Email"
// //             {...register("email", {
// //               required: "Email is required",
// //               pattern: {
// //                 value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
// //                 message: "Invalid email address",
// //               },
// //             })}
// //             className="border-2 border-green-400 p-2 h-10 lg:h-12 font-semibold rounded-lg w-full bg-green-50/60 dark:bg-green-800/40 text-black dark:text-white placeholder:text-white mt-4"
// //           />
// //           {errors.email && (
// //             <p className="text-red-500 text-sm mt-1 w-full">
// //               {errors.email.message}
// //             </p>
// //           )}

// //           <input
// //             type="text"
// //             placeholder="Photo URL (optional)"
// //             {...register("photo")}
// //             className="border-2 border-green-400 p-2 h-10 lg:h-12 font-semibold rounded-lg w-full bg-green-50/60 dark:bg-green-800/40 text-black dark:text-white placeholder:text-white mt-4"
// //           />

// //           <input
// //             type="password"
// //             placeholder="Enter Your Password"
// //             {...register("password", {
// //               required: "Password is required",
// //               minLength: {
// //                 value: 6,
// //                 message: "Password must be at least 6 characters",
// //               },
// //               validate: {
// //                 hasUppercase: (value) =>
// //                   /[A-Z]/.test(value) ||
// //                   "Must contain at least one uppercase letter",
// //                 hasLowercase: (value) =>
// //                   /[a-z]/.test(value) ||
// //                   "Must contain at least one lowercase letter",
// //               },
// //             })}
// //             className="border-2 border-green-400 p-2 h-10 lg:h-12 font-semibold rounded-lg w-full bg-green-50/60 dark:bg-green-800/40 text-black dark:text-white placeholder:text-white mt-4"
// //           />
// //           {errors.password && (
// //             <p className="text-red-500 text-sm mt-1 w-full">
// //               {errors.password.message}
// //             </p>
// //           )}

// //           {/* Hidden Inputs */}
// //           <input type="hidden" {...register("createdAt")} value={createdAt} />
// //           <input type="hidden" {...register("UserRole")} value={userRole} />

// //           <button
// //             type="button"
// //             onClick={loginWithGoogle}
// //             disabled={submitting}
// //             className="flex items-center justify-center gap-2 mt-8 font-bold border-2 border-green-300 w-full h-10 lg:h-12 bg-green-100 dark:bg-green-800 text-gray-900 dark:text-white hover:bg-green-500 hover:text-white rounded-full transition"
// //           >
// //             <FaGoogle size={20} />
// //             <span>Register With Google</span>
// //           </button>

// //           <button
// //             type="submit"
// //             disabled={submitting}
// //             className="bg-green-500 text-white font-bold w-full h-10 lg:h-12 rounded-full mt-2 hover:bg-green-600 transition"
// //           >
// //             {submitting ? "Registering..." : "Register"}
// //           </button>

// //           <p className="text-center text-black mt-4">
// //             Already have an account?
// //             <Link
// //               to="/login"
// //               className="text-green-600 hover:underline ml-1 font-semibold"
// //             >
// //               <br className="sm:hidden" />
// //               Login Now
// //             </Link>
// //           </p>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Register;

// // import { Link, useNavigate, useLocation } from "react-router"; // ✅ fixed react-router-dom
// // import { useContext, useEffect, useState } from "react";
// // import { FaGoogle } from "react-icons/fa";
// // import { useForm } from "react-hook-form";
// // import { AuthContext } from "../../ContextFiles/AuthContext";
// // import { updateProfile } from "firebase/auth";
// // import { toast } from "react-toastify";
// // import Loader from "../../Loader/Loader";
// // import { Fade } from "react-awesome-reveal";
// // import axios from "axios";

// // const Register = () => {
// //   const { googleLogin, createUser } = useContext(AuthContext);
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const from = location.state?.from?.pathname || "/";

// //   const [loading, setLoading] = useState(true);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [createdAt, setCreatedAt] = useState("");
// //   const userRole = "user";

// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //     reset,
// //   } = useForm({ mode: "onChange" });

// //   useEffect(() => {
// //     const timer = setTimeout(() => setLoading(false), 500);
// //     const date = new Date();
// //     const formattedDate = date.toLocaleDateString("en-GB", {
// //       day: "2-digit",
// //       month: "long",
// //       year: "numeric",
// //     });
// //     setCreatedAt(formattedDate);
// //     return () => clearTimeout(timer);
// //   }, []);

// //   const saveUserToDatabase = async (userData) => {
// //     try {
// //       await axios.post(`${import.meta.env.VITE_API}/allUser`, userData);
// //     } catch (error) {
// //       console.error("User save failed", error);
// //     }
// //   };

// //   const onSubmit = async (data) => {
// //     setSubmitting(true);
// //     try {
// //       const result = await createUser(data.email, data.password);
// //       const user = result.user;

// //       await updateProfile(user, {
// //         displayName: data.name,
// //         photoURL: data.photo,
// //       });

// //       await saveUserToDatabase({
// //         name: data.name,
// //         email: data.email,
// //         photoURL: data.photo,
// //         createdAt,
// //         role: userRole,
// //       });

// //       reset();
// //       navigate(from, { replace: true });
// //     } catch (err) {
// //       const messages = {
// //         "auth/email-already-in-use": "Email is already in use.",
// //         "auth/invalid-email": "Invalid email address.",
// //       };
// //       toast.error(messages[err.code] || err.message || "Registration failed.", {
// //         style: { background: "#fecaca" },
// //       });
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   const loginWithGoogle = async () => {
// //     setSubmitting(true);
// //     try {
// //       const result = await googleLogin();
// //       const user = result.user;

// //       await saveUserToDatabase({
// //         name: user.displayName || "Anonymous",
// //         email: user.email,
// //         photoURL: user.photoURL,
// //         createdAt: new Date().toLocaleDateString("en-GB", {
// //           day: "2-digit",
// //           month: "long",
// //           year: "numeric",
// //         }),
// //         role: userRole,
// //       });

// //       navigate(from, { replace: true });
// //     } catch {
// //       toast.error("Google login failed. Please try again.", {
// //         style: { background: "#fecaca" },
// //       });
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   if (loading) return <Loader />;

// //   return (
// //     <div className="px-[2%] lg:px-[5%] flex flex-col justify-center items-center bg-white">
// //       <Fade direction="down" cascade duration={800}>
// //         <h1 className="text-3xl sm:text-5xl font-bold text-center text-green-600 dark:text-green-400 mb-6">
// //           Register Now
// //         </h1>
// //       </Fade>

// //       <div className="flex w-full justify-center min-h-[calc(100vh-200px)] items-center">
// //         <form
// //           onSubmit={handleSubmit(onSubmit)}
// //           className="flex flex-col justify-center items-center backdrop-blur-sm bg-green-100/30 dark:bg-green-900/20 p-5 sm:p-10 md:p-20 rounded-lg shadow shadow-green-300 dark:shadow-green-800 md:gap-2 w-3/4 lg:max-w-3xl"
// //         >
// //           <input
// //             type="text"
// //             placeholder="Enter Your Name"
// //             {...register("name", {
// //               required: "Name is required",
// //               minLength: {
// //                 value: 2,
// //                 message: "Name must be at least 2 characters",
// //               },
// //             })}
// //             className="border-2 border-green-400 p-2 h-10 lg:h-12 font-semibold rounded-lg w-full bg-green-50/60 dark:bg-green-800/40 text-black dark:text-white placeholder:text-white"
// //           />
// //           {errors.name && (
// //             <p className="text-red-500 text-sm mt-1 w-full">
// //               {errors.name.message}
// //             </p>
// //           )}

// //           <input
// //             type="email"
// //             placeholder="Enter Your Email"
// //             {...register("email", {
// //               required: "Email is required",
// //               pattern: {
// //                 value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
// //                 message: "Invalid email address",
// //               },
// //             })}
// //             className="border-2 border-green-400 p-2 h-10 lg:h-12 font-semibold rounded-lg w-full bg-green-50/60 dark:bg-green-800/40 text-black dark:text-white placeholder:text-white mt-4"
// //           />
// //           {errors.email && (
// //             <p className="text-red-500 text-sm mt-1 w-full">
// //               {errors.email.message}
// //             </p>
// //           )}

// //           <input
// //             type="text"
// //             placeholder="Photo URL (optional)"
// //             {...register("photo")}
// //             className="border-2 border-green-400 p-2 h-10 lg:h-12 font-semibold rounded-lg w-full bg-green-50/60 dark:bg-green-800/40 text-black dark:text-white placeholder:text-white mt-4"
// //           />

// //           <input
// //             type="password"
// //             placeholder="Enter Your Password"
// //             {...register("password", {
// //               required: "Password is required",
// //               minLength: {
// //                 value: 6,
// //                 message: "Password must be at least 6 characters",
// //               },
// //               validate: {
// //                 hasUppercase: (value) =>
// //                   /[A-Z]/.test(value) ||
// //                   "Must contain at least one uppercase letter",
// //                 hasLowercase: (value) =>
// //                   /[a-z]/.test(value) ||
// //                   "Must contain at least one lowercase letter",
// //               },
// //             })}
// //             className="border-2 border-green-400 p-2 h-10 lg:h-12 font-semibold rounded-lg w-full bg-green-50/60 dark:bg-green-800/40 text-black dark:text-white placeholder:text-white mt-4"
// //           />
// //           {errors.password && (
// //             <p className="text-red-500 text-sm mt-1 w-full">
// //               {errors.password.message}
// //             </p>
// //           )}

// //           {/* Hidden Inputs */}
// //           <input type="hidden" {...register("createdAt")} value={createdAt} />
// //           <input type="hidden" {...register("UserRole")} value={userRole} />

// //           <button
// //             type="button"
// //             onClick={loginWithGoogle}
// //             disabled={submitting}
// //             className="flex items-center justify-center gap-2 mt-8 font-bold border-2 border-green-300 w-full h-10 lg:h-12 bg-green-100 dark:bg-green-800 text-gray-900 dark:text-white hover:bg-green-500 hover:text-white rounded-full transition"
// //           >
// //             <FaGoogle size={20} />
// //             <span>Register With Google</span>
// //           </button>

// //           <button
// //             type="submit"
// //             disabled={submitting}
// //             className="bg-green-500 text-white font-bold w-full h-10 lg:h-12 rounded-full mt-2 hover:bg-green-600 transition"
// //           >
// //             {submitting ? "Registering..." : "Register"}
// //           </button>

// //           <p className="text-center text-black mt-4">
// //             Already have an account?
// //             <Link
// //               to="/login"
// //               className="text-green-600 hover:underline ml-1 font-semibold"
// //             >
// //               <br className="sm:hidden" />
// //               Login Now
// //             </Link>
// //           </p>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Register;

// import {Link, useNavigate, useLocation} from "react-router";
// import {useContext, useEffect, useState} from "react";
// import {FaGoogle} from "react-icons/fa";
// import {useForm} from "react-hook-form";
// import {AuthContext} from "../../ContextFiles/AuthContext";
// import {updateProfile} from "firebase/auth";
// import {toast} from "react-toastify";
// import Loader from "../../Loader/Loader";
// import {Fade} from "react-awesome-reveal";
// import axios from "axios";

// const Register = () => {
//   const {googleLogin, createUser} = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/";

//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: {errors},
//     reset,
//   } = useForm({mode: "onChange"});

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 500);
//     return () => clearTimeout(timer);
//   }, []);

//   // ✅ This function now handles the entire post-authentication flow
//   const handlePostRegistration = async (user) => {
//     const userInfo = {
//       name: user.displayName,
//       email: user.email,
//       photoURL: user.photoURL,
//       createdAt: new Date().toISOString(), // Use ISO string for consistency
//       role: "user",
//     };

//     try {
//       // Step 1: Save the new user to the database.
//       // The backend will handle checking for duplicates.
//       await axios.post(`${import.meta.env.VITE_API}/allUser`, userInfo);

//       // Step 2: Now that the user is saved, fetch their role.
//       const {data} = await axios.get(
//         `${import.meta.env.VITE_API}/users/role/${user.email}`
//       );
//       const role = data?.role || "user";

//       // Step 3: Redirect based on the role.
//       if (role === "admin" || role === "vendor") {
//         navigate("/", {replace: true});
//       } else {
//         navigate("/", {replace: true});
//       }
//     } catch (error) {
//       console.error("Post-registration process failed:", error);
//       toast.error("An error occurred after registration.");
//       navigate("/"); // Fallback navigation
//     }
//   };

//   const onSubmit = async (data) => {
//     setSubmitting(true);
//     try {
//       const result = await createUser(data.email, data.password);
//       const user = result.user;

//       // Update Firebase profile
//       await updateProfile(user, {
//         displayName: data.name,
//         photoURL: data.photo,
//       });

//       // Use the updated user object for the next step
//       const updatedUser = {
//         ...user,
//         displayName: data.name,
//         photoURL: data.photo,
//       };

//       reset();
//       // ✅ Hand off to the unified post-registration function
//       await handlePostRegistration(updatedUser);
//     } catch (err) {
//       const messages = {
//         "auth/email-already-in-use": "Email is already in use.",
//         "auth/invalid-email": "Invalid email address.",
//       };
//       toast.error(messages[err.code] || err.message || "Registration failed.", {
//         style: {background: "#fecaca"},
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const loginWithGoogle = async () => {
//     setSubmitting(true);
//     try {
//       const result = await googleLogin();
//       const user = result.user;

//       // ✅ Hand off to the unified post-registration function
//       await handlePostRegistration(user);
//     } catch (err) {
//       console.error(err);
//       toast.error("Google login failed. Please try again.", {
//         style: {background: "#fecaca"},
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="px-[2%] lg:px-[5%] flex flex-col justify-center items-center bg-white">
//       <Fade direction="down" cascade duration={800}>
//         <h1 className="text-3xl sm:text-5xl font-bold text-center text-green-600 dark:text-green-400 mb-6">
//           Register Now
//         </h1>
//       </Fade>

//       <div className="flex w-full justify-center min-h-[calc(100vh-200px)] items-center">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="flex flex-col justify-center items-center backdrop-blur-sm bg-green-100/30 dark:bg-green-900/20 p-5 sm:p-10 md:p-20 rounded-lg shadow shadow-green-300 dark:shadow-green-800 md:gap-2 w-3/4 lg:max-w-3xl"
//         >
//           <input
//             type="text"
//             placeholder="Enter Your Name"
//             {...register("name", {
//               required: "Name is required",
//               minLength: {
//                 value: 2,
//                 message: "Name must be at least 2 characters",
//               },
//             })}
//             className="border-2 border-green-400 p-2 h-10 lg:h-12 font-semibold rounded-lg w-full bg-green-50/60 dark:bg-green-800/40 text-black dark:text-white placeholder:text-white"
//           />
//           {errors.name && (
//             <p className="text-red-500 text-sm mt-1 w-full">
//               {errors.name.message}
//             </p>
//           )}

//           <input
//             type="email"
//             placeholder="Enter Your Email"
//             {...register("email", {
//               required: "Email is required",
//               pattern: {
//                 value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                 message: "Invalid email address",
//               },
//             })}
//             className="border-2 border-green-400 p-2 h-10 lg:h-12 font-semibold rounded-lg w-full bg-green-50/60 dark:bg-green-800/40 text-black dark:text-white placeholder:text-white mt-4"
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mt-1 w-full">
//               {errors.email.message}
//             </p>
//           )}

//           <input
//             type="text"
//             placeholder="Photo URL (optional)"
//             {...register("photo")}
//             className="border-2 border-green-400 p-2 h-10 lg:h-12 font-semibold rounded-lg w-full bg-green-50/60 dark:bg-green-800/40 text-black dark:text-white placeholder:text-white mt-4"
//           />

//           <input
//             type="password"
//             placeholder="Enter Your Password"
//             {...register("password", {
//               required: "Password is required",
//               minLength: {
//                 value: 6,
//                 message: "Password must be at least 6 characters",
//               },
//               validate: {
//                 hasUppercase: (value) =>
//                   /[A-Z]/.test(value) ||
//                   "Must contain at least one uppercase letter",
//                 hasLowercase: (value) =>
//                   /[a-z]/.test(value) ||
//                   "Must contain at least one lowercase letter",
//               },
//             })}
//             className="border-2 border-green-400 p-2 h-10 lg:h-12 font-semibold rounded-lg w-full bg-green-50/60 dark:bg-green-800/40 text-black dark:text-white placeholder:text-white mt-4"
//           />
//           {errors.password && (
//             <p className="text-red-500 text-sm mt-1 w-full">
//               {errors.password.message}
//             </p>
//           )}

//           <button
//             type="button"
//             onClick={loginWithGoogle}
//             disabled={submitting}
//             className="flex items-center justify-center gap-2 mt-8 font-bold border-2 border-green-300 w-full h-10 lg:h-12 bg-green-100 dark:bg-green-800 text-gray-900 dark:text-white hover:bg-green-500 hover:text-white rounded-full transition"
//           >
//             <FaGoogle size={20} />
//             <span>Register With Google</span>
//           </button>

//           <button
//             type="submit"
//             disabled={submitting}
//             className="bg-green-500 text-white font-bold w-full h-10 lg:h-12 rounded-full mt-2 hover:bg-green-600 transition"
//           >
//             {submitting ? "Registering..." : "Register"}
//           </button>

//           <p className="text-center text-black mt-4">
//             Already have an account?
//             <Link
//               to="/login"
//               className="text-green-600 hover:underline ml-1 font-semibold"
//             >
//               <br className="sm:hidden" />
//               Login Now
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;
import { Link, useLocation, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaImage } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../ContextFiles/AuthContext";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";
import axios from "axios";
import { motion } from "framer-motion";
import { CgSpinner } from "react-icons/cg";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { googleLogin, createUser } = useContext(AuthContext);

  const [loder, setLoder] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

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
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/users/role/${user.email}`
      );
      const role = data?.role || "user";

      if (role === "admin" || role === "vendor") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
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

      const updatedUser = { ...user, displayName: data.name, photoURL: data.photo };
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
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 md:py-12">
      <motion.div
        className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Left Panel */}
        <div className="hidden animated-sea-green md:flex flex-col justify-center p-10 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <motion.h1 
            className="text-3xl font-extrabold leading-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Join Our Community
          </motion.h1>
          <motion.p 
            className="mt-4 text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
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
            <motion.h2 variants={itemVariants} className="text-2xl font-bold text-slate-800 mb-2">
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
                  {...register("name", { required: "Name is required" })}
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter Your Name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter Your Email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
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
                  {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
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
                {isSubmitting ? <CgSpinner className="animate-spin text-xl" /> : "Register"}
              </motion.button>

              <motion.div variants={itemVariants} className="relative flex items-center my-4">
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
                Sign up with Google
              </motion.button>
            </form>

            <motion.p variants={itemVariants} className="text-center text-slate-500 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 hover:underline font-semibold">
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
