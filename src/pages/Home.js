import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHandHoldingMedical, FaHeartbeat } from 'react-icons/fa';
import { useLottie } from 'lottie-react';

function Home() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('https://assets2.lottiefiles.com/private_files/lf30_4FGi6N.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  const options = {
    animationData: animationData,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-100 via-teal-50 to-indigo-100 flex flex-col overflow-hidden">
      <main className="flex-grow flex flex-col justify-center items-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold mb-4 text-indigo-700">Welcome to MediShare</h1>
          <p className="text-2xl mb-8 text-indigo-600">Connecting Hearts, Sharing Health</p>

          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 w-64 h-64 mx-auto"
          >
            {animationData && View}
          </motion.div>

          <div className="flex justify-center space-x-12 mb-8">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center"
            >
              <FaHandHoldingMedical className="text-4xl text-indigo-500 mb-2" />
              <p className="text-indigo-700">Donate Medicines</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center"
            >
              <FaHeartbeat className="text-4xl text-teal-500 mb-2 " />
              <p className="text-indigo-700">Save Lives</p>
            </motion.div>
          </div>

          <div className="space-x-4">
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 shadow-lg"
              >
                Login
              </motion.button>
            </Link>
            <Link to="/signup"> 
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 shadow-lg"
              >
                Sign Up
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default Home;