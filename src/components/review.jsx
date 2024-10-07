import React, { useState, useEffect, useRef } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import './review.css';

const MAX_LENGTH = 150;

const testimonials = [
  {
    review: `Satark is easy to operate and impressed me with its user-friendly interface. Our staff quickly adapted with minimal training, enhancing campus safety and giving peace of mind to our community. I highly recommend it to any institution committed to maintaining a secure learning environment...`,
    name: 'Er. Shobhit Mani Tiwari',
    title: 'Assistant Professor, Lucknow University',
  },
  {
    review: `It has been an honor to witness the presentation of Satark, an innovative and timely solution to one of society’s most pressing challenges – crime prevention and public safety...`,
    name: 'Dr. Himanshu Pandey',
    title: 'Assistant Professor, University of Lucknow',
  },
];

const TestimonialCard = ({ review, name, title }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = review.length > MAX_LENGTH;
  const displayedText = isExpanded || !shouldTruncate ? review : `${review.slice(0, MAX_LENGTH)}...`;

  return (
    <div className="testimonial-card p-6 rounded-lg flex-shrink-0 w-[350px] bg-opacity-20 bg-white">
      <FaQuoteLeft className="text-blue-400 text-3xl mb-4" />
      <p className="text-lg italic">{`"${displayedText}"`}</p>
      {shouldTruncate && (
        <span
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-300 mt-2 cursor-pointer hover:underline inline-block"
        >
          {isExpanded ? 'Show Less' : 'See More'}
        </span>
      )}
      <h4 className="mt-4 text-xl font-bold">{name}</h4>
      <p className="text-sm text-gray-400">{title}</p>
    </div>
  );
};

const Testimonials = () => {
  const [showText, setShowText] = useState(false);
  const textRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setShowText(entry.isIntersecting);
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="testimonials-section py-16 bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="max-w-[1140px] mx-auto">
        <h2
          className={`text-4xl font-bold text-center mb-8 transition-all duration-700 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="text-white">What Our Experts Say About </span>
          <span className="text-blue-600">Satark</span>
        </h2>
        <div className="testimonial-carousel space-x-8 overflow-x-scroll flex">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`flex-shrink-0 transition-all duration-700 ${showText ? 'opacity-100 translate-y-0 slide-in' : 'opacity-0 translate-y-10'}`} // Add slide-in animation for cards
            >
              <TestimonialCard
                review={testimonial.review}
                name={testimonial.name}
                title={testimonial.title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
