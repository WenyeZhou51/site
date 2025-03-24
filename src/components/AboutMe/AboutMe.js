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