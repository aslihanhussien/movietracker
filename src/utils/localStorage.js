const STORAGE_KEYS = {
  WANT_TO_WATCH: 'movietracker_want_to_watch',
  WATCHED: 'movietracker_watched',
  FAVORITES: 'movietracker_favorites'
};

export const getMoviesFromList = (listName) => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS[listName]);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

export const addMovieToList = (listName, movie) => {
  try {
    const movies = getMoviesFromList(listName);
    const exists = movies.find(m => m.imdbID === movie.imdbID);
    
    if (!exists) {
      movies.push({
        imdbID: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
        genre: movie.Genre || '',
        addedAt: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_KEYS[listName], JSON.stringify(movies));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding to localStorage:', error);
    return false;
  }
};

export const removeMovieFromList = (listName, imdbID) => {
  try {
    const movies = getMoviesFromList(listName);
    const filtered = movies.filter(m => m.imdbID !== imdbID);
    localStorage.setItem(STORAGE_KEYS[listName], JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

export const isMovieInList = (listName, imdbID) => {
  const movies = getMoviesFromList(listName);
  return movies.some(m => m.imdbID === imdbID);
};

export const getAllMoviesCount = () => {
  return {
    wantToWatch: getMoviesFromList('WANT_TO_WATCH').length,
    watched: getMoviesFromList('WATCHED').length,
    favorites: getMoviesFromList('FAVORITES').length
  };
};

export const getGenreStats = () => {
  const watched = getMoviesFromList('WATCHED');
  const genreCount = {};

  watched.forEach(movie => {
    if (movie.genre) {
      const genres = movie.genre.split(',').map(g => g.trim());
      genres.forEach(genre => {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      });
    }
  });

  return Object.entries(genreCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
};