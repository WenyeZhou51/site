import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import DevJournal from './components/DevJournal/DevJournal';
import Creations from './components/Creations/Creations';
import AboutMe from './components/AboutMe/AboutMe';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/rpg-campaigns" element={<DevJournal />} />
        <Route path="/random-art" element={<Creations />} />
      </Routes>
    </Router>  
  );
}

export default App;
 