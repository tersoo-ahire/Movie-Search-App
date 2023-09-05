import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import genericbanner from "../assets/generic_banner.png";
import { useMovieData } from "../Context";

export default function MovieInfo() {
  const { movieData } = useMovieData(); // Access the movieData State from context
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const openMovieModal = (movie) => {
    setLoading(true);
    let countdown = 1; // Set 1 second countdown for displaying information
    const countdownInterval = setInterval(() => {
      countdown--;

      if (countdown === 0) {
        clearInterval(countdownInterval);
        setLoading(false);
        setSelectedMovie(movie); // Show movie information once countdown ends
      }
    }, 1000);
  };

  const closeMovieModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      {movieData && movieData.Search && movieData.Search.length > 0 && (
        <div className="movieinfo-container">
          <h2>Search Results</h2>
          {movieData.Search.map((result, index) => (
            <div className="sub-container" key={index}>
              <div
                className="movie-list"
                title="Click to see more information"
                onClick={() => openMovieModal(result)}
              >
                <span className="title">{result.Title}</span>
                <span>
                  Type:
                  <span className="value"> {result.Type}</span>
                </span>
                <span>
                  Year:
                  <span className="value"> {result.Year}</span>
                </span>
                <span>
                  IMBD Id:
                  <span className="value"> {result.imdbID}</span>
                </span>
              </div>
              {selectedMovie && (
                <div className="movie-modal-container">
                  <div className="information-area">
                    <FontAwesomeIcon
                      icon={faXmark}
                      onClick={closeMovieModal}
                      size="xl"
                      className="cancel-button"
                    />
                    <div className="information-sub-area">
                      <div className="image-container">
                        <img
                          src={
                            selectedMovie.Poster === "N/A"
                              ? genericbanner
                              : selectedMovie.Poster
                          }
                          alt="Poster"
                        />
                      </div>
                      <div className="text-container">
                        <h4>{selectedMovie.Title}</h4>
                        <span>
                          Type:
                          <span className="value"> {selectedMovie.Type}</span>
                        </span>
                        <span>
                          Year:
                          <span className="value"> {selectedMovie.Year}</span>
                        </span>
                        <span>
                          IMBD Id:
                          <span className="value"> {selectedMovie.imdbID}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {loading && (
                <div className="movie-modal-container">
                  <div
                    className="information-area"
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <FontAwesomeIcon
                      icon={faSearchengin}
                      size="2xl"
                      style={{ color: "gold", width: "75px", height: "75px" }}
                      beat
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          <b className="results">Total Results: {movieData.Search.length}</b>
        </div>
      )}
    </>
  );
}
