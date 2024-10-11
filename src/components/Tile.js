import React, { useState } from 'react';
import '../styling/output.css';
import { Link } from 'react-router-dom';
import { useLikes } from './context/LikesContext';

function Tile({ title, poster, imdbID, year }) {
  const [imgLoad, setImgLoad] = useState(true);
  const { likes, handleSetLikes } = useLikes();

  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleSetLikes(imdbID);
  };

  const handleIMDBClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`https://www.imdb.com/title/${imdbID}/`, '_blank');
  };

  const likeIcon = (
    <button onClick={handleLikeClick} className="absolute bottom-0 right-0 box-content w-[24px] p-2">
      {likes.includes(imdbID) ? (
        <img className="w-full" src="./../images/favorite_fill.svg" alt="liked" />
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
          className="hover:drop-shadow-yellow-16y relative flex h-[312px] w-[160px] cursor-pointer flex-col flex-wrap items-center justify-start rounded-lg bg-light-1 p-2 text-center opacity-90 outline outline-2 outline-light-6 drop-shadow-2y transition-all hover:outline-2 hover:outline-yellow-300"
        >
          <div className="flex h-[212px] w-[140px] overflow-hidden">
            {imgLoad && poster ? (
              <img
                src={poster}
                alt={title}
                className="relative min-h-[100%] rounded-lg"
                onError={() => setImgLoad(false)}
              />
            ) : (
              <p className="flex h-full w-full justify-center rounded-lg border-2 border-light-5 bg-light-5 align-middle">
                <img src="./images/broken.svg" alt="broken" />
              </p>
            )}
          </div>
          <h2 className="mt-2 overflow-hidden text-[14px] leading-4">
            {title?.length > 40 ? title.slice(0, 33) + '...' : title}
          </h2>
          <p className="mt-1 font-mono text-light-10">({year ? year : '----'})</p>
          <div onClick={handleIMDBClick} className="absolute bottom-0 left-0 box-content w-[24px] p-2">
            <img
              src="./images/open.svg"
              className="w-full opacity-50 saturate-0 hover:opacity-100 hover:saturate-100"
              alt="imDB"
            />
          </div>

          {likeIcon}
        </div>
      </Link>
    </>
  );
}

export default Tile;
