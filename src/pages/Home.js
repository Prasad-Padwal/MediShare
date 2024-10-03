import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import lottie from 'lottie-web';

function Home() {
  const animationContainer = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/medicine-donation-animation.json'
    });
  }, []);

  return (
    <div className="container mx-auto mt-20 text-center px-4">
      <h1 className="text-5xl font-bold mb-6 text-blue-600 animate-fade-in">Welcome to CareSwap</h1>
      <p className="text-xl mb-10 text-gray-600 animate-slide-up">Connecting Hearts, Sharing Health</p>
      <div className="mb-12" ref={animationContainer} style={{width: '300px', height: '300px', margin: '0 auto'}}></div>
      <div className="space-x-6 animate-slide-up">
        <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg">
          Login
        </Link>
        <Link to="/signup" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Home;