import { React } from "react";
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
import { auth } from "./firebase";

const App = () => {
  const signIn = () => {
    Navigate("/login");
  };
  const user = auth.currentUser;
  return (
    <ChakraProvider resetCSS theme={myTheme}>
      <div>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Home user={user} signIn={signIn} />
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
            <Route
              exact
              path="/puzzles"
              element={<Puzzle user={user} signIn={signIn} />}
            ></Route>
            <Route exact path="/signUp" element={<SignupCard />}></Route>
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
};

export default App;
