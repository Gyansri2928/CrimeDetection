import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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
  // Coordinates for the map to focus on India
  const position = [20.5937, 78.9629]; // Center coordinates for India

  // Bounding box coordinates to restrict the view to India
  const bounds = [
    [6.4627, 68.1097],  // Southwest corner of India
    [35.5133, 97.3954], // Northeast corner of India
  ];

  // Using useCountUp for counting animation
  const ipcCount = useCountUp(0, ipcCrimes, 2000); // Duration is 2000ms (2 seconds)
  const sllCount = useCountUp(0, sllCrimes, 2000);
  const totalCount = useCountUp(0, totalCrimes, 2000);

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

      {/* Map Container */}
      <div className="flex justify-center items-center mt-12">
        <MapContainer 
          center={position} 
          zoom={4.5 } 
          style={{ height: '500px', width: '77%', borderRadius: '15px' }}
          maxBounds={bounds} // Set the bounds to India
          maxBoundsViscosity={1.0} // Prevent panning outside the bounds
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
    </div>
  );
};

// Sample usage of the Cases component with dynamic crime data as props
export default () => (
  <Cases ipcCrimes={1234567} sllCrimes={765432} totalCrimes={2100153} />
);
