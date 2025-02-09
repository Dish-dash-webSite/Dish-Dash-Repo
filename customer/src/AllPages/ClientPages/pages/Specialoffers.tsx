import React, { useState } from 'react';
import { Timer, Percent, Tag, ChevronRight, Search } from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  expiresIn: string;
  image: string;
  restaurant: {
    name: string;
    rating: number;
    type: string;
    deliveryTime: string;
  };
  code: string;
}

const offers: Offer[] = [
  {
    id: '1',
    title: 'Weekend Special',
    description: 'Get amazing discounts on your favorite meals every weekend',
    discount: 25,
    expiresIn: '2 days',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    restaurant: {
      name: 'Gourmet Burger Kitchen',
      rating: 4.8,
      type: 'American • Burgers',
      deliveryTime: '20-30',
    },
    code: 'WEEKEND25'
  },
  {
    id: '2',
    title: 'First Order Deal',
    description: 'Special discount for your first order with us',
    discount: 40,
    expiresIn: '30 days',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    restaurant: {
      name: 'Pizza Express',
      rating: 4.6,
      type: 'Italian • Pizza',
      deliveryTime: '25-35',
    },
    code: 'FIRST40'
  },
  {
    id: '3',
    title: 'Lunch Special',
    description: 'Daily discounts on lunch orders between 12 PM and 3 PM',
    discount: 20,
    expiresIn: '12 hours',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    restaurant: {
      name: 'Fresh & Healthy',
      rating: 4.7,
      type: 'Healthy • Salads',
      deliveryTime: '15-25',
    },
    code: 'LUNCH20'
  },
  {
    id: '4',
    title: 'Family Feast',
    description: 'Special discount on family-size orders',
    discount: 30,
    expiresIn: '5 days',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    restaurant: {
      name: 'Asian Fusion',
      rating: 4.9,
      type: 'Asian • Chinese',
      deliveryTime: '30-40',
    },
    code: 'FAMILY30'
  }
];

const SpecialOffers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredOffers = offers.filter(offer => 
    offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Special Offers 🎉</h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover amazing deals and discounts from your favorite restaurants
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search offers by restaurant or cuisine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Featured Offer */}
        <div className="mb-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 text-white">
              <div className="flex items-center space-x-2 mb-4">
                <Timer className="h-5 w-5" />
                <span className="text-sm">Limited Time Offer</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">40% OFF Your First Order</h2>
              <p className="text-orange-100 mb-6">
                New to Order.uk? Get an exclusive 40% discount on your first order. Valid for all restaurants!
              </p>
              <button
                onClick={() => handleCopyCode('WELCOME40')}
                className="bg-white text-orange-500 px-6 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors duration-200"
              >
                {copiedCode === 'WELCOME40' ? 'Copied!' : 'Use Code: WELCOME40'}
              </button>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Featured offer"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="relative">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                  <Percent className="h-4 w-4" />
                  <span>{offer.discount}% OFF</span>
                </div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                  <Timer className="h-4 w-4" />
                  <span>Expires in {offer.expiresIn}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>

                <div className="border-t border-gray-100 pt-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{offer.restaurant.name}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-gray-600">{offer.restaurant.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{offer.restaurant.type}</span>
                    <span>{offer.restaurant.deliveryTime} min</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Tag className="h-5 w-5" />
                    <span>Code: {offer.code}</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(offer.code)}
                    className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-medium"
                  >
                    <span>{copiedCode === offer.code ? 'Copied!' : 'Copy Code'}</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOffers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No offers found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialOffers;