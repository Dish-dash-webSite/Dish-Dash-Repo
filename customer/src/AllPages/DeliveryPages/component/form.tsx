import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form: React.FC = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    vehicleType: '',
    licenseNumber: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    vehicleType: '',
    licenseNumber: '',
    agreeToTerms: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear errors when user starts typing
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {
      firstName: !formData.firstName ? 'First Name is required' : '',
      lastName: !formData.lastName ? 'Last Name is required' : '',
      vehicleType: !formData.vehicleType ? 'Vehicle Type is required' : '',
      licenseNumber: !formData.licenseNumber ? 'License Number is required' : '',
      agreeToTerms: !formData.agreeToTerms ? 'You must agree to the terms' : '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Prepare data to send (excluding agreeToTerms)
      const { agreeToTerms, ...dataToSend } = formData;

      // Send POST request with Axios
      const response = await axios.post(
        'http://localhost:3000/api/driver/register',
        dataToSend,
        {
          withCredentials: true, // Include cookies
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', response.data);
      alert('Registration successful!');
      navigate('/delivery/dashboard')

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.vehicleType &&
    formData.licenseNumber &&
    formData.agreeToTerms;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#03081F] to-[#028643] p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-500 hover:scale-105"
      >
        <h2 className="text-3xl font-bold mb-8 text-[#FC8A06] text-center animate-pulse">
          🚚 Delivery Worker Application
        </h2>

        {/* First Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#03081F] mb-2">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-4 py-3 border ${
              errors.firstName ? 'border-red-500' : 'border-[#028643]'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8A06] transition-all`}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#03081F] mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full px-4 py-3 border ${
              errors.lastName ? 'border-red-500' : 'border-[#028643]'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8A06] transition-all`}
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>

        {/* Vehicle Type */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#03081F] mb-2">
            Vehicle Type
          </label>
          <input
            type="text"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            className={`w-full px-4 py-3 border ${
              errors.vehicleType ? 'border-red-500' : 'border-[#028643]'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8A06] transition-all`}
            placeholder="Enter your vehicle type"
          />
          {errors.vehicleType && (
            <p className="text-red-500 text-sm mt-1">{errors.vehicleType}</p>
          )}
        </div>

        {/* License Number */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#03081F] mb-2">
            License Number
          </label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            className={`w-full px-4 py-3 border ${
              errors.licenseNumber ? 'border-red-500' : 'border-[#028643]'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8A06] transition-all`}
            placeholder="Enter your license number"
          />
          {errors.licenseNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.licenseNumber}</p>
          )}
        </div>

        {/* Agree to Terms */}
        <div className="mb-8">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className={`form-checkbox h-5 w-5 ${
                errors.agreeToTerms ? 'border-red-500' : 'border-[#028643]'
              } rounded focus:ring-[#FC8A06] transition-all`}
            />
            <span className="text-sm text-[#03081F]">
              I agree to the terms and service
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`w-full bg-[#FC8A06] text-white py-3 px-4 rounded-lg ${
            isFormValid && !isSubmitting
              ? 'hover:bg-[#028643] transform hover:scale-105'
              : 'opacity-50 cursor-not-allowed'
          } transition-all duration-300`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default Form;