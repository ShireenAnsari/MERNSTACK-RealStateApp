// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIAUTH_KEY,
  authDomain:import.meta.env.VITE_FIREBASE_DOMAIN,
  projectId: "mern-estate-9895a",
  storageBucket: "mern-estate-9895a.appspot.com",
  messagingSenderId: "518311707794",
  appId: "1:518311707794:web:4053d8c573ab7916ca124b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);