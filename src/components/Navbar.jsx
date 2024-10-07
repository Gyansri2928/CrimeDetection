import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaSearch } from 'react-icons/fa';
import logoImage from '/home/gian/Documents/crimedetect/src/assets/img/WhatsApp_Image_2024-10-05_at_18.28.08-removebg-preview.png';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showSearchInput, setShowSearchInput] = useState(false);
  
  // Scroll progress logic and logo animation
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}`;
      setScrollProgress(scroll);
      
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // Scroll down hides navbar
      } else {
        setShowNavbar(true); // Scroll up shows navbar
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 z-50 w-full h-1 bg-gray-800">
        <div
          style={{ width: `${scrollProgress}%` }}
          className="h-full bg-blue-500 transition-all duration-200 ease-out"
        ></div>
      </div>

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
      <div className={`bg-gray-800 shadow-md py-4 transition-transform duration-300 fixed top-1 left-0 w-full z-10 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container max-w-[1140px] mx-auto flex justify-between items-center">
          {/* Logo with scroll effect */}
          <div className="flex items-center">
            <img
              src={logoImage}
              alt="Logo"
              className={`mr-2 transition-all duration-300 ${showNavbar ? 'h-10' : 'h-8'}`}
            />
            <h1 className="text-2xl font-bold text-white">
              <span className="text-white">Sat</span>
              <span className="text-blue-600">ark</span>
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {['Home', 'About' , 'Crime', 'Cases', 'Testimonials'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="text-gray-200 hover:text-blue-400 transition-all duration-300 relative group"
              >
                {item}
                <span className="block h-1 w-0 bg-blue-600 transition-all duration-300 absolute left-0 bottom-0 top-11 group-hover:w-full"></span>
              </a>
            ))}

            {/* Search bar */}
            <div className="relative">
              {showSearchInput ? (
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-2 py-1 bg-gray-200 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  onBlur={() => setShowSearchInput(false)}
                />
              ) : (
                <FaSearch
                  className="ml-4 cursor-pointer text-gray-200 hover:text-blue-400 transition-all duration-300"
                  onClick={() => setShowSearchInput(true)}
                />
              )}
            </div>
          </div>

          {/* Emergency Call with animation */}
          <div className="flex items-center">
            <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-500 animate-pulse">
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
