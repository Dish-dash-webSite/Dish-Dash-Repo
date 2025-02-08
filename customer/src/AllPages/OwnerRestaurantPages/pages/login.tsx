import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        if (!formData.email) {
            errors.email = 'Email is required';
            valid = false;
        }

        if (!formData.password) {
            errors.password = 'Password is required';
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
            navigate('/dashboard');  // Example of redirecting after login
        }
    };

    return (
        <div className="flex min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/30500761/pexels-photo-30500761.jpeg)' }}>
            <div className="w-full flex justify-center items-center bg-black bg-opacity-50">
                <div className="w-full max-w-lg p-6 bg-white bg-opacity-70 rounded-lg shadow-xl border border-gray-300 relative">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
                                required
                            />
                            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
                                required
                            />
                            {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                            Login
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-4 text-center">
                        <a href="/restaurant/create&&immegrate" className="text-sm text-orange-600 hover:underline">
                            Don't have an account? Sign up here.
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
