import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { fetchProfile, updateProfile } from '../../../store/profileThunks';
import { Camera, Mail, Phone, MapPin, Globe, Save } from 'lucide-react';
import { RootState } from '../../../store';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state: RootState) => state.profile.profile);
  const loading = useAppSelector((state: RootState) => state.profile.loading);
  const error = useAppSelector((state: RootState) => state.profile.error);

  const [formState, setFormState] = useState(profile || {});
  const [isEditing, setIsEditing] = useState(false);
  
  // New state for password update
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormState(profile);
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormState(prev => prev ? ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }) : null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'oldPassword') setOldPassword(value);
    if (name === 'newPassword') setNewPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Old Password:', oldPassword);

    try {
      // Verify old password
      const response = await fetch('http://localhost:3000/api/users/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Remove the 'credentials' header as it's not a valid header
          'Authorization': `Bearer ${document.cookie.split('token=')[1]?.split(';')[0] || ''}`
        },
        credentials: 'include', // This is enough for including cookies
        body: JSON.stringify({ oldPassword }) // Remove userId from body as we'll get it from token
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
        return;
      }

      // If old password is verified, proceed to update the profile
      if (newPassword !== confirmPassword) {
        alert('New passwords do not match.');
        return;
      }

      dispatch(updateProfile({ 
        ...formState, 
        password: newPassword // Send the new password
      }))
      .unwrap()
      .then(() => {
        setIsEditing(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        alert('Profile updated successfully!');
      })
      .catch(err => {
        console.error('Failed to update profile:', err);
        alert('Failed to update profile. Please try again.');
      });

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to verify password. Please try again.');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-orange-500 text-xl">Loading...</div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-red-500 text-xl">Error: {error}</div>
    </div>
  );
  
  if (!profile) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-500 text-xl">No profile data available</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="bg-orange-500 rounded-t-lg px-4 py-5 sm:px-6">
            <h2 className="text-xl font-bold text-white">Profile Settings</h2>
            <p className="mt-1 text-sm text-orange-100">
              Update your personal information and preferences
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Avatar Section */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="relative">
                <img
                  src={profile.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                  alt={profile.firstName}
                  className="h-24 w-24 rounded-full object-cover border-4 border-orange-100"
                />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full text-white hover:bg-orange-600 transition-colors duration-200"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p className="text-sm text-gray-500">{profile.email}</p>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="text"
                      name="firstName"
                      value={formState?.firstName || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="text"
                      name="lastName"
                      value={formState?.lastName || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formState?.email || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="block w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formState?.phoneNumber || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="block w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="deliveryAddress"
                      value={formState?.deliveryAddress || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="block w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Password Update Section */}
            <div className="space-y-6 mt-8">
              <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Old Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={handlePasswordChange}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handlePasswordChange}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end space-x-4">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;


// // pages/ProfilePage.tsx
// import React, { useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../../../store';
// import { fetchProfile, updateProfile } from '../../../store/profileThunks';
// import { Camera, Mail, Phone, MapPin, Globe, Save } from 'lucide-react';
// import { RootState } from '../../../store';

// const Profile: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const profile = useAppSelector((state: RootState) => state.profile.profile);
//   const loading = useAppSelector((state: RootState) => state.profile.loading);
//   const error = useAppSelector((state: RootState) => state.profile.error);

//   console.log('Profile:', profile);
//   console.log('Loading:', loading);
//   console.log('Error:', error);

//   const [formState, setFormState] = useState(profile || {});
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     dispatch(fetchProfile());
//   }, [dispatch]);

//   useEffect(() => {
//     if (profile) {
//       setFormState(profile);
//     }
//   }, [profile]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     setFormState(prev => prev ? ({
//       ...prev,
//       [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
//     }) : null);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     dispatch(updateProfile(formState))
//       .unwrap()
//       .then(() => {
//         setIsEditing(false);
//       })
//       .catch(err => {
//         console.error('Failed to update profile:', err);
//       });
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!profile) return <div>No profile data available</div>;

//   return (
//     <div className="p-4">
//       <div className="max-w-2xl mx-auto bg-white shadow rounded-lg">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">Profile Information</h2>
//             <button 
//               onClick={() => setIsEditing(!isEditing)} 
//               className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               {isEditing ? 'Cancel' : 'Edit Profile'}
//             </button>
//           </div>
          
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="flex items-center">
//               <Mail className="w-5 h-5 mr-2" />
//               <span className="font-medium">Email:</span>
//               {isEditing ? (
//                 <input
//                   type="email"
//                   name="email"
//                   value={formState?.email || ''}
//                   onChange={handleInputChange}
//                   className="ml-2 px-2 py-1 border rounded"
//                 />
//               ) : (
//                 <span className="ml-2">{profile.email}</span>
//               )}
//             </div>

//             <div className="flex items-center">
//               <Phone className="w-5 h-5 mr-2" />
//               <span className="font-medium">Phone:</span>
//               {isEditing ? (
//                 <input
//                   type="tel"
//                   name="phoneNumber"
//                   value={formState?.phoneNumber || ''}
//                   onChange={handleInputChange}
//                   className="ml-2 px-2 py-1 border rounded"
//                 />
//               ) : (
//                 <span className="ml-2">{profile.phoneNumber || 'Not provided'}</span>
//               )}
//             </div>

//             <div className="flex items-center">
//               <span className="font-medium">First Name:</span>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formState?.firstName || ''}
//                   onChange={handleInputChange}
//                   className="ml-2 px-2 py-1 border rounded"
//                 />
//               ) : (
//                 <span className="ml-2">{profile.firstName}</span>
//               )}
//             </div>

//             <div className="flex items-center">
//               <span className="font-medium">Last Name:</span>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formState?.lastName || ''}
//                   onChange={handleInputChange}
//                   className="ml-2 px-2 py-1 border rounded"
//                 />
//               ) : (
//                 <span className="ml-2">{profile.lastName}</span>
//               )}
//             </div>

//             <div className="flex items-center">
//               <MapPin className="w-5 h-5 mr-2" />
//               <span className="font-medium">Delivery Address:</span>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name="deliveryAddress"
//                   value={formState?.deliveryAddress || ''}
//                   onChange={handleInputChange}
//                   className="ml-2 px-2 py-1 border rounded"
//                 />
//               ) : (
//                 <span className="ml-2">{profile.deliveryAddress || 'Not provided'}</span>
//               )}
//             </div>

//             {isEditing && (
//               <div className="flex justify-end mt-4">
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
//                 >
//                   <Save className="w-4 h-4 mr-2" />
//                   Save Changes
//                 </button>
//               </div>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
