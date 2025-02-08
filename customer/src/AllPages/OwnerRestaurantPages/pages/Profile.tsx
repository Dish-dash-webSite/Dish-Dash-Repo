// import { useState } from 'react';
// import { PencilIcon } from '@heroicons/react/24/outline';
// import Navbar from './navBar'
// // Define the types for profile object
// interface Profile {
//     firstName: string;
//     lastName: string;
//     restaurantName: string;
//     cuisineType: string;
//     address: string;
//     contact: string;
//     openingH: string;
//     closingH: string;
//     rating: number;
//     avatar: string;
// }

// const ProfileCard: React.FC = () => {
//     const [isEditing, setIsEditing] = useState<boolean>(false);
//     const [profile, setProfile] = useState<Profile>({
//         firstName: 'John',
//         lastName: 'Resto',
//         restaurantName: 'La Maison Gourmande',
//         cuisineType: 'French',
//         address: '123 Gourmet Street, Paris',
//         contact: '+216 12 345 678',
//         openingH: '08:00 AM',
//         closingH: '10:00 PM',
//         rating: 4.5,
//         avatar: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg'
//     });

//     // Handle changes for input fields
//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setProfile(prev => ({ ...prev, [name]: value }));
//     };

//     return (
//         <Navbar>
//             <div className="flex justify-center items-center min-h-screen bg-gray-50">
//                 <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden p-6">
//                     {/* Profile Image Section */}
//                     <div className="relative w-32 h-32 mx-auto mb-6">
//                         <img
//                             src={profile.avatar}
//                             alt="Profile"
//                             className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
//                         />
//                         <button
//                             onClick={() => setIsEditing(!isEditing)}
//                             className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full hover:bg-orange-600 transition-colors"
//                         >
//                             <PencilIcon className="w-5 h-5 text-white" />
//                         </button>
//                     </div>

//                     {/* Profile Information */}
//                     <div className="space-y-4">
//                         {isEditing ? (
//                             <>
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div>
//                                         <label className="text-sm text-gray-600">First Name</label>
//                                         <input
//                                             type="text"
//                                             name="firstName"
//                                             value={profile.firstName}
//                                             onChange={handleInputChange}
//                                             className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="text-sm text-gray-600">Last Name</label>
//                                         <input
//                                             type="text"
//                                             name="lastName"
//                                             value={profile.lastName}
//                                             onChange={handleInputChange}
//                                             className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div>
//                                         <label className="text-sm text-gray-600">Cuisine Type</label>
//                                         <input
//                                             type="text"
//                                             name="cuisineType"
//                                             value={profile.cuisineType}
//                                             onChange={handleInputChange}
//                                             className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="text-sm text-gray-600">Restaurant Name</label>
//                                         <input
//                                             type="text"
//                                             name="restaurantName"
//                                             value={profile.restaurantName}
//                                             onChange={handleInputChange}
//                                             className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div>
//                                         <label className="text-sm text-gray-600">Address</label>
//                                         <input
//                                             type="text"
//                                             name="address"
//                                             value={profile.address}
//                                             onChange={handleInputChange}
//                                             className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="text-sm text-gray-600">Contact Number</label>
//                                         <input
//                                             type="tel"
//                                             name="contact"
//                                             value={profile.contact}
//                                             onChange={handleInputChange}
//                                             className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div>
//                                         <label className="text-sm text-gray-600">Opening Hour</label>
//                                         <input
//                                             type="text"
//                                             name="openingH"
//                                             value={profile.openingH}
//                                             onChange={handleInputChange}
//                                             className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="text-sm text-gray-600">Closing Hour</label>
//                                         <input
//                                             type="text"
//                                             name="closingH"
//                                             value={profile.closingH}
//                                             onChange={handleInputChange}
//                                             className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div>
//                                         <label className="text-sm text-gray-600">Rating</label>
//                                         <input
//                                             type="number"
//                                             name="rating"
//                                             value={profile.rating}
//                                             onChange={handleInputChange}
//                                             className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                                             step="0.1"
//                                             min="0"
//                                             max="5"
//                                         />
//                                     </div>
//                                 </div>
//                             </>
//                         ) : (
//                             <>
//                                 <h2 className="text-2xl font-bold text-center text-gray-800">
//                                     {profile.firstName} {profile.lastName}
//                                 </h2>
//                                 <p className="text-center text-orange-600 font-semibold">{profile.restaurantName}</p>
//                                 <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
//                                     <p className="text-gray-600"><span className="font-semibold">Cuisine:</span> {profile.cuisineType}</p>
//                                     <p className="text-gray-600"><span className="font-semibold">Address:</span> {profile.address}</p>
//                                     <p className="text-gray-600"><span className="font-semibold">Contact:</span> {profile.contact}</p>
//                                     <p className="text-gray-600"><span className="font-semibold">Opening Hour:</span> {profile.openingH}</p>
//                                     <p className="text-gray-600"><span className="font-semibold">Closing Hour:</span> {profile.closingH}</p>
//                                     <p className="text-gray-600"><span className="font-semibold">Rating:</span> {profile.rating}</p>
//                                 </div>
//                             </>
//                         )}

//                         {isEditing && (
//                             <button
//                                 onClick={() => setIsEditing(false)}
//                                 className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors mt-4"
//                             >
//                                 Save Changes
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </Navbar >

//     );
// };

// export default ProfileCard;
