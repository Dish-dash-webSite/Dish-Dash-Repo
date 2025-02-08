import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Settings, CreditCard, LogOut, Heart, Clock, MapPin } from 'lucide-react';
import { FaUserCircle } from 'react-icons/fa';
import type { UserProfile } from '../../../types';

interface ProfileDropdownProps {
  user: UserProfile;
  onLogout: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-8 w-8 rounded-full object-cover border-2 border-orange-500"
          />
        ) : (
          <FaUserCircle className="h-8 w-8 text-gray-600" />
        )}
        <span className="hidden md:block font-medium text-gray-700">{user.name}</span>
      </button>

      <div
        className={`absolute right-0 mt-2 w-72 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out transform origin-top-right
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
      >
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-12 w-12 rounded-full object-cover border-2 border-orange-500"
              />
            ) : (
              <FaUserCircle className="h-12 w-12 text-gray-600" />
            )}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="p-2">
          <Link
            to="/profile"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded-lg transition-colors duration-150"
          >
            <User className="h-4 w-4 mr-3 text-gray-400" />
            Your Profile
          </Link>

          {user.role === 'customer' && (
            <>
              <Link
                to="/orders"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded-lg transition-colors duration-150"
              >
                <Clock className="h-4 w-4 mr-3 text-gray-400" />
                Order History
              </Link>

              <Link
                to="/favorites"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded-lg transition-colors duration-150"
              >
                <Heart className="h-4 w-4 mr-3 text-gray-400" />
                Saved Restaurants
              </Link>

              <Link
                to="/addresses"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded-lg transition-colors duration-150"
              >
                <MapPin className="h-4 w-4 mr-3 text-gray-400" />
                Delivery Addresses
              </Link>
            </>
          )}

          <Link
            to="/settings"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded-lg transition-colors duration-150"
          >
            <Settings className="h-4 w-4 mr-3 text-gray-400" />
            Settings
          </Link>
        </div>

        <div className="border-t border-gray-100 p-2">
          <button
            onClick={onLogout}
            className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
