import React from 'react';
import { ExploreLink } from '../Games/ExploreTransition';
import './Videogames.css';
import GamePreview from '../Games/GamePreview';
import GameAction from '../Games/GameAction';
import ProjectRole from '../Games/ProjectRole';
import latestVideogames from './latestVideogames';

const Videogames = () => {
  // Videogames collection
  const videogames = [
    ...latestVideogames,
    {
      id: 'THE-HOLLOWS',
      name: 'THE HOLLOWS',
      description: 'A 2D JRPG where the main character and their party ventures into the hollows to save the world and fall the obelisk',
      videoUrl: 'https://www.youtube.com/embed/l5K3YIxcUnM?start=2',
      githubUrl: 'https://github.com/WenyeZhou51/The-Hollows',
      thumbnailPath: process.env.PUBLIC_URL + '/assets/videogames/The Hollows/placeholder.png'
    },
    {
      id: 'CLEAN-OUT-THE-ROOMS',
      name: 'CLEAN OUT THE ROOMS',
      description: 'A horror game about cleaning where the player views the world through an OCR lens.',
      videoUrl: 'https://www.youtube.com/embed/oubLHyD90eo?start=6',
      playableLink: 'https://wenyezhou.itch.io/clean-out-the-rooms'
    },
    {
      id: 'MINUTE-MARK',
      name: 'MINUTE MARK',
      description: 'Minute Mark is a 2D singleplayer platformer where you run, jump, and slide across hand-drawn levels at incredible speed, racing against a strict timer. Rewind your mistakes and make creative skips to chase the leaderboard. Currently on STEAM!',
      playableLink: 'https://store.steampowered.com/app/4387950/Minute_Mark/',
      thumbnailPath: process.env.PUBLIC_URL + '/assets/videogames/Minute Mark/placeholder.png'
    },
    {
      id: 'CAPACITOR',
      name: 'CAPACITOR',
      description: 'A collaborative multiplayer horror game where players scavenge an abandoned industrial complex for parts as the electricity depletes. The game creates a tense atmosphere as players must work together while the power slowly fades, creating an increasingly dangerous environment.',
      videoUrl: 'https://www.youtube.com/embed/5jVMpN_Kfqk?start=10',
      githubUrl: 'https://github.com/WenyeZhou51/CAPACITOR',
      thumbnailPath: process.env.PUBLIC_URL + '/assets/videogames/Capacitor/placeholder.png'
    },
    {
      id: 'SEAPUNK-MOD',
      name: 'SEAPUNK MOD - SLAY THE SPIRE 2',
      description: 'Play as the Seapunk — a coastal punk who drowns enemies, entwines cards into powerful Blobs, and grows their strength over time. Features unique Drown, Entwine, and Grow mechanics, 60+ cards, 3 relics, and co-op multiplayer cards.',
      playableLink: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3748204457',
      thumbnailPath: process.env.PUBLIC_URL + '/assets/videogames/Seapunk Mod/placeholder.png'
    }
  ];

  return (
    <div className="code-projects-container">
      <h2 className="about-title">Videogames</h2>
      <div className="projects-intro">
        <p>Games I have created, alone and with friends.</p>
      </div>
      
      <div className="projects-grid">
        {videogames.map((game) => (
          <div className="project-card" key={game.id}>
            <div className="project-video-container">
              <GamePreview game={game} className="project-preview" />
            </div>
            <div className="project-title-row">
              <h3 className="project-title">{game.name}</h3>
              <ProjectRole gameId={game.id} />
            </div>
            <p className="project-description">{game.description}</p>
            <div className="project-links">
              <ExploreLink effect="paper" to={`/games/${game.id}`} className="project-link">
                Explore
              </ExploreLink>
              <GameAction game={game} className="project-link" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videogames;
