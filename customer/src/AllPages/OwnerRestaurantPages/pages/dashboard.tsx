import React, { useEffect, useState } from "react";
import { FaHamburger, FaUtensils, FaUserCircle, FaSignOutAlt, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import 'animate.css';  // Import Animate.css
import axios from "axios";
import ItemsList from "./home"
import AddNewItemCard from "./addItem"
// Add advanced animation keyframe styles
const advancedAnimation = {
  animation: 'logoAnimation 2s ease-in-out infinite',
};
interface profile {
  id: number;
  email: string;
  imageUrl: string;
  password: String;
}
interface retro {
  firstName: string;
  lastName: string;
}
interface Reastau {
  id: number;
  name: string;
  address: string;
  openingH: string;
  closingH: string;
  cuisine: string;
  image: string;
  contactNumber: string
}

// Define custom jumping and rotating keyframes for logo animation
const styles = `
@keyframes logoAnimation {
  0% { transform: translateY(0) rotate(0deg) scale(1); }
  25% { transform: translateY(-10px) rotate(15deg) scale(1.2); }
  50% { transform: translateY(0) rotate(0deg) scale(1); }
  75% { transform: translateY(-10px) rotate(-15deg) scale(1.2); }
  100% { transform: translateY(0) rotate(0deg) scale(1); }
}
`;

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State to toggle profile sidebar visibility
  const [isEditing, setIsEditing] = useState(false); // State to toggle editing mode
  const [userData, setUserData] = useState<profile>();
  const [resto, setResto] = useState<retro>();
  const [mat3am, setMat3am] = useState<Reastau>()
  const profilehandler = async () => {
    try {
      const result = await axios.get("http://localhost:3000/api/owner/personalInfo");
      console.log("resultttt from profile", result.data);
      setUserData(result.data.user);
    } catch (err) {
      console.log("err from profile", err);
    }
  };

  const RestoInfohandler = async () => {
    try {
      const result = await axios.get("http://localhost:3000/api/owner/restoInfo");
      console.log("resultttt from profile restooooo", result.data);
      setResto(result.data.user);
      console.log('mat3am :) :) ', result.data.user.Restaurants[0])
      setMat3am(result.data.user.Restaurants[0])
    } catch (err) {
      console.log("err from profile", err);
    }
  };


  // Function to toggle profile sidebar visibility
  const toggleProfileSidebar = () => setIsProfileOpen(!isProfileOpen);

  const Logout = async () => {
    try {
      await axios.post("http://localhost:3000/api/owner/logoutResto");
    } catch (err) {
      console.log(err);
    }
  };
  const UpdateProfile = async (obj: null) => {
    try {
      await axios.put(`http://localhost:3000/api/owner/updateProfile`, obj)
    } catch (err) {
      console.log("hello error from update :(", err)
    }
  }
  // Handle log out logic (placeholder)
  const handleLogout = () => {
    Logout();
    console.log("User logged out!");
    navigate('/');
  };

  // Handle profile update (can redirect to profile update page)
  const handleUpdateProfile = () => {
    setIsEditing(!isEditing);
    console.log("Navigate to update profile page.");
  };

  // Handle save button click (saves edited user data)
  const handleSaveProfile = () => {
    setIsEditing(false);
    console.log("Profile saved:", userData);
  };

  useEffect(() => {
    profilehandler();
    RestoInfohandler();
    window.scrollTo(0, 0)
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to Add Product section
  const scrollToBottom = (): void => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };


  return (
    <div>
      <style>{styles}</style>

      <header className="bg-white shadow-md sticky top-0 z-50 border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* New Logo: Hamburger and Fries Icon with Advanced Animation */}
            <div className="flex items-center shrink-0" style={advancedAnimation}>
              <FaHamburger className="h-10 w-10 text-orange-500" />
              <FaUtensils className="h-10 w-10 text-orange-500 ml-2" />
              <p className="h-10 w-10 text-orange-500 ml-2">{mat3am?.name}</p>
            </div>

            {/* Navigation Links */}
            <nav className="flex space-x-6 items-center">
              <Link to="/restaurant/home" className="text-black hover:text-orange-500 transition-all duration-200" onClick={scrollToTop}>
                Home
              </Link>
              <Link to="" className="text-black hover:text-orange-500 transition-all duration-200" onClick={scrollToBottom}>
                Add item
              </Link>
              <button onClick={toggleProfileSidebar} className="text-orange">
                <FaUserCircle className="h-8 w-8 text-orange" />
              </button>
            </nav>
          </div>
        </div>
      </header>

      <ItemsList />
      {/* Profile Sidebar */}
      <div
        className={`fixed top-0 right-0 w-80 h-full bg-white z-50 transition-transform transform ${isProfileOpen ? 'translate-x-0' : 'translate-x-full'
          } border-l border-orange-500`}
      >
        {/* Close and Edit Profile Buttons */}
        <div className="flex justify-between items-center p-4">
          {/* Edit/Save Button */}
          <button
            onClick={isEditing ? handleSaveProfile : handleUpdateProfile}
            className={`py-2 px-4 text-lg font-semibold rounded-full shadow-md transition-all flex items-center space-x-2 ${isEditing
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-black hover:bg-orange-500 text-white'
              }`}
          >
            <FaEdit className="h-5 w-5" />
            <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
          </button>
          {/* Close Button */}
          <button onClick={toggleProfileSidebar} className="text-black text-3xl">
            &times;
          </button>
        </div>

        {/* Profile Fields */}
        <div className="flex flex-col items-center space-y-6 mt-12">
          <img
            src="https://via.placeholder.com/150" // Placeholder avatar
            alt="User Avatar"
            className="h-32 w-32 rounded-full border-4 border-black"
          />
        </div>
        {isEditing ? (
          <div className="space-y-4 w-full px-6 mt-6">
            {/* First Name and Last Name Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                name="firstName"
                value=""
                onChange={handleInputChange}
                className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="First Name"
              />
              <input
                type="text"
                name="lastName"
                value=""
                onChange={handleInputChange}
                className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Last Name"
              />
            </div>

            {/* Email and Restaurant Name Input */}
            <div className="flex space-x-2">
              <input
                type="email"
                name="email"
                value=""
                onChange={handleInputChange}
                className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Email"
              />
              <input
                type="text"
                name="restaurantName"
                value=""
                onChange={handleInputChange}
                className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Restaurant Name"
              />
            </div>

            {/* Address and Phone Number Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                name="address"
                value=""
                onChange={handleInputChange}
                className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Address"
              />
              <input
                type="text"
                name="phoneNumber"
                value=""
                onChange={handleInputChange}
                className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Phone Number"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value=""
                onChange={handleInputChange}
                className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Password"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4 w-full px-6 mt-6">
            {/* Display Fields when not editing */}
            <div className="flex space-x-2">
              <div className="flex flex-col">
                <p className="font-semibold text-gray-800">First Name</p>
                <p className="text-gray-600">{resto?.firstName}</p>
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-gray-800">Last Name</p>
                <p className="text-gray-600">{resto?.lastName}</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <div className="flex flex-col">
                <p className="font-semibold text-gray-800">Email</p>
                <p className="text-gray-600">{userData?.email}</p>
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-gray-800">Restaurant</p>
                <p className="text-gray-600">{mat3am?.name}</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <div className="flex flex-col">
                <p className="font-semibold text-gray-800">Address</p>
                <p className="text-gray-600">{mat3am?.address}</p>
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-gray-800">Phone Number</p>
                <p className="text-gray-600">{mat3am?.contactNumber}</p>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="font-semibold text-gray-800">Password</p>
              <p className="text-gray-600">********</p>
            </div>
          </div>
        )}

        {/* Spacer to push buttons to the bottom */}
        <div className="flex-grow"></div>

        {/* Log Out Button */}
        <div className="absolute bottom-4 left-0 right-0 px-6">
          {/* Log Out Button */}
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-black text-white text-lg font-semibold rounded-xl border-2 border-transparent shadow-md hover:bg-orange-500 hover:shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            <FaSignOutAlt className="h-5 w-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
      <AddNewItemCard />
    </div >
  );
};

export default Navbar;
