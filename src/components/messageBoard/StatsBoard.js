import React from "react";
import { useEffect, useState } from "react";
import { Box, Text, HStack, VStack, StackDivider } from "@chakra-ui/react";
import { BsFillPersonFill } from "react-icons/bs";
import { db } from "../../firebase";
import {
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore";
import { auth } from "../../firebase";
import { Image } from "@chakra-ui/react";

const StatsBoard = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );
    const docs = getDocs(q);
    docs.then((res) => {
      setUserData(res.docs[0].data());
    });
  }, []);
  return (
    <VStack
      divider={<StackDivider />}
      w="50%"
      borderColor="black"
      borderWidth="2px"
      shadow="lg"
      p="4"
      marginTop="30px"
      bg="white"
      roundedTop="lg"
      roundedBottom="lg"
    >
      <HStack w="100%">
        {auth.currentUser.photoURL ? (
          <Image src={auth.currentUser.photoURL}></Image>
        ) : (
          <BsFillPersonFill />
        )}

        <Text>{userData.name}</Text>
      </HStack>
      <HStack w="100%">
        <Text>Rating: {userData.rating}</Text>
        <Text>Coins: {userData.coins}</Text>
        <Text>Wins: {userData.wins}</Text>
        <Text>Losses: {userData.losses}</Text>
      </HStack>
    </VStack>
  );
};

export default StatsBoard;
