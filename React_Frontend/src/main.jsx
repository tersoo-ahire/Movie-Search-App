import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { MovieDataProvider } from "./Context.jsx";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MovieDataProvider>
        <App />
      </MovieDataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
