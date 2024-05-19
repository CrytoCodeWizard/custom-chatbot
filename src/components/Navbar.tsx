import React from 'react';
import { useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const getTitle = () => {
    switch(location.pathname) {
      case '/explore':
        return 'Explore';
      case '/create-bot':
        return 'Create Bot';
      default:
        return 'TopDown AI';
    }
  }
  
  return (
    <nav className="bg-[#181818] shadow-md px-4 py-2 flex justify-between items-center sticky w-full h-16 z-10 top-0">
      <h1 className="text-xl font-bold text-gray-800 text-white">
        { getTitle() }
      </h1>
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-4 mt-2 sm:mt-0 px-4">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="user avatar"
            className="h-10 w-10 rounded-full object-cover border-2 border-gray-300"
          />
          <span className="text-gray-800 font-medium text-white">
            Fujii Hachiro
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;