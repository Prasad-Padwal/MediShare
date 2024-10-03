import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

export default function NGODashboard() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      const q = query(collection(db, "donations"), where("status", "==", "pending"));
      const querySnapshot = await getDocs(q);
      setDonations(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchDonations();
  }, []);

  const handleAccept = async (id) => {
    await updateDoc(doc(db, "donations", id), { status: "accepted" });
    setDonations(donations.filter(donation => donation.id !== id));
  };

  const handleReject = async (id) => {
    await updateDoc(doc(db, "donations", id), { status: "rejected" });
    setDonations(donations.filter(donation => donation.id !== id));
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">NGO Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {donations.map((donation) => (
          <div key={donation.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold">{donation.name}</h2>
            <p>Quantity: {donation.quantity}</p>
            <p>Expiry Date: {donation.expiryDate}</p>
            <p>Donor: {donation.donorName}</p>
            {donation.imageUrl && <img src={donation.imageUrl} alt={donation.name} className="mt-2 w-full h-40 object-cover rounded" />}
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleAccept(donation.id)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Accept
              </button>
              <button
                onClick={() => handleReject(donation.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}