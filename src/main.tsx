import React from "react";

import "./index.css";

import { createRoot } from "react-dom/client";
import App from "./App";
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error(
    "Failed to find the root element. Ensure there is an element with the ID 'root' in your HTML."
  );
}
