// import { useState, ChangeEvent, FormEvent } from 'react';

// // Define types for form values
// interface LoginFormData {
//     email: string;
//     password: string;
// }

// const LoginCard: React.FC = () => {
//     const [formData, setFormData] = useState<LoginFormData>({
//         email: '',
//         password: ''
//     });

//     // Handle input changes dynamically
//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (e: FormEvent) => {
//         e.preventDefault();
//         // Handle login logic here (e.g., call an API)
//         console.log('Email:', formData.email, 'Password:', formData.password);
//     };

//     return (
//         <div className="flex min-h-screen">
//             {/* Left image section */}
//             <div
//                 className="hidden lg:block w-1/2 bg-cover bg-center"
//                 style={{ backgroundImage: 'url(https://images.pexels.com/photos/30500761/pexels-photo-30500761.jpeg)' }}
//             >
//                 {/* Restaurant-themed image */}
//             </div>

//             {/* Right login form section */}
//             <div className="w-full lg:w-1/2 p-8 bg-white rounded-lg shadow-md flex flex-col justify-center">
//                 <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
//                 <div className="border-2 border-gray-300 rounded-lg p-6 bg-white shadow-lg">
//                     <form onSubmit={handleSubmit}>
//                         <div className="mb-4">
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                                 Email
//                             </label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-6">
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
//                                 required
//                             />
//                         </div>
//                         <button
//                             type="submit"
//                             className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
//                         >
//                             Login
//                         </button>
//                     </form>
//                     <div className="mt-4 text-center">
//                         <p className="text-sm text-gray-600">
//                             Don't have an account?{' '}
//                             <a href="/signup" className="text-orange-600 hover:underline">
//                                 Sign up here
//                             </a>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginCard;
