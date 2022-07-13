import { ArrowUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Img,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function Card({ name, price, image, post, onImageClick }) {
  const cardColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Box backgroundColor={cardColor} borderRadius={["sm", null, "md"]}>
      <Box
        onClick={() => onImageClick(post)}
        cursor="pointer"
        h="300px"
        w="300px"
        position="relative"
        overflow="hidden"
      >
        <img src={image} alt="shop item" />
      </Box>
      <Flex px="4" py="2" align="center" justify="space-between" w="100%">
        <Text fontSize={["xs", null, "sm"]}>{name}</Text>
        <Flex align="center">
          <Text ml={1} fontSize={["xs", null, "sm"]}>
            Cost: {price} Coins
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
