import React, { Component, useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Grid,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Image,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
import Card from "./ItemCard";
import MiscItemCard from "./MiscItemCard";
import chessboard1 from "../Shop/shopItems/ChessBoard1.png";
import chessboard2 from "../Shop/shopItems/ChessBoard2.png";
import chessboard3 from "../Shop/shopItems/ChessBoard3.png";
import chessboard4 from "../Shop/shopItems/ChessBoard4.png";
import chessboard5 from "../Shop/shopItems/ChessBoard5.png";
import chessboard6 from "../Shop/shopItems/ChessBoard6.png";
import chessboard7 from "../Shop/shopItems/ChessBoard7.png";
import chessboard8 from "../Shop/shopItems/ChessBoard8.png";

import smile from "../Shop/shopItems/smile.png";
import { BiMedal } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  FieldValue,
  increment,
  decrement,
  arrayUnion,
} from "firebase/firestore";
import { db, auth } from "../firebase";
export default function Shop(props) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );
    onSnapshot(q, (res) => {
      setLoading(true);
      console.log(res.docs[0].data().items);
      setItems(res.docs[0].data().items);
      setLoading(false);
    });
  }, []);
  const q = query(
    collection(db, "users"),
    where("uid", "==", auth.currentUser.uid)
  );
  getDocs(q).then((res) => {
    const coins = res.docs[0].data().coins;
    setCoins(coins);
  });
  if (!loading) {
    return (
      <Box minHeight="100vh" display="flex" flexDir="column">
        <Navbar w="100%" useSignIn={props.signIn} />
        <Tabs bg="white" height="80%" width="100%" padding="20px">
          <Flex alignItems="center" width="100%" justifyContent={"center"}>
            Coins:
            <Box boxSize="20px" marginLeft="10px">
              <Image src="./coin.png" />
            </Box>
            {coins}
          </Flex>
          <Box
            borderRadius="lg"
            fontWeight="semibold"
            fontSize="lg"
            textAlign={"center"}
          ></Box>
          <TabList>
            <Tab>Board Skins</Tab>
            <Tab>Miscellaneous Items</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box textAlign="center" mb="5px;">
                <Heading as="h4" size="2xl" letterSpacing="wide">
                  Board Themes
                </Heading>
              </Box>

              <Grid
                templateColumns="repeat(3, 1fr)"
                gap={6}
                justifyItems="center"
                marginBottom={10}
              >
                <Card
                  name={"Pink Blossom"}
                  price={"750"}
                  image={chessboard5}
                  color1={"Light Pink"}
                  color2={"Milk"}
                  itemID={0}
                  items={items}
                />
                <Card
                  name={"Woody"}
                  price={"1100"}
                  image={chessboard6}
                  color1={"Coconut"}
                  color2={"Silver Brown"}
                  itemID={1}
                  items={items}
                />
                <Card
                  name={"Calm Cyan"}
                  price={"2100"}
                  image={chessboard7}
                  color1={"Sky Blue"}
                  color2={"White"}
                  itemID={2}
                  items={items}
                />
                <Card
                  name={"Smooth Brown"}
                  price={"3000"}
                  image={chessboard8}
                  color1={"French Beige"}
                  color2={"Cornsilk"}
                  itemID={3}
                  items={items}
                />
              </Grid>
            </TabPanel>
            <TabPanel>
              <Box textAlign="center">
                <Heading as="h4" size="2xl" letterSpacing="wide">
                  Board Themes
                </Heading>
              </Box>
              <Grid
                templateColumns="repeat(6, 1fr)"
                gap={6}
                justifyItems="center"
                marginBottom={10}
              >
                <MiscItemCard
                  name={"Smiley Face"}
                  price={"100"}
                  image={smile}
                  color1={"emoji"}
                  color2={"icon"}
                  itemID={4}
                  items={items}
                />
                <MiscItemCard
                  name={"Cool Face"}
                  price={"300"}
                  image="./cool.png"
                  color1={"emoji"}
                  color2={"icon"}
                  itemID={5}
                  items={items}
                />
                <MiscItemCard
                  name={"Confused Emoji"}
                  price={"500"}
                  image="./confused.png"
                  color1={"emoji"}
                  color2={"icon"}
                  itemID={6}
                  items={items}
                />
                <MiscItemCard
                  name={"Queen Crown"}
                  price={"1000"}
                  image="./queenCrown.png"
                  color1={"emoji"}
                  color2={"icon"}
                  itemID={7}
                  items={items}
                />
                <MiscItemCard
                  name={"King Crown"}
                  price={"1000"}
                  image="./crown2.png"
                  color1={"emoji"}
                  color2={"icon"}
                  itemID={8}
                  items={items}
                />
                <MiscItemCard
                  name={"Lightning"}
                  price={"3000"}
                  image="./flash.png"
                  color1={"emoji"}
                  color2={"icon"}
                  itemID={9}
                  items={items}
                />
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    );
  } else {
    return <>Loading...</>;
  }
}
