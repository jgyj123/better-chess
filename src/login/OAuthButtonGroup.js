import { Button, ButtonGroup, VisuallyHidden } from "@chakra-ui/react";
import { GoogleIcon } from "./ProviderIcons";
import React from "react";

const providers = [
  {
    name: "Google",
    icon: React.createElement(GoogleIcon, { boxSize: "5" }),
  },
];

export const OAuthButtonGroup = () =>
  React.createElement(
    ButtonGroup,
    { variant: "outline", spacing: "4", width: "full" },
    providers.map(({ name, icon }) =>
      React.createElement(
        Button,
        { key: name, width: "full" },
        React.createElement(VisuallyHidden, null, "Sign in with ", name),
        icon
      )
    )
  );
