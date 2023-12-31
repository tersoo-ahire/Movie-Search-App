import React from "react";
import Search from "../components/Search";
import MovieInfo from "../components/MovieInfo";
import illustration1 from "../assets/illustration1.svg";

export default function Home() {
  // Callback to scroll to the end of the home page when the search is successful
  const scrollToMovieInfo = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <main className="homepage">
      <header className="hero-container">
        <div className="hero-container-left">
          <h1>
            Unlock a World of{" "}
            <span style={{ color: "gold", fontStyle: "italic" }}>Movies.</span>{" "}
            Explore, Discover & Enjoy!
          </h1>
          <a href="#search" className="button">
            Find Movies
          </a>
        </div>
        <div className="hero-container-right">
          <img
            src={illustration1}
            alt="Illustration of Woman Searching for movie"
          />
        </div>
      </header>

      <Search onSearchSuccess={scrollToMovieInfo} />
      <MovieInfo />
    </main>
  );
}
