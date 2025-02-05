import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { logoutThunk } from '../features/auth/authSlice';

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isDashboard = location.pathname === '/dashboard';

    const menuItems = [
        { title: 'Users', path: '/users' },
        { title: 'Deliveries', path: '/deliveries' },
        { title: 'Restaurants', path: '/restaurants' },
        { title: 'Customers', path: '/customers' },
        { title: 'Orders', path: '/orders' },
    ];

    const handleLogout = async () => {
        try {
            await dispatch(logoutThunk()).unwrap();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="flex h-screen">
            <div className={`fixed left-0 h-full bg-[#1E293B] text-white transition-width duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full p-4 text-left flex items-center justify-center hover:bg-[#334155]"
                >
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
                <nav className="mt-4">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className={`flex items-center p-4 hover:bg-[#334155] ${
                                location.pathname === item.path ? 'bg-[#334155]' : ''
                            } ${isOpen ? 'justify-start' : 'justify-center'}`}
                        >
                            <span className={`${isOpen ? 'block' : 'hidden'}`}>{item.title}</span>
                            <span className={`${isOpen ? 'hidden' : 'block'}`}>{item.title[0]}</span>
                        </Link>
                    ))}
                </nav>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className={`absolute bottom-0 left-0 w-full p-4 bg-red-500 hover:bg-red-600 transition-colors duration-200 
                        flex items-center ${isOpen ? 'justify-start' : 'justify-center'}`}
                >
                    {isOpen ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Logout</span>
                        </>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Dashboard Button - Show only when not on dashboard */}
            {!isDashboard && (
                <div className="fixed top-4 right-4">
                    <Link
                        to="/dashboard"
                        className="bg-[#1E293B] text-white px-4 py-2 rounded-md hover:bg-[#334155] transition-colors duration-200"
                    >
                        Show Dashboard
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Sidebar; 