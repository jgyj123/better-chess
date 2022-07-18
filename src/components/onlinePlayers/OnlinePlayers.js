import React, { useState, useEffect } from "react";

import { getDocs } from "firebase/firestore";
import OnlinePlayerTile from "./OnlinePlayerTile";
import { Box, VStack, Center, Text, Button, Flex } from "@chakra-ui/react";
import { StackDivider } from "@chakra-ui/react";
import {
  query,
  collection,
  onSnapshot,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";

import { Link, useNavigate } from "react-router-dom";
import { realTimeDb, db, auth } from "../../firebase";
import { onValue, ref, update, remove } from "firebase/database";
import { Avatar } from "@chakra-ui/react";

const OnlinePlayers = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );
    getDocs(q).then((res) => {
      setId(res.docs[0].id);
    });
    const users = collection(db, "users");
    onSnapshot(users, (snapshot) =>
      setOnlineUsers(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
    );
    onValue(ref(realTimeDb, "challenges"), (snapshot) => {
      const data = snapshot.val();
      const newArr = [];
      for (var key in data) {
        newArr.push([key, data[key]]);
      }
      setChallenges(newArr);
    });
  }, []);
  return (
    <VStack
      minWidth="300px"
      w="25%"
      background="white"
      p="4px"
      shadow="lg"
      divider={<StackDivider />}
      maxHeight="95vh"
      overflow="scroll"
    >
      <Center w="100%">
        <Text fontSize={26}>Online Players</Text>
      </Center>
      <Box height="50%" overflow="scroll" width="100%">
        {onlineUsers.map((user) => (
          <OnlinePlayerTile
            displayName={user.name}
            key={user.id}
            playerId={user.id}
          />
        ))}
      </Box>
      <Text fontSize={26}>Personal Challenges</Text>
      <Box minHeight="10vh">
        {challenges.map((gameId) => {
          const isUser = id == gameId[1].challengerId;
          if (gameId[1].to != id) return "";
          return (
            <Flex
              alignItems="center"
              width="100%"
              justifyContent={"space-evenly"}
            >
              <Center>
                <Avatar src={gameId[1].challengerPic} />
              </Center>
              <Box>
                <Text>{gameId[1].challenger}</Text>
                <Text color="gray.500" fontSize="16px">
                  {gameId[1].timeControl / 60} mins
                </Text>
              </Box>

              <Button
                width="30%"
                colorScheme="blue"
                size="md"
                disabled={isUser}
                padding="3px"
                onClick={() => {
                  const q = query(
                    collection(db, "users"),
                    where("uid", "==", auth.currentUser.uid)
                  );
                  getDocs(q).then((res) => {
                    const id = res.docs[0].id;
                    const userRef = doc(db, "users", id);
                    const gameRef = ref(realTimeDb, "games/" + gameId[0]);
                    const messageRef = ref(realTimeDb, "messages/" + gameId[0]);
                    update(gameRef, {
                      playerTwo: id,
                      playerTwoName: res.docs[0].data().name,
                      playerTwoRating: res.docs[0].data().rating,
                      playerTwoPic: res.docs[0].data().profilePic
                        ? res.docs[0].data().profilePic
                        : "25541.jpg",
                    });
                    update(messageRef, {
                      playerTwo: res.docs[0].data().name,
                      playerTwoPic: res.docs[0].data().profilePic
                        ? res.docs[0].data().profilePic
                        : "25541.jpg",
                    });
                    updateDoc(userRef, {
                      currentGame: gameId[0],
                      currentColor: "black",
                    });

                    const challengeRef = ref(
                      realTimeDb,
                      "challenges/" + gameId[0]
                    );
                    remove(challengeRef);
                    navigate("/game");
                  });
                }}
              >
                {isUser ? "Searching..." : "Join Game"}
              </Button>
            </Flex>
          );
        })}
      </Box>
      <Text fontSize={26}>Open Challenges</Text>
      <Box minHeight="10vh" width="100%">
        {challenges.map((gameId) => {
          const isUser = id == gameId[1].challengerId;
          if (gameId[1].to != null) return "";
          return (
            <Flex
              alignItems="center"
              width="100%"
              justifyContent="space-evenly"
            >
              <Center>
                <Avatar src={gameId[1].challengerPic} />
              </Center>
              <Box>
                <Text>{gameId[1].challenger}</Text>
                <Text color="gray.500" fontSize="16px">
                  {gameId[1].timeControl / 60} mins
                </Text>
              </Box>

              <Button
                width="30%"
                colorScheme="blue"
                size="md"
                disabled={isUser}
                fontSize="16px"
                onClick={() => {
                  const q = query(
                    collection(db, "users"),
                    where("uid", "==", auth.currentUser.uid)
                  );
                  getDocs(q).then((res) => {
                    const id = res.docs[0].id;
                    const userRef = doc(db, "users", id);
                    const gameRef = ref(realTimeDb, "games/" + gameId[0]);
                    const messageRef = ref(realTimeDb, "messages/" + gameId[0]);
                    update(gameRef, {
                      playerTwo: id,
                      playerTwoName: res.docs[0].data().name,
                      playerTwoRating: res.docs[0].data().rating,
                      playerTwoPic: res.docs[0].data().profilePic
                        ? res.docs[0].data().profilePic
                        : "25541.jpg",
                    });
                    update(messageRef, {
                      playerTwo: res.docs[0].data().name,
                      playerTwoPic: res.docs[0].data().profilePic
                        ? res.docs[0].data().profilePic
                        : "25541.jpg",
                    });
                    updateDoc(userRef, {
                      currentGame: gameId[0],
                      currentColor: "black",
                    });

                    const challengeRef = ref(
                      realTimeDb,
                      "challenges/" + gameId[0]
                    );
                    remove(challengeRef);
                    navigate("/game");
                  });
                }}
              >
                {isUser ? "Searching..." : "Join Game"}
              </Button>
            </Flex>
          );
        })}
      </Box>
    </VStack>
  );
};

export default OnlinePlayers;
