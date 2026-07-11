import React from 'react';
import { Link } from 'react-router-dom';
import './CodeProjects.css';

const CodeProjects = () => {
  // Videogames collection
  const videogames = [
    {
      id: 'CAPACITOR',
      name: 'CAPACITOR',
      description: 'A collaborative multiplayer horror game where players scavenge an abandoned industrial complex for parts as the electricity depletes. The game creates a tense atmosphere as players must work together while the power slowly fades, creating an increasingly dangerous environment.',
      videoUrl: 'https://www.youtube.com/embed/5jVMpN_Kfqk?start=10',
      githubUrl: 'https://github.com/WenyeZhou51/CAPACITOR',
      thumbnailPath: process.env.PUBLIC_URL + '/Asset/CodeProjects/Capacitor/placeholder.png'
    },
    {
      id: 'THE-HOLLOWS',
      name: 'THE HOLLOWS',
      description: 'A 2D JRPG where the main character and their party ventures into the hollows to save the world and fall the obelisk',
      videoUrl: 'https://www.youtube.com/embed/l5K3YIxcUnM?start=2',
      githubUrl: 'https://github.com/WenyeZhou51/The-Hollows',
      thumbnailPath: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/placeholder.png'
    },
    {
      id: 'MINUTE-MARK',
      name: 'MINUTE MARK',
      description: 'Minute Mark is a 2D singleplayer platformer where you run, jump, and slide across hand-drawn levels at incredible speed, racing against a strict timer. Rewind your mistakes and make creative skips to chase the leaderboard. Currently on STEAM!',
      playableLink: 'https://store.steampowered.com/app/4387950/Minute_Mark/',
      thumbnailPath: process.env.PUBLIC_URL + '/Asset/CodeProjects/Minute Mark/placeholder.png'
    },
    {
      id: 'CLEAN-OUT-THE-ROOMS',
      name: 'CLEAN OUT THE ROOMS',
      description: 'A horror game about cleaning where the player views the world through an OCR lens.',
      videoUrl: 'https://www.youtube.com/embed/oubLHyD90eo?start=6',
      playableLink: 'https://wenyezhou.itch.io/clean-out-the-rooms'
    },
    {
      id: 'SEAPUNK-MOD',
      name: 'SEAPUNK MOD - SLAY THE SPIRE 2',
      description: 'Play as the Seapunk — a coastal punk who drowns enemies, entwines cards into powerful Blobs, and grows their strength over time. Features unique Drown, Entwine, and Grow mechanics, 60+ cards, 3 relics, and co-op multiplayer cards.',
      playableLink: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3748204457',
      thumbnailPath: process.env.PUBLIC_URL + '/Asset/CodeProjects/Seapunk Mod/placeholder.png'
    }
  ];

  return (
    <div className="code-projects-container">
      <h2 className="about-title">Videogames</h2>
      <div className="projects-intro">
        <p>Videogames or game mechanics I have created either alone or with friends. Click on a boardgame to see it's gameplay, github link, as well as concept art, design documents, or commentaries on design decisions I've made</p>
      </div>
      
      <div className="projects-grid">
        {videogames.map((game) => (
          <div className="project-card" key={game.id}>
            <Link to={`/games/${game.id}`} className="game-link">
              <div className="project-video-container">
                {game.videoUrl ? (
                  <iframe
                    src={game.videoUrl}
                    title={`${game.name} preview`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="project-video"
                  ></iframe>
                ) : game.thumbnailPath ? (
                  <img
                    src={game.thumbnailPath}
                    alt={`${game.name} preview`}
                    className="project-image"
                  />
                ) : (
                  <div className="project-video-placeholder">
                    <span>{game.name}</span>
                  </div>
                )}
              </div>
            </Link>
            <h3 className="project-title">{game.name}</h3>
            <p className="project-description">{game.description}</p>
            <div className="project-links">
              <Link to={`/games/${game.id}`} className="project-link">
                View Details
              </Link>
              {game.playableLink ? (
                <a 
                  href={game.playableLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link project-link-play"
                >
                  Play!
                </a>
              ) : (
                <a 
                  href={game.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View Code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeProjects; 