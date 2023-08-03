// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBuSJcIvQdMItFfKi8IchzBpWfqY9YUDFE",
  authDomain: "shoppy-90983.firebaseapp.com",
  databaseURL:
    "https://shoppy-90983-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shoppy-90983",
  storageBucket: "shoppy-90983.appspot.com",
  messagingSenderId: "585704152259",
  appId: "1:585704152259:web:b13387bdd124a7de8d9676",
  measurementId: "G-PTBYN2J9SJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
