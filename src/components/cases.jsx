import React, { useState, useEffect,useMemo } from 'react';
import { MapContainer, TileLayer, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import IndiaMap from "../assets/img/file.png"
import crimeData from "../assets/data/latest_district_wise_crimes_with_location.json"

// Utility function for counting animation
const useCountUp = (start, end, duration, startCounting) => {
  const [count, setCount] = useState(start);
  
  useEffect(() => {
    if (!startCounting) return; // Skip counting if not in view

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
  }, [start, end, duration, startCounting]);

  return count;
};

const Cases = () => {
  
  let ipc=0;
  let sll=0;
  let total=0;

  if(crimeData)
    crimeData.map((x,i)=>{
      ipc+=x['Total Cognizable IPC crimes per 100K people'];
      sll+=x['Total Cognizable SLL Crimes per 100K people'];
      total+=x['Total Crimes per 100K people'];
    })


  // Coordinates for the map to focus on India
  const position = [20.5937, 78.9629]; // Center coordinates for India

  // Bounding box coordinates to restrict the view to India
  const bounds = [
    [8, 68.1097],  // Southwest corner of India
    [35, 97.3954], // Northeast corner of India
  ];

  // Using useCountUp for counting animation
  const ipcCount = useCountUp(0, ipc, 2000); // Duration is 2000ms (2 seconds)
  const sllCount = useCountUp(0, sll, 2000);
  const totalCount = useCountUp(0, total, 2000);

  return (
    <div
      ref={sectionRef} className="max-w-full m-auto px-6 py-24 bg-gradient-to-b from-gray-800 to-gray-900 text-white"
      id="cases"
    >
      <h2
        className="text-center text-blue-300 font-bold text-5xl mb-16"
        id="cases-title"
      >
        Cases and Crime Analysis
      </h2>

      {/* Crime Data Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-blue-500">
          <h3 className="text-blue-300 font-semibold text-xl mb-4">
            Total IPC Crimes
          </h3>
          <p className="text-2xl font-bold">{ipcCount.toLocaleString()}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-blue-500">
          <h3 className="text-blue-300 font-semibold text-xl mb-4">
            Total SLL Crimes
          </h3>
          <p className="text-2xl font-bold">{sllCount.toLocaleString()}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-blue-500">
          <h3 className="text-blue-300 font-semibold text-xl mb-4">
            Total Crimes
          </h3>
          <p className="text-2xl font-bold">{totalCount.toLocaleString()}</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 text-center text-sm text-gray-400">
        <p>
          Disclaimer: The crime statistics provided above are based on the 2022
          data. The numbers represent an approximation and may vary as new data
          becomes available.
        </p>
      </div>

      {/* Map Container */}
      <div className="flex justify-center items-center mt-12">
        <MapContainer
          center={position}
          zoom={4.5}
          minZoom={5}
          maxZoom={5}
          maxBounds={bounds} // Set the bounds to India
          maxBoundsViscosity={1.0} // Prevent panning outside the bounds
          className="max-xl:w-[80%] max-lg:w-[90%] w-[70%] h-[75vh]"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <ImageOverlay
            url={IndiaMap}
            bounds={[
              [4, 65.19],
              [37.5, 98.7954],
            ]}
            className="opacity-60"
          />
          <div
          className='absolute bottom-3 left-3 z-[1000] bg-white border rounded-md flex flex-col justify-around p-5'
          >
            <div className='flex flex-nowrap justify-between my-1'>
              <div className='bg-green-800 min-w-5 min-h-3 mx-1'></div><div className='text-black'>Safe</div>
            </div>
            <div
              className='flex flex-nowrap justify-between my-1'
            >
              <div className='bg-yellow-300 min-w-5 min-h-3 mx-1'></div><div className='text-black'>Less Safe</div>
            </div>
            <div
              className='flex flex-nowrap justify-between my-1'
            >
              <div className='bg-orange-400 min-w-5 min-h-3 mx-1'></div><div className='text-black'>Unsafe</div>
            </div>
            <div className='flex flex-nowrap justify-between my-1'>
              <div className='bg-red-600 min-w-5 min-h-3 mx-1'></div><div className='text-black'>Highly Unsafe</div>
            </div>
          </div>
          {/* Render polygons using GeoJSON data
          {geographicData && geographicData.features ?
            geographicData.features.map((x,i)=>{
              <GeoJSON data={x} style={{color:x.properties.color,opacity:0.5,weight:2}} />
            })
            :""
          } */}
        </MapContainer>
      </div>
    </div>
  );
};

// Sample usage of the Cases component with dynamic crime data as props
export default () => (
  <Cases  />
);

export default CasesComponent;
