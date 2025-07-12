import React from 'react';
import { Link } from 'react-router-dom';

const ClerkLayout = ({ children }) => {
  return (
    <div
      className="min-h-screen grid grid-cols-1 lg:grid-cols-2"
    >
      {/* Left Side */}
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-[#2E2A47]">
            Welcome Back to our platform!
          </h1>
          <p className="text-base text-[#7E8CA0]">
            Log in to get back to your dashboard!
          </p>
        </div>
        {children}
      </div>

      {/* Right Side (Logo / Image) */}
      <div className="h-full bg-gradient-to-b from-white to-blue-50 hidden lg:flex items-center justify-center">
        <Link to="/" className="text-6xl font-bold text-violet-600">
          <span className="text-blue-600">Skill</span>Swap
        </Link>
      </div>
    </div>
  );
};

export default ClerkLayout;
