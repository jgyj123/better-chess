import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Box, Text, VStack } from "@chakra-ui/react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
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
      <CreateClub />

      <VStack>
        {clubs.map((club) => {
          return <ClubTile club={club} />;
        })}
      </VStack>
    </div>
  );
};

export default JoinClub;
