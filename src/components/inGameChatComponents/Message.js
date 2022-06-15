import React from "react";
import { Text, Center, Flex, Box, Avatar } from "@chakra-ui/react";
const Message = (props) => {
  return (
    <Box>
      {props.senderColor == props.focusColor ? (
        <Flex width="100%" justifyContent="flex-end" marginBottom="5px;">
          <Text
            color="white"
            bg="blue.400"
            padding="8px"
            rounded="lg"
            shadow="sm"
          >
            {props.message}
          </Text>
        </Flex>
      ) : (
        <Flex width="100%" marginBottom="5px;" alignItems="center">
          <Avatar src={props.opponentPic} />
          <Text
            color="white"
            bg="green.400"
            padding="8px"
            rounded="lg"
            shadow="sm"
            height="50%"
            marginLeft="3px;"
          >
            {props.message}
          </Text>
        </Flex>
      )}
    </Box>
  );
};
export default Message;
