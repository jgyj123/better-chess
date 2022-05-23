import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

const JoinGameButtons = () => {
  return (
    <VStack w="25%" bg="white">
      <Button w="80%" size="lg" p="4px;" colorScheme="blue">
        CREATE GAME
      </Button>
      <Button w="80%" size="lg" p="4px;" colorScheme="blue">
        PLAY WITH FRIEND
      </Button>
      <Button w="80%" size="lg" p="4px;" colorScheme="blue">
        PLAY AGAINST COMPUTER
      </Button>
    </VStack>
  );
};

export default JoinGameButtons;
