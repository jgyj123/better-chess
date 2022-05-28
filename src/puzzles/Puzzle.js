import React from "react";
import "./Puzzle.css";
import Navbar from "../components/Navbar/Navbar";

export default function Puzzle(props) {
  return (
    <div>
      <Navbar user={props.user} useSignIn={props.signIn} />
      <div className="container">
        <iframe
          src="https://lichess.org/training/frame?theme=brown&bg=dark"
          allowtransparency="true"
          frameborder="0"
          title="puzzle"
          className="puzzle"
        ></iframe>
      </div>
    </div>
  );
}
