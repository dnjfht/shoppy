// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL:
    "https://shoppy-90983-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shoppy-90983",
};

const app = initializeApp(firebaseConfig);
