import { Button } from "@chakra-ui/react";
import React from "react";

export const ButtonMod = (props) => (
  <Button
    isLoading={props.isLoading}
    loadingText={props.loadingText}
    colorScheme="gray"
    variant="outline"
  >
    {props.text}
  </Button>
);
