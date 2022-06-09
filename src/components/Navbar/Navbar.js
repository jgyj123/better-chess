import React from "react";
import { Box, Flex, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { DesktopNav } from "./DesktopNav";
import ButtonGroup from "./ButtonGroup";
import logo from "../Logo.png";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

export default function Navbar(props) {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box>
      <Flex
        bg="#403D39"
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link to="/">
            <img src={logo} height="40px" width="40px" alt="logo" />
          </Link>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        <ButtonGroup useSignIn={props.useSignIn} />
      </Flex>
    </Box>
  );
}
