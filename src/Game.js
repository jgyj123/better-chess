import { React, useEffect, useRef, useState } from "react";
import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import { db, auth, realTimeDb } from "./firebase";
import { update, ref, onValue, off, set } from "firebase/database";
import { BiTimer } from "react-icons/bi";
import { AspectRatio, Avatar, Image } from "@chakra-ui/react";
import { useInterval } from "@chakra-ui/react";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  FieldValue,
  increment,
} from "firebase/firestore";
import { serverTimestamp } from "firebase/database";
import {
  Box,
  Button,
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
import { BsFlag } from "react-icons/bs";

const pc = new RTCPeerConnection({
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
    {
      urls: "turn:openrelay.metered.ca:80",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
    {
      urls: "turn:openrelay.metered.ca:443",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
    {
      urls: "turn:openrelay.metered.ca:443?transport=tcp",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
  ],
  iceCandidatePoolSize: 10,
});

const Game = () => {
  // takes in Game id, white/black
  //When player creates a game, an unique game Id is created and both players will connect to this unique Id.
  // Both users have reference to the same game node on the real-time db based on game Id.
  const [id, setId] = useState("");
  const [fen, setFen] = useState("start");
  const [color, setColor] = useState("white");
  const [playerOneName, setPlayerOneName] = useState("");
  const [playerTwoName, setPlayerTwoName] = useState("Waiting for opponent...");
  const [playerOneRating, setPlayerOneRating] = useState();
  const [playerTwoRating, setPlayerTwoRating] = useState();
  const [playerOneTime, setPlayerOneTime] = useState(300);
  const [playerTwoTime, setPlayerTwoTime] = useState(300);
  const [pgn, setPgn] = useState("");
  const [messages, setMessages] = useState([]);
  const [playerOnePic, setPlayerOnePic] = useState("");
  const [playerTwoPic, setPlayerTwoPic] = useState("");
  const [mode, setMode] = useState("create");
  const [created, setCreated] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("none");
  const [playerOneId, setPlayerOneId] = useState("");
  const [playerTwoId, setPlayerTwoId] = useState("");
  const [lastMoveTime, setLastMoveTime] = useState(Date.now());
  const [storedOne, setStoredOne] = useState(300);
  const [storedTwo, setStoredTwo] = useState(300);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const [updatingTime, setUpdatingTime] = useState(false);
  const [turn, setTurn] = useState("none");
  const [playerOneTimerColor, setPlayerOneTimerColor] = useState("black");
  const [playerTwoTimerColor, setPlayerTwoTimerColor] = useState("black");
  const [incomingDrawOffer, setIncomingDrawOffer] = useState("none");

  // Either we convert the videoCalling portion into an exportable component or we bring over the functionality
  /*
  VIDEO PORTION START
  */
  const [webcamActive, setWebcamActive] = useState(false);
  const [roomId, setRoomId] = useState("");
  const localRef = useRef();
  const remoteRef = useRef();
  const setupSources = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const remoteStream = new MediaStream();
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };
    localRef.current.srcObject = localStream;
    remoteRef.current.srcObject = remoteStream;
    setWebcamActive(true);

    if (mode === "create" && !created) {
      const callDoc = doc(collection(db, "calls"), roomId);
      const offerCandidates = collection(callDoc, "offerCandidates");
      const answerCandidates = collection(callDoc, "answerCandidates");

      pc.onicecandidate = (event) => {
        event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
      };
      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);
      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await setDoc(callDoc, { offer });
      const gameRef = ref(realTimeDb, "games/" + id);

      update(gameRef, {
        mode: "join",
      });
      setCreated(true);
      onSnapshot(callDoc, (snapshot) => {
        const data = snapshot.data();

        if (!pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
      });

      onSnapshot(answerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            let data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    } else if (mode === "join" && !created) {
      const callDoc = doc(collection(db, "calls"), roomId);
      const offerCandidates = collection(callDoc, "offerCandidates");
      const answerCandidates = collection(callDoc, "answerCandidates");
      pc.onicecandidate = (event) => {
        event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
      };
      const callData = (await getDoc(callDoc)).data();
      const offerDescription = callData.offer;
      await pc.setRemoteDescription(
        new RTCSessionDescription(offerDescription)
      );

      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      const answer = {
        sdp: answerDescription.sdp,
        type: answerDescription.type,
      };
      await updateDoc(callDoc, { answer });

      onSnapshot(offerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            let data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    }
    pc.onconnectionstatechange = (event) => {
      if (pc.connectionState === "disconnected") {
        hangUp();
      }
    };
  };

  const hangUp = async () => {
    const gameRef = ref(realTimeDb, "games/" + id);
    update(gameRef, {
      mode: "create",
    });
    pc.close();
    if (roomId) {
      let roomRef = doc(collection(db, "calls"), roomId);
      await getDocs(collection(roomRef, "answerCandidates")).then(
        (querySnapshot) => {
          querySnapshot.forEach((item) => {
            deleteDoc(doc(db, "answerCandidates", item.id));
          });
        }
      );
      await getDocs(collection(roomRef, "offerCandidates")).then(
        (querySnapshot) => {
          querySnapshot.forEach((item) => {
            deleteDoc(doc(db, "answerCandidates", item.id));
          });
        }
      );
      await deleteDoc(doc(db, "calls", roomId));
    }
    window.location.reload();
  };
  /*
 VIDEO PORTION END
 */

  /* ChessBoard Logic */
  const setWidth = ({ screenWidth, screenHeight }) => {
    if (screenWidth / 2 < 600) {
      return 600;
    }
    if (screenWidth / 2 > screenHeight - 60) {
      return screenHeight - 60;
    }
    return screenWidth / 2;
  };
  const onDrop = ({ sourceSquare, targetSquare }) => {
    if (
      (game.current.turn() === "w" && color !== "white") ||
      (game.current.turn() === "b" && color !== "black") ||
      gameOver ||
      !playerTwoId
    ) {
      return;
    }
    setUpdatingTime(true);
    if (gameStarted) {
      setLastMoveTime(Date.now());
    }

    let move = game.current.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });
    if (move == null) return;
    const gameRef = ref(realTimeDb, "games/" + id);

    if (lastMoveTime != null) {
      if (color === "white") {
        var newTime = storedOne - parseInt((Date.now() - lastMoveTime) / 1000);
        if (!gameStarted) {
          newTime = storedOne;
        }
        setStoredOne(newTime);
        setPlayerOneTime(newTime);

        update(gameRef, {
          fen: game.current.fen(),
          pgn: game.current.pgn(),
          lastMoveTime: serverTimestamp(),
          gameStarted: true,
          playerOneTime: newTime,
          turn: game.current.turn(),
        });
      } else {
        var newTime = storedTwo - parseInt((Date.now() - lastMoveTime) / 1000);
        if (!gameStarted) {
          newTime = storedTwo;
        }
        setStoredTwo(newTime);
        setPlayerTwoTime(newTime);

        update(gameRef, {
          fen: game.current.fen(),
          pgn: game.current.pgn(),
          lastMoveTime: serverTimestamp(),
          playerTwoTime: newTime,
          gameStarted: true,
          turn: game.current.turn(),
        });
      }
    } else {
      update(gameRef, {
        fen: game.current.fen(),
        pgn: game.current.pgn(),
        lastMoveTime: serverTimestamp(),
        gameStarted: true,
        turn: game.current.turn(),
      });
    }

    setFen(game.current.fen());
    setPgn(game.current.pgn({ max_width: 5, newline_char: "<br />" }));
    setTurn(game.current.turn());

    if (game.current.game_over()) {
      gameOverLogic();
    }
  };
  /* 
 Game Over Logic
 */
  const handleWin = () => {
    let rating = playerOneRating;
    let opponentRating = playerTwoRating;
    const gameRef = ref(realTimeDb, "games/" + id);
    if (color === "black") {
      rating = playerTwoRating;
      opponentRating = playerOneRating;
      let eloGain = calculateEloChange(rating, opponentRating);
      const newPlayerOneRating = playerOneRating - eloGain;
      const newPlayerTwoRating = playerTwoRating + eloGain;
      adjustRatings(eloGain, color);
      update(gameRef, {
        playerOneRating: newPlayerOneRating,
        playerTwoRating: newPlayerTwoRating,
        gameEnded: true,
        winner: "black",
      });
      return;
    }

    let eloGain = calculateEloChange(rating, opponentRating);
    adjustRatings(eloGain, color);
    const newPlayerOneRating = playerOneRating + eloGain;
    const newPlayerTwoRating = playerTwoRating - eloGain;
    update(gameRef, {
      playerOneRating: newPlayerOneRating,
      playerTwoRating: newPlayerTwoRating,
      gameEnded: true,
      winner: "white",
    });
  };
  const handleLoss = () => {
    setGameOver(true);
  };
  const handleDraw = () => {
    let rating = playerOneRating;
    let opponentRating = playerTwoRating;
    const gameRef = ref(realTimeDb, "games/" + id);
    if (color === "black") {
      rating = playerTwoRating;
      opponentRating = playerOneRating;
      let eloGain = calculateDrawEloChange(rating, opponentRating);
      const newPlayerOneRating = playerOneRating - eloGain;
      const newPlayerTwoRating = playerTwoRating + eloGain;
      adjustRatings(eloGain, color);
      update(gameRef, {
        playerOneRating: newPlayerOneRating,
        playerTwoRating: newPlayerTwoRating,
        gameEnded: true,
        winner: "draw",
      });
      return;
    }
    let eloGain = calculateDrawEloChange(rating, opponentRating);
    adjustRatings(eloGain, color);
    const newPlayerOneRating = playerOneRating + eloGain;
    const newPlayerTwoRating = playerTwoRating - eloGain;
    update(gameRef, {
      playerOneRating: newPlayerOneRating,
      playerTwoRating: newPlayerTwoRating,
      gameEnded: true,
      winner: "draw",
    });
  };

  const gameOverLogic = () => {
    setGameOver(true);
    let w = "white";
    if (game.current.turn() == "w") {
      w = "black";
    }
    setWinner(w);

    if (w === color) {
      handleWin();
    } else {
      handleLoss();
    }
  };
  const resign = () => {
    setGameOver(true);
    let w = "white";
    if (color === "white") {
      w = "black";
    }
    setWinner(w);

    let rating = playerOneRating;
    let opponentRating = playerTwoRating;
    const gameRef = ref(realTimeDb, "games/" + id);
    if (color === "black") {
      rating = playerTwoRating;
      opponentRating = playerOneRating;
      let eloGain = calculateEloChange(opponentRating, rating);
      const newPlayerOneRating = playerOneRating + eloGain;
      const newPlayerTwoRating = playerTwoRating - eloGain;
      adjustRatings(eloGain, w);
      update(gameRef, {
        playerOneRating: newPlayerOneRating,
        playerTwoRating: newPlayerTwoRating,
        gameEnded: true,
        winner: "white",
      });
      return;
    }
    let eloGain = calculateEloChange(opponentRating, rating);
    const newPlayerOneRating = playerOneRating - eloGain;
    const newPlayerTwoRating = playerTwoRating + eloGain;
    adjustRatings(eloGain, w);
    update(gameRef, {
      playerOneRating: newPlayerOneRating,
      playerTwoRating: newPlayerTwoRating,
      gameEnded: true,
      winner: "black",
    });
  };
  const offerDraw = () => {
    const gameRef = ref(realTimeDb, "games/" + id);

    if (color === "white") {
      update(gameRef, {
        drawOffer: "white",
      });
    } else {
      update(gameRef, {
        drawOffer: "black",
      });
    }
  };
  const declineDraw = () => {
    setIncomingDrawOffer("none");
    const gameRef = ref(realTimeDb, "games/" + id);
    update(gameRef, {
      drawOffer: "none",
    });
  };

  // adjust elo and coins of players
  const adjustRatings = (eloChange, winner) => {
    if (winner === "white") {
      adjustRatingAndCoins(playerOneId, eloChange, 50, "w");
      adjustRatingAndCoins(playerTwoId, -eloChange, 10, "l");
      return;
    } else if (winner === "black") {
      adjustRatingAndCoins(playerOneId, -eloChange, 10, "l");
      adjustRatingAndCoins(playerTwoId, eloChange, 50, "w");
    } else if ((winner = "draw")) {
      adjustRatingAndCoins(playerOneId, -eloChange, 30, "d");
      adjustRatingAndCoins(playerTwoId, eloChange, 30, "d");
    }
  };
  const adjustRatingAndCoins = (playerId, eloChange, coins, result) => {
    const userRef = doc(db, "users", playerId);
    if (result === "w") {
      updateDoc(userRef, {
        rating: increment(eloChange),
        coins: increment(coins),
        wins: increment(1),
        currentGame: "",
        currentColor: "",
      });
      return;
    } else if (result === "l") {
      updateDoc(userRef, {
        rating: increment(eloChange),
        coins: increment(coins),
        losses: increment(1),
        currentGame: "",
        currentColor: "",
      });
      return;
    }
    updateDoc(userRef, {
      rating: increment(eloChange),
      coins: increment(coins),
      currentGame: "",
      currentColor: "",
    });
  };

  const calculateEloChange = (winnerElo, loserElo) => {
    const ratingDifference = loserElo - winnerElo;
    const temp = 1 + Math.pow(10, ratingDifference / 400);
    const multiplicativeInverse = 1 / temp;
    const eloChange = 20 * (1 - multiplicativeInverse);
    return parseInt(eloChange);
  };
  const calculateDrawEloChange = (ownElo, opponentElo) => {
    const ratingDifference = opponentElo - ownElo;
    const temp = 1 + Math.pow(10, ratingDifference / 400);
    const multiplicativeInverse = 1 / temp;
    const eloChange = 20 * (0.5 - multiplicativeInverse);
    return parseInt(eloChange);
  };
  const secondToMinutes = (seconds) => {
    const minutes = parseInt(seconds / 60);
    const carry = seconds - minutes * 60;
    if (carry.toString().length == 1) {
      return minutes.toString() + ":" + "0" + carry.toString();
    }
    return minutes.toString() + ":" + carry.toString();
  };
  let game = useRef(null);
  const navigate = useNavigate();
  /* Game setup logic */
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );
    var messageRef;
    var gameRef;
    getDocs(q).then((res) => {
      const newId = res.docs[0].data().currentGame;
      setColor(res.docs[0].data().currentColor);
      if (newId == null || newId === "") {
        navigate("/");
      }
      setId(newId);
      setRoomId(newId);
      messageRef = ref(realTimeDb, "messages/" + newId);
      //setup message listener
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

      //setup game listener
      gameRef = ref(realTimeDb, "games/" + newId);
      onValue(gameRef, (snapshot) => {
        const data = snapshot.val();
        if (data.pgn !== "start") {
          game.current.load_pgn(data.pgn);
          setPgn(game.current.pgn({ max_width: 5, newline_char: "<br />" }));
        }
        setTurn(data.turn);
        setPlayerOnePic(data.playerOnePic);
        setMode(data.mode);
        setFen(data.fen);
        setGameOver(data.gameEnded);
        setPlayerOneName(data.playerOneName);
        setPlayerOneRating(data.playerOneRating);
        setPlayerOneId(data.playerOne);
        setGameStarted(data.gameStarted);
        setStoredOne(data.playerOneTime);
        setPlayerOneTime(data.playerOneTime);
        setPlayerTwoTime(data.playerTwoTime);
        setStoredTwo(data.playerTwoTime);

        if (data.lastMoveTime != null) {
          setLastMoveTime(data.lastMoveTime);
          setUpdatingTime(false);
        }
        if (data.winner != null) {
          setWinner(data.winner);
        }
        if (data.drawOffer != null) {
          setIncomingDrawOffer(data.drawOffer);
        }

        setPgn(game.current.pgn({ max_width: 5, newline_char: "<br />" }));
        if (data.playerTwoName != null) {
          setPlayerTwoName(data.playerTwoName);
          setPlayerTwoRating(data.playerTwoRating);
          setPlayerTwoPic(data.playerTwoPic);
          setPlayerTwoId(data.playerTwo);
        }
      });
    });

    return () => {
      off(messageRef);
      off(gameRef);
    };
  }, []);
  useInterval(() => {
    if (
      turn === "none" ||
      !lastMoveTime ||
      updatingTime ||
      gameOver ||
      !gameStarted
    ) {
      return;
    }

    const timeLeft = parseInt((Date.now() - lastMoveTime) / 1000);

    if (turn === "w") {
      setPlayerOneTimerColor("red");
      setPlayerTwoTimerColor("black");
      setPlayerOneTime(storedOne - timeLeft);
      if (storedOne - timeLeft <= 0) {
        setPlayerOneTime(0);
        setWinner("black");

        if (color === "black" && !gameOver) {
          handleWin();
        }
        setGameOver(true);
        alert("White has lost on time");
      }
    } else {
      setPlayerOneTimerColor("black");
      setPlayerTwoTimerColor("red");
      setPlayerTwoTime(storedTwo - timeLeft);
      if (storedTwo - timeLeft <= 0) {
        setPlayerTwoTime(0);
        setWinner("white");

        if (color === "white" && !gameOver) {
          handleWin();
        }
        setGameOver(true);
        alert("Black has lost on time");
      }
    }
  }, 1000);
  return (
    <Flex
      height={"calc(100vw/2)"}
      maxHeight={"calc(100vh - 60px)"}
      justifyContent="center"
    >
      <Box
        width="25%"
        height="100%"
        bg="white"
        minWidth="300px"
        minHeight="600px"
      >
        <Flex
          height="10%"
          width="100%"
          borderBottom="2px solid black"
          alignItems="center"
          padding="4px"
        >
          {color === "black" ? (
            <Avatar src={playerOnePic} size="md" marginRight="10px" />
          ) : (
            <Avatar src={playerTwoPic} size="md" marginRight="10px" />
          )}
          <Flex direction="column" width="100%" justifyContent="center">
            <Text>{color === "white" ? playerTwoName : playerOneName}</Text>
            <Text color="gray.600" fontSize="12px">
              {color === "white" ? playerTwoRating : playerOneRating}
            </Text>
          </Flex>
        </Flex>
        <Tabs bg="white" height="80%" width="100%" padding="20px">
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
                <AspectRatio
                  ratio={4 / 3}
                  bg="black"
                  alignItems="center"
                  justifyContent="center"
                  width="95%"
                  margin="4px"
                >
                  <video
                    ref={remoteRef}
                    autoPlay
                    playsInline
                    className="remote"
                  />
                </AspectRatio>
              </Box>
              <Box height="50%">
                <AspectRatio
                  ratio={4 / 3}
                  bg="black"
                  alignItems="center"
                  justifyContent="center"
                  width="95%"
                  margin="4px"
                >
                  <video
                    ref={localRef}
                    autoPlay
                    playsInline
                    className="local"
                    muted
                  />
                </AspectRatio>
              </Box>
              <Button
                /* flex={1} */
                px={4}
                fontSize={"xs"}
                bg={"blue.400"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "blue.500",
                }}
                _focus={{
                  bg: "blue.500",
                }}
                onClick={setupSources}
              >
                Start Video
              </Button>
              <Button
                /* flex={1} */
                px={4}
                fontSize={"xs"}
                bg={"blue.400"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "blue.500",
                }}
                _focus={{
                  bg: "blue.500",
                }}
                onClick={hangUp}
              >
                End Video
              </Button>
            </TabPanel>
            <TabPanel>
              <InGameChat
                playerOne={playerOneName}
                playerTwo={playerTwoName}
                firstPic={playerOnePic}
                secondPic={playerTwoPic}
                id={id}
                color={color}
                messages={messages}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Flex
          height="10%"
          width="100%"
          borderTop="2px solid black"
          alignItems="center"
          padding="4px"
        >
          {color === "white" ? (
            <Avatar src={playerOnePic} size="md" marginRight="10px" />
          ) : (
            <Avatar src={playerTwoPic} size="md" marginRight="10px" />
          )}
          <Flex direction="column" width="100%" justifyContent="center">
            <Text>{color === "black" ? playerTwoName : playerOneName}</Text>
            <Text color="gray.600" fontSize="12px">
              {color === "black" ? playerTwoRating : playerOneRating}
            </Text>
          </Flex>
        </Flex>
      </Box>
      <Chessboard
        position={fen}
        calcWidth={setWidth}
        onDrop={onDrop}
        orientation={color}
        showNotation={true}
        lightSquareStyle={{ backgroundColor: "AliceBlue" }}
        darkSquareStyle={{ backgroundColor: "CornFlowerBlue" }}
      />
      <Box
        width="25%"
        bg="white"
        height="100%"
        minWidth="300px"
        minHeight="600px"
      >
        <Center height="15%" borderBottom=" 2px solid black">
          {color === "black" ? (
            <Flex alignItems="center">
              <BiTimer size={55} color={playerOneTimerColor}></BiTimer>
              <Text
                fontSize="40px"
                fontWeight="500"
                color={playerOneTimerColor}
              >
                {secondToMinutes(playerOneTime)}{" "}
              </Text>
            </Flex>
          ) : (
            <Flex alignItems="center">
              <BiTimer size={55} color={playerTwoTimerColor}></BiTimer>
              <Text
                fontSize="40px"
                fontWeight="500"
                color={playerTwoTimerColor}
              >
                {secondToMinutes(playerTwoTime)}
              </Text>
            </Flex>
          )}
        </Center>
        <Box width="100%" height="70%" overflow="scroll" position="relative">
          {pgn.split("<br />").map((move) => {
            return (
              <Flex width="100%">
                <Center
                  width="10%"
                  backgroundColor="gray.100"
                  borderBottom="1px solid"
                  borderColor="gray.400"
                  borderRight="1px solid"
                >
                  {" "}
                  {move.split(" ")[0]}
                </Center>
                <Center
                  width="45%"
                  borderBottom="1px solid"
                  borderColor="gray.400"
                  borderRight="1px solid"
                  fontWeight="300"
                >
                  {move.split(" ")[1]}
                </Center>
                <Center
                  width="45%"
                  borderBottom="1px solid"
                  borderColor="gray.400"
                  fontWeight="300"
                >
                  {" "}
                  {move.split(" ")[2]}
                </Center>
              </Flex>
            );
          })}
          <Flex
            position="absolute"
            shadow="lg"
            bottom="4"
            padding="4px"
            justifyContent="center"
            width="100%"
          >
            <Button onClick={resign} disabled={gameOver || !playerTwoId}>
              <BsFlag />
            </Button>
            <Button onClick={offerDraw} disabled={gameOver || !playerTwoId}>
              1/2
            </Button>
          </Flex>
          <Flex direction="column" alignItems="center">
            {gameOver ? <Text>Game Ended</Text> : ""}
            {gameOver ? (
              <Text width="100%" textAlign="Center">
                {winner === "white"
                  ? "White Wins, 1-0"
                  : winner === "black"
                  ? "Black Wins, 0-1"
                  : winner === "draw"
                  ? "Game Drawn, 1/2 - 1/2"
                  : ""}
              </Text>
            ) : (
              ""
            )}
          </Flex>
          {incomingDrawOffer != "none" &&
          incomingDrawOffer == color &&
          !gameOver ? (
            <Center>
              <Text>Draw Offered</Text>
            </Center>
          ) : (
            ""
          )}
          {incomingDrawOffer != "none" &&
          incomingDrawOffer != color &&
          !gameOver ? (
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Text>Your opponent has offered a draw</Text>
              <Flex>
                <Button onClick={handleDraw}>
                  <TiTick fontSize="30px" />
                </Button>
                <Button onClick={declineDraw}>
                  <ImCross fontSize="16px" />
                </Button>
              </Flex>
            </Flex>
          ) : (
            ""
          )}
        </Box>

        <Center height="15%" borderTop="2px solid black">
          {color === "white" ? (
            <Flex alignItems="center">
              <BiTimer size={55} color={playerOneTimerColor}></BiTimer>
              <Text
                fontSize="40px"
                fontWeight="500"
                color={playerOneTimerColor}
              >
                {secondToMinutes(playerOneTime)}
              </Text>
            </Flex>
          ) : (
            <Flex alignItems="center">
              <BiTimer size={55} color={playerTwoTimerColor}></BiTimer>
              <Text
                fontSize="40px"
                fontWeight="500"
                color={playerTwoTimerColor}
              >
                {secondToMinutes(playerTwoTime)}
              </Text>
            </Flex>
          )}
        </Center>
      </Box>
    </Flex>
  );
};

export default Game;
