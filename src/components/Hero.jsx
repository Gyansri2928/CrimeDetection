import React, { useState } from 'react';
import Typewriter from 'react-typewriter-effect';
import image2 from '/home/gian/Documents/crimedetect/src/assets/img/02.jpeg';
import image4 from '/home/gian/Documents/crimedetect/src/assets/img/04.jpeg';
import image6 from '/home/gian/Documents/crimedetect/src/assets/img/06.jpeg';
import './hero.css'; // Ensure your CSS file is correctly imported

const Hero = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleCameraAccess = () => {
    setIsCameraActive(!isCameraActive);
  };

  return (
    <div className='w-full h-[110vh] relative'>
      <img
        src='https://as2.ftcdn.net/v2/jpg/05/54/05/31/1000_F_554053185_2fWwExa3uyXMxlhp1FDc4kgEjv1FA2W2.jpg'
        alt='Background'
        className='w-full h-full object-cover'
      />

      {/* Fading Gradient Effect at the Bottom */}
      <div className='absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10'></div>

      <div className='max-w-[1140px] m-auto z-20'>
        <div className='absolute top-[40%] w-full max-w-[600px] h-full flex flex-col text-white'>
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

      {/* Police Line "Do Not Cross" Banner with Hanging Strings */}
      <div className='absolute top-[7%] left-[53%] w-[40%] h-[40px] bg-yellow-500 flex items-center justify-center z-30 rounded-lg shadow-lg'>
        <div className='absolute top-[-40px] left-0 right-0 flex justify-between'>
          {/* Left string */}
          <div className='w-1 bg-gray-600 h-10'></div>
          {/* Right string */}
          <div className='w-1 bg-gray-600 h-10'></div>
        </div>
        <p className='text-black font-bold text-xl uppercase tracking-wide text-center'>
          Police Line Do Not Cross
        </p>
        <div className='absolute w-full h-full bg-black bg-opacity-50 rounded-lg'></div>
      </div>

      {/* Wanted List Section */}
      <div className='absolute top-[15%] right-[6%] flex space-x-4 z-20'>
        {/* Wanted Posters */}
        {[
          { img: image6, name: 'DD Tiwari', description: 'Armed and Dangerous' },
          { img: image4, name: 'System', description: 'Escaped Prisoner' },
          { img: image2, name: 'Maulana Srijan', description: 'Maksad Specialist' },
        ].map((criminal, index) => (
          <div key={index} className='relative perspective w-44 h-60'>
            {/* Thread Animation */}
            <div className='absolute left-1/2 top-10 transform -translate-x-1/2 h-12 bg-gray-800'></div>
            <div className='flip-container animate-swing'>
              <div className='flipper'>
                {/* Front Side */}
                <div className='front bg-gray-800 bg-opacity-80 border-4 border-gray-600 rounded-lg shadow-lg flex flex-col items-center justify-between p-3'>
                  <h3 className='text-lg font-bold text-red-400'>WANTED</h3>
                  <img
                    src={criminal.img}
                    alt={`Criminal: ${criminal.name}`}
                    className='w-full h-28 object-fit border-2 border-gray-500 rounded-md'
                  />
                  <p className='text-md font-semibold text-gray-300'>{criminal.name}</p>
                  <p className='text-sm text-gray-500 italic'>{criminal.description}</p>
                </div>

                {/* Back Side */}
                <div className='back bg-gray-700 bg-opacity-90 border-4 border-gray-600 rounded-lg shadow-lg flex flex-col items-center justify-center p-3'>
                  <h3 className='text-lg font-bold text-yellow-400'>Details</h3>
                  <p className='text-md text-gray-300'>Known for: Theft, Assault</p>
                  <p className='text-md text-gray-300'>Last seen in: Downtown</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Camera Access Box */}
      <div className='absolute top-[55%] right-20 w-[35%] h-[400px] border-4 border-white bg-black bg-opacity-70 shadow-lg p-6 flex flex-col items-center justify-between rounded-lg z-20'>
        {isCameraActive && (
          <div className='absolute top-4 left-4 flex items-center'>
            <div className='w-3 h-3 bg-red-600 rounded-full animate-pulse mr-2'></div>
            <span className='text-red-400 font-semibold'>Live</span>
          </div>
        )}
        <h3 className='text-white text-2xl mb-4 font-semibold'>Activate Camera</h3>
        
        {/* Button with red Stop Camera effect */}
        <button
          onClick={handleCameraAccess}
          className={`${
            isCameraActive ? 'bg-red-600' : 'bg-blue-600'
          } text-white text-lg font-bold py-3 px-8 rounded-full hover:scale-105 transition-all duration-300 transform ease-in-out`}
        >
          {isCameraActive ? 'Stop' : 'Start Camera'}
        </button>
      </div>

      {/* Gradient Ending the Hero Section */}
      <div className='absolute bottom-0 w-full h-20 bg-gradient-to-t from-gray-900 to-transparent'></div>
    </div>
  );
};

export default Hero;
