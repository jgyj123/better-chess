import React, { useEffect, useState } from "react";
import { Text, Flex, VStack, Box, Button, Image } from "@chakra-ui/react";
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
import { auth } from "../../firebase";

const ClubTile = (props) => {
  const [joinState, setJoinState] = useState("Join Club");
  const [disabledState, setDisabledState] = useState(false);
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );
    setDisabledState(false);
    setJoinState("Join Club");
    getDocs(q).then((res) => {
      if (res.docs[0].data().clubs.includes(props.club.id)) {
        console.log(true);
        console.log(res.docs[0].data());
        console.log(res.docs[0].data().clubs);
        setJoinState("Joined");
        setDisabledState(true);
      }
    });
  }, []);
  const joinExisitingClub = () => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );
    getDocs(q).then((res) => {
      const id = res.docs[0].id;
      const ref = doc(db, "users", id);
      setJoinState("Joined");
      setDisabledState(true);
      updateDoc(ref, { clubs: arrayUnion(props.club.id) });
    });
  };
  return (
    <Flex w="600px;" bg="white" shadow="lg" position="relative" m="10px">
      <Image src="/team.png" boxSize="200px;" p="2" />
      <Flex height="200px" direction="column" justifyContent="center">
        <Flex>
          <strong>Team:</strong>

          <p>{props.club.name}</p>
        </Flex>
        <Flex>
          <strong>No. of members:</strong>
          <p>{props.club.memberCount}</p>
        </Flex>
        <Flex>
          <strong>Description:</strong>
          <p>{props.club.description}</p>
        </Flex>
        <Flex>
          <strong>Team location:</strong>
          <p>{props.club.location}</p>
        </Flex>
      </Flex>
      <Button
        id={props.club.id}
        position="absolute"
        right="10px;"
        bottom="10px"
        onClick={() => joinExisitingClub(props.club.id)}
        disabled={disabledState}
      >
        {joinState}
      </Button>
    </Flex>
  );
};

export default ClubTile;
