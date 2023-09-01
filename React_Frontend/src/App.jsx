import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Navigation from "./components/Navigation";
import Home from "./pages/home";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
