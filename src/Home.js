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
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import OnlinePlayers from "./onlinePlayers/OnlinePlayers";

const Home = () => {
  return <OnlinePlayers />;
};
export default Home;
