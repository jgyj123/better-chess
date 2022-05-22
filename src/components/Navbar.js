import { Image, Flex, Button, HStack, chakra } from "@chakra-ui/react";
import Logo from "./Logo";
import React from "react";

const CTA = "Get Started";

export default function Navbar() {
  return (
    <chakra.header id="header">
      <Flex w="100%" px="6" py="5" align="center" justify="space-between">
        <Image src={Logo.src} h="50px" />
        <HStack as="nav" spacing="5">
          <Button variant="nav"> button </Button>
        </HStack>
        <HStack>
          <Button>{CTA}</Button>
        </HStack>
      </Flex>
    </chakra.header>
  );
}
