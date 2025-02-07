import React from 'react';
import { useSelector } from "react-redux";
import { useEffect } from "react";
interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {


  const driver = useSelector((state) => state.dashboard.driver);

  useEffect(() => {
    console.log("firstName", driver);
  }, [driver]); 
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white p-4 flex justify-between items-center shadow-lg z-40 overflow-hidden">
      {/* Left Side: Toggle Button and Circle */}
      <div className="flex items-center space-x-4 relative">
        {/* Circle on the Right of the Menu Button */}
        <div className="w-4 h-4 bg-[#FC8A06] rounded-full opacity-30 absolute left-16 animate-pulse"></div>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg bg-[#FC8A06] hover:bg-[#e67e00] transition-colors duration-300 shadow-md relative z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Right Side: Circle, Dashboard Title, and Profile Picture */}
      <div className="flex items-center space-x-4 relative">
        {/* Circle on the Left of the Dashboard Text */}
        <div className="w-4 h-4 bg-[#028643] rounded-full opacity-30 absolute -left-6 animate-pulse"></div>
        <span className="text-lg font-semibold text-[#03081F]">{driver.firstName + " "+driver.lastName }</span>
        <img
          src="https://cdn.discordapp.com/attachments/1291763293253406832/1291812993738215568/F610CFEB-E0C1-49A7-8AA2-EF016A0E45C2.jpg?ex=67a4f01a&is=67a39e9a&hm=51b137fe9edb55c92b6f3533d299e9eee61c759397300ef8c898327bcba5ce5f&"
          alt="Profile"
          className="rounded-full border-2 border-[#FC8A06] w-[50px] h-[50px] object-cover shadow-md"
        />
      </div>

      {/* Animated Lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Line from Left Circle */}
        <div
          className="h-[2px] bg-[#FC8A06] absolute top-1/2 left-16 animate-moveLineLeft"
          style={{
            width: 'calc(40% - 4rem)',
            transformOrigin: 'left',
            left: '90px',
            animation: 'moveLineLeft 4s linear infinite',
          }}
        ></div>
        {/* Line from Right Circle */}
        <div
          className="h-[2px] bg-[#028643] absolute top-1/2 right-20 animate-moveLineRight"
          style={{
            width: 'calc(32% - 4rem)',
            transformOrigin: 'right',
            right: '200px',
            animation: 'moveLineRight 4s linear infinite',
          }}
        ></div>
      </div>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes moveLineLeft {
          0% {
            transform: scaleX(0);
          }
          50% {
            transform: scaleX(1);
          }
          100% {
            transform: scaleX(0);
          }
        }
        @keyframes moveLineRight {
          0% {
            transform: scaleX(0);
          }
          50% {
            transform: scaleX(1);
          }
          100% {
            transform: scaleX(0);
          }
        }
        @keyframes pulse {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            opacity: 0.3;
          }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
