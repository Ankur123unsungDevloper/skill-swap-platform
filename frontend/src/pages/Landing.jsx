import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      <Navbar />

      <main className="flex-1 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
          Welcome to Skill Swap
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mb-8">
          A platform to exchange skills with others. Learn, teach, and grow — without spending money.
        </p>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition"
          >
            Sign Up
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
