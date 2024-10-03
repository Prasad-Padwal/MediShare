import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import UserDashboard from './pages/UserDashboard';
import NGOLogin from './pages/NGOLogin';
import NGOSignup from './pages/NGOSignup';
import NGODashboard from './pages/NGODashboard';
import DonateMedicine from './pages/DonateMedicine';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import NotificationDetail from './pages/NotificationDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/user/signup" element={<UserSignup />} />
            <Route path="/user/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
            <Route path="/ngo/login" element={<NGOLogin />} />
            <Route path="/ngo/signup" element={<NGOSignup />} />
            <Route path="/ngo/dashboard" element={<PrivateRoute><NGODashboard /></PrivateRoute>} />
            <Route path="/ngo/notification/:id" element={<PrivateRoute><NotificationDetail /></PrivateRoute>} />
            <Route path="/donate" element={<PrivateRoute><DonateMedicine /></PrivateRoute>} />
            {/* Add a catch-all route for 404 errors */}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;