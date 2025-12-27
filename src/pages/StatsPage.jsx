import { useState, useEffect } from 'react';
import { getAllMoviesCount, getGenreStats } from '../utils/localStorage';

function StatsPage() {
  const [counts, setCounts] = useState({ wantToWatch: 0, watched: 0, favorites: 0 });
  const [genreStats, setGenreStats] = useState([]);

  useEffect(() => {
    setCounts(getAllMoviesCount());
    setGenreStats(getGenreStats());
  }, []);

  const maxCount = genreStats.length > 0 ? genreStats[0][1] : 1;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Your Movie Stats</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-md p-8 border-2 border-blue-200">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
            </svg>
          </div>
          <h3 className="text-center font-semibold text-gray-900 mb-2 text-lg">Want to Watch</h3>
          <p className="text-center text-5xl font-bold text-blue-600 mb-2">{counts.wantToWatch}</p>
          <p className="text-center text-gray-600 text-sm">movies</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 border-2 border-green-200">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
          </div>
          <h3 className="text-center font-semibold text-gray-900 mb-2 text-lg">Watched</h3>
          <p className="text-center text-5xl font-bold text-green-600 mb-2">{counts.watched}</p>
          <p className="text-center text-gray-600 text-sm">movies</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 border-2 border-red-200">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
            </svg>
          </div>
          <h3 className="text-center font-semibold text-gray-900 mb-2 text-lg">Favorites</h3>
          <p className="text-center text-5xl font-bold text-red-600 mb-2">{counts.favorites}</p>
          <p className="text-center text-gray-600 text-sm">movies</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Genres</h2>
        
        {genreStats.length > 0 ? (
          <div className="space-y-4">
            {genreStats.map(([genre, count]) => (
              <div key={genre}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{genre}</span>
                  <span className="text-gray-600 font-semibold">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
            </svg>
            <p className="text-gray-600 text-lg">No watched movies yet!</p>
            <p className="text-gray-500 text-sm mt-2">Mark some movies as watched to see your genre preferences.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatsPage;