import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import Login from "../Login";
import { cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
  cleanup();
});

it("renders without crashing", () => {
  ReactDOM.createRoot(container).render(<Login />);
});
