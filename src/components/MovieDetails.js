import React, { useState } from 'react';

function MovieDetails({ movieData }) {
  //movieData = false; //test loading appearance
  const { Poster, Title, Year, Plot, Writer, Director, Actors, imdbID, imdbVotes, imdbRating, Genre } = movieData || {};

  const [imgLoad, setImgLoad] = useState(true);

  const handleIMDBClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`https://www.imdb.com/title/${imdbID}/`, '_blank');
  };

  const genres = (
    <div className="mb-6 mt-4 flex flex-row">
      {Genre?.split(', ').map((g) => (
        <div
          className="mr-1 rounded-2xl border border-yellow-500 px-[8px] py-[4px] text-center text-yellow-500"
          key={g}
        >
          {g}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="mr-6 flex w-[240px] flex-col overflow-hidden">
        {imgLoad && Poster ? (
          <img src={Poster} alt="imdb" className="w-fill self-start rounded-lg" onError={() => setImgLoad(false)} />
        ) : (
          <div className="flex h-[350px] w-full items-center justify-center rounded-lg border-2 border-light-5 bg-light-6"></div>
        )}
        <div
          id="rating"
          className="mt-8 flex cursor-pointer items-baseline justify-between rounded-lg bg-yellow-500 px-[16px] py-[12px] text-center text-white drop-shadow-16y"
          onClick={handleIMDBClick}
        >
          <img className="h-[16px]" src="../images/imdb.svg" alt="imdb" />
          <span className="flex">
            <span className="text-center text-[18px] font-bold text-light-12">{imdbRating} </span>
            <span className="align-text-top text-[10px] leading-none text-light-12"> ({imdbVotes} votes)</span>
          </span>
        </div>
      </div>

      <section id="info" className="flex w-[380px] flex-col">
        <section id="profile">
          <h1 className="text-4xl font-bold text-yellow-500">{Title ? Title : 'Loading'}</h1>
          <span className="font-mono text-3xl text-yellow-500">({Year ? Year : '----'})</span>
        </section>

        <section id="details" className="mt-10 min-h-[160px] rounded-lg border-2 border-light-6 bg-light-1 px-4 py-2">
          {genres}
          {movieData && (
            <>
              <div className="movie-infos">
                <span className="font-bold">Director: </span>
                {Director}
              </div>
              <div className="movie-infos">
                <span className="font-bold">Writers: </span>
                {Writer}
              </div>
              <div className="movie-infos">
                <span className="font-bold">Cast: </span>
                {Actors}
              </div>
            </>
          )}
        </section>

        <p className="text-s mt-6 w-[400px] leading-4 text-light-12">{Plot ? Plot : 'Loading Plot...'}</p>
      </section>
    </>
  );
}

export default MovieDetails;
