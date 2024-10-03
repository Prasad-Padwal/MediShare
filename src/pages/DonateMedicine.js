import React, { useState } from 'react';
import { addDonation } from '../services/apiService';

function DonateMedicine() {
  const [donationData, setDonationData] = useState({
    medicineName: '',
    quantity: '',
    expiryDate: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDonation(donationData);
      alert('Donation submitted successfully!');
      // Reset form
      setDonationData({
        medicineName: '',
        quantity: '',
        expiryDate: '',
        description: ''
      });
    } catch (error) {
      console.error('Error submitting donation:', error);
      alert('Failed to submit donation. Please try again.');
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Donate Medicine</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="medicineName" className="block mb-1">Medicine Name</label>
          <input
            type="text"
            id="medicineName"
            name="medicineName"
            value={donationData.medicineName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="quantity" className="block mb-1">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={donationData.quantity}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="expiryDate" className="block mb-1">Expiry Date</label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={donationData.expiryDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={donationData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit Donation
        </button>
      </form>
    </div>
  );
}

export default DonateMedicine;