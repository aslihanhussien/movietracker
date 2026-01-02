import { useNavigate } from 'react-router-dom';

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition border-2 border-gray-200 hover:border-blue-400"
    >
      <div className="aspect-[2/3] bg-gray-200 flex items-center justify-center">
        {movie.Poster !== 'N/A' ? (
          <img 
            src={movie.Poster} 
            alt={movie.Title}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
          </svg>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 mb-1 truncate text-sm">{movie.Title}</h3>
        <p className="text-gray-600 text-xs">{movie.Year}</p>
      </div>
    </div>
  );
}

export default MovieCard;