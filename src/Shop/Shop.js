import React, { Component } from "react";
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
} from "@chakra-ui/react";

export class Shop extends Component {
  render() {
    return (
      <Box minHeight="100vh" display="flex" flexDir="column">
        <Container maxW="xl" mt="95px" flex={1}>
          <Box textAlign="center">
            <Heading as="h1" size="4xl">
              Shop
            </Heading>
          </Box>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={5}
            mt={6}
          ></SimpleGrid>
        </Container>
      </Box>
    );
  }
}

export default Shop;
