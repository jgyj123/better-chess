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
  Avatar,
} from "@chakra-ui/react";
const OnlinePlayerTile = (props) => {
  return (
    <Flex
      w="100%"
      alignItems="center"
      justifyContent="space-evenly"
      marginBottom="10px"
    >
      <Avatar />
      <Text marginLeft="10px" w="40%">
        {props.displayName}
      </Text>
      <Button colorScheme="teal" size="xs" marginLeft="3">
        <GiBroadsword />
      </Button>
    </Flex>
  );
};
export default OnlinePlayerTile;
