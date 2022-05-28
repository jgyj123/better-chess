import React from "react";
import "./Puzzle.css";

export default function Puzzle() {
  return (
    <div className="container">
      <iframe
        src="https://lichess.org/training/frame?theme=brown&bg=dark"
        allowtransparency="true"
        frameborder="0"
        title="puzzle"
        className="puzzle"
      ></iframe>
    </div>
  );
}
