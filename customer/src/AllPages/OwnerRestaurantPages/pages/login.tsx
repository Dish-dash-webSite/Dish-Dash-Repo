import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { loginResto } from '../../../store/authThunkcResto';
import Swal from 'sweetalert2';

const LoginForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Validate the form before submitting
    const validateForm = () => {
        let valid = true;

        if (!formData.email || !formData.password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email and password are required!',
            });
            valid = false;
        }

        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const resultAction = await dispatch(
                loginResto({
                    email: formData.email,
                    password: formData.password,
                })
            );

            // If login fails (rejected action), handle the error
            if (loginResto.rejected.match(resultAction)) {
                // Show error alert using SweetAlert2
                const errorMessage = resultAction.payload as string;
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: errorMessage,
                });
            } else {
                // Navigate to a different page on successful login
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Welcome back!',
                }).then(() => {
                    navigate('/restaurant/dashboard'); // Adjust the route to your desired landing page
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
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
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                required
                            />
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
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                required
                            />
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
