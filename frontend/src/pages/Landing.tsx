import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Landing: React.FC = () => {
  return (
    <div className="text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-b from-white to-blue-50 px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Exchange Skills, <span className="text-violet-600">Build Community</span>
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-10 text-lg">
          Connect with talented individuals worldwide. Share your expertise, learn new skills, and grow together in our vibrant skill-sharing community.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 transition">
            Start Swapping Skills →
          </Link>
          <button className="border px-6 py-3 rounded-md text-gray-700 hover:bg-gray-100 transition">
            Watch Demo
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="text-center py-16 px-4">
        <h3 className="text-3xl font-bold mb-4">How SkillSwap Works</h3>
        <p className="text-gray-500 mb-10">Simple, secure, and effective skill exchange in three easy steps</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: 'Create Your Profile',
              desc: 'List your skills, set availability, and tell the community what you want to learn.',
              icon: '👤',
            },
            {
              title: 'Find Perfect Matches',
              desc: 'Search for people with skills you want to learn, filtered by location and availability.',
              icon: '🔍',
            },
            {
              title: 'Start Swapping',
              desc: 'Send swap requests, connect, and begin your skill exchange journey.',
              icon: '💬',
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h4 className="font-semibold text-xl mb-2">{item.title}</h4>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose SkillSwap */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10">
          <div className="flex-1">
            <h3 className="text-3xl font-bold mb-6">Why Choose SkillSwap?</h3>
            <ul className="space-y-4">
              {[
                {
                  title: 'Fast & Efficient',
                  desc: 'Quick matching algorithm finds the perfect skill partners for you.',
                },
                {
                  title: 'Safe & Secure',
                  desc: 'Verified profiles and rating system ensure trustworthy exchanges.',
                },
                {
                  title: 'Global Community',
                  desc: 'Connect with skilled individuals from around the world.',
                },
                {
                  title: 'Quality Assured',
                  desc: 'Rating and feedback system maintains high-quality interactions.',
                },
              ].map((item, i) => (
                <li key={i}>
                  <h4 className="font-semibold text-lg">{item.title}</h4>
                  <p className="text-gray-500">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Demo Profile Card */}
          <div className="bg-white shadow p-6 rounded-lg w-full md:w-[300px]">
            <h4 className="font-semibold text-lg mb-1">Sarah Johnson</h4>
            <p className="text-sm text-gray-500 mb-2">UI/UX Designer</p>
            <p className="font-medium text-sm mb-1">Skills Offered:</p>
            <div className="flex gap-2 flex-wrap text-sm">
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">Photoshop</span>
              <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded">UI Design</span>
            </div>
            <div className="text-yellow-500 mt-3 text-sm">⭐ 4.9 (24 reviews)</div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-900 text-white py-16 text-center px-4">
        <h3 className="text-3xl font-bold mb-4">Ready to Start Your Skill Journey?</h3>
        <p className="text-gray-400 mb-6">Join our growing community of learners and experts. Your next skill is just a swap away.</p>
        <Link
          to="/signup"
          className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-md text-white font-medium"
        >
          Get Started Today →
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
