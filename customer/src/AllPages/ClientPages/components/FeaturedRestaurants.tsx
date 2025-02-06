import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';

const FeaturedRestaurants: React.FC = () => {
  const restaurants = useSelector((state: RootState) => state.restaurants.featuredRestaurants);

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Up to -40% 🎀 Order.uk exclusive deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <a
              key={restaurant.id}
              href="#"
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="absolute top-4 left-4 bg-blue-900 text-white px-3 py-1 rounded-full">
                -{restaurant.discount}%
              </div>
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 bg-white">
                <p className="text-orange-500">{restaurant.type}</p>
                <h3 className="text-lg font-semibold mt-1">{restaurant.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;