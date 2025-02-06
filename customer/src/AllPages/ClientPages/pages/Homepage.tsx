import React from 'react'
import Navbar from "../../../../src/components/Navbar.tsx"
import Footer from "../../../../src/components/Footer";
import RestaurantList from "../components/RestaurantList";
import Header from "../components/Header";
import FeaturedRestaurants from "../components/FeaturedRestaurants";
import Categories from "../components/Categories";
import PopularRestaurants from "../components/PopularRestaurants";
const  Homepage =()=> {
  return (
    <div>
        <Navbar/>
        <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <FeaturedRestaurants />
          <Categories />
          <PopularRestaurants />
        </main>
      </div>
        <RestaurantList/>
        <Footer />
    </div>
  )
}

export default Homepage