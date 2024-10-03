import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { db, storage } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const DonateMedicine = () => {
  const { currentUser } = useAuth();
  const [medicine, setMedicine] = useState({
    name: '',
    expiryDate: '',
    quantity: '',
    description: ''
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      let imageUrl = '';
      if (image) {
        const imageRef = ref(storage, `medicines/${currentUser.uid}/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, 'donations'), {
        ...medicine,
        imageUrl,
        donorId: currentUser.uid,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      setSuccess('Medicine donated successfully!');
      setMedicine({ name: '', expiryDate: '', quantity: '', description: '' });
      setImage(null);
    } catch (error) {
      setError('Failed to donate medicine. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Donate Medicine</h2>
      {error && <p className="text-red-500 mb-5">{error}</p>}
      {success && <p className="text-green-500 mb-5">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Medicine Name</label>
          <input
            type="text"
            name="name"
            value={medicine.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={medicine.expiryDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={medicine.quantity}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={medicine.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>
        <div>
          <label className="block mb-1">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Donate Medicine
        </button>
      </form>
    </div>
  );
};

export default DonateMedicine;