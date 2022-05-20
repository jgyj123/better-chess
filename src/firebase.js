import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBPI60oU96_5dXiknml_3ktN1yOvrLshJA",
  authDomain: "orbital-fried-liver.firebaseapp.com",
  projectId: "orbital-fried-liver",
  storageBucket: "orbital-fried-liver.appspot.com",
  messagingSenderId: "114238604451",
  appId: "1:114238604451:web:d0b75b52b0a89a50946b16",
  measurementId: "G-32JKTD9264",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
