import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";

export default function Search() {
  return (
    <form className="search-container" id="search">
      <h2>Search for a Movie</h2>
      <div className="input-container">
        <div className="search-icon">
          <FontAwesomeIcon
            icon={faSearchengin}
            size="2xl"
            style={{ color: "gold" }}
          />
        </div>
        <input type="search" placeholder="What movie are you looking for?" />
      </div>
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
}
