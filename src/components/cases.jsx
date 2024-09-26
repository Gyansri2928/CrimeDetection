import React from 'react';
import { MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Cases = () => {
  const position = [20.5937, 78.9629]; // Coordinates for India

  return (
    <div className="max-w-full m-auto px-6 py-24 bg-gradient-to-b from-gray-800 to-gray-900 text-white" id="cases">
      <h2 className="text-center text-blue-300 font-bold text-5xl mb-16" id="cases-title">Cases and Crime Analysis</h2>

      <div className="flex justify-center items-center">
        {/* Map Container */}
        <MapContainer center={position} zoom={5} style={{ height: '600px', width: '100%', borderRadius: '15px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default Cases;
