import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Login() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto mt-20 text-center px-4"
    >
      <motion.h1 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-4xl font-bold mb-8 text-indigo-600"
      >
        Login to CareSwap
      </motion.h1>
      <div className="space-y-6 max-w-md mx-auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/user/login" className="block bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 shadow-lg">
            User Login
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/ngo/login" className="block bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 shadow-lg">
            NGO Login
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Login;