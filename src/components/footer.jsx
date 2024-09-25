import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-blue-600 to-gray-800 text-white py-6">
      <div className="max-w-[1340px] m-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Stay Connected Section */}
          <div className="mb-4 md:mb-0">
            <h5 className="text-lg font-bold">Stay Connected</h5>
            <p className="text-sm">Follow us on social media for updates and alerts!</p>
            <div className="flex space-x-4 mt-2">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-square fa-lg"></i>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter-square fa-lg"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram-square fa-lg"></i>
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="mb-4 md:mb-0">
            <h5 className="text-lg font-bold">Quick Links</h5>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#cases" className="hover:underline">Cases Analysis</a>
              </li>
              <li>
                <a href="#about" className="hover:underline">About Us</a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="mb-4 md:mb-0">
            <h5 className="text-lg font-bold">Contact Us</h5>
            <p className="text-sm">Email: support@satark.com</p>
            <p className="text-sm">Phone: +1 (234) 567-890</p>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="text-center mt-4 border-t border-gray-600 pt-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Satark. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
