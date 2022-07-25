import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { GiBroadsword } from "react-icons/gi";
import { set, ref, push, child } from "firebase/database";
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
import { db } from "../../firebase";
import { realTimeDb } from "../../firebase";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  Box,
  Button,
  Flex,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Avatar,
} from "@chakra-ui/react";
const OnlinePlayerTile = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const sendChallenge = (time) => {
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
        to: props.playerId,
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
    <Flex
      w="100%"
      alignItems="center"
      justifyContent="space-evenly"
      marginBottom="10px"
      padding="4px"
    >
      <Avatar />
      <Text marginLeft="10px" w="30%">
        {props.displayName}
      </Text>
      <Button colorScheme="teal" size="xs" marginLeft="3" onClick={onOpen}>
        Challenge
        <GiBroadsword marginLeft="2px" />
      </Button>
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
                onClick={() => sendChallenge(300)}
              >
                5+0
              </Button>
              <Button
                colorScheme="blue"
                m="4px"
                size="lg"
                onClick={() => sendChallenge(600)}
              >
                10+0
              </Button>
              <Button
                colorScheme="blue"
                m="4px"
                size="lg"
                onClick={() => sendChallenge(900)}
              >
                15+0
              </Button>
            </ModalBody>

            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </Flex>
  );
};
export default OnlinePlayerTile;
