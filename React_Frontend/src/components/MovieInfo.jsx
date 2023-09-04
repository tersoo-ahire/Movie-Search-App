import React from "react";
// import genericbanner from "../assets/generic_banner.png";
import { useMovieData } from "../Context";

export default function MovieInfo() {
  const { movieData } = useMovieData(); // Access the movieData State from context

  return (
    <>
      {movieData && movieData.Search && movieData.Search.length > 0 && (
        <div className="movieinfo-container">
          <h2>Search Results</h2>
          {movieData.Search.map((result, index) => (
            <div className="sub-container" key={index}>
              <div className="movie-list">
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
            </div>
          ))}
          <b className="results">Total Results: {movieData.Search.length}</b>
        </div>
      )}
    </>
  );
}
