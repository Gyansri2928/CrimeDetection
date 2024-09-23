import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '/home/gian/Documents/crimedetect/src/crime.css'; // Import the CSS file for styles

const Crime = () => {
  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 5,
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

  return (
    <div id='crime' className='max-w-[1340px] m-auto px-4 py-16'>
      <h2 className='text-center text-gray-800 font-bold text-4xl tracking-wide leading-tight shadow-lg'>
  Crimes
</h2>

      <Slider {...settings}>
        {[
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg7LnukS9FsZ1b_KHrltvcHyfigJQtRZUDQQ&s',
          'https://plus.unsplash.com/premium_photo-1670002244351-51860b285f4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGhpZWZ8ZW58MHx8MHx8fDA%3D',
          'https://plus.unsplash.com/premium_photo-1670002247328-76fb3b2f8373?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGhpZWZ8ZW58MHx8MHx8fDA%3D',
          'https://images.unsplash.com/photo-1578530332818-6ba472e67b9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1772&q=80',
          'https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
        ].map((src, index) => (
          <div key={index} className='zoom-animation'>
            <img
              className='w-full h-3/4 object-cover'
              src={src}
              alt='/'
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Crime;
