import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { useMovieData } from "../Context";
import BASE_URL from "../Config"; // Import the BASE_URL

export default function Search({ onSearchSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    response: "json",
  });

  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setMovieData } = useMovieData(); // Access the setMovieData function from context
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

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
    console.log(formData.title);

    // Check if the user is connected to the internet or not
    if (!isOnline) {
      alert("No internet connection. Please check your network and try again.");
      return;
    }

    // INSERT CODE FOR HANDLING API REQUEST HERE
    try {
      const encodedTitle = encodeURIComponent(formData.title);
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodedTitle}`,
        {
          response: formData.response,
        }
      ); // OLD CODE
      // const response = await axios.get(
      //   `${BASE_URL}/search?s=${formData.title}`
      // ); // NEW CODE
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
          console.log("Message:", response.data);

          if (countdown === 0) {
            clearInterval(countdownInterval);
            closeShowError();
          }
        }, 1000);
      }
    } catch (error) {
      // Log the error and inform the user
      if (error.isAxiosError && !isOnline) {
        // Network error
        console.log("1st Error");
        console.error(error);
        alert(
          "Network error. Please check your network connection and try again."
        );
        // Reset the movie data state
        setMovieData(false);
      } else {
        // General Error
        console.log("2nd Error");
        console.error(error);
        alert("An unexpected error occurred. Please try again.");
        // Reset the movie data state
        setMovieData(false);
      }
    }
    setFormData({ title: "" });
    setLoading(false);
  };

  // const test = async () => {
  //   let testvalue = "Spiderman";

  //   try {
  //     const response = await axios.get(`${BASE_URL}/search?s=${testvalue}`);
  //     if (response.data.Response === True) {
  //       console.log(response.status);
  //       console.log(response.data);
  //     } else {
  //       console.log(response.status);
  //       console.log(response.data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
          placeholder="What movie are you looking for?"
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
      {/* <button onClick={test}>TEST BUTTON</button> */}
    </form>
  );
}
