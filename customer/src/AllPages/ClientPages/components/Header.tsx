import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <UtensilsCrossed className="h-8 w-8 text-orange-500" />
            <span className="ml-2 text-xl font-bold">Order.uk</span>
          </div>
          <nav className="flex space-x-8">
            <a href="#" className="text-gray-900 hover:text-orange-500">Vegan</a>
            <a href="#" className="text-gray-900 hover:text-orange-500">Sushi</a>
            <a href="#" className="text-orange-500 font-medium">Pizza & Fast food</a>
            <a href="#" className="text-gray-900 hover:text-orange-500">Others</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;