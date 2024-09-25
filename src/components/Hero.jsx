import React, { useState } from 'react';
import Typewriter from 'react-typewriter-effect';

const Hero = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleCameraAccess = () => {
    setIsCameraActive(!isCameraActive);
    // Camera access logic here
  };

  return (
    <div className='w-full h-[90vh] relative'>
      <img
        src='https://as2.ftcdn.net/v2/jpg/05/54/05/31/1000_F_554053185_2fWwExa3uyXMxlhp1FDc4kgEjv1FA2W2.jpg'
        alt='/'
        className='w-full h-full object-cover'
      />

      {/* Fading Gradient Effect at the Bottom */}
      <div className='absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10'></div>
      
      <div className='max-w-[1140px] m-auto z-20'>
        <div className='absolute top-[40%] w-full md:-[50%] max-w-[600px] h-full flex flex-col text-white'>
          <h1 className='font-bold text-4xl hero-text'>
            <Typewriter
              text="Detect Threats Before They Escalate"
              cursorColor="#fff"
              typeSpeed={50}
              startDelay={500}
              cursorBlinking={false}
            />
          </h1>
          <h2 className='text-4xl py-4 italic'>Innovative Solutions for Safer Environments</h2>
        </div>
      </div>

      {/* Camera Access Box */}
      <div className='absolute top-[40%] right-20 w-[35%] h-[400px] border-4 border-white bg-black bg-opacity-70 shadow-lg p-6 flex flex-col items-center justify-between rounded-lg z-20'>
        {/* Live Indicator */}
        {isCameraActive && (
          <div className='absolute top-4 left-4 flex items-center'>
            <div className='w-3 h-3 bg-red-600 rounded-full animate-pulse mr-2'></div>
            <span className='text-red-400 font-semibold'>Live</span>
          </div>
        )}
        <h3 className='text-white text-2xl mb-4 font-semibold'>Activate Camera</h3>
        
        {/* Button Position Adjusted */}
        <button
          onClick={handleCameraAccess}
          className={`${
            isCameraActive ? 'bg-red-600' : 'bg-blue-600'
          } text-white text-lg font-bold py-3 px-8 rounded-full hover:scale-105 transition-all duration-300 transform ease-in-out`}
        >
          {isCameraActive ? 'Stop Camera' : 'Start Camera'}
        </button>
      </div>

      {/* Gradient Ending the Hero Section */}
      <div className='absolute bottom-0 w-full h-20 bg-gradient-to-t from-gray-900 to-transparent'></div>
    </div>
  );
};

export default Hero;
