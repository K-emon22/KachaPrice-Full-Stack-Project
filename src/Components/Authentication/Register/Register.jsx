
import {Link, useNavigate} from "react-router";
import {useContext, useEffect, useState} from "react";
import {FaGoogle} from "react-icons/fa";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../ContextFiles/AuthContext";
import {updateProfile} from "firebase/auth";
import {toast} from "react-toastify";
import Loader from "../../Loader/Loader";
import {Fade} from "react-awesome-reveal";
import axios from "axios";

const Register = () => {
  const {googleLogin, createUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [createdAt, setCreatedAt] = useState("");
  const [userRole] = useState("user"); // default role

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({mode: "onChange"});

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }); // 22 June 2025
    setCreatedAt(formattedDate);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const result = await createUser(data.email, data.password);
      const user = result.user;

      await updateProfile(user, {
        displayName: data.name,
        photoURL: data.photo,
      });

      const token = await user.getIdToken();
      localStorage.setItem("accessToken", token);

      await axios.post("http://localhost:3000/users", {
        name: data.name,
        email: data.email,
        photoURL: data.photo,
        createdAt,
        role: userRole,
      });

      reset();
      navigate("/");
    } catch (err) {
      const messages = {
        "auth/email-already-in-use": "Email is already in use.",
        "auth/invalid-email": "Invalid email address.",
      };
      toast.error(messages[err.code] || err.message || "Registration failed.", {
        style: {background: "#fecaca"},
      });
    } finally {
      setSubmitting(false);
    }
  };

  const loginWithGoogle = async () => {
    setSubmitting(true);
    try {
      const result = await googleLogin();
      const user = result.user;

      const token = await user.getIdToken();
      localStorage.setItem("accessToken", token);

      await axios.post("http://localhost:3000/users", {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        role: userRole,
      });

      navigate("/");
    } catch {
      toast.error("Google login failed. Please try again.", {
        style: {background: "#fecaca"},
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="px-[2%] lg:px-[5%] flex flex-col justify-center items-center bg-white dark:bg-gray-900">
      <Fade direction="down" cascade duration={800}>
        <h1 className="text-3xl sm:text-5xl font-bold text-center text-green-600 dark:text-green-400 mb-6">
          Register Now
        </h1>
      </Fade>

      <div className="flex w-full justify-center min-h-[calc(100vh-200px)] items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center backdrop-blur-sm bg-green-100/30 dark:bg-green-900/20 p-5 sm:p-10 md:p-20 rounded-lg shadow shadow-green-300 dark:shadow-green-800 md:gap-2 w-3/4 lg:max-w-3xl"
        >
          <input
            type="text"
            placeholder="Enter Your Name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            className="border-2 border-green-400 p-2 h-10 lg:h-12 font-semibold rounded-lg w-full bg-green-50/60 dark:bg-green-800/40 text-black dark:text-white placeholder:text-white"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 w-full">
              {errors.name.message}
            </p>
          )}

          <input
            type="email"
            placeholder="Enter Your Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className="border-2 border-green-400 p-2 h-10 lg:h-12 font-semibold rounded-lg w-full bg-green-50/60 dark:bg-green-800/40 text-black dark:text-white placeholder:text-white mt-4"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 w-full">
              {errors.email.message}
            </p>
          )}

          <input
            type="text"
            placeholder="Photo URL (optional)"
            {...register("photo")}
            className="border-2 border-green-400 p-2 h-10 lg:h-12 font-semibold rounded-lg w-full bg-green-50/60 dark:bg-green-800/40 text-black dark:text-white placeholder:text-white mt-4"
          />

          <input
            type="password"
            placeholder="Enter Your Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              validate: {
                hasUppercase: (value) =>
                  /[A-Z]/.test(value) ||
                  "Must contain at least one uppercase letter",
                hasLowercase: (value) =>
                  /[a-z]/.test(value) ||
                  "Must contain at least one lowercase letter",
              },
            })}
            className="border-2 border-green-400 p-2 h-10 lg:h-12 font-semibold rounded-lg w-full bg-green-50/60 dark:bg-green-800/40 text-black dark:text-white placeholder:text-white mt-4"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 w-full">
              {errors.password.message}
            </p>
          )}

          {/* Hidden Inputs */}
          <input type="hidden" {...register("createdAt")} value={createdAt} />
          <input type="hidden" {...register("UserRole")} value={userRole} />

          <button
            type="button"
            onClick={loginWithGoogle}
            disabled={submitting}
            className="flex items-center justify-center gap-2 mt-8 font-bold border-2 border-green-300 w-full h-10 lg:h-12 bg-green-100 dark:bg-green-800 text-gray-900 dark:text-white hover:bg-green-500 hover:text-white rounded-full transition"
          >
            <FaGoogle size={20} />
            <span>Register With Google</span>
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="bg-green-500 text-white font-bold w-full h-10 lg:h-12 rounded-full mt-2 hover:bg-green-600 transition"
          >
            {submitting ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-black dark:text-white mt-4">
            Already have an account?
            <Link
              to="/login"
              className="text-green-600 hover:underline ml-1 font-semibold"
            >
              <br className="sm:hidden" />
              Login Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
