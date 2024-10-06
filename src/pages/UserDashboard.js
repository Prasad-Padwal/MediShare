import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { db, auth } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { addDonation } from "../services/apiService";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [donationData, setDonationData] = useState({
    medicineName: "",
    quantity: "",
    expiryDate: "",
    ngoId: "",
  });
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [ngos, setNgos] = useState([]);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNGOs = async () => {
      try {
        const ngoSnapshot = await getDocs(collection(db, "ngos"));
        setNgos(ngoSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching NGOs:", error);
        setError("Failed to load NGOs. Please refresh the page.");
      }
    };
    fetchNGOs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "front") {
      setFrontImage(file);
    } else {
      setBackImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("submitting");
    setError(null);
    try {
      if (!currentUser || !currentUser.uid) {
        throw new Error("User not authenticated");
      }
      const fullDonationData = {
        ...donationData,
        userId: currentUser.uid,
        status: "pending",
      };
      console.log("Submitting donation data:", fullDonationData);
      console.log("Front image:", frontImage);
      console.log("Back image:", backImage);
      const donationId = await addDonation(
        fullDonationData,
        frontImage,
        backImage
      );
      console.log("Donation submitted successfully:", donationId);
      setSubmitStatus("success");
      // Reset form
      setDonationData({
        medicineName: "",
        quantity: "",
        expiryDate: "",
        ngoId: "",
      });
      setFrontImage(null);
      setBackImage(null);
    } catch (error) {
      console.error("Error submitting donation:", error);
      setSubmitStatus("error");
      setError(
        error.message || "An error occurred while submitting the donation."
      );
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      setError("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="container mx-auto mt-10 p-8 bg-gray-50 rounded-xl shadow-lg animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">User Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
      {error && (
        <p className="text-red-500 mb-6 text-center bg-red-100 p-3 rounded-lg">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
        <div className="animate-slide-up">
          <input
            type="text"
            name="medicineName"
            placeholder="Medicine Name"
            value={donationData.medicineName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={donationData.quantity}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <input
            type="date"
            name="expiryDate"
            placeholder="Expiry Date"
            value={donationData.expiryDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
          <span className="text-sm text-gray-500 mt-1">Expiry Date</span>
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Front Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "front")}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Back Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "back")}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <select
            name="ngoId"
            value={donationData.ngoId}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          >
            <option value="">Select NGO</option>
            {ngos.map((ngo) => (
              <option key={ngo.id} value={ngo.id}>
                {ngo.ngoName}
              </option>
            ))}
          </select>
        </div>
        <div className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
            disabled={submitStatus === "submitting"}
          >
            {submitStatus === "submitting"
              ? "Submitting..."
              : "Submit Donation"}
          </button>
        </div>
      </form>
      {submitStatus === "success" && (
        <p className="text-green-500 mt-6 text-center bg-green-100 p-3 rounded-lg animate-fade-in">
          Donation submitted successfully!
        </p>
      )}
      {submitStatus === "error" && (
        <p className="text-red-500 mt-6 text-center bg-red-100 p-3 rounded-lg animate-fade-in">
          Error submitting donation. Please try again.
        </p>
      )}
    </div>
  );
}

export default UserDashboard;
