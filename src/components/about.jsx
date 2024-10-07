import React, { useState, useEffect, useRef } from 'react';
import gif1 from "/home/gian/Documents/crimedetect/src/gif/project.gif";
import staticImage from "/home/gian/Documents/crimedetect/src/assets/img/download.png"; // Add a static image preview if needed

const About = () => {
  const [showGif, setShowGif] = useState(false); // Manage GIF visibility
  const [showText, setShowText] = useState(false); // Manage scroll animation for text

  const textRef = useRef(null); // Reference for the text to animate

  const handlePlayButtonClick = () => {
    setShowGif(true); // Show the GIF when the play button is clicked
  };

  const handleStopButtonClick = () => {
    setShowGif(false); // Hide the GIF when the stop button is clicked
  };

  useEffect(() => {
    const currentTextRef = textRef.current; // Save the current ref value
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setShowText(entry.isIntersecting);
      },
      {
        threshold: 0.2, // Trigger animation when 20% of the section is visible
      }
    );
    
    if (currentTextRef) {
      observer.observe(currentTextRef);
    }

    return () => {
      if (currentTextRef) {
        observer.unobserve(currentTextRef);
      }
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 py-16" id="about">
      <div className="max-w-[1340px] m-auto px-4">
        <h2 className="text-center text-blue-300 font-bold text-5xl mb-8">About Us</h2>
        <p className={`text-center text-lg mb-6 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700`} ref={textRef}>
          At Satark, we believe that safety is a fundamental right. Our mission is to empower communities through advanced technology and real-time surveillance, ensuring that potential threats are detected and managed proactively.
        </p>
        
        {/* New Tagline */}
        <p className={`text-center text-xl italic text-blue-300 mb-8 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700 delay-200`} ref={textRef}>
          With Satark, you are never alone in safeguarding yourself and your community.
        </p>
        
        {/* Smaller GIF Section with Play and Stop Buttons */}
        <div className="text-center mb-8">
          <h3 className="text-2xl text-blue-300 font-semibold mb-4">See Satark in Action!</h3>
          <div className="inline-block relative group">
            <div className="relative rounded-lg shadow-lg border-2 border-transparent border-image-linear from-blue-500 to-purple-500 via-pink-500 bg-gradient-to-r p-1">
              {showGif ? (
                <div className="flex flex-col items-center justify-center" style={{ maxWidth: '1400px', height: 'auto' }}>
                  <img
                    src={gif1} // Use GIF directly for a more engaging view
                    alt="Satark Working Demo"
                    className="rounded-lg"
                    style={{ maxWidth: '800px', height: 'auto' }} // Set a fixed width for smaller size
                  />
                  <button
                    onClick={handleStopButtonClick}
                    className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    ■ Stop
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center" style={{ maxWidth: '800px', height: 'auto' }}>
                  <img
                    src={staticImage} // Optional static image preview
                    alt="Static Preview"
                    className="rounded-lg"
                    style={{ maxWidth: '400px', height: 'auto' }} // Adjust size as needed
                  />
                  <button
                    onClick={handlePlayButtonClick}
                    className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    ▶ Play
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

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
