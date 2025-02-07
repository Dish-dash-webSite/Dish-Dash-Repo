import React from 'react';
import Navbar from '../../../../src/components/Navbar';
import Footer from '../../../../src/components/Footer';
import Header from '../components/Header';
import FeaturedRestaurants from '../components/FeaturedRestaurants';
import Categories from '../components/Categories';
import PopularRestaurants from '../components/PopularRestaurants';
import RestaurantMap from '../components/RestaurantMap';
import TestPage from './TestPage';

const Homepage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <FeaturedRestaurants />
          <Categories />
          <PopularRestaurants />
        </main>
      </div>
      <RestaurantMap />
      <TestPage />
      <Footer />
    </div>
  );
};

export default Homepage;