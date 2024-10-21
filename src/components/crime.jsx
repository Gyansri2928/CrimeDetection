import React, { useRef,useEffect,useState } from 'react';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../assets/css/crime.css"; 
import Robbery from "../assets/img/robbery.jpeg";
import Murder from "../assets/img/murder.jpeg";
import Violence from "../assets/img/public_violence.jpeg";
import Wanted from "../assets/img/wanted.jpg";
import Brandishing from "../assets/img/brandishing_weapon.webp";

const Crime = () => {
  const sliderRef = useRef(null);
  const [showAnimation, setShowAnimation] = useState(false); // State to manage animation

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    ref: sliderRef,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // Check if the element is in view
        if (entry.isIntersecting) {
          setShowAnimation(true); // Trigger animation when in view
          observer.disconnect(); // Stop observing once it has animated
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the component is visible
      }
    );

    const currentElement = document.getElementById('crime'); // Get the component by ID
    if (currentElement) {
      observer.observe(currentElement); // Start observing the component
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement); // Clean up observer
      }
    };
  }, []);

  return (
    <div
      id="crime"
      className="w-full m-auto px-4 py-16 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-950" // Gradient transition between sections
    >
      {/* Title */}
      <h2 className={`text-center text-blue-300 font-bold text-5xl tracking-wide leading-tight shadow-lg mb-8 ${showAnimation ? 'animate-slide-in' : 'opacity-0'}`}>
        Crimes
      </h2>
      
      {/* Description */}
      <p className={`text-center text-gray-200 text-lg mb-12 ${showAnimation ? 'animate-slide-in' : 'opacity-0'}`}>
        Our advanced model captures various incidents to ensure safety and awareness. 
        The crimes displayed here represent real-world scenarios that can be detected 
        and reported through our application, helping communities stay informed and vigilant.
      </p>

      {/* Crime Slider */}
      <div className="relative">
        <Slider {...settings} ref={sliderRef}>
          {[
            {
              src: Robbery,
              title: 'Robbery',
            },
            {
              src: Brandishing,
              title: 'Brandishing Weapons',
            },
            {
              src: Wanted,
              title: 'Search Wanted Criminals',
            },
            {
              src: Murder,
              title: 'Murder',
            },
            {
              src: Violence,
              title: 'Public Violence',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="h-80 bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-blue-500 cursor-pointer" // Royal blue border
            >
              <div className="relative group">
                {/* Image */}
                <img
                  className="w-full h-auto object-fit transition-transform transform group-hover:scale-105 duration-300"
                  src={item.src}
                  alt={item.title}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-blue-300 font-bold text-lg">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>
         
        {/* Custom Arrow Buttons */}
        <button
          className="design-btn absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full shadow-md hover:bg-gray-600 transition duration-200"
          onClick={() => sliderRef.current.slickPrev()} 
        >
          <FaChevronLeft size={24} />
        </button>
        <button
          className="design-btn absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full shadow-md hover:bg-gray-600 transition duration-200"
          onClick={() => sliderRef.current.slickNext()} 
        >
          <FaChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Crime;
