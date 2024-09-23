import React from 'react';
import './index.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Crime from './components/crime';

function App() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Crime/>
    </div>
  );
}

export default App;
