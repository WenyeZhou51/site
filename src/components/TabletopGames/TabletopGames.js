import React from 'react';
import { Link } from 'react-router-dom';
import './TabletopGames.css';
import GamePreview from '../Games/GamePreview';
import ProjectRole from '../Games/ProjectRole';
import { ExploreLink } from '../Games/ExploreTransition';
import shellOrHighWaters from './shellOrHighWaters';

const TabletopGames = () => {
  // Games collection
  const games = [
    {
      id: '雪骤山庄',
      name: '雪骤山庄',
      thumbnailPath: process.env.PUBLIC_URL + '/assets/tabletop-games/雪骤山庄/thumbnail.png',
      description: 'A Live Action Role Playing game scenario I wrote for 5 players. Involving two locked-room murder mysteries and a killer hiding amongst the players. Complete with character scripts and evidence cards.'
    },
    {
      id: '雾海',
      name: '雾海',
      thumbnailPath: process.env.PUBLIC_URL + '/assets/tabletop-games/雾海/thumbnail.png',
      description: 'A Live Action Role Playing game scenario I wrote for 5 players. Set in a mysterious fog-covered sea environment. Complete with character scripts and evidence cards.'
    },
    {
      id: 'Arcana',
      name: 'Arcana',
      thumbnailPath: process.env.PUBLIC_URL + '/assets/tabletop-games/Arcana/10x7 world deck market.png',
      description: 'Arcana is a 2-4 player deck building game where players start from a set of basic cards and modify their deck to generate gold, slay monsters, and attain the arcane truth of the universe. The game format is similar to Dominion and Ascension.'
    },
    shellOrHighWaters,
    {
      id: 'red-campaign',
      name: 'Red, Call of Cthulhu custom scenario',
      language: 'en',
      detailPath: '/tabletop-games/campaigns/red',
      coverTitle: 'RED',
      coverSubtitle: 'Call of Cthulhu',
      description: 'A custom Call of Cthulhu scenario I wrote for 3-6 investigators set in the 1920 Rhode Island. Playtime is 20 hours. Scenario is set in the same universe as "Blue".'
    },
    {
      id: 'blue-campaign',
      name: 'Blue, Call of Cthulhu custom scenario',
      language: 'en',
      detailPath: '/tabletop-games/campaigns/blue',
      coverTitle: 'BLUE',
      coverSubtitle: 'Call of Cthulhu',
      description: 'A custom Call of Cthulhu scenario for 3-6 investigators set in 1920 Kingsport. Investigate the town\'s mysteries surrounding "Cerulean it". Playtime is 20 hours. Campaign notes are in Chinese.'
    }
    // More games can be added here later
  ];

  return (
    <div className="games-container">
      <h2 className="about-title">Tabletop Games</h2>
      <div className="games-intro">
        <p>Boardgames, live-action mysteries, and RPG campaigns I have created.</p>
      </div>

      <div className="games-grid">
        {games.map(game => (
          <div className="game-card" key={game.id}>
            <div className="game-thumbnail-container">
              <GamePreview game={game} className="game-thumbnail" />
            </div>
            <div className="project-title-row">
              <Link to={game.detailPath || `/games/${game.id}`} className="game-link">
                <h3 className="game-title" lang={game.language || 'zh-CN'}>{game.name}</h3>
              </Link>
              <ProjectRole gameId={game.id} role={game.role} />
            </div>
            <p className="game-description">{game.description}</p>
            <div className="game-actions">
              <ExploreLink effect="paper" to={game.detailPath || `/games/${game.id}`} className="btn-game">
                Explore Game
              </ExploreLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabletopGames;
