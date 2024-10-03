import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className="container mx-auto mt-20 text-center px-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-600 animate-fade-in">Join CareSwap</h1>
      <div className="space-y-6 animate-slide-up max-w-md mx-auto">
        <Link to="/user/signup" className="block bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 shadow-lg">
          User Sign Up
        </Link>
        <Link to="/ngo/signup" className="block bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 shadow-lg">
          NGO Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Signup;