import React from 'react';
import './AboutMe.css';

function AboutMe() {
  console.log('AboutMe component rendered');

  return (
    <div className="paper section about-me-container">
      <h2 className="title">About Me</h2>
      <div className="about-content">
        <div className="avatar-container">
          <img 
            src={process.env.PUBLIC_URL + '/Asset/Misc/Website avatar.png'} 
            alt="Wenye Zhou" 
            className="avatar-image" 
          />
        </div>
        <div className="bio-text card">
          <h3>I am Wenye Zhou</h3>
          <p>
            An Art and CS double major at Rice University. I like to play a lot of videogames 
            and also Role Playing Games. I like writing and creating videogames and custom campaigns, 
            as well as random pieces of drawings which I will display on this website.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutMe; 