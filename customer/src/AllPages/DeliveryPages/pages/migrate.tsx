import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyDriver } from '../../../store/driverThunks'; // Adjust the import path as needed
import { clearError } from '../../../store/driverSlice'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

const Migrate: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isVerified = useSelector((state: any) => state.driver.isVerified);
  const isLoading = useSelector((state: any) => state.driver.isLoading);
  const error = useSelector((state: any) => state.driver.error);

  useEffect(() => {
    dispatch(verifyDriver());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error('Error verifying driver:', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    // Check if isVerified is available and not loading
    if (!isLoading && isVerified) {
      if (isVerified.isDriver) {
        navigate('/delivery/dashboard');
      }
    }
    console.log("isLoading", isLoading);
    console.log("isVerified", isVerified);
    if (!isLoading && !isVerified) {
     if (!isLoading && isVerified) { // isVerified is now a boolean
  navigate('/delivery/dashboard');
} else {
        navigate('/delivery/form');
      }
    }
  }, [isVerified, isLoading, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      {isLoading ? (
        <div className="text-center space-y-8">
          {/* Animated Logo */}
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FC8A06] to-[#028643] rounded-full animate-spin-slow"></div>
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-[#028643]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>

          {/* Loading Text */}
          <h1 className="text-3xl font-bold text-gray-800 animate-pulse">
            Welcome to the Driver Squad...
          </h1>

          {/* Animated Dots */}
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-[#FC8A06] rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-[#028643] rounded-full animate-bounce delay-200"></div>
            <div className="w-3 h-3 bg-[#FC8A06] rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-8 animate-fade-in">
          {/* Content when not loading */}
        </div>
      )}
    </div>
  );
};

export default Migrate;