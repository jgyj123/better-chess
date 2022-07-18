import React from "react";
import JoinGameButtons from "./JoinGameButtons";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

test("renders join game buttons", () =>
  render(
    <Router>
      <JoinGameButtons />
    </Router>
  ));
