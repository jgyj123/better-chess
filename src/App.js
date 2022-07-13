import { React, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./login/Login";
import { ChakraProvider } from "@chakra-ui/react";
import Game from "./Game";
import { myTheme } from "./styles/theme";
import Home from "./Home";
import SignupCard from "./login/SignUp";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./components/Navbar/Navbar";
import Puzzle from "./puzzles/Puzzle";
import { Navigate } from "react-router-dom";
import { auth, db, realTimeDb } from "./firebase";
import JoinClub from "./components/joinClub/joinClub";
import { AuthProvider } from "./authProvider";
import CreateClub from "./components/CreateClub/CreateClub";
import Shop from "./Shop/Shop";
import { ref, set } from "firebase/database";

const App = () => {
  const signIn = () => {
    Navigate("/login");
  };
  useEffect(() => {
    // Assuming user is logged in
    const userId = auth.currentUser !== null ? auth.currentUser.uid : null;

    const reference = ref(realTimeDb, `/online/${userId}`);

    // Set the /users/:userId value to true
    set(reference, true).then(() => console.log("Online presence set"));
  }, []);

  return (
    <ChakraProvider resetCSS theme={myTheme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Home signIn={signIn} />
                </PrivateRoute>
              }
            ></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route
              exact
              path="/game"
              element={
                <PrivateRoute>
                  <Navbar></Navbar>
                  <Game />
                </PrivateRoute>
              }
            ></Route>
            <Route exact path="/joinClub" element={<JoinClub />}></Route>
            <Route exact path="/createClub" element={<CreateClub />}></Route>
            <Route
              exact
              path="/shop"
              element={<Shop signIn={signIn} />}
            ></Route>
            <Route
              exact
              path="/puzzles"
              element={<Puzzle user={auth.currentUser} signIn={signIn} />}
            ></Route>
            <Route exact path="/signUp" element={<SignupCard />}></Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
