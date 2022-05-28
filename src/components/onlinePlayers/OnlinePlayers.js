import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { getDocs } from "firebase/firestore";
import OnlinePlayerTile from "./OnlinePlayerTile";
import { Box, VStack, Center, Text } from "@chakra-ui/react";
import { StackDivider } from "@chakra-ui/react";
import { query, collection, onSnapshot } from "firebase/firestore";
const OnlinePlayers = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    const users = collection(db, "users");
    onSnapshot(users, (snapshot) =>
      setOnlineUsers(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
    );
    onlineUsers.forEach((user) => console.log(user));
  }, []);
  return (
    <VStack
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
    </VStack>
  );
};

export default OnlinePlayers;
