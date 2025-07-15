import React from 'react';
import { Link } from 'react-router-dom';
import './Games.css';

const Games = () => {
  // Games collection
  const games = [
    {
      id: '雪骤山庄',
      name: '雪骤山庄',
      thumbnailPath: '/Asset/Games/雪骤山庄/thumbnail.png',
      description: 'A Live Action Role Playing game scenario I wrote for 5 players. Involving two locked-room murder mysteries and a killer hiding amongst the players. Complete with character scripts and evidence cards.'
    },
    {
      id: '雾海',
      name: '雾海',
      thumbnailPath: '/Asset/Games/雾海/thumbnail.png',
      description: 'A Live Action Role Playing game scenario I wrote for multiple players. Set in a mysterious fog-covered sea environment. Complete with character scripts and evidence cards.'
    },
    {
      id: 'Arcana',
      name: 'Arcana',
      thumbnailPath: '/Asset/Games/Arcana/10x7 world deck market.png',
      description: 'Arcana is a 2-4 player deck building game where players start from a set of basic cards and modify their deck to generate gold, slay monsters, and attain the arcane truth of the universe. The game format is similar to Dominion and Ascension.'
    }
    // More games can be added here later
  ];

  return (
    <div className="games-container">
      <h2 className="about-title">Games</h2>
      <div className="games-intro">
        <p>A collection of videogames and tabletop games I have created</p>
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