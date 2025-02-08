import React from 'react';

interface Category {
  id: number;
  name: string;
  image: string;
  restaurantCount: number;
  cuisineType: string;
}

interface CategoriesProps {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const Categories: React.FC<CategoriesProps> = ({ categories, loading, error }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Order.uk Popular Categories 😋</h2>

        {/* Display filtered categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={category.image || 'https://via.placeholder.com/150'}
                alt={category.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-sm">{category.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{category.restaurantCount} Restaurants</p>
                <p className="text-sm text-gray-600 mt-1">Cuisine: {category.cuisineType}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;