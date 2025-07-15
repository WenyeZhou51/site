import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './GameDetails.css';

function GameDetails() {
  const { gameId } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isImageFile, setIsImageFile] = useState(false);

  useEffect(() => {
    // For demonstration, we're hard-coding the game details
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
    } else if (gameId === '雾海') {
      setGameDetails({
        id: '雾海',
        name: '雾海',
        description: 'A Live Action Role Playing game scenario I wrote for multiple players. Set in a mysterious fog-covered sea environment. Complete with character scripts and evidence cards.',
        longDescription: 'A Life Action Role Playing game for 5 people lasting 6-8 hours. The town of "Wandering Rocks" sits next to a cursed sea with leviathans in the waters and socerers in the streets. In this town, a ship sets sail with 13 passengers. Passengers are found dead one by one, each with a tarot card in their pocket belonging to a certain dead socerer...',
        thumbnailPath: '/Asset/Games/雾海/thumbnail.png',
        files: [
          {
            name: '雾海剧本7月15.pdf',
            path: '/Asset/Games/雾海/雾海剧本7月15.pdf',
            description: 'Character scripts and roles for the game'
          },
          {
            name: '雾海线索7月15.pdf',
            path: '/Asset/Games/雾海/雾海线索7月15.pdf',
            description: 'Clue cards for the game'
          }
        ]
      });
      // Set the first file as default selected
      setSelectedFile('/Asset/Games/雾海/雾海剧本7月15.pdf');
    } else if (gameId === 'Arcana') {
      setGameDetails({
        id: 'Arcana',
        name: 'Arcana',
        description: 'Arcana is a 2-4 player deck building game where players start from a set of basic cards and modify their deck to generate gold, slay monsters, and attain the arcane truth of the universe. The game format is similar to Dominion and Ascension.',
        longDescription: 'Arcana is a 2-4 player deck building game where players start from a set of basic cards and modify their deck to generate gold, slay monsters, and attain the arcane truth of the universe. The game format is similar to Dominion and Ascension.',
        thumbnailPath: '/Asset/Games/Arcana/10x7 world deck market.png',
        rules: {
          name: 'Rulebook.pdf',
          path: '/Asset/Games/Arcana/Rulebook.pdf',
          description: 'Complete game rules and setup instructions'
        },
        files: [
          {
            name: 'BloodMagicBasicCards.pdf',
            path: '/Asset/Games/Arcana/BloodMagicBasicCards.pdf',
            description: 'Basic Blood Magic cards for the game'
          },
          {
            name: 'Market Cards',
            path: '/Asset/Games/Arcana/10x7 world deck market.png',
            description: 'Market cards available for purchase'
          },
          {
            name: 'Market Cards Set 2',
            path: '/Asset/Games/Arcana/10x7 world deck market 2.png',
            description: 'Additional market cards for expanded gameplay'
          },
          {
            name: 'Monster Cards',
            path: '/Asset/Games/Arcana/10x3 world deck monster.png',
            description: 'Monster cards to battle during play'
          },
          {
            name: 'Monster Card Backs',
            path: '/Asset/Games/Arcana/10x3 world deck monster back.png',
            description: 'Monster card backs'
          },
          {
            name: 'Attack Cards',
            path: '/Asset/Games/Arcana/10x3 world deck attacks.png',
            description: 'Attack cards for combat'
          }
        ]
      });
      // Set the first file as default selected
      setSelectedFile('/Asset/Games/Arcana/Rulebook.pdf');
    }
  }, [gameId]);

  useEffect(() => {
    // Check if the selected file is an image
    if (selectedFile) {
      const isImage = selectedFile.toLowerCase().endsWith('.png') || 
                      selectedFile.toLowerCase().endsWith('.jpg') || 
                      selectedFile.toLowerCase().endsWith('.jpeg') || 
                      selectedFile.toLowerCase().endsWith('.gif');
      setIsImageFile(isImage);
    }
  }, [selectedFile]);

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
          {gameDetails.thumbnailPath.endsWith('.pdf') ? (
            <object
              data={gameDetails.thumbnailPath}
              type="application/pdf"
              className="game-cover-pdf"
            >
              <p className="pdf-fallback">
                It appears your browser doesn't support embedded PDFs.
                <a href={gameDetails.thumbnailPath} target="_blank" rel="noopener noreferrer">
                  Click here to view the thumbnail
                </a>
              </p>
            </object>
          ) : (
            <img 
              src={gameDetails.thumbnailPath} 
              alt={`${gameDetails.name} cover`} 
              className="game-cover-image" 
            />
          )}
        </div>

        <div className="game-description-container">
          <h3 className="game-subtitle">About the Game</h3>
          <p className="game-long-description">{gameDetails.longDescription}</p>
        </div>

        {gameDetails.rules && (
          <div className="game-rules-section">
            <h3 className="game-subtitle">Game Rules</h3>
            <div className="rules-preview-container">
              <object
                data={gameDetails.rules.path}
                type="application/pdf"
                width="100%"
                height="600px"
                className="rules-pdf-viewer"
              >
                <p className="pdf-fallback">
                  It appears your browser doesn't support embedded PDFs.
                  <a href={gameDetails.rules.path} target="_blank" rel="noopener noreferrer">
                    Click here to download the PDF
                  </a>
                </p>
              </object>
            </div>
            <div className="rules-actions">
              <a 
                href={gameDetails.rules.path} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-game"
              >
                View Rules
              </a>
              <a 
                href={gameDetails.rules.path} 
                download
                className="btn-game"
              >
                Download
              </a>
            </div>
          </div>
        )}

        <div className="game-files-section">
          <h3 className="game-subtitle">Game Materials</h3>
          <div className="game-files-grid">
            {gameDetails.files.map((file, index) => (
              <div 
                key={index} 
                className={`game-file-card ${selectedFile === file.path ? 'active' : ''}`}
                onClick={() => setSelectedFile(file.path)}
              >
                <div className="file-icon">
                  {file.path.toLowerCase().endsWith('.pdf') ? 'PDF' : 'IMG'}
                </div>
                <div className="file-info">
                  <h4 className="file-name">{file.name}</h4>
                  <p className="file-description">{file.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedFile && gameDetails.rules && selectedFile !== gameDetails.rules.path && (
          <div className="game-preview-section">
            <h3 className="game-subtitle">Preview</h3>
            {isImageFile ? (
              <div className="image-preview-container">
                <img 
                  src={selectedFile} 
                  alt="Game material preview" 
                  className="full-image-preview"
                />
              </div>
            ) : (
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
            )}
          </div>
        )}
        
        {selectedFile && !gameDetails.rules && (
          <div className="game-preview-section">
            <h3 className="game-subtitle">Preview</h3>
            {isImageFile ? (
              <div className="image-preview-container">
                <img 
                  src={selectedFile} 
                  alt="Game material preview" 
                  className="full-image-preview"
                />
              </div>
            ) : (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GameDetails; 