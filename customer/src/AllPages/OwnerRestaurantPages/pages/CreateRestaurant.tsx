import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Flag from 'react-world-flags'; // Assuming you have a flag component or use an external package

const RestaurantForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        cuisine: '',
        address: '',
        contactNumber: '',
        openingTime: '',
        closingTime: '',
        firstName: '',  // First Name state
        lastName: '',   // Last Name state
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        cuisine: '',
        address: '',
        contactNumber: '',
        openingTime: '',
        closingTime: '',
        firstName: '',  // First Name error state
        lastName: '',   // Last Name error state
    });

    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Validate the form before submitting
    const validateForm = () => {
        let errors = { ...formErrors };
        let valid = true;

        // Validation logic
        if (!formData.name) {
            errors.name = 'Restaurant name is required';
            valid = false;
        }

        if (!formData.cuisine) {
            errors.cuisine = 'Cuisine is required';
            valid = false;
        }

        if (!formData.address) {
            errors.address = 'Address is required';
            valid = false;
        }

        if (!formData.contactNumber) {
            errors.contactNumber = 'Contact number is required';
            valid = false;
        }

        if (!formData.openingTime) {
            errors.openingTime = 'Opening time is required';
            valid = false;
        }

        if (!formData.closingTime) {
            errors.closingTime = 'Closing time is required';
            valid = false;
        }

        if (!formData.firstName) {
            errors.firstName = 'First Name is required';
            valid = false;
        }

        if (!formData.lastName) {
            errors.lastName = 'Last Name is required';
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            // Handle successful form submission (e.g., dispatch action, API call, etc.)
            console.log('Form submitted:', formData);
            // Redirect or perform actions after form submission
        }
    };

    return (
        <div className="flex min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/30500761/pexels-photo-30500761.jpeg)' }}>
            <div className="w-full flex justify-center items-center bg-black bg-opacity-50">
                <div className="w-full max-w-lg p-6 bg-white bg-opacity-70 rounded-lg shadow-xl border border-gray-300 relative">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Restaurant Information</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 flex gap-4">
                            <div className="w-1/2">
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-2 border ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
                                    required
                                />
                                {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
                            </div>

                            <div className="w-1/2">
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-2 border ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
                                    required
                                />
                                {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
                            </div>
                        </div>
                        {/* Restaurant Name */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Restaurant Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
                                required
                            />
                            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
                        </div>

                        {/* Cuisine Dropdown */}
                        <div className="mb-4">
                            <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700">Cuisine</label>
                            <select
                                id="cuisine"
                                name="cuisine"
                                value={formData.cuisine}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border ${formErrors.cuisine ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
                                required
                            >
                                <option value="">Select Cuisine</option>
                                <option value="Italian">Italian</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Japanese">Japanese</option>
                                <option value="Mexican">Mexican</option>
                                <option value="Indian">Indian</option>
                                <option value="Mediterranean">Mediterranean</option>
                                {/* Add more cuisines here as needed */}
                            </select>
                            {formErrors.cuisine && <p className="text-red-500 text-sm">{formErrors.cuisine}</p>}
                        </div>

                        {/* Address */}
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border ${formErrors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
                                required
                            />
                            {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
                        </div>

                        {/* Contact Number */}
                        <div className="mb-4 flex items-center space-x-2">
                            <Flag code="TN" style={{ width: '30px', height: '20px' }} className="mr-2" />
                            <span className="text-gray-700 text-lg">+216</span>
                            <input
                                type="tel"
                                id="contactNumber"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border ${formErrors.contactNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
                                placeholder="Your contact number"
                                required
                            />
                            {formErrors.contactNumber && <p className="text-red-500 text-sm">{formErrors.contactNumber}</p>}
                        </div>

                        {/* Operation Hours */}
                        <div className="mb-4 flex gap-4">
                            <div className="w-1/2">
                                <label htmlFor="openingTime" className="block text-sm font-medium text-gray-700">Opening Time</label>
                                <input
                                    type="time"
                                    id="openingTime"
                                    name="openingTime"
                                    value={formData.openingTime}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-2 border ${formErrors.openingTime ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
                                    required
                                />
                                {formErrors.openingTime && <p className="text-red-500 text-sm">{formErrors.openingTime}</p>}
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="closingTime" className="block text-sm font-medium text-gray-700">Closing Time</label>
                                <input
                                    type="time"
                                    id="closingTime"
                                    name="closingTime"
                                    value={formData.closingTime}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-2 border ${formErrors.closingTime ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
                                    required
                                />
                                {formErrors.closingTime && <p className="text-red-500 text-sm">{formErrors.closingTime}</p>}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                            Create
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-4 text-center">
                        <a href="/restaurant/loginResto" className="text-sm text-orange-600 hover:underline">
                            Already have a restaurant? Log in here.
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantForm;
