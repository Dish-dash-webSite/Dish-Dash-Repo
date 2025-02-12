import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/index';
import { logoutUser } from '../store/authThunks';
import { MapPin, ShoppingBag, /*Search, */User, LogOut } from 'lucide-react';





const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);


  const handleLogout = () => {
    dispatch(logoutUser());
  };


  return (
    <>
      {/* Top Banner */}
      <div className="bg-gray-100 py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex items-center mb-2 md:mb-0">
            <span className="text-yellow-400">⭐</span>
            <p className="ml-2">Get 5% Off your first order, Promo: ORDER5</p>
          </div>
          <div className="flex items-center">
            <MapPin size={16} className="mr-1" />
            <span>Regent Street, A4, A420!, London</span>
            <button className="ml-2 text-orange-500 hover:text-orange-600">Change Location</button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <Link to="/" className="text-2xl font-bold">Order.uk</Link>

          <div className="flex flex-wrap justify-center md:flex space-x-4 md:space-x-8">
            <Link to="/" className="hover:text-orange-500">Home</Link>
            <Link to="/menu" className="hover:text-orange-500">Browse Menu</Link>
            <Link to="/offers" className="hover:text-orange-500">Special Offers</Link>
            <Link to="/restaurants" className="hover:text-orange-500">Restaurants</Link>
            <Link to="/track-order" className="hover:text-orange-500">Track Order</Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <ShoppingBag className="mr-2" />
              <span>0 Items</span>
              <span className="ml-2">£0.00</span>
            </div>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Hello, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-orange-500"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-orange-500 text-white px-6 py-2 rounded-full flex items-center hover:bg-orange-600"
              >
                <User size={18} className="mr-2" />
                Login/Signup
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

