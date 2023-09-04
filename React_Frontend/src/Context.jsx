import React, { createContext, useContext, useState } from "react";

const MovieDataContext = createContext();

export const useMovieData = () => {
  return useContext(MovieDataContext);
};

export const MovieDataProvider = ({ children }) => {
  const [movieData, setMovieData] = useState(false);

  return (
    <MovieDataContext.Provider value={{ movieData, setMovieData }}>
      {children}
    </MovieDataContext.Provider>
  );
};
