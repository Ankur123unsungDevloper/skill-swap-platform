import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-700">SkillSwap</Link>
      <div className="space-x-4">
        <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
