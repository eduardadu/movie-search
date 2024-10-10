import React, { useState, useEffect } from 'react';
import QuerySuggestions from './QuerySuggestions';

function SearchBar({ query, handleSubmit, handleInputChange }) {
  const [suggestions, setSuggestions] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query);

  const querySuggestions = () =>
    suggestionsList.length > 0 && (
      <QuerySuggestions
        suggestions={suggestionsList}
        handleClick={handleSubmit}
      />
    );

  const searchSubmit = (e) => {
    e.preventDefault();
    setSuggestions(false);
    handleSubmit(searchQuery);
  };

  const searchChange = (e) => {
    setSearchQuery(e.target.value);
    setSuggestions(true);
    handleInputChange(e.target.value);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=30cb209&s=${searchQuery}`
        );
        const data = await response.json();
        if (data.Response === 'True') {
          setSuggestionsList(data.Search);
          return data.Search;
        } else {
          setSuggestionsList([]);
          return [];
        }
      } catch (error) {
        setSuggestionsList([]);
        throw new Error('Failed to fetch movies');
      }
    };
    fetchMovies();
  }, [searchQuery]);

  return (
    <form
      id="searchForm"
      className="relative w-[460px]"
      onSubmit={searchSubmit}
    >
      <input
        placeholder="Search for movie title..."
        value={searchQuery}
        onChange={searchChange}
        className="peer z-20 h-[40px] w-full rounded-lg border-2 border-light-5 bg-light-1 px-[16px] py-[12px] transition focus:border-2 focus:border-yellow-300"
        onFocus={() => setSuggestions(true)}
        onBlur={() => setTimeout(() => setSuggestions(false), 100)}
      />
      {suggestions && searchQuery && querySuggestions()}
      <button
        type="submit"
        className="absolute right-0 top-0 z-10 h-full rounded bg-light-5 px-[12px] transition peer-focus:bg-yellow-300"
      >
        <img src="./images/search.svg" alt="search" />
      </button>
    </form>
  );
}

export default SearchBar;
