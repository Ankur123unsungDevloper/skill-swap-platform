import React from 'react';
import Navbar from './navbar/navbar';
import LandingPage from './(landing-page)/page';
import Footer from './(landing-page)/_components/footer';

const Home = () => {
  return (
    <div
      className="min-h-full flex flex-col"
    >
      <Navbar />

      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <LandingPage />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
