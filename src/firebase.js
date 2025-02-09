// Import necessary Firebase services
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqlK_bQqFaEWJaRy4sd4dgzCIBxzmCITc",
  authDomain: "emailauth-73290.firebaseapp.com",
  projectId: "emailauth-73290",
  storageBucket: "emailauth-73290.appspot.com",
  messagingSenderId: "904857570602",
  appId: "1:904857570602:web:356a9fac5ec04770596253",
  measurementId: "G-WKP309VNQ0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Export the auth module for authentication
