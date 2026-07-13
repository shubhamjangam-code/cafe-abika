// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4vYrCRGZWaP2G4kER6n8op0xGpRtLiTg",
  authDomain: "caffe-b2c29.firebaseapp.com",
  projectId: "caffe-b2c29",
  storageBucket: "caffe-b2c29.firebasestorage.app",
  messagingSenderId: "533045822936",
  appId: "1:533045822936:web:40cf3ae3af47fd22831ead",
  measurementId: "G-678JNHV5QZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore, Auth, and Storage
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Initialize Analytics conditionally (only in client browser environment)
let analytics = null;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn("Firebase Analytics failed to initialize:", error);
  }
}

export { app, db, auth, storage, analytics };
export default app;
