import React from 'react';
import './index.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Crime from './components/crime';
import About from './components/about';
import Cases from './components/cases';
import Footer from './components/footer';
import SocialMedia from './components/socialmedia';

function App() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <About/>
      <Cases/>
      <Crime/>
      <SocialMedia/>
      <Footer/>
    </div>
  );
}

export default App;
