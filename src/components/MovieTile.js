import React, { useState } from 'react';
import '../styling/output.css';
import { Link } from 'react-router-dom';
import { useLikes } from './LikesContext';

function MovieTile({ title, poster, imdbID, year }) {
  const [imgLoad, setImgLoad] = useState(true);
  const { likes, handleSetLikes } = useLikes();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    handleSetLikes(imdbID);
  };

  const likeIcon = (
    <button
      onClick={handleClick}
      className="absolute bottom-0 right-0 box-content w-[24px] p-2"
    >
      {likes.includes(imdbID) ? (
        <img
          className="w-full"
          src="./../images/favorite_fill.svg"
          alt="liked"
        />
      ) : (
        <img
          className="w-full opacity-50 saturate-0 hover:opacity-100 hover:saturate-100"
          src="./../images/favorite.svg"
          alt="addLike"
        />
      )}
    </button>
  );

  return (
    <>
      <Link to={`/movie/${imdbID}`}>
        <div
          key={imdbID}
          className="hover:drop-shadow-yellow-16y relative flex h-[300px] w-[160px] cursor-pointer flex-col flex-wrap items-center justify-start rounded-lg bg-light-1 p-2 text-center opacity-90 outline outline-2 outline-light-6 drop-shadow-2y transition-all hover:outline-2 hover:outline-yellow-300"
        >
          {imgLoad ? (
            <img
              src={poster}
              alt={title}
              className="w-[140px] rounded-lg"
              onError={() => setImgLoad(false)}
            />
          ) : (
            <div className="w-[140px] rounded-lg">Image Did not load</div>
          )}
          <h2 className="my-2">{title}</h2>
          <p className="font-mono text-light-10">{year}</p>
          <div href={`https://www.imdb.com/title/${imdbID}/`}>IMDB</div>

          {likeIcon}
        </div>
      </Link>
    </>
  );
}

export default MovieTile;
