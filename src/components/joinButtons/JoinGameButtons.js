import React from "react";
import { Link } from "react-router-dom";
import { VStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { realTimeDb } from "../../firebase";
import { set, ref, push, child } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
const JoinGameButtons = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const gameKey = push(child(ref(realTimeDb), "games")).key;

    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );
    getDocs(q).then((res) => {
      console.log(res);
      const id = res.docs[0].id;
      const name = res.docs[0].data().name;
      const photo = res.docs[0].data().profilePic;
      const userRef = doc(db, "users", id);
      set(ref(realTimeDb, "games/" + gameKey), {
        gameId: gameKey,
        fen: "start",
        playerOne: id,
        playerOneName: name,
        playerTwo: null,
        playerTwoName: null,
      });
      set(ref(realTimeDb, "challenges/" + gameKey), {
        id: gameKey,
        challenger: name,
        challengerPic: photo ? photo : "22541.jpg",
        challengerId: id,
      });
      set(ref(realTimeDb, "messages/" + gameKey), {
        id: gameKey,
        playerOne: name,
        playerOnePic: photo ? photo : "22541.jpg",
      });
      updateDoc(userRef, {
        currentGame: gameKey,
        currentColor: "white",
      });
      navigate("/game");
    });
  };
  return (
    <VStack w="25%" bg="#615D56" minWidth="300px">
      <Button
        w="80%"
        size="lg"
        p="4px;"
        marginTop={10}
        backgroundColor="#252323"
        color="#F5F5F5"
        border="2px"
        borderColor="#ffffff"
        _hover={{ bg: "#ebedf0", color: "#000000" }}
        onClick={handleClick}
      >
        CREATE GAME
      </Button>
      <Button
        w="80%"
        size="lg"
        p="4px;"
        backgroundColor="#252323"
        color="#F5F5F5"
        border="2px"
        borderColor="#ffffff"
        _hover={{ bg: "#ebedf0", color: "#000000" }}
      >
        <Link to="/game">PLAY WITH FRIEND</Link>
      </Button>
      <Button
        w="80%"
        size="lg"
        p="4px;"
        backgroundColor="#252323"
        color="#F5F5F5"
        border="2px"
        borderColor="#ffffff"
        _hover={{ bg: "#ebedf0", color: "#000000" }}
      >
        <Link to="/game">PLAY VS COMPUTER</Link>
      </Button>
    </VStack>
  );
};

export default JoinGameButtons;
