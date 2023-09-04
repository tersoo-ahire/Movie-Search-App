import React from "react";
import { useMovieData } from "../Context";

export default function MovieInfo() {
  const movieData = useMovieData(); // Access the movieData from context

  console.log("Movie Title:", movieData.Title);
  console.log("Movie Plot:", movieData.Plot);

  return (
    <div>
      <h2>Title:{movieData.Title}</h2>
      <p>Plot:{movieData.Plot}</p>
      {/* Display other movie information */}
    </div>
  );
}
