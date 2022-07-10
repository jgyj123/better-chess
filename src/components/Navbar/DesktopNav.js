import React from "react";
import {
  Box,
  Stack,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
} from "@chakra-ui/react";
import { DesktopSubNav } from "./DesktopSubNav";

export const DesktopNav = () => {
  const linkColor = "#ffffff";
  const linkHoverColor = "#F15412";
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} alignSelf="center">
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                to={navItem.href ?? "#"}
                fontSize={"lg"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Community",
    children: [
      {
        label: "Posts and Announcements",
        subLabel: "See all club posts and announcements",
        href: "/",
      },
      {
        label: "Find a Club",
        subLabel: "Search for a community",
        href: "/joinClub",
      },
      {
        label: "Create a Club",
        subLabel: "Make your own community",
        href: "/createClub",
      },
    ],
  },
  {
    label: "Puzzles",
    children: [
      {
        label: "Standard",
        subLabel: "Try your hand at puzzles based on ELO",
        href: "/puzzles",
      },
      {
        label: "Statistics",
        subLabel: "See your puzzle statistics",
        href: "#",
      },
    ],
  },
  {
    label: "Shop",
    children: [
      {
        label: "Board Cosmetics",
        subLabel: "Buy cosmetic changes for the Chess Board",
        href: "/shop",
      },
    ],
  },
];
