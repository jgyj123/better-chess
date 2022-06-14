import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
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
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { realTimeDb } from "../../firebase";
import { onValue, ref, update, remove } from "firebase/database";
import { Avatar } from "@chakra-ui/react";

const OnlinePlayers = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
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
    >
      <Center w="100%">
        <Text fontSize={26}>Online Players</Text>
      </Center>
      {onlineUsers.map((user) => (
        <OnlinePlayerTile displayName={user.name} />
      ))}
      <Text fontSize={26}>Open Challenges</Text>
      {challenges.map((gameId) => {
        return (
          <Flex alignItems="center" justifyContent="space-evenly" width="100%">
            <Avatar src={gameId[1].challengerPic} />
            <Text>{gameId[1].challenger}</Text>
            <Button
              colorScheme="blue"
              size="md"
              onClick={() => {
                const q = query(
                  collection(db, "users"),
                  where("uid", "==", auth.currentUser.uid)
                );
                getDocs(q).then((res) => {
                  const id = res.docs[0].id;
                  const userRef = doc(db, "users", id);
                  const gameRef = ref(realTimeDb, "games/" + gameId);
                  update(gameRef, {
                    playerTwo: id,
                    playerTwoName: res.docs[0].data().name,
                  });
                  updateDoc(userRef, {
                    currentGame: gameId,
                    currentColor: "black",
                  });
                  const challengeRef = ref(realTimeDb, "challenges/" + gameId);
                  remove(challengeRef);
                  navigate("/game");
                });
              }}
            >
              Join Game
            </Button>
          </Flex>
        );
      })}
    </VStack>
  );
};

export default OnlinePlayers;
