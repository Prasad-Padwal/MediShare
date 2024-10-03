import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to MediShare</h1>
      
      {!currentUser ? (
        <div className="text-center">
          <p className="mb-4">Join our community to donate or receive medicines.</p>
          <div className="space-x-4">
            <Link to="/signup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </Link>
            <Link to="/login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Log In
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-4">Welcome back, {currentUser.displayName}!</p>
          {currentUser.role === 'ngo' ? (
            <Link to="/ngo-dashboard" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Go to NGO Dashboard
            </Link>
          ) : (
            <Link to="/user-dashboard" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
              Go to User Dashboard
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;