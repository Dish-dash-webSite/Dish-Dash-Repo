import React, { useEffect, useState } from "react";
import { FaHamburger, FaUtensils, FaUserCircle, FaSignOutAlt, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ItemsList from "./home";

const advancedAnimation = {
  animation: 'logoAnimation 2s ease-in-out infinite',
};

interface Profile {
  id: number;
  email: string;
  imageUrl: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface Restaurant {
  id: number;
  name: string;
  address: string;
  openingH: string;
  closingH: string;
  cuisine: string;
  image: string;
  contactNumber: string;
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State to toggle profile sidebar visibility
  const [isEditing, setIsEditing] = useState(false); // State to toggle editing mode
  const [userData, setUserData] = useState<Profile | null>(null);
  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const fetchProfileData = async () => {
    try {
      const result = await axios.get("http://localhost:3000/api/owner/personalInfo");
      setUserData(result.data.user);
      setFormData({
        firstName: result.data.user.firstName || "",
        lastName: result.data.user.lastName || "",
        email: result.data.user.email || "",
        password: "", // Don't fetch password from the server
      });
    } catch (err) {
      console.log("Error fetching profile data", err);
    }
  };

  const fetchRestaurantData = async () => {
    try {
      const result = await axios.get("http://localhost:3000/api/owner/restoInfo");
      setRestaurantData(result.data.user.Restaurants[0]);
    } catch (err) {
      console.log("Error fetching restaurant data", err);
    }
  };

  const updateProfile = async () => {
    try {
      const updatedData = { ...formData };
      await axios.put("http://localhost:3000/api/owner/updateProfile", updatedData);
      setIsEditing(false); // Switch back to view mode
      console.log("Profile updated successfully");
    } catch (err) {
      console.log("Error updating profile", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleProfileSidebar = () => setIsProfileOpen(!isProfileOpen);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/owner/logoutResto");
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateProfile = () => setIsEditing(true);
  const handleSaveProfile = () => updateProfile();

  useEffect(() => {
    fetchProfileData();
    fetchRestaurantData();
  }, []);

  return (
    <div>
      <header className="bg-white shadow-md sticky top-0 z-50 border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center shrink-0" style={advancedAnimation}>
              <FaHamburger className="h-10 w-10 text-orange-500" />
              <FaUtensils className="h-10 w-10 text-orange-500 ml-2" />
              <p className="h-10 w-10 text-orange-500 ml-2">{restaurantData?.name}</p>
            </div>

            <nav className="flex space-x-6 items-center">
              <Link to="/restaurant/home" className="text-black hover:text-orange-500 transition-all duration-200">
                Home
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
        <div className="flex justify-between items-center p-4">
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
          <button onClick={toggleProfileSidebar} className="text-black text-3xl">
            &times;
          </button>
        </div>

        {isEditing ? (
          <div className="space-y-4 w-full px-6 mt-6">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder={userData?.firstName || "First Name"}
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder={userData?.lastName || "Last Name"}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Password"
            />
          </div>
        ) : (
          <div className="space-y-4 w-full px-6 mt-6">
            <div className="flex space-x-2">
              <div className="flex flex-col">
                <p className="font-semibold text-gray-800">First Name</p>
                <p className="text-gray-600">{userData?.firstName}</p>
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-gray-800">Last Name</p>
                <p className="text-gray-600">{userData?.lastName}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="flex flex-col">
                <p className="font-semibold text-gray-800">Email</p>
                <p className="text-gray-600">{userData?.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Log Out Button */}
        <div className="absolute bottom-4 left-0 right-0 px-6">
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 text-white bg-red-500 rounded-md hover:bg-red-600 transition-all"
          >
            <FaSignOutAlt className="inline mr-2" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
