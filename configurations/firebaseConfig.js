// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth
import { getFirestore } from "firebase/firestore"; // Firestore database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBl7mbvA-71g-9btmxiRR-K3_XEhgP9qM",
  authDomain: "welearn-eed96.firebaseapp.com",
  projectId: "welearn-eed96",
  storageBucket: "welearn-eed96.firebasestorage.app",
  messagingSenderId: "601466500645",
  appId: "1:601466500645:web:736cfed87eb8963853f1cc"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Firebase Auth and Firestore
export const auth = getAuth(firebaseApp); // Export Authentication
export const db = getFirestore(firebaseApp); // Export Firestore

export default firebaseApp;
