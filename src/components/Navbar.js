import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleClick = async () => {
    try {
      await logout();
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="py-2 px-16 flex items-center bg-primary-gray justify-between border-2 border-b-primary-gray">
      <div className="flex items-center">
        <img className="w-[50px]" alt="Logo" /> {/* Add your logo source */}
        <a href='/' className="font-bold text-2xl text-[#3A8EF6] ml-4">
          CareSwap
        </a>
      </div>
      <div className="flex items-center justify-center">
        {currentUser ? (
          <>
            <div className="pr-3">{currentUser.email}</div>
            <button className="btn-primary mb-0" onClick={handleClick} style={{marginBottom: "0px"}}>
              Logout
            </button>
          </>
        ) : (
          <button className="btn-primary mb-0" onClick={() => navigate('/login')} style={{marginBottom: "0px"}}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;