import React, { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import StatsBoard from "./StatsBoard";
import Post from "./Post";
import { db } from "../../firebase";
import {
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  doc,
  orderBy,
} from "firebase/firestore";
import AddPost from "./AddPost";

const MessageBoard = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const posts = query(collection(db, "posts"), orderBy("date", "desc"));
    onSnapshot(posts, (snapshot) =>
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, []);
  return (
    <VStack w="50%" overflow="scroll" height="100vh">
      <StatsBoard />
      <AddPost />
      {posts.map((post) => {
        return (
          <Post
            key={posts.id}
            name={post.username}
            message={post.message}
            club={post.club}
            date={post.date}
            profilePic={post.profilePic}
          />
        );
      })}
    </VStack>
  );
};

export default MessageBoard;
