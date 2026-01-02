import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import { addMovieToList, removeMovieFromList, isMovieInList } from '../utils/localStorage';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inWantToWatch, setInWantToWatch] = useState(false);
  const [inWatched, setInWatched] = useState(false);
  const [inFavorites, setInFavorites] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
        setInWantToWatch(isMovieInList('WANT_TO_WATCH', id));
        setInWatched(isMovieInList('WATCHED', id));
        setInFavorites(isMovieInList('FAVORITES', id));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleAddToList = (listName) => {
    if (!movie) return;

    const isInList = isMovieInList(listName, movie.imdbID);
    
    if (isInList) {
      removeMovieFromList(listName, movie.imdbID);
    } else {
      addMovieToList(listName, movie);
    }

    setInWantToWatch(isMovieInList('WANT_TO_WATCH', movie.imdbID));
    setInWatched(isMovieInList('WATCHED', movie.imdbID));
    setInFavorites(isMovieInList('FAVORITES', movie.imdbID));
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 text-lg">Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6 transition"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Search
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-200">
            {movie.Poster !== 'N/A' ? (
              <img 
                src={movie.Poster} 
                alt={movie.Title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-96">
                <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                </svg>
              </div>
            )}
          </div>

          <div className="md:w-2/3 p-8">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {movie.Title} ({movie.Year})
              </h1>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {movie.imdbRating}/10
                </span>
                <span>{movie.Runtime}</span>
                <span>{movie.Rated}</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Genre</h2>
              <p className="text-gray-700">{movie.Genre}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Plot</h2>
              <p className="text-gray-700 leading-relaxed">{movie.Plot}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Director</h2>
              <p className="text-gray-700">{movie.Director}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Cast</h2>
              <p className="text-gray-700">{movie.Actors}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Release Date</h2>
              <p className="text-gray-700">{movie.Released}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button 
                onClick={() => handleAddToList('WANT_TO_WATCH')}
                className={`flex-1 py-3 px-4 rounded-lg transition font-medium flex items-center justify-center gap-2 ${
                  inWantToWatch 
                    ? 'bg-blue-700 text-white' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {inWantToWatch ? '✓ ' : ''}Want to Watch
              </button>
              <button 
                onClick={() => handleAddToList('WATCHED')}
                className={`flex-1 py-3 px-4 rounded-lg transition font-medium flex items-center justify-center gap-2 ${
                  inWatched 
                    ? 'bg-green-700 text-white' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {inWatched ? '✓ ' : ''}Watched
              </button>
              <button 
                onClick={() => handleAddToList('FAVORITES')}
                className={`flex-1 py-3 px-4 rounded-lg transition font-medium flex items-center justify-center gap-2 ${
                  inFavorites 
                    ? 'bg-red-700 text-white' 
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {inFavorites ? '❤ ' : ''}Favorite
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;