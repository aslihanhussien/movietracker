import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../services/api';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }
  }, [searchParams]);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchMovies(query);
      setMovies(results);
      setSearchParams({ q: query });
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = (query) => {
    handleSearch(query);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SearchBar 
        onSearch={onSearch}
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