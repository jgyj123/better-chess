import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import StatsBoard from "./StatsBoard";
import Post from "./Post";
const MessageBoard = () => {
  return (
    <VStack w="50%">
      <StatsBoard />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </VStack>
  );
};

export default MessageBoard;
