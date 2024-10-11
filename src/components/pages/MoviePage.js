import React, { useState, useEffect } from 'react';
import '../../styling/output.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLikes } from '../context/LikesContext';
import { fetchMoviesByID } from '../../helpers/fetch';
import MovieDetails from '../MovieDetails';

function MoviePage() {
  const { id } = useParams();

  const [searchState, setSearchState] = useState('EMPTY');
  const { likes, handleSetLikes } = useLikes();
  const isLiked = likes.includes(id);
  const [movieData, setMovieData] = useState(null);

  const handleLikeClick = () => {
    handleSetLikes(id);
  };

  useEffect(() => {
    fetchMoviesByID(id, setSearchState, setMovieData);
  }, [id]);

  return (
    <div>
      <Link to={`/`} id="return">
        <div className=":bg-yellow-400 relative flex h-[40px] w-[140px] flex-row rounded-lg border-2 border-light-5 bg-light-1 px-[16px] py-[8px] hover:border-yellow-300 hover:bg-yellow-300">
          <img className="w-[24px]" src="../images/arrow_back.svg" alt="arrowBack" />
          <button className="mx-2 text-[1rem] leading-none text-light-10">Return</button>
        </div>
      </Link>

      <div
        id="moviesWrapper"
        className="mt-[16px] flex h-[580px] w-[770px] justify-center overflow-y-scroll rounded-lg border-2 border-light-5 bg-light-1 p-6 drop-shadow-16y"
      >
        {searchState === 'LOADING' && (
          <div id="movieProfile" className="align-middl relative flex w-full flex-row justify-start">
            <MovieDetails />
            <button className="absolute right-0 w-[32px]" id="like"></button>
          </div>
        )}
        {searchState === 'SUCCESS' && movieData && (
          <div id="movieProfile" className="align-middl relative flex w-full flex-row justify-start">
            <MovieDetails movieData={movieData} />
            <button onClick={handleLikeClick} className="absolute right-0 w-[32px]" id="like">
              <img
                className="w-full"
                src={isLiked ? './../images/favorite_fill.svg' : './../images/favorite.svg'}
                alt={isLiked ? 'liked' : 'addLike'}
              />
            </button>
          </div>
        )}
        {searchState === 'NOT_FOUND' && (
          <div className="mt-8 text-xl text-gray-400">We could not find this movie :(</div>
        )}
        {searchState === 'ERROR' && (
          <div className="mt-8 text-xl text-gray-400">An error has ocurred. Please try again.</div>
        )}
      </div>
    </div>
  );
}

export default MoviePage;
