import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { VStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { realTimeDb } from "../../firebase";
import { set, ref, push, child } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import { useState } from "react";
import { Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
const JoinGameButtons = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );
    getDocs(q).then((res) => {
      if (res.docs[0].data().currentGame) {
        setPlaying(true);
      }
    });
  }, []);
  const handleClick = (time) => {
    const gameKey = push(child(ref(realTimeDb), "games")).key;

    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );
    getDocs(q).then((res) => {
      const id = res.docs[0].id;
      const name = res.docs[0].data().name;
      const photo = res.docs[0].data().profilePic;
      const rating = res.docs[0].data().rating;

      const userRef = doc(db, "users", id);

      set(ref(realTimeDb, "games/" + gameKey), {
        gameId: gameKey,
        fen: "start",
        pgn: "start",
        playerOne: id,
        playerOneName: name,
        playerOneRating: rating,
        playerTwoRating: null,
        playerTwo: null,
        playerOnePic: photo ? photo : "25541.jpg",
        playerTwoName: null,
        playerOneTime: time,
        playerTwoTime: time,
        gameStarted: false,
        mode: "create",
        gameEnded: false,
      });
      set(ref(realTimeDb, "challenges/" + gameKey), {
        id: gameKey,
        challenger: name,
        challengerPic: photo ? photo : "25541.jpg",
        challengerId: id,
        timeControl: time,
      });
      set(ref(realTimeDb, "messages/" + gameKey), {
        id: gameKey,
        playerOne: name,
        playerOnePic: photo ? photo : "25541.jpg",
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
        onClick={onOpen}
        id="create-game"
      >
        CREATE GAME
      </Button>
      {playing ? (
        <Button
          w="80%"
          size="lg"
          p="4px;"
          marginTop={10}
          backgroundColor="red"
          color="#F5F5F5"
          border="2px"
          borderColor="#ffffff"
          id="return"
          _hover={{ bg: "#ebedf0", color: "red" }}
          onClick={() => navigate("/game")}
        >
          RETURN TO GAME
        </Button>
      ) : (
        "hidden"
      )}
      return (
      <>
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">
              Select your preferred time control
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody display="flex" justifyContent="center">
              <Button
                colorScheme="blue"
                m="4px"
                size="lg"
                onClick={() => handleClick(300)}
              >
                5+0
              </Button>
              <Button
                colorScheme="blue"
                m="4px"
                size="lg"
                onClick={() => handleClick(600)}
              >
                10+0
              </Button>
              <Button
                colorScheme="blue"
                m="4px"
                size="lg"
                id="test-button"
                onClick={() => handleClick(900)}
              >
                15+0
              </Button>
            </ModalBody>

            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </>
      )
    </VStack>
  );
};

export default JoinGameButtons;
