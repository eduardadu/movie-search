import React from 'react';
import MovieTile from './MovieTile';

function MovieGrid({ movieList, searchState }) {
  const createMovieList = () =>
    movieList?.map((movie) => (
      <MovieTile
        title={movie.Title}
        poster={movie.Poster}
        imdbID={movie.imdbID}
        year={movie.Year}
        key={movie.imdbID}
      />
    ));

  const createDummyList = () =>
    movieList?.map((movie, index) => <MovieTile key={index} />);

  const searchResult = () => {
    switch (searchState) {
      case 'LOADING':
        return createDummyList();
      case 'SUCCESS':
        return createMovieList();
      case 'NOT_FOUND':
        return <div className="">No movies found :( Try another title</div>;
      case 'ERROR':
        return <div className="">An error ocurred. Please try again.</div>;
      default:
        return (
          <div className="mt-8 text-xl text-gray-400">
            Try to search for a title...
          </div>
        );
    }
  };

  return (
    <div
      id="moviesWrapper"
      className="mt-[16px] flex h-[580px] w-[770px] justify-center overflow-y-scroll rounded-lg border-2 border-light-5 bg-light-1 p-6 drop-shadow-16y"
    >
      <div
        id="moviesGrid"
        className="flex flex-row flex-wrap justify-start gap-[20px] align-middle"
      >
        {searchResult()}
      </div>
    </div>
  );
}

export default MovieGrid;
