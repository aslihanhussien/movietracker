import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
            </svg>
            <span className="text-2xl font-bold text-white">MovieTracker</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-gray-200 font-medium transition">
              Home
            </Link>
            <Link to="/search" className="text-white hover:text-gray-200 font-medium transition">
              Search
            </Link>
            <Link to="/stats" className="text-white hover:text-gray-200 font-medium transition">
              Stats
            </Link>
          </div>

          <button 
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              onClick={toggleMenu}
              className="block px-3 py-2 text-white hover:bg-blue-800 rounded-md font-medium transition"
            >
              Home
            </Link>
            <Link 
              to="/search" 
              onClick={toggleMenu}
              className="block px-3 py-2 text-white hover:bg-blue-800 rounded-md font-medium transition"
            >
              Search
            </Link>
            <Link 
              to="/stats" 
              onClick={toggleMenu}
              className="block px-3 py-2 text-white hover:bg-blue-800 rounded-md font-medium transition"
            >
              Stats
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;