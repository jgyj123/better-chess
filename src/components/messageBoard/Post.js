import { HStack, VStack, Text, Flex } from "@chakra-ui/react";
import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { FaChessKing } from "react-icons/fa";
import { StackDivider } from "@chakra-ui/react";

const Post = () => {
  return (
    <VStack
      borderColor="black"
      borderWidth="2px"
      divider={<StackDivider />}
      p={4}
      bg="white"
    >
      <Flex w="100%" alignItems="center">
        <VStack>
          <HStack>
            <BsFillPersonFill></BsFillPersonFill>
            <Text>Adam Lee</Text>
          </HStack>
        </VStack>

        <HStack bg="gray.100" marginLeft="auto">
          <FaChessKing />
          <Text>OrbitalChessGroup</Text>
        </HStack>
      </Flex>
      <Text>
        This is a cool message. Finding new players to join the club WOOOHOOOOO.
        Please play with me I am very lonely during covid
      </Text>
    </VStack>
  );
};

export default Post;
