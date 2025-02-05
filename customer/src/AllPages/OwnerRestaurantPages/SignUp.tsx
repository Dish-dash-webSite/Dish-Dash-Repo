import { useState, ChangeEvent, FormEvent } from 'react';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUpCard: React.FC = () => {
    const [formData, setFormData] = useState<SignUpFormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [formErrors, setFormErrors] = useState<Partial<SignUpFormData>>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Handle input changes dynamically
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Clear error if field is corrected
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const validateForm = (): boolean => {
        let isValid = true;
        const errors: Partial<SignUpFormData> = {};

        if (!formData.name) {
            errors.name = 'Name is required';
            isValid = false;
        }

        if (!formData.email) {
            errors.email = 'Email is required';
            isValid = false;
        }

        if (!formData.password) {
            errors.password = 'Password is required';
            isValid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();

        if (!validateForm()) return;

        // Handle registration logic here (e.g., call an API)
        console.log('Form Data:', formData);
    };

    return (
        <div className="flex min-h-screen">
            {/* Left image section */}
            <div
                className="hidden lg:block w-1/2 bg-cover bg-center"
                style={{ backgroundImage: 'url(https://images.pexels.com/photos/30500761/pexels-photo-30500761.jpeg)' }}
            >
                {/* Restaurant-themed image */}
            </div>

            {/* Right registration form section */}
            <div className="w-full lg:w-1/2 p-8 bg-white rounded-lg shadow-md flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
                <div className="border-2 border-gray-300 rounded-lg p-6 bg-white shadow-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
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

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
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

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
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

                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border ${formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
                                required
                            />
                            {formErrors.confirmPassword && <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                            Sign Up
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <a href="/" className="text-orange-600 hover:underline">
                                Go back to Login
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpCard;
