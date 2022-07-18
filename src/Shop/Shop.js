import React, { Component, useState } from "react";
import { Box, Container, Heading, Grid } from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
import Card from "./ItemCard";
import chessboard1 from "../Shop/shopItems/ChessBoard1.png";
import chessboard2 from "../Shop/shopItems/ChessBoard2.png";
import chessboard3 from "../Shop/shopItems/ChessBoard3.png";
import chessboard4 from "../Shop/shopItems/ChessBoard4.png";
import chessboard5 from "../Shop/shopItems/ChessBoard5.png";
import chessboard6 from "../Shop/shopItems/ChessBoard6.png";
import chessboard7 from "../Shop/shopItems/ChessBoard7.png";
import chessboard8 from "../Shop/shopItems/ChessBoard8.png";

export default function Shop(props) {
  return (
    <Box minHeight="100vh" display="flex" flexDir="column">
      <Navbar w="100%" useSignIn={props.signIn} />
      <Container maxW="xl" mt="50px">
        <Box textAlign="center" mb={"50"}>
          <Heading as="h1" size="4xl">
            Shop
          </Heading>
        </Box>
      </Container>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={6}
        justifyItems="center"
        marginBottom={10}
      >
        <Card
          name={"Standard"}
          price={"400"}
          image={chessboard1}
          color1={"Black"}
          color2={"White"}
          itemID={0}
        />
        <Card
          name={"Blue And White"}
          price={"1200"}
          image={chessboard2}
          color1={"Navy Blue"}
          color2={"White"}
          itemID={1}
        />
        <Card
          name={"Classic"}
          price={"150"}
          image={chessboard3}
          color1={"Carmine"}
          color2={"White"}
          itemID={2}
        />
        <Card
          name={"Darkened"}
          price={"300"}
          image={chessboard4}
          color1={"Black"}
          color2={"Gray"}
          itemID={3}
        />
        <Card
          name={"Pink Blosson"}
          price={"750"}
          image={chessboard5}
          color1={"Light Pink"}
          color2={"Milk"}
          itemID={4}
        />
        <Card
          name={"Woody"}
          price={"1100"}
          image={chessboard6}
          color1={"Coconut"}
          color2={"Silver Brown"}
          itemID={5}
        />
        <Card
          name={"Calm Cyan"}
          price={"2100"}
          image={chessboard7}
          color1={"Sky Blue"}
          color2={"White"}
          itemID={6}
        />
        <Card
          name={"Smooth Brown"}
          price={"3000"}
          image={chessboard8}
          color1={"French Beige"}
          color2={"Cornsilk"}
          itemID={7}
        />
      </Grid>
    </Box>
  );
}
