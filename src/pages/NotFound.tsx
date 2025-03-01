import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-6 text-center">
      {/* Animated 404 Text */}
      <motion.h1
        className="text-7xl font-bold text-gray-800 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>

      {/* Animated Subtitle */}
      <motion.p
        className="mt-4 text-lg text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Oops! The page you are looking for doesn’t exist.
      </motion.p>

      {/* Button with Hover Effect */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Button
          className="rounded-xl px-6 py-3 text-lg shadow-md transition-all duration-300 hover:scale-105"
          onClick={() => navigate("/")}
        >
          Go Home
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
