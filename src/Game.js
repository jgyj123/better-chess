import { React, useEffect, useRef, useState } from "react";
import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import { realTimeDb } from "./firebase";
import { update, ref, onValue } from "firebase/database";
import { db } from "./firebase";
import { auth } from "./firebase";
import { BiTimer } from "react-icons/bi";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  Box,
  Text,
  Flex,
  Center,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { BsCameraVideo, BsChat } from "react-icons/bs";
import InGameChat from "./components/inGameChatComponents/InGameChat";

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
  const [messages, setMessages] = useState([]);
  const [playerOnePic, setPlayerOnePic] = useState("");
  const [playerTwoPic, setPlayerTwoPic] = useState("");

  const setWidth = ({ screenWidth, screenHeight }) => {
    if (screenWidth / 2 < 600) {
      return 600;
    }
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
      const messageRef = ref(realTimeDb, "messages/" + newId);
      onValue(messageRef, (snapshot) => {
        const data = snapshot.val().messages;
        const newArr = [];
        for (var key in data) {
          newArr.push([key, data[key]]);
        }
        setMessages(newArr);
        setPlayerOnePic(snapshot.val().playerOnePic);
        setPlayerTwoPic(snapshot.val().playerTwoPic);
      });
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
      <Tabs
        bg="white"
        height="100%"
        width="25%"
        padding="20px"
        minWidth="300px"
        minHeight="600px"
      >
        <TabList>
          <Tab width="50%" alignItems="center">
            Video
            <Box marginLeft="4px">
              <BsCameraVideo size="1.3em" />
            </Box>
          </Tab>
          <Tab width="50%">
            Chat
            <Box marginLeft="4px">
              <BsChat size="1.1em" />
            </Box>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
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
          </TabPanel>
          <TabPanel>
            <InGameChat
              playerOne={playerOneName}
              playerTwo={PlayerTwoName}
              firstPic={playerOnePic}
              secondPic={playerTwoPic}
              id={id}
              color={color}
              messages={messages}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Chessboard
        position={fen}
        calcWidth={setWidth}
        onDrop={onDrop}
        orientation={color}
      />
      <Box
        width="25%"
        bg="white"
        height="100%"
        minWidth="300px"
        minHeight="600px"
      >
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
