import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MoviePage from "./components/MoviePage";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movie-page" element={<MoviePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
