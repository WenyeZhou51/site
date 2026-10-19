import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import CampaignDetails from './components/TabletopGames/CampaignDetails';
import ArtShowcase from './components/ArtShowcase/ArtShowcase';
import AboutMe from './components/AboutMe/AboutMe';
import TabletopGames from './components/TabletopGames/TabletopGames';
import GameDetails from './components/Games/GameDetails.js';
import Videogames from './components/Videogames/Videogames';
import ExploreTransitions from './components/Games/ExploreTransition';
import './App.css';
// Import global overrides for PaperCSS
import './components/Games/GlobalOverrides.css';

function App() {
  return (
    <div className="paper container">
      <Router basename="/site">
        <ExploreTransitions>
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<AboutMe />} />
            <Route path="/about-me" element={<AboutMe />} />
            <Route path="/rpg-campaigns" element={<Navigate to="/tabletop-games" replace />} />
            <Route path="/tabletop-games" element={<TabletopGames />} />
            <Route path="/tabletop-games/campaigns/:campaignId" element={<CampaignDetails />} />
            <Route path="/random-art" element={<ArtShowcase />} />
            <Route path="/games" element={<Navigate to="/tabletop-games" replace />} />
            <Route path="/games/:gameId" element={<GameDetails />} />
            <Route path="/code-projects" element={<Videogames />} />
          </Routes>
        </div>
        </ExploreTransitions>
      </Router>  
    </div>
  );
}

export default App;
