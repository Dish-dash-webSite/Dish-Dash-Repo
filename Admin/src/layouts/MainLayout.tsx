import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import { useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';

const MainLayout: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        // Implement logout logic here
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 ml-20">
                {/* Top navigation */}
                <div className="bg-white shadow-md p-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <button className="text-gray-600 hover:text-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m6 0l-3 3m3-3l-3-3" />
                            </svg>
                        </button>
                        {/* Add more icons here if needed */}
                    </div>
                    <div className="flex items-center">
                        <button className="text-gray-600 hover:text-gray-800 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M3 12h18M3 21h18" />
                            </svg>
                        </button>
                        <div className="relative">
                            <img
                                src="https://media.discordapp.net/attachments/1291763293253406832/1291812997412683837/56A9D19F-D5AC-49E1-AD3C-60B58F5BE2B6.jpg?ex=67a598db&is=67a4475b&hm=b3077a75a726eb240604e6b3efb9b03620f70dfd6f8a18cabece5152bd36ec8c&=&format=webp&width=387&height=516" // Replace with your avatar image path
                                alt="Profile"
                                className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer"
                                onClick={toggleDropdown}
                            />
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                    <ul className="py-2">
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/profile')}>
                                            Profile
                                        </li>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/settings')}>
                                            Settings
                                        </li>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Main content */}
                <div className="p-6">
                    <Dashboard />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
