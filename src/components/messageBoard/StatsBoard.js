import React from "react";
import {
  Box,
  Text,
  Container,
  Heading,
  HStack,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { BsFillPersonFill } from "react-icons/bs";
const StatsBoard = () => {
  return (
    <VStack
      divider={<StackDivider />}
      w="100%"
      borderColor="black"
      borderWidth="2px"
      p="4"
      marginBottom="30px"
      bg="white"
    >
      <HStack w="100%">
        <BsFillPersonFill />
        <Text>John Doe</Text>
      </HStack>
      <HStack w="100%">
        <Text>Rating: 1900</Text>
        <Text>Coins: 2000</Text>
        <Text>Wins: 3</Text>
        <Text>Losses: 0</Text>
      </HStack>
    </VStack>
  );
};

export default StatsBoard;
