import React, { useState, useEffect } from 'react';
import IndiaMap from '/home/gian/Documents/crimedetect/src/assets/img/map.png';

// Utility function for counting animation
const useCountUp = (start, end, duration) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const current = Math.min(
        Math.floor((progress / duration) * (end - start) + start),
        end
      );
      setCount(current);
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [start, end, duration]);

  return count;
};

const Cases = ({ ipcCrimes, sllCrimes, totalCrimes }) => {
  // Using useCountUp for counting animation
  const ipcCount = useCountUp(0, ipcCrimes, 1000); 
  const sllCount = useCountUp(0, sllCrimes, 1000);
  const totalCount = useCountUp(0, totalCrimes, 1000);

  return (
    <div className="max-w-full m-auto px-6 py-24 bg-gradient-to-b from-gray-800 to-gray-900 text-white" id="cases">
      <h2 className="text-center text-blue-300 font-bold text-5xl mb-16" id="cases-title">Cases and Crime Analysis</h2>
      
      {/* Crime Data Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-blue-500">
          <h3 className="text-blue-300 font-semibold text-xl mb-4">Total IPC Crimes</h3>
          <p className="text-2xl font-bold">{ipcCount.toLocaleString()}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-blue-500">
          <h3 className="text-blue-300 font-semibold text-xl mb-4">Total SLL Crimes</h3>
          <p className="text-2xl font-bold">{sllCount.toLocaleString()}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-blue-500">
          <h3 className="text-blue-300 font-semibold text-xl mb-4">Total Crimes</h3>
          <p className="text-2xl font-bold">{totalCount.toLocaleString()}</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 text-center text-sm text-gray-400">
        <p>
          Disclaimer: The crime statistics provided above are based on the 2022 data. The numbers represent an approximation and may vary as new data becomes available.
        </p>
      </div>

      {/* Static Image of India with 3D Box Effect */}
      <div className="flex flex-col justify-center items-center mt-12">
        
        {/* Enhanced Heading with Gradient and Fade */}
        <div className="relative group mb-8">
          <p className="text-2xl text-white py-3 px-6 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
            Crime Hotspots in India
          </p>
        </div>

        {/* 3D Map Box with Legend Inside */}
        <div className="relative transform-gpu" style={{ perspective: '1000px' }}>
          <div className="h-[750px] w-[88%] rounded-[15px] shadow-2xl transform rotate-x-6 rotate-y-3 relative">
            <img
              src={IndiaMap}
              alt="Map of India"
              className="h-full w-full rounded-[15px] object-cover"
            />
            
            {/* Legend Section Inside the Map Div */}
            <div className="absolute bottom-6 left-6 bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-white">Highly Unsafe</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
                  <span className="text-white">Unsafe</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-white">Less Safe</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-white">Safe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sample usage of the Cases component with dynamic crime data as props
export default () => (
  <Cases ipcCrimes={1234567} sllCrimes={765432} totalCrimes={2100153} />
);
