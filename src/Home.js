import React from "react";
import {
  Box,
  Flex,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  VStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import OnlinePlayers from "./components/onlinePlayers/OnlinePlayers";
import NavBar from "./components/Navbar/Navbar";
import MessageBoard from "./components/messageBoard/MessageBoard";
import JoinGameButtons from "./components/joinButtons/JoinGameButtons";

const Home = (props) => {
  return (
    <Box w="100vw">
      <NavBar w="100%" useSignIn={props.signIn} />
      <Flex gap={4}>
        <JoinGameButtons />
        <MessageBoard />
        <OnlinePlayers />
      </Flex>
    </Box>
  );
};
export default Home;
