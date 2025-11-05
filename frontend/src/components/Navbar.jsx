import React, { useState } from 'react';
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Men', path: '/men' },
    { name: 'Women', path: '/women' },
    { name: 'Sale', path: '/sale' },
  ];

  const secondaryLinks = [
    { name: 'Our Stores', path: '/stores' },
    { name: 'About', path: '/about' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="relative mx-auto max-w-[2560px] overflow-hidden bg-white px-5 py-3 lg:px-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-1">
            <Link to="/" className="inline-block">
              <span className="text-xl font-bold">LOGO</span>
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex flex-1 justify-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-sm font-medium uppercase tracking-wider hover:text-gray-600"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4 text-sm">
              {secondaryLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="hover:underline"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/search" className="p-2 hover:text-gray-600">
                <FiSearch size={20} />
              </Link>
              <Link to="/account" className="p-2 hover:text-gray-600 hidden lg:block">
                <FiUser size={20} />
              </Link>
              <Link to="/cart" className="p-2 relative hover:text-gray-600">
                <FiShoppingBag size={20} />
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-gray-900 lg:hidden"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={`mobile-${link.name}`}
                to={link.path}
                className="block py-2 text-gray-700 hover:bg-gray-100 px-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-gray-200 my-2"></div>
            {secondaryLinks.map((link) => (
              <Link 
                key={`mobile-secondary-${link.name}`}
                to={link.path}
                className="block py-2 text-gray-700 hover:bg-gray-100 px-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-gray-200 my-2"></div>
            <Link 
              to="/account"
              className="flex items-center py-2 text-gray-700 hover:bg-gray-100 px-2 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FiUser className="mr-2" /> My Account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
