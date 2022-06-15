import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBPI60oU96_5dXiknml_3ktN1yOvrLshJA",
  authDomain: "orbital-fried-liver.firebaseapp.com",
  projectId: "orbital-fried-liver",
  databaseURL: "https://orbital-fried-liver-default-rtdb.firebaseio.com",
  storageBucket: "orbital-fried-liver.appspot.com",
  messagingSenderId: "114238604451",
  appId: "1:114238604451:web:d0b75b52b0a89a50946b16",
  measurementId: "G-32JKTD9264",
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const realTimeDb = getDatabase(app);

export { auth, db, realTimeDb };
