import React, { useState, useEffect } from "react";
import "./AddPost.css";
import {
  Input,
  Box,
  Avatar,
  Flex,
  Select,
  Button,
  Spacer,
  ButtonGroup,
  Text,
} from "@chakra-ui/react";

import {
  onSnapshot,
  collection,
  query,
  doc,
  getDoc,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { serverTimestamp } from "firebase/firestore";
const AddPost = (props) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleChange = (event) => {
    props.setCurrentClub(event.target.selectedOptions[0].value);
    props.handleChange(event.target.value);
  };
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );
    const docs = getDocs(q);
    docs.then((res) => {
      setUserData(res.docs[0].data());
      setLoading(false);
    });
  }, []);
  const [message, setMessage] = useState("");
  const submitPost = () => {
    if (message !== "") {
      const username = userData.name;
      const pic = auth.currentUser.photoURL
        ? auth.currentUser.photoURL
        : "/25541.jpg";
      addDoc(collection(db, "posts"), {
        club: props.name,
        date: serverTimestamp(),
        message: message,
        username: username,
        profilePic: pic,
        clubId: props.currentClub,
      });
      setMessage("");
    } else {
      alert("Post has no text!");
    }
  };
  if (!loading) {
    return (
      <Box w="100%" bg="white" shadow="lg" p={4} position="relative">
        <Flex align="center">
          <Avatar
            src={
              auth.currentUser.photoURL
                ? auth.currentUser.photoURL
                : "/25541.jpg"
            }
          ></Avatar>
          <Input
            id="message"
            placeholder="Say something to your friends!"
            ml={4}
            mr={4}
            width="55%"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                submitPost();
              }
            }}
          ></Input>
          <Spacer />
          <ButtonGroup gap="1">
            <Select placeholder="Choose a club" onChange={handleChange}>
              <option value="general">General</option>
              {props.clubs != null ? (
                props.clubs.map((club) => {
                  return <option value={club.id}>{club.name}</option>;
                })
              ) : (
                <div></div>
              )}
            </Select>
            <Button
              margin="auto"
              padding="10px;"
              size="s"
              onClick={submitPost}
              float="right"
              id="postMessage"
              disabled={loading}
            >
              Post
            </Button>
          </ButtonGroup>
        </Flex>
      </Box>
    );
  } else return <> Loading...</>;
};

export default AddPost;
