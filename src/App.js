import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import DevJournal from './components/DevJournal/DevJournal';
import Creations from './components/Creations/Creations';
import AboutMe from './components/AboutMe/AboutMe';
import Games from './components/Games/Games';
import GameDetails from './components/Games/GameDetails.js';
import './App.css';
// Import global overrides for PaperCSS
import './components/Games/GlobalOverrides.css';

function App() {
  return (
    <div className="paper container">
      <Router>
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/about-me" element={<AboutMe />} />
            <Route path="/rpg-campaigns" element={<DevJournal />} />
            <Route path="/random-art" element={<Creations />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:gameId" element={<GameDetails />} />
          </Routes>
        </div>
      </Router>  
    </div>
  );
}

export default App;
 