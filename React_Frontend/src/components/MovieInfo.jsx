import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import genericbanner from "../assets/generic_banner.png";
import { useMovieData } from "../Context";
import { useMovieData2 } from "../Context";
import axios from "axios";

export default function MovieInfo() {
  const { movieData } = useMovieData(); // Access the movieData State from context
  const [selectedMovie, setSelectedMovie] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMovieTitle, setSelectedMovieTitle] = useState(""); // New state for selected movie title
  const selectedMovieRef = useRef();
  const apiKey = "fde9193e";
  const buttonRef = useRef();

  const { setMovieData2 } = useMovieData2(); // Access the setMovieData2 function from context

  const openMovieModal = (movie) => {
    setLoading(true);
    setSelectedMovieTitle(movie.Title); // Update the selected movie title

    let countdown = 2; // Set 1 second countdown for displaying information
    const countdownInterval = setInterval(() => {
      countdown--;

      if (countdown === 0) {
        clearInterval(countdownInterval);
        setLoading(false);
        // Programmatically click the submit button
        buttonRef.current.click();
        setSelectedMovie(movie); // Show movie information once countdown ends
      }
    }, 1000);
  };

  const closeMovieModal = () => {
    setSelectedMovie(false);
  };

  const handleModalClick = (event) => {
    if (
      selectedMovieRef.current &&
      !selectedMovieRef.current.contains(event.target)
    ) {
      closeMovieModal();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit title:", selectedMovieTitle);

    // HANDLE API REQUESTS FOR TITLE
    try {
      const encodedTitle = encodeURIComponent(selectedMovieTitle);
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodedTitle}`
      );
      if (response.data.Response === "True") {
        setMovieData2(response.data); // Set the second movie data to be displayed.
        console.log(response.status);
        console.log(response.data);
      } else {
        setMovieData2(false); // Reset the second movie data state
        alert("An error occurred, please try again later!")
      }
    } catch (error) {
      console.error("Error:", error); // Log the error object
      // Reset the second movie data state
      setMovieData2(false);
    }
  };

  return (
    <>
      {movieData && movieData.Search && movieData.Search.length > 0 && (
        <div className="movieinfo-container">
          <h2>Search Results</h2>
          {movieData.Search.map((result, index) => (
            <div className="sub-container" key={index}>
              <form
                className="movie-list"
                title="Click to see more information"
                onSubmit={handleSubmit}
              >
                <span className="title" onClick={() => openMovieModal(result)}>
                  {result.Title}
                </span>
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
                <button
                  type="submit"
                  ref={buttonRef}
                  style={{ display: "none" }}
                >
                  View
                </button>
              </form>
              {selectedMovie && (
                <div
                  className="movie-modal-container"
                  onClick={handleModalClick}
                >
                  <div className="information-area" ref={selectedMovieRef}>
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
