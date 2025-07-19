import React from 'react';
import { Link } from 'react-router-dom';
import './CodeProjects.css';

const CodeProjects = () => {
  // Videogames collection
  const videogames = [
    {
      id: 'CAPACITOR',
      name: 'CAPACITOR',
      description: 'A collaborative multiplayer horror game where players scavenge an abandoned industrial complex for parts as the electricity depletes...',
      videoUrl: 'https://www.youtube.com/embed/OBx0AlWrRVo?start=4',
      githubUrl: 'https://github.com/WenyeZhou51/CAPACITOR',
      thumbnailPath: process.env.PUBLIC_URL + '/Asset/CodeProjects/Capacitor/placeholder.png'
    },
    {
      id: 'THE-HOLLOWS',
      name: 'THE HOLLOWS',
      description: 'A 2D JRPG where the main character and their party ventures into the hollows to save the world and fall the obelisk',
      videoUrl: 'https://www.youtube.com/embed/w4s7HLy6IOY',
      githubUrl: 'https://github.com/WenyeZhou51/The-Hollows',
      thumbnailPath: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/placeholder.png'
    }
  ];

  return (
    <div className="code-projects-container">
      <h2 className="about-title">Videogames</h2>
      <div className="projects-intro">
        <p>Explore a collection of my videogame projects. These range from multiplayer horror experiences to classic JRPG adventures, showcasing different game development technologies and design approaches.</p>
      </div>
      
      <div className="projects-grid">
        {videogames.map((game) => (
          <div className="project-card" key={game.id}>
            <Link to={`/games/${game.id}`} className="game-link">
              <div className="project-video-container">
                <iframe
                  src={game.videoUrl}
                  title={`${game.name} preview`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="project-video"
                ></iframe>
              </div>
            </Link>
            <h3 className="project-title">{game.name}</h3>
            <p className="project-description">{game.description}</p>
            <div className="project-links">
              <Link to={`/games/${game.id}`} className="project-link">
                View Details
              </Link>
              <a 
                href={game.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-link"
              >
                View Code
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeProjects; 