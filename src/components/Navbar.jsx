import React, { useState, useEffect } from "react";
import { Ri24HoursFill } from "react-icons/ri";
import {
  FaPhoneAlt,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sticky top-0 bg-gray-800 shadow-lg py-3 w-full h-16 z-50`}>
      <div className="container max-w-[1140px] mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center ml-10">
          <Ri24HoursFill size={30} className="mr-2 text-blue-400" />
          <h1 className="text-2xl font-bold text-white">
            <span className="text-white">Sat</span>
            <span className="text-blue-600">ark</span>
          </h1>
        </div>

        {/* Navigation Links for Desktop */}
        <div className="hidden lg:flex items-center space-x-6">
          <a
            href="/"
            className="text-gray-200 hover:text-blue-400 transition-all duration-300"
          >
            Home
          </a>
          <a
            href="#cases"
            className="text-gray-200 hover:text-blue-400 transition-all duration-300"
          >
            Crime Stats
          </a>
          <a
            href="#about"
            className="text-gray-200 hover:text-blue-400 transition-all duration-300"
          >
            About
          </a>
          <a
            href="#crime"
            className="text-gray-200 hover:text-blue-400 transition-all duration-300"
          >
            Crimes
          </a>
          <a
            href="#reviews"
            className="text-gray-200 hover:text-blue-400 transition-all duration-300"
          >
            Reviews
          </a>
          <a
            href="/detect_criminal"
            className="text-gray-200 hover:text-blue-400 transition-all duration-300"
          >
            Criminal Detector
          </a>
          <FaSearch className="ml-4 cursor-pointer text-gray-200 hover:text-blue-400 transition-all duration-300" />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-gray-200 focus:outline-none mr-10"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Emergency Call Button */}
        <div className="hidden lg:flex items-center">
          <button className="design-btn flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-500">
            <FaPhoneAlt className="mr-2" />
            <p className="text-sm">1-888-817-1234</p>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-gray-800 p-4 lg:hidden">
            <a
              href="/"
              className="block text-gray-200 hover:text-blue-400 transition-all duration-300"
            >
              Home
            </a>
            <a
              href="#about"
              className="block text-gray-200 hover:text-blue-400 transition-all duration-300"
            >
              About
            </a>
            <a
              href="#crime"
              className="block text-gray-200 hover:text-blue-400 transition-all duration-300"
            >
              Crime
            </a>
            <a
              href="/detect_criminal"
              className="block text-gray-200 hover:text-blue-400 transition-all duration-300"
            >
              Criminal Detector
            </a>
            <a
              href="#cases"
              className="block text-gray-200 hover:text-blue-400 transition-all duration-300"
            >
              Cases
            </a>
            <FaSearch className="block ml-4 cursor-pointer text-gray-200 hover:text-blue-400 transition-all duration-300" />

            {/* Emergency Call Button in Mobile Menu */}
            <div className="mt-4">
              <button className="design-btn flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-500 w-full">
                <FaPhoneAlt className="mr-2" />
                <p className="text-sm">1-888-817-1234</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
