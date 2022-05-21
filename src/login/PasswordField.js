var _extends =
  Object.assign ||
  function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react";
import * as React from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

export const PasswordField = React.forwardRef((props, ref) => {
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = React.useRef(null);
  const mergeRef = useMergeRefs(inputRef, ref);

  const onClickReveal = () => {
    onToggle();

    if (inputRef.current) {
      inputRef.current.focus({
        preventScroll: true,
      });
    }
  };

  return React.createElement(
    FormControl,
    null,
    React.createElement(FormLabel, { htmlFor: "password" }, "Password"),
    React.createElement(
      InputGroup,
      null,
      React.createElement(
        InputRightElement,
        null,
        React.createElement(IconButton, {
          variant: "link",
          "aria-label": isOpen ? "Mask password" : "Reveal password",
          icon: isOpen
            ? React.createElement(HiEyeOff, null)
            : React.createElement(HiEye, null),
          onClick: onClickReveal,
        })
      ),
      React.createElement(
        Input,
        _extends(
          {
            id: "password",
            ref: mergeRef,
            name: "password",
            type: isOpen ? "text" : "password",
            autoComplete: "current-password",
            required: true,
          },
          props
        )
      )
    )
  );
});
PasswordField.displayName = "PasswordField";
