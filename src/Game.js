import { React, useEffect, useRef, useState } from "react";
import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import { realTimeDb } from "./firebase";
import { update, ref, onValue } from "firebase/database";
import { db } from "./firebase";
import { auth } from "./firebase";
import { BiTimer } from "react-icons/bi";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { Box, Text, Flex, Container, calc, Center } from "@chakra-ui/react";

const Game = () => {
  // takes in Game id, white/black
  //When player creates a game, an unique game Id is created and both players will connect to this unique Id.
  // Both users have reference to the same game node on the real-time db based on game Id.
  const [id, setId] = useState("");
  const [fen, setFen] = useState("start");
  const [color, setColor] = useState("white");
  const [playerOneName, setPlayerOneName] = useState("");
  const [PlayerTwoName, setPlayerTwoName] = useState("Waiting for opponent...");
  const [pgn, setPgn] = useState("");

  const setWidth = ({ screenWidth, screenHeight }) => {
    return screenWidth / 2;
  };
  const onDrop = ({ sourceSquare, targetSquare }) => {
    if (
      (game.current.turn() == "w" && color != "white") ||
      (game.current.turn() == "b" && color != "black")
    ) {
      return;
    }
    let move = game.current.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move == null) return;

    const gameRef = ref(realTimeDb, "games/" + id);
    update(gameRef, {
      fen: game.current.fen(),
    });
    setFen(game.current.fen());
  };
  let game = useRef(null);

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );
    getDocs(q).then((res) => {
      const newId = res.docs[0].data().currentGame;
      setColor(res.docs[0].data().currentColor);
      setId(newId);
      game.current = new Chess();

      const gameRef = ref(realTimeDb, "games/" + newId);
      onValue(gameRef, (snapshot) => {
        const data = snapshot.val();
        game.current.load(data.fen);
        setFen(data.fen);
        setPlayerOneName(data.playerOneName);
        setPgn(game.current.pgn({ max_width: 5, newline_char: "<br />" }));
        if (data.playerTwoName != null) {
          setPlayerTwoName(data.playerTwoName);
        }
      });
    });
  }, []);
  return (
    <Flex height={"calc(100vw/2)"}>
      <Box bg="white" height="100%" width="25%" padding="20px">
        <Box height="50%">
          <Text textAlign="center" fontSize={28}>
            {color == "white" ? PlayerTwoName : playerOneName}
          </Text>
          <Flex
            bg="black"
            alignItems="center"
            justifyContent="center"
            width="300x"
            height="225px"
          >
            <Text color="white">Player Two Video</Text>
          </Flex>
        </Box>
        <Box height="50%">
          <Text textAlign="center" fontSize={28}>
            {color == "black" ? PlayerTwoName : playerOneName}
          </Text>
          <Flex
            bg="black"
            alignItems="center"
            justifyContent="center"
            width="300x"
            height="225px"
          >
            <Text color="white">Player One Video</Text>
          </Flex>
        </Box>
      </Box>
      <Chessboard
        position={fen}
        calcWidth={setWidth}
        onDrop={onDrop}
        orientation={color}
      />
      <Box width="25%" bg="white" height="100%">
        <Center height="15%" borderBottom=" 2px solid black">
          <Flex alignItems="center">
            <BiTimer size={55}></BiTimer>
            <Text fontSize="40px" fontWeight="500">
              3:00
            </Text>
          </Flex>
        </Center>
        <Center width="100%" height="70%">
          <Text>Chess Pgn here</Text>
        </Center>
        <Center height="15%" borderTop="2px solid black">
          <Flex alignItems="center">
            <BiTimer size={55}></BiTimer>
            <Text fontSize="40px" fontWeight="500">
              3:00
            </Text>
          </Flex>
        </Center>
      </Box>
    </Flex>
  );
};

export default Game;
