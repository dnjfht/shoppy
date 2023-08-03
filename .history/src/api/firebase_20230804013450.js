// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "shoppy-90983.firebaseapp.com",
  databaseURL:
    "https://shoppy-90983-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shoppy-90983",
};

const app = initializeApp(firebaseConfig);
