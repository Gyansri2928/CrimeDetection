import React from 'react';
import { Ri24HoursFill } from 'react-icons/ri';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaSearch,
} from 'react-icons/fa';

const Navbar = () => {
  return (
    <div>
      {/* Top Bar */}
      <div className="bg-gray-900 py-2 text-sm text-white">
        <div className="container max-w-[1140px] mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>We Solved 2900+ Cases With Honesty!</span>
            <span className="flex items-center">
              <FaMapMarkerAlt className="mr-1" /> 25/B Milford Road, New York
            </span>
            <span className="flex items-center">
              <FaEnvelope className="mr-1" /> info@example.com
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Follow Us:</span>
            <a href="/" className="text-white hover:text-gray-400">
              <FaFacebookF />
            </a>
            <a href="/" className="text-white hover:text-gray-400">
              <FaTwitter />
            </a>
            <a href="/" className="text-white hover:text-gray-400">
              <FaInstagram />
            </a>
            <a href="/" className="text-white hover:text-gray-400">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-white shadow py-4">
        <div className="container max-w-[1140px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Ri24HoursFill size={30} className="mr-2 text-blue-400" />
            <h1 className="text-xl font-bold">
              <span className="text-black">Sat</span>
              <span className="text-blue-600">ark</span>
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <a href="/" className="text-gray-800 hover:text-blue-600">Home</a>
            <a href="#city" className="text-gray-800 hover:text-blue-600">City</a>
            <a href="#crime" className="text-gray-800 hover:text-blue-600">Crime</a>
            <a href="#cases" className="text-gray-800 hover:text-blue-600">Cases</a>
            <FaSearch className="ml-4 cursor-pointer text-gray-800 hover:text-blue-600" />
          </div>

          {/* Emergency Call */}
          <div className="flex items-center">
            <button className="flex items-center bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg">
              <FaPhoneAlt className="mr-2" />
              <p className='text-sm'>1-888-817-1234</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
