// firebase.js
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCTAPRXWWFDNMW2zBgUGRPxemP3NHYRgNo",
  authDomain: "expenses-tracker-93125.firebaseapp.com",
  projectId: "expenses-tracker-93125",
  storageBucket: "expenses-tracker-93125.appspot.com",
  messagingSenderId: "338443532401",
  appId: "1:338443532401:web:06bce19dd561dc7c17c3d0",
  measurementId: "G-2180MDVZFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
