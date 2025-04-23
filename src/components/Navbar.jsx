import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Navigation links
  const navLinks = [
    { to: '/', label: 'Dashboard' },
    { to: '/course-types', label: 'Course Types' },
    { to: '/courses', label: 'Courses' },
    { to: '/offerings', label: 'Offerings' },
    { to: '/registrations', label: 'Registrations' },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <NavLink to="/" className="text-xl font-bold">
              Student Registration
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded hover:bg-blue-700 transition duration-200 ${
                    isActive ? 'bg-blue-700 font-medium' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-600 pb-4 px-4">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded hover:bg-blue-700 transition duration-200 ${
                    isActive ? 'bg-blue-700 font-medium' : ''
                  }`
                }
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;