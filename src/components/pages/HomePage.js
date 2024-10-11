import React, { useState, useEffect } from 'react';
import '../../styling/output.css';
import SearchBar from '../SearchBar';
import Grid from '../Grid';
import { fetchMoviesByTitle } from '../../helpers/fetch';

function HomePage({ apiKey, query, setQuery }) {
  const [movieList, setMovieList] = useState([]);
  const [searchState, setSearchState] = useState('EMPTY');
  const handleInputChange = (word) => {};

  const handleSubmit = async (e) => {
    setQuery(e);
  };

  useEffect(() => {
    query ? fetchMoviesByTitle(query, setSearchState, setMovieList) : setSearchState('EMPTY');
  }, [query, apiKey]);

  return (
    <>
      <div>
        <SearchBar
          key="search-bar"
          {...{
            query,
            handleSubmit,
            handleInputChange,
            movieList
          }}
        />
        <Grid key="movie-grid" {...{ movieList, searchState }} />
      </div>
    </>
  );
}

export default HomePage;
