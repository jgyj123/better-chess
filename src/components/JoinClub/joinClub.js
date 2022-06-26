import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Box, HStack, Flex, Text, VStack, Spacer } from "@chakra-ui/react";
import {
  onSnapshot,
  collection,
  where,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import ClubTile from "./clubTile";

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
      <Flex justifyContent="center" width="100vw">
        <VStack>
          {clubs.map((club) => {
            return (
              <div>
                <ClubTile club={club} />
                <Spacer />
              </div>
            );
          })}
        </VStack>
        <VStack>
          {/* {clubs.map((club) => {
            const queryUsers = query(
              collection(db, "users"),
              where("uid", "==", auth.currentUser.uid)
            );
            getDocs(queryUsers).then((res) => {
              const currentClubs = res.docs[0].data().clubs;
              setUserClubs(currentClubs);
            });
            return userClubs.includes(club) ? (
              <div>
                <ClubTile club={club} />
                <Spacer />
              </div>
            ) : (
              <div></div>
            );
          })} */}
        </VStack>
      </Flex>
    </div>
  );
};

export default JoinClub;
