import React, { useState } from "react";
import { FaUtensils, FaUserCircle, FaSignOutAlt, FaEdit, FaKey } from "react-icons/fa"; // Profile, log-out, edit, and change-password icons
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false); // State to toggle profile sidebar visibility
    const [isEditing, setIsEditing] = useState(false); // State to toggle editing mode
    const [userData, setUserData] = useState({
        name: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        avatar: "https://www.w3schools.com/w3images/avatar2.png", // Placeholder avatar
        restaurantName: "John's Diner",
    });

    // Function to toggle profile sidebar visibility
    const toggleProfileSidebar = () => setIsProfileOpen(!isProfileOpen);

    // Handle log out logic (placeholder)
    const handleLogout = () => {
        // Add logout logic here (e.g., clearing user session, redirecting to login page)
        console.log("User logged out!");
    };

    // Handle profile update (can redirect to profile update page)
    const handleUpdateProfile = () => {
        // Switch to editing mode
        setIsEditing(!isEditing);
        console.log("Navigate to update profile page.");
    };

    // Handle password change logic (placeholder)
    const handleChangePassword = () => {
        // Redirect or show password change modal (can be replaced with actual logic)
        console.log("Navigate to change password page.");
    };

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    // Handle save button click (saves edited user data)
    const handleSaveProfile = () => {
        setIsEditing(false);
        console.log("Profile saved:", userData);
    };

    return (
        <div>
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
                    <div className="flex items-center justify-between gap-6">
                        {/* Logo */}
                        <div className="flex items-center shrink-0">
                            <FaUtensils className="h-10 w-10 text-black" />
                            <span className="ml-3 text-2xl font-bold text-black">Order.uk</span>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex space-x-6 items-center">
                            <Link to="/home" className="text-black hover:text-orange-500 transition-all duration-200">
                                Home
                            </Link>
                            <Link to="/menu/sushi" className="text-black hover:text-orange-500 transition-all duration-200">
                                Add Product
                            </Link>
                            <button onClick={toggleProfileSidebar} className="text-black">
                                <FaUserCircle className="h-8 w-8 text-black" />
                            </button>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Profile Sidebar - Appears from the right side */}
            <div
                className={`fixed top-0 right-0 w-80 h-full bg-white z-50 transition-transform transform ${isProfileOpen ? "translate-x-0" : "translate-x-full"} border-l border-black`}
            >
                {/* Close and Edit Profile Buttons */}
                <div className="flex justify-between items-center p-4">
                    {/* Edit Button */}
                    <button
                        onClick={handleUpdateProfile}
                        className="py-2 px-4 bg-black text-white text-lg font-semibold rounded-full shadow-md hover:bg-orange-500 hover:shadow-lg transition-all flex items-center space-x-2"
                    >
                        <FaEdit className="h-5 w-5" />
                        <span>Edit Profile</span>
                    </button>
                    {/* Close Button */}
                    <button onClick={toggleProfileSidebar} className="text-black text-3xl">
                        &times;
                    </button>
                </div>

                {/* Sidebar Content */}
                <div className="flex flex-col items-center space-y-6 mt-12">
                    <img
                        src={userData.avatar}
                        alt="User Avatar"
                        className="h-32 w-32 rounded-full border-4 border-black"
                    />
                    <h2 className="text-xl font-bold text-center text-black">
                        {userData.name} {userData.lastName}
                    </h2>
                    <p className="text-sm text-center text-gray-600">{userData.email}</p>
                    <p className="text-sm text-center text-gray-600">{userData.restaurantName}</p>
                </div>

                {/* Profile Fields */}
                {isEditing && (
                    <div className="space-y-4 w-full px-6 mt-6">
                        {/* Name and Last Name Input */}
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                name="name"
                                value={userData.name}
                                onChange={handleInputChange}
                                className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                placeholder="First Name"
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={userData.lastName}
                                onChange={handleInputChange}
                                className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                placeholder="Last Name"
                            />
                        </div>

                        {/* Email Input */}
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Email"
                        />

                        {/* Restaurant Name Input */}
                        <input
                            type="text"
                            name="restaurantName"
                            value={userData.restaurantName}
                            onChange={handleInputChange}
                            className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Restaurant Name"
                        />

                        {/* Save Changes Button */}
                        <button
                            onClick={handleSaveProfile}
                            className="w-full py-3 bg-black text-white text-lg font-semibold rounded-xl border-2 border-transparent shadow-md hover:bg-orange-500 hover:shadow-lg transition-all"
                        >
                            Save Changes
                        </button>
                    </div>
                )}

                {/* Spacer to push buttons to the bottom */}
                <div className="flex-grow"></div>

                {/* Change Password and Log Out Buttons - Stacked */}
                {!isEditing && (
                    <div className="space-y-4 w-full px-6 mb-4">
                        {/* Change Password Button */}
                        <button
                            onClick={handleChangePassword}
                            className="w-full py-3 bg-white text-black text-lg font-semibold rounded-xl border-2 border-black shadow-md hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center space-x-2"
                        >
                            <FaKey className="h-5 w-5" />
                            <span>Change Password</span>
                        </button>

                        {/* Log Out Button */}
                        <button
                            onClick={handleLogout}
                            className="w-full py-3 bg-black text-white text-lg font-semibold rounded-xl border-2 border-transparent shadow-md hover:bg-orange-500 hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                        >
                            <FaSignOutAlt className="h-5 w-5" />
                            <span>Log Out</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
