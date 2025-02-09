import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Header from '../components/Header';
import FeaturedRestaurants from '../components/FeaturedRestaurants';
import Categories from '../components/Categories';
import PopularRestaurants from '../components/PopularRestaurants';
import RestaurantMap from '../components/RestaurantMap';
import TestPage from './TestPage';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
  image: string;
  restaurantCount: number;
  cuisineType: string;
}

const Homepage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('http://localhost:3000/api/category/categories');
        if (Array.isArray(response.data)) {
          setCategories(response.data);
          setFilteredCategories(response.data);
        } else {
          setError('Invalid response format');
        }
      } catch (err) {
        setError('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (searchValue: string) => {
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      category.cuisineType.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredCategories(filtered);
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
        <main>
          <FeaturedRestaurants />
          <Categories categories={filteredCategories} loading={loading} error={error} />
          <PopularRestaurants />
        </main>
      </div>
      <RestaurantMap />
      <TestPage />
    </div>
  );
};

export default Homepage;