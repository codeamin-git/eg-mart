import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import logo from '/carts.png'
const Footer = () => {
    return (
        <footer className="bg-black text-white py-6 border-t border-t-yellow-50 mt-6">
        <div className="container mx-auto flex flex-col items-center">
          <div className='flex items-center justify-center gap-4'>
            <img src={logo} alt="logo" className='w-14' />
          <h2 className="text-2xl font-bold mb-4">
            EG Mart
            </h2>
          </div>
          <p className="text-gray-400 mb-6">Your one-stop shop for all things awesome!</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">
              <FaFacebook />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FaInstagram />
            </a>
          </div>
          <p className="text-gray-400 mt-4">&copy; 2024 EG Mart. All rights reserved.</p>
        </div>
      </footer>
    );
};

export default Footer;