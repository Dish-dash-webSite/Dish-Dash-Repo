"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { MapPin } from "lucide-react";

interface Restaurant {
  id: string;
  name: string;
  location?: string;
  image?: string;
  cuisine?: string;
  rating?: number;
}

// Default food images for restaurants without images
const defaultImages = [
  "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg", // Burger
  "https://images.pexels.com/photos/2725744/pexels-photo-2725744.jpeg", // Pizza
  "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg", // Pasta
  "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg"  // Fries
];

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ cuisine: "", rating: 0 });

  // Fetch restaurants from API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("/api/restaurants");
        const restaurantData = Array.isArray(response.data) ? response.data : [];
        // Add default images to restaurants without images
        const restaurantsWithImages = restaurantData.map((restaurant, index) => ({
          ...restaurant,
          image: restaurant.image || defaultImages[index % defaultImages.length]
        }));
        setRestaurants(restaurantsWithImages);
        setFilteredRestaurants(restaurantsWithImages);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setRestaurants([]);
        setFilteredRestaurants([]);
      }
    };
    fetchRestaurants();
  }, []);

  const updateFilters = (cuisine: string, rating: number) => {
    setFilters({ cuisine, rating });
    const filtered = restaurants.filter(restaurant => 
      (restaurant.cuisine || '').includes(cuisine) && 
      (restaurant.rating || 0) >= rating
    );
    setFilteredRestaurants(filtered);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    
    const filtered = restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchValue.toLowerCase()) &&
      (restaurant.cuisine || '').includes(filters.cuisine) && 
      (restaurant.rating || 0) >= filters.rating
    );
    setFilteredRestaurants(filtered);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"; // Fallback image
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Find Your Perfect Meal
        </h1>
        <p className="text-gray-600">
          Discover the best restaurants in your area
        </p>
      </div>

      <div className="mb-8 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
        />
        <div className="flex space-x-4 mt-4 justify-center">
          <button 
            onClick={() => updateFilters('Italian', 0)}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition shadow-sm"
          >
            Italian
          </button>
          <button 
            onClick={() => updateFilters('', 4)}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition shadow-sm"
          >
            4+ Stars
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {Array.isArray(filteredRestaurants) && filteredRestaurants.map((restaurant, index) => (
          <div key={restaurant.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
            <div className="relative">
              <img
                src={restaurant.image || defaultImages[index % defaultImages.length]}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
                onError={handleImageError}
              />
              {restaurant.rating && (
                <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-lg text-sm">
                  ⭐ {restaurant.rating}
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-3">{restaurant.name}</h3>
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{restaurant.location || 'Location not available'}</span>
              </div>
              <button
                onClick={() => {/* Add your navigation logic here */}}
                className="text-orange-500 font-semibold hover:text-orange-600 flex items-center"
              >
                View Menu <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
