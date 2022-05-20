import "./Login.css";
import React, { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";
const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (e) {
      console.log(e.message);
    }
  };
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (e) {
      console.log(e.message);
    }
  };

  const logout = async () => {
    try {
      signOut(auth);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="login__main">
      <div>Welcome to Better Chess!</div>
      <div>
        <p>Email:</p>
        <input
          type="email"
          value={loginEmail}
          onChange={(e) => {
            setLoginEmail(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <p>Password:</p>
        <input
          type="password"
          value={loginPassword}
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
        ></input>
      </div>
      <Button colorScheme="blue" type="submit" onClick={login}>
        Log in
      </Button>
      <div>Register Here</div>
      <div>
        <p>Email:</p>
        <input
          type="email"
          value={registerEmail}
          onChange={(e) => {
            setRegisterEmail(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <p>Password:</p>
        <input
          type="password"
          value={registerPassword}
          onChange={(e) => {
            setRegisterPassword(e.target.value);
          }}
        ></input>
      </div>
      <Button colorScheme="blue" onClick={register}>
        Register
      </Button>
      <div>Welcome! {user?.email}</div>
      <Button colorScheme="blue" onClick={logout}>
        Sign out
      </Button>
    </div>
  );
};
export default Login;
