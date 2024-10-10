import React, { useState, useEffect } from 'react';
import '../../styling/output.css';
import SearchBar from '../SearchBar';
import MovieGrid from '../MovieGrid';

function HomePage({ apiKey, query, setQuery }) {
  const [movieList, setMovieList] = useState([]);
  const [searchState, setSearchState] = useState('EMPTY');
  const handleInputChange = (word) => {};

  const handleSubmit = async (e) => {
    setQuery(e);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setSearchState('LOADING');
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=30cb209&s=${query}`
        );
        const data = await response.json();
        if (data.Response === 'True') {
          setMovieList(data.Search);
          setSearchState('SUCCESS');
          return data.Search;
        } else {
          setMovieList(data.Search);
          setSearchState('NOT_FOUND');
          return [];
        }
      } catch (error) {
        setSearchState('ERROR');
        throw new Error('Failed to fetch movies');
      }
    };
    query ? fetchMovies() : setSearchState('EMPTY');
  }, [query, apiKey]);

  return (
    <>
      <div className="">
        <SearchBar
          key="search-bar"
          {...{
            query,
            handleSubmit,
            handleInputChange,
            movieList
          }}
        />
        <MovieGrid key="movie-grid" {...{ movieList, searchState }} />
      </div>
    </>
  );
}

export default HomePage;
