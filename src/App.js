import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./login/Login";
import { ChakraProvider } from "@chakra-ui/react";
import Game from "./Game";
<<<<<<< Updated upstream
import { myTheme } from "./styles/theme";

=======
import PrivateRoute from "./PrivateRoute";
import Navbar from "./Navbar";
>>>>>>> Stashed changes
const App = () => {
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
                  <Navbar />
                  <Game />
                </PrivateRoute>
              }
            ></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/game" element={<Game />}></Route>
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
};

export default App;
