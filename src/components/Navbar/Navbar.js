import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setChecked(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setChecked(!checked);
  };

  return (
    <nav className="paper-navbar">
      <div className="nav-brand">
        <h3><Link to="/">Portfolio</Link></h3>
      </div>
      <div className="collapsible">
        <input type="checkbox" id="menu-toggle" checked={checked} onChange={toggleMenu} />
        <label htmlFor="menu-toggle" className="hamburger">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </label>
        <div className={`collapsible-body ${isOpen ? 'open' : ''}`}>
          <ul className="inline">
            <li><Link to="/about-me">About Me</Link></li>
            <li><Link to="/games">Games</Link></li>
            <li><Link to="/rpg-campaigns">RPG Campaigns</Link></li>
            <li><Link to="/random-art">Random Art</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
