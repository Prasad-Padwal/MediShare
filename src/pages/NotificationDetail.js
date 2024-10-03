import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNotificationDetails } from '../services/apiService';

function NotificationDetail() {
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchNotificationDetails = async () => {
      try {
        const data = await getNotificationDetails(id);
        console.log("Notification data:", data);
        setNotification(data);
      } catch (err) {
        console.error('Failed to fetch notification details:', err);
        setError('Failed to load notification details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotificationDetails();
  }, [id]);

  const handleImageError = (e, type) => {
    console.error(`Failed to load ${type} image:`, e);
    e.target.src = '/path/to/fallback/image.jpg'; // Replace with a path to a fallback image
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!notification) return <div className="text-center mt-10">Notification not found.</div>;

  return (
    <div className="container mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <Link to="/ngo/dashboard" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
      <h1 className="text-3xl font-bold mb-5">Donation Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Medicine Information</h2>
          <p><strong>Medicine Name:</strong> {notification.medicineName}</p>
          <p><strong>Quantity:</strong> {notification.quantity}</p>
          <p><strong>Expiry Date:</strong> {notification.expiryDate}</p>
          <p><strong>Status:</strong> {notification.status}</p>
          <p><strong>Created At:</strong> {new Date(notification.createdAt).toLocaleString()}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3">Donor Information</h2>
          {notification.user && (
            <>
              <p><strong>Name:</strong> {notification.user.name}</p>
              <p><strong>Email:</strong> {notification.user.email}</p>
              <p><strong>Phone:</strong> {notification.user.phone}</p>
              <p><strong>Address:</strong> {notification.user.address}</p>
            </>
          )}
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-3">Medicine Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notification.frontImageUrl && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Front Image</h3>
              <img 
                src={notification.frontImageUrl} 
                alt="Front of medicine" 
                className="w-full h-auto rounded-lg shadow-md" 
                onError={(e) => handleImageError(e, 'front')}
              />
            </div>
          )}
          {notification.backImageUrl && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Back Image</h3>
              <img 
                src={notification.backImageUrl} 
                alt="Back of medicine" 
                className="w-full h-auto rounded-lg shadow-md" 
                onError={(e) => handleImageError(e, 'back')}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationDetail;