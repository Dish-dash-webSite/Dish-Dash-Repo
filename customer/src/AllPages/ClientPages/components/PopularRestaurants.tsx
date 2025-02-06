import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';

const PopularRestaurants: React.FC = () => {
  const restaurants = useSelector((state: RootState) => state.restaurants.popularRestaurants);

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Popular Restaurants</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {restaurants.map((restaurant) => (
            <a
              key={restaurant.id}
              href="#"
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-sm">{restaurant.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{restaurant.type}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRestaurants;