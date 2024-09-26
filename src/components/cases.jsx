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

      {/* Static Image of India with Caption */}
      
      <div className="flex flex-col justify-center items-center mt-12">
      <p className="mt-4 text-2xl text-blue-300">Crime Hotspots in India</p>
        <img
          src={IndiaMap} // Replace with the correct path to the image
          alt="Map of India"
          className="h-[750px] w-[77%] rounded-[15px] hover:shadow-lg" 
        />
        <div className="mt-12 bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
            <span className="text-white">Highly Unsafe</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-orange-300 rounded-full mr-2"></div>
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

      {/* Legend Section */}
      
    </div>
  );
};

// Sample usage of the Cases component with dynamic crime data as props
export default () => (
  <Cases ipcCrimes={1234567} sllCrimes={765432} totalCrimes={2100153} />
);
