import React from 'react';
import useScrollTop from '../../hooks/useScrollTop';
import { cn } from '../../lib/utils';

import NavigationMenuListItems from './_components/menu';
import ActionButton from './_components/action-button';
import Logo from '../logo/Logo'; // Adjust path if needed

const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-[#f0f0f0] fixed top-0 flex items-center w-full p-1 gap-x-8",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <NavigationMenuListItems />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2 relative left-[5px]">
        <ActionButton />
      </div>
    </div>
  );
};

export default Navbar;
