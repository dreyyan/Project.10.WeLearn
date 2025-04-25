// Import necessary Firebase functions
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Make sure AsyncStorage is imported

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBl7mbvA-71g-9btmxiRR-K3_XEhgP9qM",
  authDomain: "welearn-eed96.firebaseapp.com",
  projectId: "welearn-eed96",
  storageBucket: "welearn-eed96.appspot.com",
  messagingSenderId: "601466500645",
  appId: "1:601466500645:web:736cfed87eb8963853f1cc"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage) // Ensure persistence is set correctly
});

// Initialize Firestore
const db = getFirestore(firebaseApp);

export { auth, db, firebaseApp };
