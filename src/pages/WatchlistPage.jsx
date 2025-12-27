import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMoviesFromList, removeMovieFromList } from '../utils/localStorage';

function WatchlistPage() {
  const { listName } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const listConfig = {
    'want-to-watch': {
      title: 'Want to Watch',
      storageKey: 'WANT_TO_WATCH',
      color: 'blue'
    },
    'watched': {
      title: 'Watched',
      storageKey: 'WATCHED',
      color: 'green'
    },
    'favorites': {
      title: 'Favorites',
      storageKey: 'FAVORITES',
      color: 'red'
    }
  };

  const currentList = listConfig[listName];

  useEffect(() => {
    if (currentList) {
      setMovies(getMoviesFromList(currentList.storageKey));
    }
  }, [listName]);

  const handleRemove = (imdbID) => {
    if (currentList) {
      removeMovieFromList(currentList.storageKey, imdbID);
      setMovies(getMoviesFromList(currentList.storageKey));
    }
  };

  const handleMovieClick = (imdbID) => {
    navigate(`/movie/${imdbID}`);
  };

  if (!currentList) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-red-600 text-lg">Invalid list</p>
      </div>
    );
  }

  const colorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700 border-blue-200',
    green: 'bg-green-600 hover:bg-green-700 border-green-200',
    red: 'bg-red-600 hover:bg-red-700 border-red-200'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          {currentList.title} ({movies.length} movies)
        </h1>
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to Home
        </button>
      </div>

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div 
              key={movie.imdbID}
              className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition"
            >
              <div 
                onClick={() => handleMovieClick(movie.imdbID)}
                className="cursor-pointer"
              >
                <div className="aspect-[2/3] bg-gray-200 flex items-center justify-center">
                  {movie.poster !== 'N/A' ? (
                    <img 
                      src={movie.poster} 
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                    </svg>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate text-sm">
                    {movie.title}
                  </h3>
                  <p className="text-gray-600 text-xs">{movie.year}</p>
                </div>
              </div>
              <div className="px-4 pb-4">
                <button
                  onClick={() => handleRemove(movie.imdbID)}
                  className="w-full bg-red-500 text-white py-2 px-3 rounded hover:bg-red-600 transition text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
          </svg>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No movies yet!</h2>
          <p className="text-gray-600 mb-6">Start searching to add movies to your {currentList.title} list.</p>
          <button
            onClick={() => navigate('/search')}
            className={`text-white px-6 py-3 rounded-lg transition font-medium ${colorClasses[currentList.color]}`}
          >
            Search Movies
          </button>
        </div>
      )}
    </div>
  );
}

export default WatchlistPage;