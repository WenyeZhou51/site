import React from 'react';
import './AboutMe.css';

function AboutMe() {
  console.log('AboutMe component rendered');

  return (
    <div className="about-canvas">
      <div className="about-content">
        <h2 className="about-title">About Me</h2>
        
        <div className="portrait-container">
          <img 
            src={process.env.PUBLIC_URL + '/Asset/Misc/Website avatar.png'} 
            alt="Wenye Zhou" 
            className="portrait" 
          />
        </div>
        
        <div className="bio-container">
          <h3 className="name-tag">I am Wenye Zhou</h3>
          <p className="bio">
            A game designer from Rice University. I major in Art and Computer Science, and I like to play 
            videogames, boardgames, and poker in my freetime. I enjoy drawing, writing, coding, and creating 
            stories. I made this website to display the games, stories, projects, and art I've worked on.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutMe; 