import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center flex-col md:flex-row">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Real Estate</h2>
            <p className="text-sm">Tüm hakları saklıdır © {new Date().getFullYear()}</p>
          </div>
          <nav className="flex space-x-6 mb-4 md:mb-0">

          </nav>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-indigo-400 transition duration-300">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-indigo-400 transition duration-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-indigo-400 transition duration-300">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
