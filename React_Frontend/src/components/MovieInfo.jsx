import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import genericbanner from "../assets/generic_banner.png";
import { useMovieData } from "../Context";
import { useMovieData2 } from "../Context";
import axios from "axios";
import BASE_URL from "../Config"; // Import the BASE_URL

export default function MovieInfo() {
  const { movieData } = useMovieData(); // Access the movieData State from context
  const [selectedMovie, setSelectedMovie] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMovieTitle, setSelectedMovieTitle] = useState(""); // New state for selected movie title
  const selectedMovieRef = useRef();
  // const apiKey = "fde9193e";
  const buttonRef = useRef();

  const { movieData2 } = useMovieData2(); //Access movieData2 state from context
  const { setMovieData2 } = useMovieData2(); // Access the setMovieData2 function from context
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const openMovieModal = (movie) => {
     // Check if the user is connected to the internet or not
     if (!isOnline) {
      alert("No internet connection. Please check your network and try again.");
      return;
    }

    setLoading(true);
    setSelectedMovieTitle(movie.title); // Update the selected movie title

    let countdown = 3; // Set 3 seconds countdown for displaying information
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
          alert(
            "A remote server error occured😢, please refresh and try again🙏. "
          );
          console.log("A remote server error occurred.");
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

     // Check if the user is connected to the internet or not
     if (!isOnline) {
      alert("No internet connection. Please check your network and try again.");
      return;
    }

    // HANDLE API REQUESTS FOR SUBMITTING TITLE
    try {
      // const encodedTitle = encodeURIComponent(selectedMovieTitle);
      // const response = await axios.get(
      //   `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodedTitle}`
      // ); // OLD CODE
      const response = await axios.get(`${BASE_URL}/movie-details?t=${selectedMovieTitle}`); //NEW CODE
      if (response.data.response === "True") {
        setMovieData2(response.data); // Set the second movie data to be displayed.
        console.log(response.data);
      } else if (response.data.response === "False") {
        setMovieData2(response.data);
        alert("An error occurred, please refresh and try again later!");
        closeMovieModal();
        console.log(response.data);
      } else {
        alert(
          "A network error had occurred, please refesh and try again later!"
        );
        window.location.reload();
        console.log(response.data);
      }
    } catch (error) {
      // Log the error and inform the user 
      if (error.isAxiosError && !isOnline) {
        // Network error
        console.log("1st Error")
        console.error(error)
        alert("Network error. Please check your network connection and try again.");
        // Reset the movie data state
        setMovieData2(false);
      } else {
        // General Error
        console.log("2nd Error")
        console.error(error)
        alert("An unexpected error occurred. Please try again.");
        // Reset the movie data state
        setMovieData2(false);
      }
    }
  };

  return (
    <>
      {movieData && movieData.search && movieData.search.length > 0 && (
        <div className="movieinfo-container">
          <h2>Search Results</h2>
          {movieData.search.map((result, index) => (
            <div className="sub-container" key={index}>
              <form
                className="movie-list"
                title="Click to see more information"
                onSubmit={handleSubmit}
              >
                <span className="title" onClick={() => openMovieModal(result)}>
                  {result.title}
                </span>
                <span onClick={() => openMovieModal(result)}>
                  Type:
                  <span className="value"> {result.type}</span>
                </span>
                <span onClick={() => openMovieModal(result)}>
                  Year:
                  <span className="value"> {result.year}</span>
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
                      <h3>{selectedMovie.title}</h3>
                    </div>
                    <div className="information-sub-area">
                      <div className="image-container">
                        <img
                          src={
                            selectedMovie.poster === "N/A"
                              ? genericbanner
                              : selectedMovie.poster
                          }
                          alt="Poster"
                        />
                      </div>
                      <div className="text-container-wrapper">
                        <div className="text-container">
                          <span>
                            Plot:
                            <span className="value"> {movieData2.plot}</span>
                          </span>
                          <span>
                            Released:
                            <span className="value">
                              {" "}
                              {movieData2.released}
                            </span>
                          </span>
                          <span>
                            Genre:
                            <span className="value"> {movieData2.genre}</span>
                          </span>
                          <span>
                            Type:
                            <span className="value"> {selectedMovie.type}</span>
                          </span>
                          <span>
                            Length:
                            <span className="value"> {movieData2.runtime}</span>
                          </span>
                          <span>
                            Director:
                            <span className="value">
                              {" "}
                              {movieData2.director}
                            </span>
                          </span>
                          <span>
                            Writer(s):
                            <span className="value"> {movieData2.writer}</span>
                          </span>
                          <span>
                            Actors:
                            <span className="value"> {movieData2.actors}</span>
                          </span>
                          <span>
                            Language:
                            <span className="value">
                              {" "}
                              {movieData2.language}
                            </span>
                          </span>
                          <span>
                            Country:
                            <span className="value"> {movieData2.country}</span>
                          </span>
                          <span>
                            Awards:
                            <span className="value"> {movieData2.awards}</span>
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
                              {movieData2.boxOffice}
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
          <b className="results">Total Results: {movieData.search.length}</b>
        </div>
      )}
    </>
  );
}
