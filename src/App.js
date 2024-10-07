import React from 'react';
import './index.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Crime from './components/crime';
import About from './components/about';
import Cases from './components/cases';
import Footer from './components/footer';
import SocialMediaSection from './components/socialmedia';
import Testimonials from './components/review';


function App() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <About/>
      <Testimonials/>
      <Cases/>
      <Crime/>
      <SocialMediaSection/>
      <Footer/>
    </div>
  );
}

export default App;
