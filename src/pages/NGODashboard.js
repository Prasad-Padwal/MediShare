import React, { useState, useEffect, useContext } from 'react';
import { getNotifications } from '../services/apiService';
import NotificationCard from '../components/NotificationCard';
import { AuthContext } from '../Contexts/AuthContext';

function NGODashboard() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!currentUser || !currentUser.uid) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }
      try {
        const data = await getNotifications(currentUser.uid);
        setNotifications(data);
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
        setError(`Failed to load notifications. Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [currentUser]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-5">NGO Dashboard</h1>
      {notifications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notifications.map(notification => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No pending donations available. (Total: {notifications.length})</p>
      )}
    </div>
  );
}

export default NGODashboard;