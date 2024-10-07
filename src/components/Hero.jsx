import React, { useEffect, useState } from "react";
import Typewriter from "react-typewriter-effect";
import image2 from "../assets/img/02.jpeg";
import image4 from "../assets/img/04.jpeg";
import image6 from "../assets/img/06.jpeg";
import image2 from '/home/gian/Documents/crimedetect/src/assets/img/02.jpeg';
import image4 from '/home/gian/Documents/crimedetect/src/assets/img/04.jpeg';
import image6 from '/home/gian/Documents/crimedetect/src/assets/img/06.jpeg';
import './hero.css'; // Ensure your CSS file is correctly imported

const Hero = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);

  useEffect(() => {});

  const handleCameraAccess = async () => {
    if (!isCameraActive) {
      const res = await fetch("/start-camera", { method: "POST" });
      const data = await res.json();
      if (
        data.status === "started" ||
        data.status === "already started" ||
        data.status === "error"
      )
        setIsCameraActive(true);
    } else {
      const res = await fetch("/stop-camera", { method: "POST" });
      const data = await res.json();
      if (data.status === "stopped") setIsCameraActive(false);
    }
  };

  const toggleScreen = (e) => {
    const liveContainer = document.getElementById("liveContainer");
    document.getElementById("fade").classList.toggle("hidden");
    document.getElementById("fade").classList.toggle("fixed");
    liveContainer.classList.toggle("fixed");
    liveContainer.classList.toggle("top-[12%]");
    liveContainer.classList.toggle("left-1/2");
    liveContainer.classList.toggle("-translate-x-1/2");
    liveContainer.classList.toggle("-translate-y-[12%]");
    liveContainer.classList.toggle("w-[80%]");
    liveContainer.classList.toggle("h-[80%]");
  };

  return (
    <>
      <div
        className="fade hidden top-0 left-0 w-full h-full z-10 bg-black opacity-80"
        id="fade"
      ></div>
      <div className="w-full h-[90vh] relative flex justify-around items-center bg-hero-bg bg-cover flex-wrap px-12">
        {/* Fading Gradient Effect at the Bottom */}
        {/* <div className='absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10'></div> */}

        {/* Police Line "Do Not Cross" Banner with Hanging Strings */}
        <div className="row max-lg:mt-11 w-full flex flex-col items-start justify-around">
          {/* Police Line Section */}
          <div className="relative w-[90%] lg:w-[60%] xl:w-[50%] h-[40px] bg-yellow-500 flex items-center justify-center">
            <div className="absolute w-full flex justify-between -top-10">
              {/* Left string */}
              <div className="w-1 bg-gray-600 h-10"></div>
              {/* Right string */}
              <div className="w-1 bg-gray-600 h-10"></div>
            </div>
            <p className="text-black font-bold text-xl uppercase tracking-wide">
              Police Line Do Not Cross
            </p>
            <div className="absolute w-full h-full bg-black bg-opacity-50"></div>
          </div>

          {/* Wanted List Section */}
          <div className="flex flex-wrap justify-start space-x-4 z-10">
            {/* Wanted Poster 1 */}
            <div className="relative flex flex-col items-center">
              <div className="w-1 bg-gray-700 h-12 "></div>
              <div className="w-44 h-60 bg-gray-800 bg-opacity-80 border-4 border-gray-600 rounded-lg shadow-lg flex flex-col items-center justify-between p-3">
                <h3 className="text-lg font-bold text-red-400">WANTED</h3>
                <img
                  src={image6}
                  alt="Criminal 1"
                  className="w-full h-28 object-fit border-2 border-gray-500 rounded-md"
                />
                <p className="text-md font-semibold text-gray-300">DD</p>
                <p className="text-sm text-center text-gray-500 italic">
                  Armed and Dangerous
                </p>
              </div>
            </div>

            {/* Wanted Poster 2 */}
            <div className="relative flex flex-col items-center">
              <div className="w-1 bg-gray-700 h-12"></div>
              <div className="w-44 h-60 bg-gray-800 bg-opacity-80 border-4 border-gray-600 rounded-lg shadow-lg flex flex-col items-center justify-between p-3">
                <h3 className="text-lg font-bold text-red-400">WANTED</h3>
                <img
                  src={image4}
                  alt="Criminal 2"
                  className="w-full h-28 object-fit border-2 border-gray-500 rounded-md"
                />
                <p className="text-md font-semibold text-gray-300">NY</p>
                <p className="text-sm text-center text-gray-500 italic">Escaped Prisoner</p>
              </div>
            </div>

            {/* Wanted Poster 3 */}
            <div className="relative flex flex-col items-center">
              <div className="w-1 bg-gray-700 h-12"></div>
              <div className="w-44 h-60 bg-gray-800 bg-opacity-80 border-4 border-gray-600 rounded-lg shadow-lg flex flex-col items-center justify-between p-3">
                <h3 className="text-lg font-bold text-red-400">WANTED</h3>
                <img
                  src={image2}
                  alt="Criminal 3"
                  className="w-full h-28 object-fit border-2 border-gray-500 rounded-md"
                />
                <p className="text-md font-semibold text-gray-300">
                  Sri
                </p>
                <p className="text-sm text-gray-500 italic">
                  Bike Thief
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1140px] z-10 my-5 lg:w-full">
          <div className="top-[40%] w-full md:-[50%] max-w-[600px] h-full flex flex-col text-white">
            <h1 className="font-bold text-4xl hero-text text-start">
              <Typewriter
                text="Detect Threats Before They Escalate"
                cursorColor="#fff"
                typeSpeed={50}
                startDelay={500}
                cursorBlinking={false}
              />
            </h1>
            <h2 className="text-4xl text-start py-4 italic">
              Innovative Solutions for Safer Environments
            </h2>
          </div>
        </div>

        {/* Camera Access Box */}
        <div
          className={`max-md:w-[90vw] max-lg:w-[600px] w-[450px] lg:absolute lg:right-10 lg:top-20  min-w-96 min-h-80 mt-20 border-4 border-white bg-gray-800 bg-opacity-100 shadow-lg p-6 flex flex-col items-center justify-between rounded-lg z-20`}
          id="liveContainer"
        >
          {isCameraActive ? (
            <img
              src={`/detect?v=${Date.now()}`}
              alt="Live Camera"
              title="Live Camera"
              className="w-full h-full min-w-96 min-h-80 cursor-pointer"
              id="live"
              onClick={(e) => {
                toggleScreen(e);
              }}
            />
          ) : (
            <div
              title="Live Camera"
              className="w-full h-full min-w-96 min-h-80 cursor-pointer"
              id="live"
              onClick={(e) => {
                toggleScreen(e);
              }}
            ></div>
          )}

          <br />
          <br />

          {/* Button Position Adjusted */}
          <button
            onClick={handleCameraAccess}
            className={`${
              isCameraActive ? "bg-red-600" : "bg-blue-600"
            } text-white text-lg font-bold py-3 px-8 rounded-full hover:scale-105 transition-all duration-300 transform ease-in-out`}
          >
            {isCameraActive ? "Stop Camera" : "Start Camera"}
          </button>
        </div>

        {/* Gradient Ending the Hero Section */}
        <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>
    </>
  );
};

export default Hero;
