import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import type { Restaurant } from '../../../types';



const PopularRestaurants: React.FC = () => {
  const restaurants: Restaurant[] = useSelector((state: RootState) => state.restaurants.popularRestaurants);

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Popular Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {restaurant.imageUrl && (
                <img 
                  src={restaurant.imageUrl} 
                  alt={restaurant.name} 
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1">{restaurant.rating?.toFixed(1) || 'N/A'}</span>
                  </div>
                </div>
                <p className="text-gray-600 mt-2">{restaurant.cuisineType}</p>
                <p className="text-gray-500 text-sm mt-1">{restaurant.address}</p>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Hours: {restaurant.openingH} - {restaurant.closingH}</p>
                  <p>Contact: {restaurant.contactNumber}</p>
                </div>
                <button className="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
                  View Menu
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRestaurants;