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
    <Box
      maxW="sm"
      borderWidth="1px"
      backgroundColor={cardColor}
      borderRadius="lg"
    >
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
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
            Teal &bull; White
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
      </Box>
    </Box>
  );
}
