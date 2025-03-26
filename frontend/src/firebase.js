// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "schedulease-a982a.firebaseapp.com",
  projectId: "schedulease-a982a",
  storageBucket: "schedulease-a982a.firebasestorage.app",
  messagingSenderId: "374990689263",
  appId: "1:374990689263:web:6cf42f42188b9cd7d39c1a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

