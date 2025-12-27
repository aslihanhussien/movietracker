import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMoviesCount } from '../utils/localStorage';

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [counts, setCounts] = useState({ wantToWatch: 0, watched: 0, favorites: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    setCounts(getAllMoviesCount());
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-2">
          Welcome to MovieTracker!
        </h1>
        <p className="text-gray-600 text-lg">
          Track your movie journey
        </p>
      </div>

      <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-16">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for movies..."
            className="w-full px-6 py-4 pr-32 text-lg border-2 border-blue-300 rounded-lg focus:border-blue-600 focus:outline-none"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Search
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-blue-200">
          <div className="flex items-center justify-center mb-3">
            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
            </svg>
          </div>
          <h3 className="text-center font-semibold text-gray-900 mb-2">Want to watch</h3>
          <p className="text-center text-3xl font-bold text-blue-600 mb-4">{counts.wantToWatch}</p>
          <button 
  onClick={() => navigate('/list/want-to-watch')}
  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
>
  View
</button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-green-200">
          <div className="flex items-center justify-center mb-3">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
          </div>
          <h3 className="text-center font-semibold text-gray-900 mb-2">Watched</h3>
          <p className="text-center text-3xl font-bold text-green-600 mb-4">{counts.watched}</p>
         <button 
  onClick={() => navigate('/list/watched')}
  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
>
  View
</button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-red-200">
          <div className="flex items-center justify-center mb-3">
            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
            </svg>
          </div>
          <h3 className="text-center font-semibold text-gray-900 mb-2">Favorites</h3>
          <p className="text-center text-3xl font-bold text-red-600 mb-4">{counts.favorites}</p>
          <button 
  onClick={() => navigate('/list/favorites')}
  className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-medium"
>
  View
</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;