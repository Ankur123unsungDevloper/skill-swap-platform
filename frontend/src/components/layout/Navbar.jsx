import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="flex justify-between items-center p-6 bg-white shadow">
      <h1 className="text-2xl font-bold text-violet-600">
        <span className="text-blue-600">Skill</span>Swap
      </h1>
      <Link
        to="/signup"
        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Get Started
      </Link>
    </header>
  );
};

export default Navbar;
