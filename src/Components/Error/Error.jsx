import React from "react";
import {useNavigate} from "react-router";

const Error = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('/404-error-with-people-holding-the-numbers-animate.svg')",
      }}
    >
      <div className="absolute inset-0 bg-black/10 backdrop-blur-xs" />

      <button
        onClick={handleGoBack}
        className="relative z-10 px-6 border-black border-2 py-3 bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white text-lg font-medium rounded-lg shadow-lg"
      >
        Go Back
      </button>
    </div>
  );
};

export default Error;
