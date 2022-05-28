import React from "react";
import {
  Box,
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
      <NavBar w="100%" user={props.user} useSignIn={props.signIn} />
      <HStack gap={4}>
        <JoinGameButtons />
        <MessageBoard />
        <OnlinePlayers />
      </HStack>
    </Box>
  );
};
export default Home;
