import React from 'react';
import './DevJournal.css';

function DevJournal() {
  return (
    <div className="paper section">
      <h2 className="title">RPG Campaigns</h2>
      <div className="content">
        <div className="card campaign-card">
          <h3>Forgotten Realms Campaign</h3>
          <p>
            A custom Dungeons & Dragons campaign set in the Forgotten Realms. 
            This campaign features unique characters, custom maps, and an original storyline.
          </p>
          <div className="campaign-actions">
            <a 
              href={process.env.PUBLIC_URL + "/Asset/RPG Campaings/Red.pdf"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="paper-btn btn-primary"
            >
              View Campaign
            </a>
            <a 
              href={process.env.PUBLIC_URL + "/Asset/RPG Campaings/Red.pdf"} 
              download
              className="paper-btn btn-secondary"
            >
              Download
            </a>
          </div>
        </div>
        
        <div className="card campaign-card">
          <h3>Cyberpunk Adventure</h3>
          <p>
            A futuristic campaign using the Cyberpunk RED system. 
            Explore a dystopian future filled with corporate intrigue and technological wonders.
          </p>
          <div className="campaign-actions">
            <a 
              href={process.env.PUBLIC_URL + "/Asset/RPG Campaings/Blue.pdf"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="paper-btn btn-primary"
            >
              View Campaign
            </a>
            <a 
              href={process.env.PUBLIC_URL + "/Asset/RPG Campaings/Blue.pdf"} 
              download
              className="paper-btn btn-secondary"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DevJournal; 