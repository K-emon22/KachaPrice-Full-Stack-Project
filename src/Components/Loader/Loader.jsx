import React from "react";
import {motion} from "framer-motion";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white gap-5 flex-col">
      <motion.div
        className="w-16 h-16 border-4 border-green-600 border-dashed rounded-full"
        animate={{rotate: 360, scale: [1, 1.2, 1]}}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
      <p className="font-semibold text-center">Loading...</p>
    </div>
  );
};

export default Loader;
