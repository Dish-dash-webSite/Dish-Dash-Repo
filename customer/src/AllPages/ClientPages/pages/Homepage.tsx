import React, { useEffect } from 'react'
// import Navbar from "../../../../src/components/Navbar.tsx"
/* import RestaurantList from "../components/RestaurantList"; */
// import Header from "../components/Header";
import FeaturedRestaurants from "../components/FeaturedRestaurants";
import Categories from "../components/Categories";
import PopularRestaurants from "../components/PopularRestaurants";
import RestaurantMap from "../components/RestaurantMap";
import TestPage from './TestPage';

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div>
      <div className="min-h-screen bg-gray-50">
        <main>
          <FeaturedRestaurants />
          <Categories />
          <PopularRestaurants />
        </main>
      </div>
      {/* //<RestaurantList/> */}
      <RestaurantMap />
      <TestPage />
    </div>
  )
}

export default Homepage