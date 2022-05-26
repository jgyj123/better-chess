import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./login/Login";
import { ChakraProvider } from "@chakra-ui/react";
import Game from "./Game";
import { myTheme } from "./styles/theme";
import Home from "./Home";
import SignupCard from "./login/SignUp";

const App = () => {
  return (
    <ChakraProvider resetCSS theme={myTheme}>
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/game" element={<Game />}></Route>
            <Route exact path="/signUp" element={<SignupCard />}></Route>
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
};

export default App;
