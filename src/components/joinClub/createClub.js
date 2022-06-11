import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Flex,
  Box,
  Text,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
const CreateClub = () => {
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [clubLocation, setClubLocation] = useState("");
  const createNewClub = () => {
    addDoc(collection(db, "clubs"), {
      name: clubName,
      location: clubLocation,
      memberCount: 0,
      description: clubDescription,
    });
    setClubDescription("");
    setClubLocation("");
    setClubName("");
  };
  return (
    <Box bg="white" shadow="lg" w="600px" height="330px;" margin="auto">
      <Text textAlign="center" fontSize="40px;">
        Create a club!
      </Text>
      <Flex>
        <FormControl padding={4}>
          <FormLabel>Enter a name</FormLabel>
          <Input
            value={clubName}
            onChange={(e) => {
              setClubName(e.target.value);
            }}
          ></Input>
        </FormControl>
        <FormControl padding={4}>
          <FormLabel>Enter a location</FormLabel>
          <Input
            value={clubLocation}
            onChange={(e) => {
              setClubLocation(e.target.value);
            }}
          ></Input>
        </FormControl>
      </Flex>
      <FormControl padding={4}>
        <FormLabel>Enter a description</FormLabel>
        <Input
          value={clubDescription}
          onChange={(e) => {
            setClubDescription(e.target.value);
          }}
        />
      </FormControl>
      <Button marginLeft={"3%"} width="94%" onClick={createNewClub}>
        Create
      </Button>
    </Box>
  );
};

export default CreateClub;
