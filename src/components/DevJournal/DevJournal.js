import React from 'react';
import './DevJournal.css';

function DevJournal() {
  return (
    <div className="about-canvas">
      <div className="about-content">
        <h2 className="about-title">RPG Campaigns</h2>
        <p className="campaign-intro">
          A series of custom Role Playing Game campaigns I have written
        </p>
        
        <div className="campaigns-list">
          <div className="campaign-card">
            <h3 className="campaign-title">Forgotten Realms Campaign</h3>
            <p className="campaign-description">
              A custom Dungeons & Dragons campaign set in the Forgotten Realms. 
              This campaign features unique characters, custom maps, and an original storyline.
            </p>
            
            <div className="campaign-preview">
              <object 
                data={process.env.PUBLIC_URL + "/Asset/RPG Campaings/Red.pdf#page=1"} 
                type="application/pdf"
                className="pdf-object"
              >
                <div className="pdf-fallback">
                  <p>PDF preview not available</p>
                </div>
              </object>
            </div>
            
            <div className="campaign-actions">
              <a 
                href={process.env.PUBLIC_URL + "/Asset/RPG Campaings/Red.pdf"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View Campaign
              </a>
              <a 
                href={process.env.PUBLIC_URL + "/Asset/RPG Campaings/Red.pdf"} 
                download
                className="btn-secondary"
              >
                Download
              </a>
            </div>
          </div>
          
          <div className="campaign-card">
            <h3 className="campaign-title">Cyberpunk Adventure</h3>
            <p className="campaign-description">
              A futuristic campaign using the Cyberpunk RED system. 
              Explore a dystopian future filled with corporate intrigue and technological wonders.
            </p>
            
            <div className="campaign-preview">
              <object 
                data={process.env.PUBLIC_URL + "/Asset/RPG Campaings/Blue.pdf#page=1"} 
                type="application/pdf"
                className="pdf-object"
              >
                <div className="pdf-fallback">
                  <p>PDF preview not available</p>
                </div>
              </object>
            </div>
            
            <div className="campaign-actions">
              <a 
                href={process.env.PUBLIC_URL + "/Asset/RPG Campaings/Blue.pdf"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View Campaign
              </a>
              <a 
                href={process.env.PUBLIC_URL + "/Asset/RPG Campaings/Blue.pdf"} 
                download
                className="btn-secondary"
              >
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DevJournal; 