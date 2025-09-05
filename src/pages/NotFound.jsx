import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-7xl font-extrabold text-gray-800 dark:text-gray-100"
        >
          404
        </motion.h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-2xl bg-blue-600 px-6 py-3 text-white font-medium shadow-md hover:bg-blue-700 transition"
        >
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
