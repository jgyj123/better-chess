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
  HStack,
} from "@chakra-ui/react";

import Navbar from "../Navbar/Navbar";
import FileUpload from "./FileUpload";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { increment } from "firebase/firestore";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
  addDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { auth } from "../../firebase";
const CreateClub = () => {
  const {
    handleSubmit,
    register,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm();
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [clubLocation, setClubLocation] = useState("");

  const navigate = useNavigate();
  const joinExisitingClub = (clubId) => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );
    getDocs(q).then((res) => {
      const id = res.docs[0].id;
      const ref = doc(db, "users", id);
      const clubRef = doc(db, "clubs", clubId);
      updateDoc(clubRef, {
        memberCount: increment(1),
      });
      updateDoc(ref, {
        clubIds: arrayUnion(clubId),
        clubs: arrayUnion({ id: clubId, name: clubName }),
      });
      navigate("/joinClub");
    });
  };
  const createNewClub = () => {
    if (clubName !== "" && clubLocation !== "") {
      addDoc(collection(db, "clubs"), {
        name: clubName,
        location: clubLocation,
        memberCount: 0,
        description: clubDescription,
        clubId: "",
      }).then((res) => {
        let docId = res.id;
        let docRef = doc(db, "clubs/" + docId);
        updateDoc(docRef, { clubId: docRef.id });
        joinExisitingClub(docRef.id);
      });
      setClubDescription("");
      setClubLocation("");
      setClubName("");
      alert("Club created successfully!");
    }
  };
  return (
    <div>
      <Navbar />
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
        {/* <FileUpload
          name="Club Image"
          acceptedFileTypes="image/*"
          isRequired={false}
          placeholder="Club Image"
          control={control}
          clubName={clubName}
        >
          Set Club Image
        </FileUpload> */}
        <Button marginLeft={"3%"} width="94%" onClick={createNewClub}>
          Create
        </Button>
      </Box>
    </div>
  );
};

export default CreateClub;
