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
      w="100%"
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
        <Text>
          <strong>Rating:</strong> {userData.rating}
        </Text>
        <Text>
          <strong>Coins:</strong> {userData.coins}
        </Text>
        <Text>
          <strong>Wins:</strong> {userData.wins}
        </Text>
        <Text>
          <strong>Losses:</strong> {userData.losses}
        </Text>
      </HStack>
    </VStack>
  );
};

export default StatsBoard;
