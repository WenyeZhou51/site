import React from 'react';
import './DevJournal.css';
import SpoilerReveal from '../SpoilerReveal/SpoilerReveal';

function DevJournal() {
  return (
    <div className="about-canvas">
      <div className="about-content">
        <h2 className="about-title">RPG Campaigns</h2>
        <p className="campaign-intro">
          A series of custom Role Playing Game campaigns I have written. I have been a DM for more than 10 years and love to write my one custom campaigns and scenarios. 
          Currently working on my Blue, Red, White Call of Cthulhu scenario trilogy. I will also upload Dungeons and Dragons campaigns once I polish them up.
        </p>
        <p className="campaign-intro">
          Click on a boardgame to see the DM's handbook.
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
            
            <SpoilerReveal warningText="WARNING! The developer commentary completely spoils the core of the campaigns. DO NOT read them if you have any intention of playing them in the future.">
              <div className="developer-commentary">
                <h4>Developer Commentary - RED</h4>
                <p>
                  For RED, the central horror is the structural horror that a society can pose. The central secret is that the town itself is the eldritch monster that the investigators are looking for. It's inhabitants are equivalent to the cells in the monster's body, wearing red and white like blood cells. The people inside the town are replacable, and believe meat and metal has no fundamental different. This is because each person in the town only serves their social function and is a cog in this monsterous town.
                </p>
                <p>
                  This tension of individuals being disposable parts of a social machine is prevalent in real world. I feel like for something to be really horrifying, its core should be fundamental thing that people fear even in real life. The story doesn't have to be connected to that at all. You can throw in as much monster encounters and eerie scenary as you want, but the underlying thread should be there and that's what makes a coc campaign truely work. Without that thread, the campaign is without basis and without soul.
                </p>
              </div>
            </SpoilerReveal>
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
            
            <SpoilerReveal warningText="WARNING! The developer commentary completely spoils the core of the campaigns. DO NOT read them if you have any intention of playing them in the future.">
              <div className="developer-commentary">
                <h4>Developer Commentary - BLUE</h4>
                <p>
                  Call of cthulhu campaigns center around horror and mystery. For my campaign creation process, I usually center on a specific horror as the theme for the campaign, and derive a mystery from it. For Blue, it centers around pascal's phrase that man is a thinking reed. Reed can be used to make papyrus, and then into books, and that is where the idea for the library where people are turned into books comes from.
                </p>
                <p>
                  The campaign also has highly alchemic theming. The seperation of a human into body, mind, and soul, the realisation that books contains the mind, the mirror the soul, and the sea the body is critical to solving the mystery in this campaign. The alchemic theming works well with the centeral secret, since both tries to disect a human and transform it in some way.
                </p>
              </div>
            </SpoilerReveal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DevJournal; 