import { useState, ChangeEvent, FormEvent } from 'react';
import Flag from 'react-world-flags';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/index'; // Ensure this is exported from your store
import { addRestaurant } from '../../../store/restaurantsSlice';

interface RestaurantFormData {
    name: string;
    cuisine: string;
    address: string;
    rating: number;
    contactNumber: string;
    openingTime: string;
    closingTime: string;
}

type FormErrors = {
    [K in keyof RestaurantFormData]?: string;
};

const RestaurantForm: React.FC = () => {
    const [formData, setFormData] = useState<RestaurantFormData>({
        name: '',
        cuisine: '',
        address: '',
        rating: 1,
        contactNumber: '',
        openingTime: '',
        closingTime: '',
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const validateForm = (): boolean => {
        let isValid = true;
        const errors: FormErrors = {};

        if (!formData.name.trim()) {
            errors.name = 'Restaurant name is required';
            isValid = false;
        }

        if (!formData.cuisine.trim()) {
            errors.cuisine = 'Cuisine is required';
            isValid = false;
        }

        if (!formData.address.trim()) {
            errors.address = 'Address is required';
            isValid = false;
        }

        if (!formData.contactNumber.trim()) {
            errors.contactNumber = 'Contact number is required';
            isValid = false;
        }

        if (!formData.openingTime || !formData.closingTime) {
            errors.openingTime = 'Both opening and closing times are required';
            isValid = false;
        } else if (formData.openingTime >= formData.closingTime) {
            errors.openingTime = 'Opening time must be earlier than closing time';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            // await dispatch(addRestaurant(formData)).unwrap();
            alert('Restaurant created successfully!');
            setFormData({
                name: '',
                cuisine: '',
                address: '',
                rating: 1,
                contactNumber: '',
                openingTime: '',
                closingTime: '',
            });
        } catch (error) {
            alert('Failed to create restaurant. Please try again.');
        }
    }

    return (
        <div className="flex min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/30500761/pexels-photo-30500761.jpeg)' }}>
            <div className="w-full flex justify-center items-center bg-black bg-opacity-50">
                <div className="w-full max-w-lg p-6 bg-white bg-opacity-70 rounded-lg shadow-xl border border-gray-300 relative">
                    {/* Go back link */}
                    <a href="/back" className="absolute top-4 right-4 text-sm text-orange-600 hover:underline">
                        Go Back
                    </a>

                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Restaurant Information</h2>
                    <form onSubmit={handleSubmit}>
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

                        {/* Cuisine */}
                        <div className="mb-4">
                            <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700">Cuisine</label>
                            <input
                                type="text"
                                id="cuisine"
                                name="cuisine"
                                value={formData.cuisine}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border ${formErrors.cuisine ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
                                required
                            />
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

                        {/* Contact Number with +216 Prefix and Flag on the left */}
                        <div className="mb-4 flex items-center space-x-2">
                            <Flag code="TN" style={{ width: '30px', height: '20px' }} className="mr-2" /> {/* Flag to the left */}
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

                        {/* Operation Hours (Opening & Closing Times) */}
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
                </div>
            </div>
        </div>
    );
};

export default RestaurantForm;
