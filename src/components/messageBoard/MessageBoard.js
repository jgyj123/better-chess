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
} from "firebase/firestore";

const MessageBoard = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "posts"), (snapshot) =>
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, []);
  return (
    <VStack w="50%">
      <StatsBoard />
      {posts.map((post) => {
        return (
          <Post
            key={posts.id}
            name={post.username}
            message={post.message}
            club={post.club}
          />
        );
      })}
    </VStack>
  );
};

export default MessageBoard;
