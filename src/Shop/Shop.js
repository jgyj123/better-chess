import React, { Component, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Link,
  SimpleGrid,
  Skeleton,
  Text,
  useDisclosure,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
import Card from "./ItemCard";
import chessboard2 from "../Shop/shopItems/ChessBoard2.png";

export default function Shop(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPost, setSelectedPost] = useState(null);
  const view = (post) => {
    setSelectedPost(post);
    onOpen();
  };

  return (
    <Box minHeight="100vh" display="flex" flexDir="column">
      <Navbar w="100%" useSignIn={props.signIn} />
      <Container maxW="xl" mt="95px">
        <Box textAlign="center" mb={"50"}>
          <Heading as="h1" size="4xl">
            Shop
          </Heading>
        </Box>
      </Container>
      <Container>
        <HStack>
          <Card
            name={"Board Theme One"}
            price={"200"}
            image={chessboard2}
            post={null}
            onImageClick={view}
          />
          <Card
            name={"Board Theme One"}
            price={"200"}
            image={chessboard2}
            post={null}
            onImageClick={view}
          />
          <Card
            name={"Board Theme One"}
            price={"200"}
            image={chessboard2}
            post={null}
            onImageClick={view}
          />
        </HStack>
      </Container>
    </Box>
  );
}
