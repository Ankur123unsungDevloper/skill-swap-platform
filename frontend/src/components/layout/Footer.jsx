import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-center py-4 border-t text-gray-500 text-sm">
      © {new Date().getFullYear()} SkillSwap. All rights reserved.
    </footer>
  );
};

export default Footer;
