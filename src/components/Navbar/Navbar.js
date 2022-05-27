import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { DesktopNav } from "./DesktopNav";
import { auth } from "../../firebase";
import ButtonGroup from "./ButtonGroup";
import logo from "../Logo.png";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const { isOpen, onToggle } = useDisclosure();
  const user = auth.currentUser;
  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          {/* <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            Logo
          </Text> */}
          <Link to="/">
            <img src={logo} height="32px" width="32px" alt="logo" />
          </Link>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        <ButtonGroup useSignIn={props.useSignIn} user={user} />
      </Flex>
    </Box>
  );
}
