import React, { useEffect, useState } from "react";
import {
  Text,
  Flex,
  VStack,
  Box,
  Button,
  Image,
  HStack,
} from "@chakra-ui/react";
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

    getDocs(q).then((res) => {
      if (res.docs[0].data().clubIds.includes(props.club.id)) {
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
      updateDoc(ref, {
        clubIds: arrayUnion(props.club.id),
        clubs: arrayUnion({ id: props.club.id, name: props.club.name }),
      });
    });
    const q2 = query(collection(db, "clubs"), where("id", "==", props.club.id));
  };
  return (
    <Flex w="600px;" bg="white" shadow="lg" position="relative" m="10px">
      <Image src="/team.png" boxSize="200px;" p="2" />
      <Flex height="200px" direction="column" justifyContent="center">
        <HStack>
          <strong>Name: </strong>
          <p>{props.club.name}</p>
        </HStack>
        <HStack>
          <strong>No. of members: </strong>
          <p>{props.club.memberCount}</p>
        </HStack>
        <HStack>
          <strong>Description: </strong>
          <p>{props.club.description}</p>
        </HStack>
        <HStack>
          <strong>Team location: </strong>
          <p>{props.club.location}</p>
        </HStack>
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
