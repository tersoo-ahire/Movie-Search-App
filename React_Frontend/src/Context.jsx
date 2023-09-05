import React, { createContext, useContext, useState } from "react";

const MovieDataContext = createContext();
const MovieData2Context = createContext();

export const useMovieData = () => {
  return useContext(MovieDataContext);
};

export const useMovieData2 = () => {
  return useContext(MovieData2Context);
};

export const MovieDataProvider = ({ children }) => {
  const [movieData, setMovieData] = useState(false);

  return (
    <MovieDataContext.Provider value={{ movieData, setMovieData }}>
      {children}
    </MovieDataContext.Provider>
  );
};

export const MovieDataProvider2 = ({ children }) => {
  const [movieData2, setMovieData2] = useState(false);

  return (
    <MovieData2Context.Provider value={{ movieData2, setMovieData2 }}>
      {children}
    </MovieData2Context.Provider>
  );
};
