import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import {
  onSnapshot,
  collection,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import ClubTile from "./clubTile";
import CreateClub from "./createClub";

const JoinClub = () => {
  const [clubs, setClubs] = useState([]);
  useEffect(() => {
    const clubs2 = collection(db, "clubs");
    onSnapshot(clubs2, (snapshot) =>
      setClubs(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, []);
  return (
    <div>
      <Navbar />
      <HStack>
        <CreateClub />
        <VStack>
          {clubs.map((club) => {
            return <ClubTile club={club} />;
          })}
        </VStack>
      </HStack>
    </div>
  );
};

export default JoinClub;
