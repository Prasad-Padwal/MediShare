import { db, storage } from '../firebase';
import { collection, addDoc, query, getDocs, where, orderBy, doc, getDoc, serverTimestamp, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const convertTimestampToISO = (timestamp) => {
  if (timestamp && typeof timestamp.toDate === 'function') {
    return timestamp.toDate().toISOString();
  }
  return timestamp; // Return as is if it's not a Firestore Timestamp
};

export const getNotifications = async (ngoId) => {
  try {
    console.log('Fetching notifications for NGO:', ngoId);
    const donationsRef = collection(db, 'donations');
    const q = query(
      donationsRef,
      where('ngoId', '==', ngoId),
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    console.log('Number of documents:', querySnapshot.size);
    const notifications = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: convertTimestampToISO(doc.data().createdAt)
    }));
    console.log('Parsed notifications:', notifications);
    return notifications;
  } catch (error) {
    console.error("Error fetching notifications: ", error);
    throw error;
  }
};

export const getNotificationDetails = async (notificationId) => {
  try {
    console.log('Fetching details for notification:', notificationId);
    const notificationRef = doc(db, 'donations', notificationId);
    const notificationSnap = await getDoc(notificationRef);
    
    if (notificationSnap.exists()) {
      const notificationData = notificationSnap.data();
      
      // Fetch user details
      const userRef = doc(db, 'users', notificationData.userId);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.exists() ? userSnap.data() : null;

      const result = { 
        id: notificationSnap.id, 
        ...notificationData,
        createdAt: convertTimestampToISO(notificationData.createdAt),
        user: userData
      };
      console.log('Notification details:', result);
      console.log('Front Image URL:', result.frontImageUrl);
      console.log('Back Image URL:', result.backImageUrl);
      return result;
    } else {
      throw new Error('Notification not found');
    }
  } catch (error) {
    console.error("Error fetching notification details: ", error);
    throw error;
  }
};

export const addDonation = async (donationData, frontImage, backImage) => {
  try {
    console.log('Adding donation:', donationData);
    console.log('Front image:', frontImage);
    console.log('Back image:', backImage);

    let frontImageUrl = null;
    let backImageUrl = null;

    if (frontImage) {
      const frontImageRef = ref(storage, `donations/${Date.now()}_front.jpg`);
      const frontSnapshot = await uploadBytes(frontImageRef, frontImage);
      frontImageUrl = await getDownloadURL(frontSnapshot.ref);
      console.log('Front image uploaded, URL:', frontImageUrl);
    }

    if (backImage) {
      const backImageRef = ref(storage, `donations/${Date.now()}_back.jpg`);
      const backSnapshot = await uploadBytes(backImageRef, backImage);
      backImageUrl = await getDownloadURL(backSnapshot.ref);
      console.log('Back image uploaded, URL:', backImageUrl);
    }

    const donationsRef = collection(db, 'donations');
    const docRef = await addDoc(donationsRef, {
      ...donationData,
      frontImageUrl,
      backImageUrl,
      createdAt: serverTimestamp()
    });
    console.log('Donation added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding donation: ", error);
    throw error;
  }
};

export const updateDonationStatus = async (donationId, newStatus) => {
  try {
    const donationRef = doc(db, 'donations', donationId);
    await updateDoc(donationRef, { status: newStatus });
    console.log(`Donation ${donationId} status updated to ${newStatus}`);
  } catch (error) {
    console.error("Error updating donation status: ", error);
    throw error;
  }
};

export const deleteDonation = async (donationId) => {
  try {
    const donationRef = doc(db, 'donations', donationId);
    await deleteDoc(donationRef);
    console.log(`Donation ${donationId} deleted`);
  } catch (error) {
    console.error("Error deleting donation: ", error);
    throw error;
  }
};