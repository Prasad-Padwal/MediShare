import React from 'react';
import { Link } from 'react-router-dom';
import { FaMedkit } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FaMedkit className="text-3xl text-white" />
          </motion.div>
          <span className="text-white font-bold text-2xl">MediShare</span>
        </Link>
        <div className="space-x-4">
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white hover:text-indigo-200 transition duration-300"
            >
              Login
            </motion.button>
          </Link>
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-teal-400 hover:bg-teal-500 text-white px-4 py-2 rounded-full transition duration-300 shadow-md"
            >
              Sign Up
            </motion.button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;