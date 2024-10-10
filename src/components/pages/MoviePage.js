import React, { useState, useEffect } from 'react';
import '../../styling/output.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLikes } from '../LikesContext';

function MoviePage() {
  const { id } = useParams();

  const [movieData, setMovieData] = useState([]);
  const [searchState, setSearchState] = useState('EMPTY');
  const { likes, handleSetLikes } = useLikes();
  const isLiked = likes.includes(id);

  const handleLikeClick = () => {
    handleSetLikes(id);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setSearchState('LOADING');
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=30cb209&i=${id}`
        );
        const data = await response.json();
        if (data.Response === 'True') {
          setMovieData(data);
          console.log(data);
          setSearchState('SUCCESS');
          return data.Search;
        } else {
          setMovieData(data);
          setSearchState('NOT_FOUND');
          return [];
        }
      } catch (error) {
        setSearchState('ERROR');
        throw new Error('Failed to fetch movies');
      }
    };
    fetchMovies();
  }, [id]);

  const likeIcon = (
    <button onClick={handleLikeClick} className="absolute right-0 w-[32px]">
      {isLiked ? (
        <img
          className="w-full"
          src="./../images/favorite_fill.svg"
          alt="liked"
        />
      ) : (
        <img className="w-full" src="./../images/favorite.svg" alt="addLike" />
      )}
    </button>
  );

  return (
    <div>
      <Link to={`/`}>
        <div className="relative">Go Back</div>
      </Link>

      <div
        id="moviesWrapper"
        className="mt-[16px] flex h-[580px] w-[770px] justify-center overflow-y-scroll rounded-lg border-2 border-light-5 bg-light-1 p-6 drop-shadow-16y"
      >
        {searchState === 'LOADING' && <div>loading...</div>}
        {searchState === 'SUCCESS' && movieData && (
          <div
            id="movieProfile"
            className="relative flex w-full flex-row justify-start align-middle"
          >
            <img
              src={movieData.Poster}
              alt="imdb"
              className="mr-6 w-[240px] self-start rounded-lg"
            />
            <div id="infos" className="flex flex-col">
              <h1 className="text-4xl font-bold text-yellow-500">
                {movieData.Title}
              </h1>
              <span className="font-mono text-xl text-yellow-500">
                ({movieData.Year})
              </span>
              <span className="">{movieData.imdbRating} on IMDB</span>
              <p className="text-s w-[400px] text-light-12">{movieData.Plot}</p>
            </div>

            {likeIcon}
          </div>
        )}
        {searchState === 'NOT_FOUND' && <div>Movie Data not found</div>}
        {searchState === 'ERROR' && <div>An error has ocurred.</div>}
      </div>
    </div>
  );
}

export default MoviePage;
