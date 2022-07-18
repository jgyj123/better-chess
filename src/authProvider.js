import React, { useEffect, useState, createContext, useContext } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import { query, getDocs, collection, where, addDoc } from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentGame, setCurrentGame] = useState(null);
  const [pending, setPending] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setPending(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  if (pending) {
    return <>Loading...</>;
  }
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
          wins: 0,
          losses: 0,
          clubCount: 0,
          coins: 2000,
          rating: 1000,
          profilePic: auth.currentUser.photoURL,
          clubs: [],
          items: [],
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        wins: 0,
        losses: 0,
        clubCount: 0,
        coins: 2000,
        rating: 1000,
        clubs: [],
        items: [],
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const logout = () => {
    signOut(auth);
  };
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signInWithEmailAndPassword,
        registerWithEmailAndPassword,
        logInWithEmailAndPassword,
        logout,
        signInWithGoogle,
        currentGame,
        setCurrentGame,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useUserAuth() {
  return useContext(AuthContext);
}
