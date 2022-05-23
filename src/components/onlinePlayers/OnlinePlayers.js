import React from "react";
import OnlinePlayerTile from "./OnlinePlayerTile";
import { Box, VStack, Center, Text } from "@chakra-ui/react";
import { StackDivider } from "@chakra-ui/react";
const OnlinePlayers = () => {
  return (
    <VStack w="25%" background="white" p="4px" divider={<StackDivider />}>
      <Center w="100%">
        <Text fontSize={26}>Online Players</Text>
      </Center>
      <OnlinePlayerTile />
      <OnlinePlayerTile />
      <OnlinePlayerTile />
      <OnlinePlayerTile />
      <OnlinePlayerTile />
    </VStack>
  );
};

export default OnlinePlayers;
