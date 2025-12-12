import { useState, useEffect } from 'react';
import { searchMovies } from '../services/api';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';

function SearchResults() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movieId) => {
    console.log('Movie clicked:', movieId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SearchBar 
        onSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Searching...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard 
              key={movie.imdbID} 
              movie={movie}
              onMovieClick={handleMovieClick}
            />
          ))}
        </div>
      )}

      {!loading && !error && movies.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No movies found. Try another search!</p>
        </div>
      )}
    </div>
  );
}

export default SearchResults;