import React, { useState } from 'react';
import './SpoilerReveal.css';

const SpoilerReveal = ({ children, warningText }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  return (
    <div className="spoiler-reveal-container">
      {!isRevealed ? (
        <div className="spoiler-warning">
          <div className="spoiler-warning-text">
            {warningText || "Warning! My discussion here will involve MAJOR spoilers for the game and will significantly impact the viewing/experience of the game"}
          </div>
          <button 
            className="spoiler-reveal-button" 
            onClick={handleReveal}
          >
            Reveal Commentary
          </button>
        </div>
      ) : (
        <div className="spoiler-content">
          {children}
        </div>
      )}
    </div>
  );
};

export default SpoilerReveal;
