import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
  onMenuItemClick: (menuItem: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, closeSidebar, onMenuItemClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isWorkSpace = location.pathname.includes('/delivery/workSpace');

  const handleMenuItemClick = (menuItem: string) => {
    onMenuItemClick(menuItem);
    closeSidebar();
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-64 bg-[#FC8A06] shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <button
        onClick={closeSidebar}
        className="absolute top-4 right-4 p-2 rounded-lg bg-white hover:bg-gray-100 transition-colors duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-[#FC8A06]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="p-4 mt-12">
        <h2 className="text-2xl font-bold text-white mb-4">Menu</h2>
        <ul className="space-y-2">
          {isWorkSpace ? (
            <>
              <li
                className="hover:bg-white hover:text-[#FC8A06] p-2 rounded-lg transition-colors duration-300"
                onClick={() => navigate('/delivery/dashboard')}
              >
                <a href="#" className="block">
                  Back to Dashboard
                </a>
              </li>
              <li
                className="hover:bg-white hover:text-[#FC8A06] p-2 rounded-lg transition-colors duration-300"
                onClick={() => navigate('/')}
              >
                <a href="" className="block">
                  Back to Home
                </a>
              </li>

            </>
          ) : (
            <>
              <li
                className="hover:bg-white hover:text-[#FC8A06] p-2 rounded-lg transition-colors duration-300"
                onClick={() => handleMenuItemClick('home')}
              >
                <a href="#" className="block">
                  Home
                </a>
              </li>
              <li
                className="hover:bg-white hover:text-[#FC8A06] p-2 rounded-lg transition-colors duration-300"
                onClick={() => handleMenuItemClick('profile')}
              >
                <a href="#" className="block">
                  Profile
                </a>
              </li>
              <li
                className="hover:bg-white hover:text-[#FC8A06] p-2 rounded-lg transition-colors duration-300"
                onClick={() => handleMenuItemClick('settings')}
              >
                <a href="#" className="block">
                  Settings
                </a>
              </li>
              <li
                className="hover:bg-white hover:text-[#FC8A06] p-2 rounded-lg transition-colors duration-300"
                onClick={() => navigate('/')}
              >
                <a href="#" className="block">
                  Back to Shop
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;