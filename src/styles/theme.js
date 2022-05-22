import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { BoxStyles as Box } from "./BoxStyles";

export const myTheme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        fontFamily: "body",
        color: mode("gray.800", "whiteAlpha.900")(props),
        bg: mode("#e1f5ff", "gray.800")(props),
        lineHeight: "base",
      },
    }),
    components: {
      Box,
    },
  },
});
