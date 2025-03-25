import React from 'react';
import { Link } from 'react-router-dom';
import './Games.css';

const Games = () => {
  // For now, we're only implementing the 雪骤山庄 game as requested
  const games = [
    {
      id: '雪骤山庄',
      name: '雪骤山庄',
      thumbnailPath: '/Asset/Games/雪骤山庄/thumbnail.png',
      description: 'A thrilling mystery game set in a snowy mountain manor. Players must uncover the secrets hidden within the walls of 雪骤山庄 (Snow Rush Manor) and solve the puzzles before time runs out.'
    }
    // More games can be added here later
  ];

  return (
    <div className="games-container">
      <h2 className="about-title">Games</h2>
      <div className="games-intro">
        <p>Explore a collection of immersive tabletop and digital games. Each game offers a unique experience with its own storyline, characters, and challenges.</p>
      </div>
      
      <div className="games-grid">
        {games.map(game => (
          <div className="game-card" key={game.id}>
            <Link to={`/games/${game.id}`} className="game-link">
              <div className="game-thumbnail-container">
                <img src={game.thumbnailPath} alt={`${game.name} thumbnail`} className="game-thumbnail" />
              </div>
              <h3 className="game-title" lang="zh-CN">{game.name}</h3>
            </Link>
            <p className="game-description">{game.description}</p>
            <div className="game-actions">
              <Link to={`/games/${game.id}`} className="btn-game">
                Explore Game
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games; 