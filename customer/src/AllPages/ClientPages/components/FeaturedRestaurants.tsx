import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../store';
import { AppDispatch } from '../../../store';
import { fetchPopularRestaurants } from '../../../store/restaurantThunks';

const FeaturedRestaurants: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const restaurants = useSelector((state: RootState) => state.restaurants.popularRestaurants);

  useEffect(() => {
    console.log('Fetching restaurants for Featured section');
    dispatch(fetchPopularRestaurants());
  }, [dispatch]);

  useEffect(() => {
    console.log('Featured restaurants:', restaurants);
  }, [restaurants]);

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Featured Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.slice(0, 3).map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <img src={restaurant.image} />
                <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                <p className="text-gray-600">{restaurant.cuisineType}</p>
                <p className="text-gray-500 text-sm">{restaurant.address}</p>
                <div className="mt-2">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1">{restaurant.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;