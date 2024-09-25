import React from 'react';
import { FaFacebookSquare, FaTwitterSquare, FaInstagramSquare, FaLinkedin } from 'react-icons/fa';

const SocialMedia = () => {
  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-600 py-6 text-white text-center mb-0">
      <h2 className="text-3xl font-bold mb-4">Connect with Us</h2>
      <p className="mb-6">Follow us for updates and alerts!</p>
      <div className="flex justify-center space-x-6">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookSquare className="text-3xl" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitterSquare className="text-3xl" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagramSquare className="text-3xl" />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-3xl" />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
