import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { useMovieData } from "../Context";

export default function Search() {
  const [formData, setFormData] = useState({
    title: "",
    response: "json",
  });

  const [loading, setLoading] = useState(false);
  const { setMovieData } = useMovieData(); // Access the setMovieData function from context

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
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodedTitle}`,
        {
          response: formData.response,
        }
      );
      if (response.data.Response === "True") {
        // Handle the case when the response contains valid movie data
        console.log(response.data); // Access the search results here
        setMovieData(response.data); // Set the movie data to be displayed.
      } else {
        // Handle the case when no movies are found
        console.log("No movies found.");
        console.log(response.status);
        console.log(response.data);
        // Reset the movie data state
        setMovieData(false);
      }
    } catch (error) {
      console.error("Error Status:", error.status);
      console.error("Error Response", error.response);
      console.error("Error Data:", error.data);
      // Reset the movie data state
      setMovieData(false);
    }
    setFormData({ title: "",});
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
