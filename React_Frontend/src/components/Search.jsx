import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { useMovieData } from "../Context";

export default function Search({ onSearchSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    response: "json",
  });

  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setMovieData } = useMovieData(); // Access the setMovieData function from context

  const openShowError = () => {
    setShowError(true);
  };

  const closeShowError = () => {
    setShowError(false);
  };

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const apiKey = "fde9193e";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // INSERT CODE FOR HANDLING API REQUEST HERE
    try {
      const encodedTitle = encodeURIComponent(formData.title);
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodedTitle}`,
        {
          response: formData.response,
        }
      );
      if (response.data.Response === "True") {
        setMovieData(response.data); // Set the movie data to be displayed.
        let countdown = 1; // Set 1 second countdown on error message
        const countdownInterval = setInterval(() => {
          countdown--;
          if (countdown === 0) {
            clearInterval(countdownInterval);
            onSearchSuccess(); // Call the onSearchSuccess callback;
          }
        }, 1000);
      } else {
        setMovieData(false); // Reset the movie data state
        let countdown = 5; // Set 5 second countdown on error message
        const countdownInterval = setInterval(() => {
          countdown--;
          setErrorMessage("No movies were found");
          openShowError();

          if (countdown === 0) {
            clearInterval(countdownInterval);
            closeShowError();
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error); // Log the error object
      // Reset the movie data state
      setMovieData(false);
    }
    setFormData({ title: "" });
    setLoading(false);
  };

  return (
    <form className="search-container" id="search" onSubmit={handleSubmit}>
      <h2>Search for a Movie</h2>
      <div className="search-input-container">
        <div className="search-icon">
          <FontAwesomeIcon
            icon={faSearchengin}
            size="2xl"
            style={{ color: "gold" }}
          />
        </div>
        <input
          type="search"
          placeholder="What movie title are you looking for?"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      {loading && (
        <FontAwesomeIcon
          icon={faSearchengin}
          size="2xl"
          style={{ color: "gold" }}
          beat
        />
      )}
      {showError && <p className="error-message">{errorMessage}</p>}
      <div className="button-container">
        <p>
          By using our service you are accepting our{" "}
          <a
            href="#"
            style={{
              color: "#58d898",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            {" "}
            terms of service.
          </a>
        </p>
        <button type="submit" className="button">
          Submit
        </button>
      </div>
    </form>
  );
}
