import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD1cW8Pj-ROoWgh8yrqTE8Jt7zNlL3KGo8",
  authDomain: "medishare-c109f.firebaseapp.com",
  projectId: "medishare-c109f",
  storageBucket: "medishare-c109f.appspot.com",
  messagingSenderId: "373709579912",
  appId: "1:373709579912:web:d321ffa6ae0d96fff8a13d",
  measurementId: "G-MYFJD8CP5Y",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
