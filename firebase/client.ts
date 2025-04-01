// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCf0KdT_agmWyaTxp2YgC5pH4r7EkzVjuQ",
  authDomain: "mockvise.firebaseapp.com",
  projectId: "mockvise",
  storageBucket: "mockvise.firebasestorage.app",
  messagingSenderId: "389202724863",
  appId: "1:389202724863:web:f1a141d77044ac6a1449ca",
  measurementId: "G-YGKGWQXEXF"
};

// Initialize Firebase 
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(app);

export const db = getFirestore(app);