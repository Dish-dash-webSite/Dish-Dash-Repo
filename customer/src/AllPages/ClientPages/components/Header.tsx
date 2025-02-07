import React, { useState } from 'react';
import { UtensilsCrossed, Search, MapPin } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRestaurants } from '../../../store/restaurantThunks';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../store';


const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchRestaurants(searchQuery));
      navigate('/search-results');
    }
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

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <UtensilsCrossed className="h-8 w-8 text-orange-500" />
            <span className="ml-2 text-xl font-bold">Order.uk</span>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <button 
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Search
            </button>
            <button 
              type="button"
              onClick={handleNearMe}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2 transition-colors"
            >
              <MapPin className="h-5 w-5" />
              Near Me
            </button>
          </form>

          {/* Navigation */}
          <nav className="flex space-x-8">
            <a href="#" className="text-gray-900 hover:text-orange-500">Vegan</a>
            <a href="#" className="text-gray-900 hover:text-orange-500">Sushi</a>
            <a href="#" className="text-orange-500 font-medium">Pizza & Fast food</a>
            <a href="#" className="text-gray-900 hover:text-orange-500">Others</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;