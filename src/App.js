import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import NGOLogin from "./pages/NGOLogin";
import NGOSignup from "./pages/NGOSignup";
import DonateMedicine from "./pages/DonateMedicine";
import NGODashboard from "./pages/NGODashboard";
import UserDashboard from "./pages/UserDashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App font-sans min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user/login" element={<UserLogin />} />
              <Route path="/user/signup" element={<UserSignup />} />
              <Route path="/ngo/login" element={<NGOLogin />} />
              <Route path="/ngo/signup" element={<NGOSignup />} />
              <Route path="/donate" element={<PrivateRoute><DonateMedicine /></PrivateRoute>} />
              <Route path="/ngo-dashboard" element={<PrivateRoute><NGODashboard /></PrivateRoute>} />
              <Route path="/user-dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;