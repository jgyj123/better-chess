import React, { useEffect, useState } from "react";
import {
  Text,
  Flex,
  VStack,
  Box,
  Button,
  Image,
  HStack,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { increment } from "firebase/firestore";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import "./clubTile.css";

const ClubTile = (props) => {
  const [joinState, setJoinState] = useState("Join Club");
  const [disabledState, setDisabledState] = useState(false);
  const ANIMATEDCLASSNAME = "animated";
  const ELEMENTS = document.querySelectorAll(".HOVER");
  const ELEMENTS_SPAN = [];

  ELEMENTS.forEach((element, index) => {
    let addAnimation = false;
    // If The span element for this element does not exist in the array, add it.
    if (!ELEMENTS_SPAN[index])
      ELEMENTS_SPAN[index] = element.querySelector("span");

    element.addEventListener("mouseover", (e) => {
      ELEMENTS_SPAN[index].style.left = e.pageX - element.offsetLeft + "px";
      ELEMENTS_SPAN[index].style.top = e.pageY - element.offsetTop + "px";

      // Add an animation-class to animate via CSS.
      if (addAnimation) element.classList.add(ANIMATEDCLASSNAME);
    });

    element.addEventListener("mouseout", (e) => {
      ELEMENTS_SPAN[index].style.left = e.pageX - element.offsetLeft + "px";
      ELEMENTS_SPAN[index].style.top = e.pageY - element.offsetTop + "px";
    });
  });
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );

    getDocs(q).then((res) => {
      if (res.docs[0].data().clubIds.includes(props.club.id)) {
        setJoinState("Leave Club");
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
      const clubRef = doc(db, "clubs", props.club.id);
      updateDoc(clubRef, {
        memberCount: increment(1),
      });
      updateDoc(ref, {
        clubIds: arrayUnion(props.club.id),
        clubs: arrayUnion({ id: props.club.id, name: props.club.name }),
      });
    });
    // for updating members inside club document
    const q2 = query(collection(db, "clubs"), where("id", "==", props.club.id));
  };
  const leaveExisitingClub = () => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );
    getDocs(q).then((res) => {
      const id = res.docs[0].id;
      const ref = doc(db, "users", id);
      setJoinState("Join Club");
      setDisabledState(false);
      const clubRef = doc(db, "clubs", props.club.id);
      updateDoc(clubRef, {
        memberCount: increment(-1),
      });
      updateDoc(ref, {
        clubIds: arrayRemove(props.club.id),
        clubs: arrayRemove({ id: props.club.id, name: props.club.name }),
      });
    });
    const q2 = query(collection(db, "clubs"), where("id", "==", props.club.id));
  };
  return (
    <LinkBox
      width="600px"
      height="200"
      bg="white"
      shadow="lg"
      m="10px"
      borderWidth="1px"
      rounded="md"
      className="HOVER"
    >
      <LinkOverlay href="#">
        <HStack>
          <img src="/team.png" width="200px;" p="2" alt="club icon" />
          <Flex direction="column" justifyContent="center">
            <HStack>
              <strong>Name: </strong>
              <p>{props.club.name}</p>
            </HStack>
            <HStack>
              <strong>No. of members: </strong>
              <p>{props.club.memberCount}</p>
            </HStack>
            <HStack>
              <strong>Team location: </strong>
              <p>{props.club.location}</p>
            </HStack>
          </Flex>
        </HStack>
        <Button
          id={props.club.id}
          position="absolute"
          right="10px;"
          bottom="10px"
          onClick={() =>
            disabledState
              ? leaveExisitingClub(props.club.id)
              : joinExisitingClub(props.club.id)
          }
        >
          {joinState}
        </Button>
        <span></span>
      </LinkOverlay>
    </LinkBox>
  );
};

export default ClubTile;
