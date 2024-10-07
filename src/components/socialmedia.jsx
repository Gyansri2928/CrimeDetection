import React, { useEffect, useRef } from 'react';
import { AiFillMail, AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import image1 from '/home/gian/Documents/crimedetect/src/assets/img/01.jpeg';
import image2 from '/home/gian/Documents/crimedetect/src/assets/img/02.jpeg';
import image3 from '/home/gian/Documents/crimedetect/src/assets/img/03.jpeg';
import image4 from '/home/gian/Documents/crimedetect/src/assets/img/04.jpeg';
import image5 from '/home/gian/Documents/crimedetect/src/assets/img/05.jpeg';
import groupImage from '/home/gian/Documents/crimedetect/src/assets/img/group.jpeg';
import '/home/gian/Documents/crimedetect/src/socialmedia.css';

const SocialMediaSection = () => {
  const teamData = [
    {
      name: 'Priyanshu',
      image: image1,
      email: 'priyanshu.tiwari090@gmail.com',
      github: 'https://github.com/priyanshu',
      linkedin: 'https://linkedin.com/priyanshu',
    },
    {
      name: 'Srijan',
      image: image2,
      email: 'srijansraikwar@gmail.com',
      github: 'https://github.com/srijan',
      linkedin: 'https://linkedin.com/priyanshu',
    },
    {
      name: 'Karan',
      image: image3,
      email: 'karanmanral29@gmail.com',
      github: 'https://github.com/karan',
      linkedin: 'https://linkedin.com/priyanshu',
    },
    {
      name: 'Nikhil',
      image: image4,
      email: 'ynikhil4232@gmail.com',
      github: 'https://github.com/nikhil',
      linkedin: 'https://linkedin.com/priyanshu',
    },
    {
      name: 'Gyan',
      image: image5,
      email: 'gyansri28@gmail.com',
      github: 'https://github.com/gyan',
      linkedin: 'https://linkedin.com/priyanshu',
    },
  ];

  const teamRefs = useRef([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    teamRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="team-area pt-120 pb-80 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-900 bg-[length:400%_400%] animate-gradient-x">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center">
              <h2 className="site-title">
                Meet With Our <span className="highlight">Expert</span> Team
              </h2>
              <div className="flex justify-center mt-4 mb-4">
                <div className="relative rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 border border-blue-500 max-w-lg w-full bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 p-1 hover:shadow-2xl hover:scale-105 transform transition-all">
                  <div className="bg-white rounded-lg p-1">
                    <img
                      src={groupImage}
                      alt="Team Group"
                      className="w-full h-auto rounded-lg object-cover hover:opacity-95 transition-opacity duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative SVG Borders */}
        <div className="relative">
          <svg
            className="absolute top-0 left-0 right-0 w-full h-full"
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
          >
            <path
              d="M0,150 C150,100 350,0 500,150 L500,00 L0,0 Z"
              style={{ stroke: 'none', fill: '#00b3ff', opacity: 0.4 }}
            />
          </svg>
        </div>

        <div className="col mt-5 flex justify-around">
          {teamData.map((member, index) => (
            <div className="row-md-6 col-lg-3 mb-4 justify-content-around" key={index}>
              <div
                className="team-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-blue-500"
                ref={(el) => (teamRefs.current[index] = el)}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 object-cover rounded-full mx-auto mt-4"
                />
                <div className="team-content text-center">
                  <h5 className="team-name">{member.name}</h5>
                  <div className="social-icons mt-2 flex justify-center space-x-4">
                    <a href={`mailto:${member.email}`} target="_blank" rel="noopener noreferrer">
                      <AiFillMail size={24} className="text-gray-800 hover:text-black" />
                    </a>
                    <a href={member.github} target="_blank" rel="noopener noreferrer">
                      <AiFillGithub size={24} className="text-gray-800 hover:text-black" />
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <AiFillLinkedin size={24} className="text-gray-800 hover:text-black" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom SVG Border */}
        <div className="relative">
          <svg
            className="absolute bottom-19 left-5 right-0 w-full h-full"
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
          >
            <path
              d="M0,150 C150,100 350,0 500,150 L500,00 L0,0 Z"
              style={{ stroke: 'none', fill: '#b3c7e8', opacity: 0.2 }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaSection;
