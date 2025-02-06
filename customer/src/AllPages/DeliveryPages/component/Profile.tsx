import React, { useState } from 'react';
import { FaUser, FaCar, FaIdCard, FaLock, FaEdit } from 'react-icons/fa';

const Profile: React.FC = () => {
  // Fake data
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    vehicleType: 'Sedan',
    licenseNumber: 'ABC123',
    password: 'Password123!', // Fake password (not shown directly)
  });

  const [editingField, setEditingField] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);

    return { hasMinLength, hasSpecialChar, hasUppercase };
  };

  const { hasMinLength, hasSpecialChar, hasUppercase } = validatePassword(newPassword);

  const getPasswordStrengthColor = () => {
    const strength = [hasMinLength, hasSpecialChar, hasUppercase].filter(Boolean).length;
    if (strength === 0) return 'bg-red-500';
    if (strength === 1) return 'bg-yellow-500';
    if (strength === 2) return 'bg-yellow-300';
    if (strength === 3) return 'bg-green-500';
  };

  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;

  const handleEditClick = (field: string) => {
    setEditingField(field);
  };

  const handleSave = () => {
    if (editingField === 'password') {
      // Validate current password (fake validation for now)
      if (currentPassword !== userData.password) {
        alert('Current password is incorrect');
        return;
      }
      // Update password (fake update for now)
      setUserData({ ...userData, password: newPassword });
    } else {
      // Update other fields (fake update for now)
      setUserData({ ...userData, [editingField as keyof typeof userData]: newPassword });
    }
    setEditingField(null);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-[120px]">{/* Moved further down */}
      <div className="bg-white rounded-lg shadow-2xl p-8 w-[600px] transform transition-all duration-500 hover:scale-105">
        <div className="text-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto border-4 border-[#FC8A06]"
          />
          <h1 className="text-3xl font-bold mt-4 text-[#03081F]">
            {userData.firstName} {userData.lastName}
          </h1>
        </div>

        <div className="mt-6 space-y-4">
          {/* First Name */}
          <div className="flex items-center space-x-4">
            <FaUser className="text-[#FC8A06] w-6 h-6" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              {editingField === 'firstName' ? (
                <input
                  type="text"
                  value={userData.firstName}
                  onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8A06]"
                />
              ) : (
                <p className="text-gray-900">{userData.firstName}</p>
              )}
            </div>
            <button
              onClick={() => handleEditClick('firstName')}
              className="text-[#FC8A06] hover:text-[#028643] transition-all duration-300"
            >
              <FaEdit />
            </button>
          </div>

          {/* Last Name */}
          <div className="flex items-center space-x-4">
            <FaUser className="text-[#FC8A06] w-6 h-6" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              {editingField === 'lastName' ? (
                <input
                  type="text"
                  value={userData.lastName}
                  onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8A06]"
                />
              ) : (
                <p className="text-gray-900">{userData.lastName}</p>
              )}
            </div>
            <button
              onClick={() => handleEditClick('lastName')}
              className="text-[#FC8A06] hover:text-[#028643] transition-all duration-300"
            >
              <FaEdit />
            </button>
          </div>

          {/* Vehicle Type */}
          <div className="flex items-center space-x-4">
            <FaCar className="text-[#FC8A06] w-6 h-6" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
              {editingField === 'vehicleType' ? (
                <input
                  type="text"
                  value={userData.vehicleType}
                  onChange={(e) => setUserData({ ...userData, vehicleType: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8A06]"
                />
              ) : (
                <p className="text-gray-900">{userData.vehicleType}</p>
              )}
            </div>
            <button
              onClick={() => handleEditClick('vehicleType')}
              className="text-[#FC8A06] hover:text-[#028643] transition-all duration-300"
            >
              <FaEdit />
            </button>
          </div>

          {/* License Number */}
          <div className="flex items-center space-x-4">
            <FaIdCard className="text-[#FC8A06] w-6 h-6" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">License Number</label>
              {editingField === 'licenseNumber' ? (
                <input
                  type="text"
                  value={userData.licenseNumber}
                  onChange={(e) => setUserData({ ...userData, licenseNumber: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8A06]"
                />
              ) : (
                <p className="text-gray-900">{userData.licenseNumber}</p>
              )}
            </div>
            <button
              onClick={() => handleEditClick('licenseNumber')}
              className="text-[#FC8A06] hover:text-[#028643] transition-all duration-300"
            >
              <FaEdit />
            </button>
          </div>

          {/* Password Section */}
          {editingField === 'password' && (
            <>
              <div className="flex items-center space-x-4">
                <FaLock className="text-[#FC8A06] w-6 h-6" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8A06]"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FaLock className="text-[#FC8A06] w-6 h-6" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8A06]"
                  />
                  {newPassword && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div
                        className={`h-2.5 rounded-full ${getPasswordStrengthColor()}`}
                        style={{ width: `${([hasMinLength, hasSpecialChar, hasUppercase].filter(Boolean).length / 3) * 100}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FaLock className="text-[#FC8A06] w-6 h-6" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8A06]"
                  />
                  {confirmPassword && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div
                        className={`h-2.5 rounded-full ${passwordsMatch ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Edit Password Button */}
          {editingField !== 'password' && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => handleEditClick('password')}
                className="bg-[#FC8A06] text-white px-6 py-2 rounded-lg hover:bg-[#028643] transition-all duration-300"
              >
                Change Password
              </button>
            </div>
          )}

          {/* Save Button (visible only when editing) */}
          {editingField && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSave}
                className="bg-[#FC8A06] text-white px-6 py-2 rounded-lg hover:bg-[#028643] transition-all duration-300"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;