import React from 'react';
import { Link } from 'react-router-dom';
import './AboutMe.css';

function AboutMe() {
  console.log('AboutMe component rendered');

  return (
    <div className="about-canvas about-profile">
      <div className="about-content">
        <h1 className="profile-heading">
          Wenye Zhou
          <span className="profile-role">Game Designer &amp; Artist</span>
        </h1>
        
        <div className="portrait-container">
          <img
            src={process.env.PUBLIC_URL + '/assets/about-me/Website avatar.png'}
            alt="Wenye Zhou"
            className="portrait portrait-default"
          />
          <img
            src={process.env.PUBLIC_URL + '/assets/about-me/portrait-hover.png'}
            alt=""
            aria-hidden="true"
            className="portrait portrait-hover"
          />
        </div>
        
        <div className="bio-container">
          <p className="bio">
            A game designer from Rice University. I major in Art and Computer Science, and I like to play 
            videogames, boardgames, and trpg in my freetime. I enjoy drawing, writing, coding, and creating 
            stories. I made this website to display the games, stories, projects, and art I've worked on. 
            If you want to collaborate, reach out to me at wenyezhou51@gmail.com!
          </p>
          <Link to="/code-projects" className="about-games-link">
            See my videogames <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
