import { Button } from "@chakra-ui/react";
import React from "react";
import "./Navbar.css";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      signOut(auth);
      navigate("/login");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className="navbarMain">
      <button className="navButton">Home</button>
      <button className="navButton">Find Friends</button>
      <button className="navButton">Join a community</button>
      <Button onClick={logout}>Log out</Button>
      {auth.currentUser?.email}
    </div>
  );
};

export default Navbar;
