import React, { useState } from 'react';
import '../styling/output.css';

function QuerySuggestions({ suggestions, handleClick }) {
  return (
    <div className="peer-h-[0px] absolute top-8 z-10 w-[460px] rounded-b-lg border-x border-b border-light-5 bg-light-1 p-[16px] pb-[12px] transition peer-focus:border-x-2 peer-focus:border-b-2 peer-focus:border-yellow-300">
      {suggestions?.slice(0, 5).map((movie) => (
        <div
          className="h-auto py-[8px] text-light-10"
          onClick={() => handleClick(movie.Title)}
          key={movie.imdbID}
        >
          {movie.Title}
        </div>
      ))}
    </div>
  );
}

export default QuerySuggestions;
