import React, { useEffect, useState } from "react";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import StatsBoard from "./StatsBoard";
import Post from "./Post";
import { db } from "../../firebase";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth } from "../../firebase";
import AddPost from "./AddPost";
import { Link } from "react-router-dom";

const MessageBoard = () => {
  const [posts, setPosts] = useState([]);
  const [selectedClub, setSelectedClub] = useState("general");
  const [userClubs, setUserClubs] = useState([]);
  const [currentListener, setCurrentListener] = useState(() => {});
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const queryPosts = query(
      collection(db, "posts"),
      where("clubId", "==", selectedClub),
      orderBy("date", "desc")
    );
    const unsubscribe = onSnapshot(queryPosts, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    setCurrentListener(() => unsubscribe);

    const queryUsers = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );
    getDocs(queryUsers).then((res) => {
      const currentClubs = res.docs[0].data().clubs;

      if (res.docs[0].data().currentGame != null) {
        setPlaying(true);
      }
      setUserClubs(currentClubs);
    });
  }, []);
  const getPosts = (clubId) => {
    currentListener();
    const posts = query(
      collection(db, "posts"),
      where("clubId", "==", clubId),
      orderBy("date", "desc")
    );
    setCurrentListener(() =>
      onSnapshot(posts, (snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      )
    );
    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );
    getDocs(q).then((res) => {
      const currentClubs = res.docs[0].data().clubs;
      setUserClubs(currentClubs);
    });
  };

  const toggleMessageBoard = (clubId) => {
    setSelectedClub(clubId);
    getPosts(clubId);
  };
  return (
    <VStack
      w="50%"
      overflowY="scroll"
      height="100vh"
      paddingRight="10px"
      minWidth="400px"
    >
      {playing ? (
        <Link to="/game">
          <Button width="100%">Return to Game</Button>
        </Link>
      ) : (
        "hidden"
      )}
      <StatsBoard />
      <AddPost
        name={
          userClubs.find((x) => x.id === selectedClub)?.name
            ? userClubs.find((x) => x.id === selectedClub)?.name
            : "General"
        }
        currentClub={selectedClub}
        setCurrentClub={setSelectedClub}
        clubs={userClubs}
        handleChange={(item) => toggleMessageBoard(item)}
      />
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            name={post.username}
            message={post.message}
            club={post.club}
            clubId={post.clubId}
            date={post.date}
            profilePic={post.profilePic}
          />
        );
      })}
    </VStack>
  );
};

export default MessageBoard;
