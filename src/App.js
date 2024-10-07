import React from 'react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Crime from './components/crime';
import About from './components/about';
import Cases from './components/cases';
import Footer from './components/footer';
import SocialMediaSection from './components/socialmedia';
import Testimonials from './components/review';

import DetectCriminal from "./components/detectFace"

import {createBrowserRouter,RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "",
    element: <>
      <Navbar/>
      <Hero/>
      <About/>
      <Testimonials/>
      <Cases/>
      <Crime/>
      <SocialMediaSection/>
      <Footer/>
    </>
  },
  {
    path: "/detect_criminal",
    element: <DetectCriminal />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
