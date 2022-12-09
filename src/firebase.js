// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9_cDIVqntG4-c35L1Gdk5FwwtE3eRAZ4",
  authDomain: "first-firebase-9aebf.firebaseapp.com",
  projectId: "first-firebase-9aebf",
  storageBucket: "first-firebase-9aebf.appspot.com",
  messagingSenderId: "884633829703",
  appId: "1:884633829703:web:c79c285110c6e8adafcc62",
  measurementId: "G-PDXRNKXY6J"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth =  getAuth();
export const storage = getStorage();