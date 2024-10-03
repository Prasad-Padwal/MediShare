import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function NGOSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ngoName, setNgoName] = useState('');
  const [ngoId, setNgoId] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await setDoc(doc(db, "ngos", user.uid), {
        ngoName,
        ngoId,
        email,
        address,
        phone,
        role: 'ngo'
      });

      navigate('/ngo/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-md px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-emerald-600">NGO Sign Up</h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-lg shadow-lg animate-fade-in">
        <input
          type="text"
          placeholder="NGO Name"
          value={ngoName}
          onChange={(e) => setNgoName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
        <input
          type="text"
          placeholder="NGO ID"
          value={ngoId}
          onChange={(e) => setNgoId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
        <button type="submit" className="w-full bg-emerald-500 text-white p-3 rounded-lg hover:bg-emerald-600 transition duration-300 shadow-md">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default NGOSignup;