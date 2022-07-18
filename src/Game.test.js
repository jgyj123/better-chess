import React from "react";
import Game from "./Game";
import { render, screen } from "@testing-library/react";
test("renders without crashing", () => {
  render(<Game />);
  screen.debug();
});
