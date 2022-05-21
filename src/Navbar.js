import React from "react";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="navbarMain">
      <button className="navButton">Home</button>
      <button className="navButton">Find Friends</button>
      <button className="navButton">Join a community</button>
    </div>
  );
};

export default Navbar;
