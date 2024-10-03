import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import { auth } from '../firebase';

function Navbar() {
  const { currentUser } = useContext(AuthContext);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-2xl flex items-center">
          <img src="/logo.png" alt="CareSwap Logo" className="h-8 w-8 mr-2" />
          CareSwap
        </Link>
        <div className="space-x-4">
          {currentUser ? (
            <>
              <Link to="/donate" className="text-white hover:text-amber-300 transition duration-300">Donate</Link>
              <button onClick={handleLogout} className="text-white hover:text-amber-300 transition duration-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-amber-300 transition duration-300">Login</Link>
              <Link to="/signup" className="bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600 transition duration-300">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;