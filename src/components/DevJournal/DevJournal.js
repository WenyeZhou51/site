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
            <h3 className="campaign-title">Red, Call of Cthulhu custom scenario</h3>
            <p className="campaign-description">
              A custom Call of Cthulhu scenario I wrote for 3-6 investigators set in the 1920 Rhode Island. 
              Playtime is 20 hours. Scenario is set in the same universe as "Blue".
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
            <h3 className="campaign-title">Blue, Call of Cthulhu custom scenario</h3>
            <p className="campaign-description">
              A custom Call of Cthulhu scenario I wrote for 3-6 investigators set in the 1920 Kingsport, 
              where investigators investigate the town's mysteries surrounding "Cerulean it". Playtime is 20 hours. 
              Scenario is set in the same universe as "Red". I wrote the scenario in Chinese and has not finished 
              translating it, so here are my campaign notes in Chinese.
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