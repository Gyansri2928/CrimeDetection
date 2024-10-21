import React from "react";
import { AiFillMail, AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import image1 from "../assets/img/01.jpeg";
import image2 from "../assets/img/02.jpeg";
import image3 from "../assets/img/03.jpeg";
import image4 from "../assets/img/04.jpeg";
import image5 from "../assets/img/05.jpeg";
import groupImage from "../assets/img/grp_photo.jpg";

const SocialMediaSection = () => {
  const teamData = [
    {
      name: "Priyanshu Tiwari",
      role: "Backend Engineer",
      image: image1,
      email: "priyanshu.tiwari090@gmail.com",
      github: "https://github.com/priyanshu",
      linkedin: "https://linkedin.com/priyanshu",
    },
    {
      name: "Srijan Pratap Singh",
      role: "Software Tester",
      image: image2,
      email: "srijansraikwar@gmail.com",
      github: "https://github.com/srijan",
      linkedin: "https://linkedin.com/priyanshu",
    },
    {
      name: "Karan Singh Manral",
      role: "Full Stack Engineer",
      image: image3,
      email: "karanmanral29@gmail.com",
      github: "https://github.com/karanmanral",
      linkedin: "https://linkedin.com/in/karanmanral29",
    },
    {
      name: "Nikhil Yadav",
      role: "Data Engineer",
      image: image4,
      email: "ynikhil4232@gmail.com",
      github: "https://github.com/nikhil",
      linkedin: "https://linkedin.com/priyanshu",
    },
    {
      name: "Gyan Sagar Srivastava",
      role: "Frontend Developer",
      image: image5,
      email: "gyansri28@gmail.com",
      github: "https://github.com/gyan",
      linkedin: "https://linkedin.com/priyanshu",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-950 via-gray-800 to-gray-900 py-10">
      <div className="container mx-auto px-4">
        <h2 className="site-title text-white text-5xl text-center mb-10">
          Meet With Our{" "}
          <span className="highlight underline text-blue-400 text-5xl">
            Expert
          </span>{" "}
          Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center">
          {teamData.map((member, index) => (
            <div
              className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-4 w-full h-[22rem] max-w-sm lg:h-[24rem] xl:h-[22rem] cursor-pointer hover:scale-105"
              key={index}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-48 h-48 rounded-md mb-4 mx-auto"
              />
              <p className="text-white text-lg font-bold text-center">
                {member.name}
              </p>
              <p className="text-gray-400 text-center">{member.role}</p>
              <div className="social-icons mt-2 flex justify-center space-x-4">
                <a
                  href={`mailto:${member.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillMail
                    size={24}
                    className="text-white hover:text-black"
                  />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillGithub
                    size={24}
                    className="text-white hover:text-black"
                  />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillLinkedin
                    size={24}
                    className="text-white hover:text-black"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Group Photo (Optional) */}
        <div className="mt-8 flex justify-center">
          <img
            src={groupImage}
            alt="Group Photo"
            title="Our Team"
            className="shadow-2xl max-w-full max-lg:w-full max-xl:w-2/3 w-1/2 h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialMediaSection;
