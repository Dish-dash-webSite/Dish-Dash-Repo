import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loginStart, loginSuccess, loginFailure } from '../features/auth/authSlice';
import axios from 'axios';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginStart());

        try {
            const response = await axios.post('http://localhost:3000/api/admin/login', 
                { email, password },
                { withCredentials: true }
            );

            if (response.data) {
                dispatch(loginSuccess(response.data.user));
                navigate('/dashboard');
            }
        } catch (error) {
            let errorMessage = 'Login failed';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || error.message;
            }
            dispatch(loginFailure(errorMessage));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#000033]">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.02]">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#000033] mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to your admin account</p>
                </div>
                
                {error && (
                    <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[#000033] mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF8000] focus:border-transparent transition-all"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-[#000033] mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF8000] focus:border-transparent transition-all"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#FF8000] text-white py-3 px-4 rounded-xl hover:bg-[#e67300] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF8000] focus:ring-offset-2"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Logging in...
                            </div>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>Don't have an account? <a href="#" className="text-[#FF8000] hover:text-[#e67300]">Contact admin</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
