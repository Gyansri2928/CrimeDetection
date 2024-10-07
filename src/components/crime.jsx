import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '/home/gian/Documents/crimedetect/src/crime.css'; 

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
      className={`w-full m-auto px-4 py-16 bg-gradient-to-b from-gray-900 via-gray-800 to-black`} // Gradient transition between sections
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
              src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg7LnukS9FsZ1b_KHrltvcHyfigJQtRZUDQQ&s',
              title: 'Public Violence',
            },
            {
              src: 'https://plus.unsplash.com/premium_photo-1670002244351-51860b285f4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGhpZWZ8ZW58MHx8MHx8fDA%3D',
              title: 'Theft',
            },
            {
              src: 'https://plus.unsplash.com/premium_photo-1670002247328-76fb3b2f8373?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGhpZWZ8ZW58MHx8MHx8fDA%3D',
              title: 'Breaking and Entering',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-blue-500 zoom-animation"
            >
              <div className="relative group">
                {/* Image */}
                <img
                  className="w-full h-56 object-cover transition-transform transform group-hover:scale-105 duration-300"
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
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full shadow-md hover:bg-gray-600 transition duration-200"
          onClick={() => sliderRef.current.slickPrev()} 
        >
          <FaChevronLeft size={24} />
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full shadow-md hover:bg-gray-600 transition duration-200"
          onClick={() => sliderRef.current.slickNext()} 
        >
          <FaChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Crime;
