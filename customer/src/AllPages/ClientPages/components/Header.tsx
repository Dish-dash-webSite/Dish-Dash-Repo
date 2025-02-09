import React from 'react';
import { UtensilsCrossed, Search, MapPin } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { searchRestaurants } from '../../../store/restaurantThunks';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../store';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleNearMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        dispatch(searchRestaurants({ lat: latitude, lng: longitude }));
        navigate('/search-results');
      }, (error) => {
        console.error('Error getting location:', error);
        alert('Please enable location services to use this feature');
      });
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  const handleCategoryClick = (category: string) => {
    handleSearch(category);
  };

  return (
    <header className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <UtensilsCrossed className="h-10 w-10 text-white" />
            <span className="ml-3 text-2xl font-bold text-white">Order.uk</span>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border-2 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 h-5 w-5" />
            </div>
            <button
              type="submit"
              className="bg-white text-orange-600 py-3 px-6 rounded-full hover:bg-orange-100 transition-all duration-200"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleNearMe}
              className="bg-white text-orange-600 py-3 px-6 rounded-full hover:bg-orange-100 flex items-center gap-2 transition-all duration-200"
            >
              <MapPin className="h-5 w-5" />
              Near Me
            </button>
          </form>

          {/* Navigation */}
          <nav className="flex space-x-6 items-center">
            <button
              onClick={() => handleCategoryClick('Vegan')}
              className="text-white hover:text-orange-200 transition-all duration-200"
            >
              Vegan
            </button>
            <button
              onClick={() => handleCategoryClick('Sushi')}
              className="text-white hover:text-orange-200 transition-all duration-200"
            >
              Sushi
            </button>
            <button
              onClick={() => handleCategoryClick('Pizza & Fast food')}
              className="text-white font-medium hover:text-orange-200 transition-all duration-200"
            >
              Pizza & Fast food
            </button>
            <button
              onClick={() => handleCategoryClick('Others')}
              className="text-white hover:text-orange-200 transition-all duration-200"
            >
              Others
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
