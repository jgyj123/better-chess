import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { OAuthButtonGroup } from "./OAuthButtonGroup";
import { PasswordField } from "./PasswordField";
<<<<<<< Updated upstream
=======
import { auth, provider } from "../firebase";
>>>>>>> Stashed changes
import {
  auth,
  signInWithEmailAndPassword,
<<<<<<< Updated upstream
  signInWithGoogle,
} from "../firebase";
// import {
//   GoogleAuthProvider,
//   getAuth,
//   signInWithPopup,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
//   signOut,
// } from "@firebase/auth";
import logo from "../logo.svg";

export const Login = () => {
  // const [loginEmail, setLoginEmail] = useState("");
  // const [loginPassword, setLoginPassword] = useState("");
  // const [registerEmail, setRegisterEmail] = useState("");
  // const [registerPassword, setRegisterPassword] = useState("");
  // const [user, setUser] = useState({});

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // });
  // const register = async () => {
  //   try {
  //     const user = await createUserWithEmailAndPassword(
  //       auth,
  //       registerEmail,
  //       registerPassword
  //     );
  //     console.log(user);
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };
  // const login = async () => {
  //   try {
  //     const user = await signInWithEmailAndPassword(
  //       auth,
  //       loginEmail,
  //       loginPassword
  //     );
  //     console.log(user);
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };
=======
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "@firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // The signed-in user info.
        const user = result.user;
        navigate("/");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error.message);
      });
  };
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch (e) {
      console.log(e.message);
    }
  };
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      navigate("/");
    } catch (e) {
      console.log(e.message);
      alert("Please enter a valid email/password");
    }
  };
>>>>>>> Stashed changes

  // const logout = async () => {
  //   try {
  //     signOut(auth);
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };

  return (
    <Container
      maxW="lg"
      py={{
        base: "12",
        md: "24",
      }}
      px={{
        base: "0",
        sm: "8",
      }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <img src={logo} alt="Logo" />
          <Stack
            spacing={{
              base: "2",
              md: "3",
            }}
            textAlign="center"
          >
            <Heading
              size={useBreakpointValue({
                base: "s",
                md: "sm",
              })}
            >
              Log in to your account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Don&apos;t have an account?</Text>
              <Button variant="link" colorScheme="blue">
                Sign up
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{
            base: "0",
            sm: "8",
          }}
          px={{
            base: "4",
            sm: "10",
          }}
          bg="white"
          boxShadow={{
            base: "none",
            sm: useColorModeValue("md", "md-dark"),
          }}
          borderRadius={{
            base: "none",
            sm: "xl",
          }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                  }}
                />
              </FormControl>
              <PasswordField
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }}
              />
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="link" colorScheme="blue" size="sm">
                Forgot password? {user?.email}
              </Button>
            </HStack>
            <Stack spacing="6">
<<<<<<< Updated upstream
              <Button colorScheme="messenger">Sign in</Button>
=======
              <Button variant="primary" onClick={login}>
                Sign in
              </Button>
>>>>>>> Stashed changes
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>
<<<<<<< Updated upstream
              <OAuthButtonGroup signInWithGoogle={signInWithGoogle} />
=======
              <OAuthButtonGroup signIn={loginWithGoogle} />
              <button onClick={loginWithGoogle}>Log in</button>
>>>>>>> Stashed changes
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
export default Login;
