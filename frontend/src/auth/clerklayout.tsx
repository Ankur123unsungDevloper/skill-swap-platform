import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ClerkLayoutProps {
  children: ReactNode;
}

const ClerkLayout: React.FC<ClerkLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side */}
      <div className="h-full flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-10">
          <h1 className="font-bold text-3xl text-[#2E2A47]">
            Welcome to SkillSwap!
          </h1>
          <p className="text-base text-[#7E8CA0]">
            Log in or sign up to continue.
          </p>
        </div>
        <div className="w-full max-w-sm mt-6">{children}</div>
      </div>

      {/* Right Side */}
      <div className="h-full bg-gradient-to-b from-white to-blue-50 hidden lg:flex items-center justify-center">
        <Link to="/" className="text-6xl font-bold text-violet-600">
          <span className="text-blue-600">Skill</span>Swap
        </Link>
      </div>
    </div>
  );
};

export default ClerkLayout;
