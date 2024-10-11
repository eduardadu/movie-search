export const fetchMoviesByID = async (
  movieId,
  setSearchState,
  setMovieData
) => {
  setSearchState('LOADING');
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=30cb209&i=${movieId}`
    );
    const data = await response.json();
    if (data.Response === 'True') {
      console.log(data);
      setMovieData(data);
      setSearchState('SUCCESS');
    } else {
      setMovieData(null);
      setSearchState('NOT_FOUND');
    }
  } catch (error) {
    setSearchState('ERROR');
  }
};

export const fetchMoviesByTitle = async (
  query,
  setSearchState,
  setMovieList
) => {
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
    //throw new Error('Failed to fetch movies');
  }
};
