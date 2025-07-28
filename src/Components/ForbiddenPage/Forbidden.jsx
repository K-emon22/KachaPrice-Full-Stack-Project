import React, {useEffect} from "react";
import {useNavigate} from "react-router";

const Forbidden = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-md text-center">
        <h1 className=" text-5xl  md:text-9xl font-extrabold text-red-600 mb-6 select-none">
          403
        </h1>
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          Access Denied
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, you do not have permission to view this page.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="inline-block px-6 py-3 bg-green-600 border-black border-2 text-white font-semibold rounded-lg hover:bg-green-700 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Forbidden;
