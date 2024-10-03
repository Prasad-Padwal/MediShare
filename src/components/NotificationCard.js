import React from 'react';
import { Link } from 'react-router-dom';

function NotificationCard({ notification }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">{notification.medicineName}</h2>
      <p><strong>Quantity:</strong> {notification.quantity}</p>
      <p><strong>Expiry Date:</strong> {notification.expiryDate}</p>
      <p><strong>Status:</strong> {notification.status}</p>
      <p><strong>Created At:</strong> {formatDate(notification.createdAt)}</p>
      <Link to={`/ngo/notification/${notification.id}`} className="text-blue-500 hover:underline mt-2 inline-block">
        View Details
      </Link>
    </div>
  );
}

export default NotificationCard;