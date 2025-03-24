import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="border fixed paper-navbar">
      <div className="nav-brand">
        <h3><Link to="/about-me" className="paper-btn btn-small">About Me</Link></h3>
      </div>
      <div className="collapsible">
        <input 
          id="collapsible1" 
          type="checkbox" 
          name="collapsible1" 
          checked={menuOpen}
          onChange={toggleMenu}
        />
        <label htmlFor="collapsible1" className="hamburger">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </label>
        <div className={`collapsible-body ${menuOpen ? 'open' : ''}`}>
          <ul className="inline">
            <li><Link to="/" className="paper-btn btn-small">Games</Link></li>
            <li><Link to="/rpg-campaigns" className="paper-btn btn-small">RPG Campaigns</Link></li>
            <li><Link to="/random-art" className="paper-btn btn-small">Random Art</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
