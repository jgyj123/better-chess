import React from "react";
import OnlinePlayerTile from "./OnlinePlayerTile";
import { Box, VStack, Center } from "@chakra-ui/react";
const OnlinePlayers = () => {
  return (
    <VStack w="30%" background="gray.100">
      <Center w="100%" borderBottom="1px solid black">
        Online Players
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
