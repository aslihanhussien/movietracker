const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
    const data = await response.json();
    
    if (data.Response === 'False') {
      throw new Error(data.Error);
    }
    
    return data.Search;
  } catch (error) {
    throw error;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
    const data = await response.json();
    
    if (data.Response === 'False') {
      throw new Error(data.Error);
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};