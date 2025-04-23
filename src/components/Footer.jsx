import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>Created by Mayank Jain | &copy; {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;