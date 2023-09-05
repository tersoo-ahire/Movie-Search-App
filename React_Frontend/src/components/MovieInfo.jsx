import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons";
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

  const { movieData2 } = useMovieData2(); //Access movieData2 state from context
  const { setMovieData2 } = useMovieData2(); // Access the setMovieData2 function from context

  const openMovieModal = (movie) => {
    setLoading(true);
    setSelectedMovieTitle(movie.Title); // Update the selected movie title

    let countdown = 2; // Set 2 seconds countdown for displaying information
    const countdownInterval = setInterval(() => {
      countdown--;

      if (countdown === 0) {
        clearInterval(countdownInterval);
        setLoading(false);
        // Check if buttonRef.current is not null before clicking
        if (buttonRef.current) {
          // Programmatically click the submit button
          buttonRef.current.click();
          setSelectedMovie(movie); // Show movie information once countdown ends
        } else {
          alert("A remote server error occured😢, please refresh and try again🙏. ")
          window.location.reload();
        }
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

    // HANDLE API REQUESTS FOR SUBMITTING TITLE
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
        alert("An error occurred, please try again later!");
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
                <span onClick={() => openMovieModal(result)}>
                  Type:
                  <span className="value"> {result.Type}</span>
                </span>
                <span onClick={() => openMovieModal(result)}>
                  Year:
                  <span className="value"> {result.Year}</span>
                </span>
                <span onClick={() => openMovieModal(result)}>
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
                    <div className="top-area">
                      <div className="icon-container">
                        <FontAwesomeIcon
                          icon={faRectangleXmark}
                          onClick={closeMovieModal}
                          size="2xl"
                        />
                      </div>
                      <h3>{selectedMovie.Title}</h3>
                    </div>
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
                      <div className="text-container-wrapper">
                        <div className="text-container">
                          <span>
                            Plot:
                            <span className="value"> {movieData2.Plot}</span>
                          </span>
                          <span>
                            Released:
                            <span className="value">
                              {" "}
                              {movieData2.Released}
                            </span>
                          </span>
                          <span>
                            Genre:
                            <span className="value"> {movieData2.Genre}</span>
                          </span>
                          <span>
                            Type:
                            <span className="value"> {selectedMovie.Type}</span>
                          </span>
                          <span>
                            Length:
                            <span className="value"> {movieData2.Runtime}</span>
                          </span>
                          <span>
                            Director:
                            <span className="value">
                              {" "}
                              {movieData2.Director}
                            </span>
                          </span>
                          <span>
                            Writer(s):
                            <span className="value"> {movieData2.Writer}</span>
                          </span>
                          <span>
                            Actors:
                            <span className="value"> {movieData2.Actors}</span>
                          </span>
                          <span>
                            Language:
                            <span className="value">
                              {" "}
                              {movieData2.Language}
                            </span>
                          </span>
                          <span>
                            Country:
                            <span className="value"> {movieData2.Country}</span>
                          </span>
                          <span>
                            Awards:
                            <span className="value"> {movieData2.Awards}</span>
                          </span>
                          <span>
                            IMDB Rating:
                            <span className="value">
                              {" "}
                              {movieData2.imdbRating}
                            </span>
                          </span>
                          <span>
                            IMDB Votes:
                            <span className="value">
                              {" "}
                              {movieData2.imdbVotes}
                            </span>
                          </span>
                          <span>
                            IMBD Id:
                            <span className="value">
                              {" "}
                              {selectedMovie.imdbID}
                            </span>
                          </span>
                          <span>
                            Box Office:
                            <span className="value">
                              {" "}
                              {movieData2.BoxOffice}
                            </span>
                          </span>
                        </div>
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
