import { ArrowUpIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Link,
  Text,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
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
import { db, auth, realTimeDb } from "../firebase";
import { FcCheckmark } from "react-icons/fc";

export default function Card({
  name,
  price,
  image,
  post,
  color1,
  color2,
  itemID,
  items,
}) {
  const [disabled, setDisabled] = useState(false);
  const cardColor = useColorModeValue("gray.100", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const view = () => {
    onOpen();
  };
  const closeView = () => {
    onClose();
  };
  const onPurchase = () => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );
    getDocs(q).then((res) => {
      const id = res.docs[0].id;
      const ref = doc(db, "users", id);
      const coins = res.docs[0].data().coins;
      const ids = res.docs[0].data().items;
      if (coins <= price) {
        alert("Not enough coins!");
      } else if (ids.includes(itemID)) {
        alert("Item already purchased!");
      } else {
        updateDoc(ref, {
          coins: increment(-price),
          items: arrayUnion(itemID),
        });
        alert("Item purchased successfully!");
      }
    });
    onClose();
  };
  useEffect(() => {
    if (items.includes(itemID)) setDisabled(true);
  }, []);
  return (
    <Box
      onClick={() => view(post)}
      cursor="pointer"
      maxW="sm"
      borderWidth="1px"
      backgroundColor={cardColor}
      borderRadius="lg"
    >
      <Modal isOpen={isOpen} onClose={closeView}>
        <ModalOverlay />
        {disabled ? (
          <ModalContent>
            <ModalHeader>
              Item already purchased
              <ModalCloseButton />
            </ModalHeader>
            <ModalBody> </ModalBody>
          </ModalContent>
        ) : (
          <ModalContent>
            <ModalHeader>Buy Item</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Purchase {name} for {price} coins?
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" variant="solid" onClick={onPurchase}>
                Purchase
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
      <Box borderRadius="lg" h="75%" w="100%" position="relative">
        <Image src={image} alt="shop item" />
      </Box>
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
            {color1} &bull; {color2}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {name}
        </Box>

        <Box>
          {price}
          <Box as="span" color="gray.600" fontSize="sm">
            / coins
          </Box>
        </Box>

        {disabled ? (
          <Flex alignItems="center" float="right">
            <Text color="gray.500" fontSize="16px" marginRight="1px">
              Owned
            </Text>
            <FcCheckmark />
          </Flex>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}
