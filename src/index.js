import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StoreProvider } from "./store/StoreProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

// remove strict mode to avoid double rendering (https://reactjs.org/blog/2022/03/29/react-v18.html)
// With Strict Mode in React 18, React will simulate unmounting and remounting the component in development mode
root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
