import { React, useEffect, useRef, useState } from "react";
import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import "./Game.css";

const Game = () => {
  const [fen, setFen] = useState("start");
  const onDrop = ({ sourceSquare, targetSquare }) => {
    let move = game.current.move({
      from: sourceSquare,
      to: targetSquare,
    });
    if (move == null) return;
    setFen(game.current.fen());
  };
  let game = useRef(null);

  useEffect(() => {
    game.current = new Chess();
  }, []);
  return (
    <div className="gameMain">
      <div className="board">
        <Chessboard position={fen} width="700" onDrop={onDrop} />
      </div>
    </div>
  );
};

export default Game;
