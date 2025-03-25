import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './GameDetails.css';

function GameDetails() {
  const { gameId } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // For demonstration, we're hard-coding the 雪骤山庄 game details
    // In a real app, this would come from an API or database
    if (gameId === '雪骤山庄') {
      setGameDetails({
        id: '雪骤山庄',
        name: '雪骤山庄',
        description: 'A Live Action Role Playing game scenario I wrote for 5 players. Involving two locked-room murder mysteries and a killer hiding amongst the players. Complete with character scripts and evidence cards.',
        longDescription: 'Five people gathers in the Snowbound Villa to celebrate the birthday of the Villa Owner, Xue Ao Qing. The unassuming celebration is interrupted the discovery of two names etched onto the coffin with the ominous message "Death by water". Snow falls, and the declaration soon comes true at night, with the two victims found dead in their locked rooms.',
        thumbnailPath: '/Asset/Games/雪骤山庄/thumbnail.png',
        files: [
          {
            name: '雪骤山庄人物剧本.pdf',
            path: '/Asset/Games/雪骤山庄/雪骤山庄人物剧本.pdf',
            description: 'Character scripts and roles for the game'
          },
          {
            name: '雪骤山庄线索.pdf',
            path: '/Asset/Games/雪骤山庄/雪骤山庄线索.pdf',
            description: 'Clue cards for the game'
          }
        ]
      });
      // Set the first file as default selected
      setSelectedFile('/Asset/Games/雪骤山庄/雪骤山庄人物剧本.pdf');
    }
  }, [gameId]);

  if (!gameDetails) {
    return (
      <div className="game-details-container">
        <h2 className="about-title">Game Not Found</h2>
        <div className="game-not-found">
          <p>Sorry, the game you're looking for doesn't exist or hasn't been implemented yet.</p>
          <Link to="/games" className="btn-game">Back to Games</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="game-details-container">
      <div className="game-details-header">
        <Link to="/games" className="back-link">
          ← Back to Games
        </Link>
        <h2 className="about-title" lang="zh-CN">{gameDetails.name}</h2>
      </div>

      <div className="game-details-content">
        <div className="game-main-image">
          <img 
            src={gameDetails.thumbnailPath} 
            alt={`${gameDetails.name} cover`} 
            className="game-cover-image" 
          />
        </div>

        <div className="game-description-container">
          <h3 className="game-subtitle">About the Game</h3>
          <p className="game-long-description">{gameDetails.longDescription}</p>
        </div>

        <div className="game-files-section">
          <h3 className="game-subtitle">Game Materials</h3>
          <div className="game-files-grid">
            {gameDetails.files.map((file, index) => (
              <div 
                key={index} 
                className={`game-file-card ${selectedFile === file.path ? 'active' : ''}`}
                onClick={() => setSelectedFile(file.path)}
              >
                <div className="file-icon">PDF</div>
                <div className="file-info">
                  <h4 className="file-name">{file.name}</h4>
                  <p className="file-description">{file.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedFile && (
          <div className="game-preview-section">
            <h3 className="game-subtitle">Preview</h3>
            <div className="pdf-preview-container">
              <object
                data={selectedFile}
                type="application/pdf"
                width="100%"
                height="600px"
                className="pdf-viewer"
              >
                <p className="pdf-fallback">
                  It appears your browser doesn't support embedded PDFs.
                  <a href={selectedFile} target="_blank" rel="noopener noreferrer">
                    Click here to download the PDF
                  </a>
                </p>
              </object>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameDetails; 