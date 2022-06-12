import React from "react";
import { Link } from "react-router-dom";
import { VStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

const JoinGameButtons = () => {
  return (
    <VStack w="25%" bg="#615D56" minWidth="300px">
      <Button
        w="80%"
        size="lg"
        p="4px;"
        marginTop={10}
        backgroundColor="#252323"
        color="#F5F5F5"
        border="2px"
        borderColor="#ffffff"
        _hover={{ bg: "#ebedf0", color: "#000000" }}
      >
        <Link to="/game"> CREATE GAME</Link>
      </Button>
      <Button
        w="80%"
        size="lg"
        p="4px;"
        backgroundColor="#252323"
        color="#F5F5F5"
        border="2px"
        borderColor="#ffffff"
        _hover={{ bg: "#ebedf0", color: "#000000" }}
      >
        <Link to="/game">PLAY WITH FRIEND</Link>
      </Button>
      <Button
        w="80%"
        size="lg"
        p="4px;"
        backgroundColor="#252323"
        color="#F5F5F5"
        border="2px"
        borderColor="#ffffff"
        _hover={{ bg: "#ebedf0", color: "#000000" }}
      >
        <Link to="/game">PLAY VS COMPUTER</Link>
      </Button>
    </VStack>
  );
};

export default JoinGameButtons;
