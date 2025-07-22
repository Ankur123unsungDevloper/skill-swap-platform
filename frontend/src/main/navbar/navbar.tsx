import React from 'react';
import { Link } from 'react-router-dom';

import useScrollTop from '../../hooks/use-scroll-top';
import { cn } from '../../lib/utils';

const Navbar: React.FC = () => {
  const scrolled: boolean = useScrollTop();

  return (
    <nav
      className={cn(
        "bg-white w-full sticky top-0 z-50 transition-shadow",
        scrolled && "border-b border-gray-200 shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-violet-600">
          <span className="text-blue-600">Skill</span>Swap
        </Link>

        {/* Right side buttons */}
        <div className="space-x-4">
          <Link
            to="/sign-in"
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
          >
            Login
          </Link>
          <Link
            to="/sign-up"
            className="text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
