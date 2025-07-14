


import { Link, useLocation, useNavigate } from "react-router";
import { Typewriter } from "react-simple-typewriter";
import { Fade } from "react-awesome-reveal";
import { useContext, useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../ContextFiles/AuthContext";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [loder, setLoder] = useState(true);
  const { googleLogin, loginWithPass } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // ✅ Email/Password login with token saving
  const onSubmit = async ({ email, password }) => {
    try {
      const result = await loginWithPass(email, password);
      const user = result.user;

      // ✅ Get Firebase token and store
      const token = await user.getIdToken();
      localStorage.setItem("accessToken", token);

      reset();
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || "Login failed.");
    }
  };

  // ✅ Google login with token saving
  const loginWithGoogle = async () => {
    try {
      const result = await googleLogin();
      const user = result.user;

      // ✅ Get Firebase token and store
      const token = await user.getIdToken();
      localStorage.setItem("accessToken", token);

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Google login failed. Try again.");
    }
  };

  useEffect(() => {
    setTimeout(() => setLoder(false), 500);
  }, []);

  if (loder) return <Loader />;

  return (
    <div className="px-[2%] lg:px-[5%] flex flex-col justify-center items-center bg-white dark:bg-gray-900">
      <Fade direction="down" cascade duration={800}>
        <h1 className="text-3xl sm:text-5xl font-bold text-center text-green-600 dark:text-green-400 mb-6">
          Login Now
        </h1>
      </Fade>

      <div className="flex w-full justify-center min-h-[calc(100vh-200px)] items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center backdrop-blur-sm bg-green-100/30 dark:bg-green-900/20 p-5 sm:p-10 md:p-20 rounded-lg shadow shadow-green-300 dark:shadow-green-800 md:gap-2 w-3/4 lg:max-w-3xl"
        >
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            className="border-2 border-green-400 p-2 h-10 lg:h-12 font-semibold rounded-lg w-full bg-green-50/60 dark:bg-green-800/40 text-black dark:text-white placeholder:text-white"
            placeholder="Enter Your Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 w-full">
              {errors.email.message}
            </p>
          )}

          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              validate: {
                hasUpper: (value) =>
                  /[A-Z]/.test(value) || "Must include an uppercase letter",
                hasLower: (value) =>
                  /[a-z]/.test(value) || "Must include a lowercase letter",
              },
            })}
            className="border-2 border-green-400 p-2 h-10 lg:h-12 font-semibold rounded-lg w-full bg-green-50/60 dark:bg-green-800/40 text-black dark:text-white placeholder:text-white mt-4"
            placeholder="Enter Your Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 w-full">
              {errors.password.message}
            </p>
          )}

          <button
            onClick={loginWithGoogle}
            type="button"
            className="flex items-center justify-center gap-2 mt-8 font-bold border-2 border-green-300 w-full h-10 lg:h-12 bg-green-100 dark:bg-green-800 text-gray-900 dark:text-white hover:bg-green-500 hover:text-white rounded-full transition"
          >
            <FaGoogle size={20} />
            <span>Login With Google</span>
          </button>

          <button
            type="submit"
            className="bg-green-500 text-white font-bold w-full h-10 lg:h-12 rounded-full mt-2 hover:bg-green-600 transition"
          >
            Login
          </button>

          <p className="text-center text-black dark:text-white mt-4">
            Don&apos;t have an account?
            <Link
              to={"/register"}
              className="text-green-600 hover:underline ml-1 font-semibold"
            >
              <br className="sm:hidden" /> Register Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;