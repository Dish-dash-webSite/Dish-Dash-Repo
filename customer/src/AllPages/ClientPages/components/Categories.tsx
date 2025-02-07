import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
  image: string;
  restaurantCount: number;
  cuisineType: string; // Ensure this field is included
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); // For tracking the search input

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('http://localhost:3000/api/category/categories');
        console.log(response.data); // Log the response data for debugging
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

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchValue = searchQuery.toLowerCase(); // Get the current search query

    // Filter categories by both name and cuisine type
    const filtered = categories.filter(category => 
      category.name.toLowerCase().includes(searchValue) || 
      category.cuisineType.toLowerCase().includes(searchValue)
    );

    setFilteredCategories(filtered); // Update the filtered categories
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Order.uk Popular Categories 😋</h2>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-6">
          <input
            type="text"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Track input changes
            placeholder="Search by name or cuisine type"
            className="border p-2 rounded mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Search
          </button>
        </form>

        {/* Display filtered categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={category.image || 'https://via.placeholder.com/150'} // Add a placeholder if image is not available
                alt={category.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-sm">{category.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{category.restaurantCount} Restaurants</p>
                <p className="text-sm text-gray-600 mt-1">Cuisine: {category.cuisineType}</p> {/* Display cuisine type */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
