import React from 'react';

const About = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 py-16" id="about">
      <div className="max-w-[1340px] m-auto px-4">
        <h2 className="text-center text-blue-300 font-bold text-5xl mb-8">About Us</h2>
        <p className="text-center text-lg mb-6">
          At Satark, we believe that safety is a fundamental right. Our mission is to empower communities through advanced technology and real-time surveillance, ensuring that potential threats are detected and managed proactively.
        </p>
        
        {/* New Tagline */}
        <p className="text-center text-xl italic text-blue-300 mb-8">
          With Satark, you are never alone in safeguarding yourself and your community.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-blue-500">
            <h3 className="text-blue-300 font-semibold text-xl mb-4">Our Vision</h3>
            <p>
              We envision a world where everyone can live without fear. Our innovative solutions leverage cutting-edge technology to foster a safer environment for all.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-blue-500">
            <h3 className="text-blue-300 font-semibold text-xl mb-4">Our Technology</h3>
            <p>
              Utilizing state-of-the-art algorithms and machine learning, our application can detect suspicious activities in real time, providing crucial information to law enforcement and community members.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-blue-500">
            <h3 className="text-blue-300 font-semibold text-xl mb-4">Community Engagement</h3>
            <p>
              We believe in collaboration. Our platform encourages community participation, enabling individuals to report incidents and share information to enhance public safety.
            </p>
          </div>
        </div>
        <div className="text-center mt-10">
          <h3 className="text-lg font-bold text-blue-300 mb-4">Join Us in Making Our Communities Safer!</h3>
          <p>
            Together, we can create a vigilant and responsive society. Explore our application and discover how you can be part of the change.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
