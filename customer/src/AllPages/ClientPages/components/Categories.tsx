import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../store';
import { AppDispatch } from '../../../store';
import { fetchCategories } from '../../../store/categoryThunks';

interface Category {
  id: number;
  name: string;
}

const Categories: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.categories?.items ?? []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (!Array.isArray(categories)) {
    console.error('Categories is not an array:', categories);
    return null;
  }

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;