import React, { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
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

const MessageBoard = () => {
  const [posts, setPosts] = useState([]);
  const [selectedClub, setSelectedClub] = useState([]);
  const [userClubsIds, setUserClubsIds] = useState([]);
  const [userClubData, setUserClubData] = useState([]);
  useEffect(() => {
    const queryPosts = query(
      collection(db, "posts"),
      orderBy("date", "desc"),
      where("clubId", "==", selectedClub == null ? "general" : selectedClub)
    );
    onSnapshot(queryPosts, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    const queryUsers = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );
    getDocs(queryUsers).then((res) => {
      const currentClubs = res.docs[0].data().clubs;
      setUserClubsIds(currentClubs);
    });
    console.log(posts);
  }, []);

  const toggleMessageBoard = (clubId) => {
    setSelectedClub(clubId);
    console.log(clubId);
  };
  return (
    <VStack w="50%" overflowY="scroll" height="100vh" paddingRight="10px">
      <StatsBoard />
      <AddPost
        currentClub={selectedClub}
        setCurrentClub={setSelectedClub}
        clubs={userClubsIds}
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
