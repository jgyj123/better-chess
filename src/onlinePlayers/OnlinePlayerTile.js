import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { GiBroadsword } from "react-icons/gi";
import {
  Box,
  Button,
  Flex,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
const OnlinePlayerTile = () => {
  return (
    <Flex w="100%" alignItems="center" justifyContent="center">
      <BsFillPersonFill />
      <Box>username</Box>
      <Button colorScheme="teal" size="xs" marginLeft="3">
        <GiBroadsword />
      </Button>
    </Flex>
  );
};
export default OnlinePlayerTile;
