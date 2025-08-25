import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './GameDetails.css';
import SpoilerReveal from '../SpoilerReveal/SpoilerReveal';

function GameDetails() {
  const { gameId } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isImageFile, setIsImageFile] = useState(false);
  const [selectedConceptArt, setSelectedConceptArt] = useState(0);

  useEffect(() => {
    // For demonstration, we're hard-coding the game details
    // In a real app, this would come from an API or database
    if (gameId === '雪骤山庄') {
      setGameDetails({
        id: '雪骤山庄',
        name: '雪骤山庄',
        description: 'A Live Action Role Playing game scenario I wrote for 5 players. Involving two locked-room murder mysteries and a killer hiding amongst the players. Complete with character scripts and evidence cards.',
        longDescription: 'Five people gathers in the Snowbound Villa to celebrate the birthday of the Villa Owner, Xue Ao Qing. The unassuming celebration is interrupted the discovery of two names etched onto the coffin with the ominous message "Death by water". Snow falls, and the declaration soon comes true at night, with the two victims found dead in their locked rooms.',
        thumbnailPath: process.env.PUBLIC_URL + '/Asset/Games/雪骤山庄/thumbnail.png',
        files: [
          {
            name: '雪骤山庄人物剧本.pdf',
            path: process.env.PUBLIC_URL + '/Asset/Games/雪骤山庄/雪骤山庄人物剧本.pdf',
            description: 'Character scripts and roles for the game'
          },
          {
            name: '雪骤山庄线索.pdf',
            path: process.env.PUBLIC_URL + '/Asset/Games/雪骤山庄/雪骤山庄线索.pdf',
            description: 'Clue cards for the game'
          }
        ]
      });
      // Set the first file as default selected
      setSelectedFile(process.env.PUBLIC_URL + '/Asset/Games/雪骤山庄/雪骤山庄人物剧本.pdf');
    } else if (gameId === '雾海') {
      setGameDetails({
        id: '雾海',
        name: '雾海',
        description: 'A Live Action Role Playing game scenario I wrote for multiple players. Set in a mysterious fog-covered sea environment. Complete with character scripts and evidence cards.',
        longDescription: 'A Life Action Role Playing game for 5 people lasting 6-8 hours. The town of "Wandering Rocks" sits next to a cursed sea with leviathans in the waters and socerers in the streets. In this town, a ship sets sail with 13 passengers. Passengers are found dead one by one, each with a tarot card in their pocket belonging to a certain dead socerer...',
        thumbnailPath: process.env.PUBLIC_URL + '/Asset/Games/雾海/thumbnail.png',
        files: [
          {
            name: '雾海剧本7月15.pdf',
            path: process.env.PUBLIC_URL + '/Asset/Games/雾海/雾海剧本7月15.pdf',
            description: 'Character scripts and roles for the game'
          },
          {
            name: '雾海线索7月15.pdf',
            path: process.env.PUBLIC_URL + '/Asset/Games/雾海/雾海线索7月15.pdf',
            description: 'Clue cards for the game'
          }
        ]
      });
      // Set the first file as default selected
      setSelectedFile(process.env.PUBLIC_URL + '/Asset/Games/雾海/雾海剧本7月15.pdf');
    } else if (gameId === 'Arcana') {
      setGameDetails({
        id: 'Arcana',
        name: 'Arcana',
        description: 'Arcana is a 2-4 player deck building game where players start from a set of basic cards and modify their deck to generate gold, slay monsters, and attain the arcane truth of the universe. The game format is similar to Dominion and Ascension.',
        longDescription: 'Arcana is a 2-4 player deck building game where players start from a set of basic cards and modify their deck to generate gold, slay monsters, and attain the arcane truth of the universe. The game format is similar to Dominion and Ascension.',
        thumbnailPath: process.env.PUBLIC_URL + '/Asset/Games/Arcana/10x7 world deck market.png',
        rules: {
          name: 'Rulebook.pdf',
          path: process.env.PUBLIC_URL + '/Asset/Games/Arcana/Rulebook.pdf',
          description: 'Complete game rules and setup instructions'
        },
        files: [
          {
            name: 'BloodMagicBasicCards.pdf',
            path: process.env.PUBLIC_URL + '/Asset/Games/Arcana/BloodMagicBasicCards.pdf',
            description: 'Basic Blood Magic cards for the game'
          },
          {
            name: 'Market Cards',
            path: process.env.PUBLIC_URL + '/Asset/Games/Arcana/10x7 world deck market.png',
            description: 'Market cards available for purchase'
          },
          {
            name: 'Market Cards Set 2',
            path: process.env.PUBLIC_URL + '/Asset/Games/Arcana/10x7 world deck market 2.png',
            description: 'Additional market cards for expanded gameplay'
          },
          {
            name: 'Monster Cards',
            path: process.env.PUBLIC_URL + '/Asset/Games/Arcana/10x3 world deck monster.png',
            description: 'Monster cards to battle during play'
          },
          {
            name: 'Monster Card Backs',
            path: process.env.PUBLIC_URL + '/Asset/Games/Arcana/10x3 world deck monster back.png',
            description: 'Monster card backs'
          },
          {
            name: 'Attack Cards',
            path: process.env.PUBLIC_URL + '/Asset/Games/Arcana/10x3 world deck attacks.png',
            description: 'Attack cards for combat'
          }
        ]
      });
      // Set the first file as default selected
      setSelectedFile(process.env.PUBLIC_URL + '/Asset/Games/Arcana/Rulebook.pdf');
    } else if (gameId === 'CAPACITOR') {
      setGameDetails({
        id: 'CAPACITOR',
        name: 'CAPACITOR',
        description: 'A collaborative multiplayer horror game where players scavenge an abandoned industrial complex for parts as the electricity depletes...',
        longDescription: 'A collaborative multiplayer horror game where players scavenge an abandoned industrial complex for parts as the electricity depletes. The game creates a tense atmosphere as players must work together while the power slowly fades, creating an increasingly dangerous environment.\n\nI created this game with Austin Huang, Sungwon Chung, Junho Kim, and Caleb Mckinney. They are incredible programmers that helped the project immensely. Look out for their future works as well!',
        videoUrl: 'https://www.youtube.com/embed/OBx0AlWrRVo?start=4',
        githubUrl: 'https://github.com/WenyeZhou51/CAPACITOR',
        thumbnailPath: process.env.PUBLIC_URL + '/Asset/CodeProjects/Capacitor/placeholder.png',
        conceptArt: [
          {
            name: 'Earworm design.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/Capacitor/Concept Art/Earworm design.png',
            title: 'Earworm Design'
          },
          {
            name: 'Venus design.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/Capacitor/Concept Art/Venus design.png',
            title: 'Venus Design'
          }
        ]
      });
      setSelectedFile(null); // Videogames don't need file selection
    } else if (gameId === 'THE-HOLLOWS') {
      setGameDetails({
        id: 'THE-HOLLOWS',
        name: 'THE HOLLOWS',
        description: 'A 2D JRPG where the main character and their party ventures into the hollows to save the world and fall the obelisk',
        longDescription: 'A 2D JRPG where the main character and their party ventures into the hollows to save the world and fall the obelisk. This classic-style role-playing game features turn-based combat, character progression, and an immersive story-driven experience.',
        videoUrl: 'https://www.youtube.com/embed/w4s7HLy6IOY',
        githubUrl: 'https://github.com/WenyeZhou51/The-Hollows',
        thumbnailPath: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/placeholder.png',
        conceptArt: [
          {
            name: 'Character Design Fighter.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/Concept Art/Character Design Fighter.png',
            title: 'Character Design Fighter'
          },
          {
            name: 'Character Design Magician.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/Concept Art/Character Design Magician.png',
            title: 'Character Design Magician'
          },
          {
            name: 'Character Design Bard.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/Concept Art/Character Design Bard.png',
            title: 'Character Design Bard'
          },
          {
            name: 'Character Design Ranger.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/Concept Art/Character Design Ranger.png',
            title: 'Character Design Ranger'
          },
          {
            name: 'Character Portrait Fighter.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/Concept Art/Character Portrait Fighter.png',
            title: 'Character Portrait Fighter'
          },
          {
            name: 'NPC hood overworld.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/Concept Art/NPC hood overworld.png',
            title: 'NPC hood overworld'
          },
          {
            name: 'Monster Design Obelisk.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/Concept Art/Monster Design Obelisk.png',
            title: 'Monster Design Obelisk'
          },
          {
            name: 'Monster Design Aperture.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/Concept Art/Monster Design Aperture.png',
            title: 'Monster Design Aperture'
          },
          {
            name: 'Monster Design Morphed Weaver.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/Concept Art/Monster Design Morphed Weaver.png',
            title: 'Monster Design Morphed Weaver'
          },
          {
            name: 'Monster Design Morphed Aperture.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/Concept Art/Monster Design Morphed Aperture.png',
            title: 'Monster Design Morphed Aperture'
          },
          {
            name: 'Monster Design Weaver.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/Concept Art/Monster Design Weaver.png',
            title: 'Monster Design Weaver'
          },
          {
            name: 'Overworld Gate.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/Concept Art/Overworld Gate.png',
            title: 'Overworld Gate'
          },
          {
            name: 'Overworld cave.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/Concept Art/Overworld cave.png',
            title: 'Overworld cave'
          },
          {
            name: 'Overworld corridor.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/Concept Art/Overworld corridor.png',
            title: 'Overworld corridor'
          },
          {
            name: 'Overworld Entrance.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/Concept Art/Overworld Entrance.png',
            title: 'Overworld Entrance'
          },
          {
            name: 'Comic panel.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/Concept Art/Comic panel.png',
            title: 'Comic panel'
          },
          {
            name: 'Comic panel 2.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/Concept Art/Comic panel 2.png',
            title: 'Comic panel 2'
          },
          {
            name: 'Comic panel 3.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/Concept Art/Comic panel 3.png',
            title: 'Comic panel 3'
          },
          {
            name: 'Start Menu.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/Concept Art/Start Menu.png',
            title: 'Start Menu'
          },
          {
            name: 'Surprise second phase.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/Concept Art/Surprise second phase.png',
            title: 'Surprise second phase'
          },
          {
            name: 'Cake with a candle on it.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/Concept Art/Cake with a candle on it.png',
            title: 'Cake with a candle on it'
          },
          {
            name: 'NPC hood.png',
            path: process.env.PUBLIC_URL + '/Asset/CodeProjects/The Hollows/Concept Art/NPC hood.png',
            title: 'NPC hood'
          }
        ]
      });
      setSelectedFile(null); // Videogames don't need file selection
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

  // Add protection for 剧本杀 games
  useEffect(() => {
    const isProtectedGame = gameDetails && (gameDetails.id === '雪骤山庄' || gameDetails.id === '雾海');
    
    if (isProtectedGame) {
      const handleKeyDown = (e) => {
        // Prevent Ctrl+S (save), Ctrl+P (print), Ctrl+Shift+I (dev tools), F12 (dev tools)
        if ((e.ctrlKey && (e.key === 's' || e.key === 'p')) || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') || 
            e.key === 'F12') {
          e.preventDefault();
          return false;
        }
      };

      const handleContextMenu = (e) => {
        // Only prevent right-click on protected PDFs
        if (e.target.closest('.protected-pdf')) {
          e.preventDefault();
          return false;
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('contextmenu', handleContextMenu);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('contextmenu', handleContextMenu);
      };
    }
  }, [gameDetails]);

  if (!gameDetails) {
    return (
      <div className="game-details-container">
        <h2 className="about-title">Game Not Found</h2>
        <div className="game-not-found">
          <p>Sorry, the game you're looking for doesn't exist or hasn't been implemented yet.</p>
          <Link to="/games" className="btn-game">Back to Boardgames</Link>
          <Link to="/code-projects" className="btn-game">Back to Videogames</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="game-details-container">
      <div className="game-details-header">
        <Link to={gameDetails.videoUrl ? "/code-projects" : "/games"} className="back-link">
          ← Back to {gameDetails.videoUrl ? "Videogames" : "Boardgames"}
        </Link>
        <h2 className="about-title" lang="zh-CN">{gameDetails.name}</h2>
      </div>

      <div className="game-details-content">
        {gameDetails.videoUrl ? (
          <div className="game-video-section">
            <h3 className="game-subtitle">Game Preview</h3>
            <div className="game-video-container">
              <iframe
                src={gameDetails.videoUrl}
                title={`${gameDetails.name} preview`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="game-video"
              ></iframe>
            </div>
          </div>
        ) : (
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
        )}

        <div className="game-description-container">
          <h3 className="game-subtitle">About the Game</h3>
          <p className="game-long-description">{gameDetails.longDescription}</p>
        </div>

        {gameDetails.id === 'CAPACITOR' && (
          <div className="game-design-notes-section">
            <h3 className="game-subtitle">Design Notes</h3>
            <div className="design-notes-content">
              <p className="design-notes-intro">
                The game is a collaborative first-person horror game for 2-5 players, where players gather scrap in a strange industrial facility. 
                The main gameplay involves exploring the industrial complex to collect components while avoiding traps and monsters as the electricity drains around them.
              </p>
              
              <div className="design-subsection">
                <h4 className="design-subsection-title">Economy</h4>
                <div className="design-subsection-content">
                  <p><strong>Inventory Slots:</strong> Players have 4 slots to carry equipment or loot. This is to encourage players to share equipment (eg: 1 flashlight per 2 person) and give interesting choices regarding what equipment to bring or leave behind.</p>
                  
                  <p>Scrap has different values, with more valuable scraps carrying special negative effects. The expensive strange radio constantly makes noise attracting enemies, and the valuable dormant bomb explodes after a certain time! This adds choice to player decisions about what to carry back and what to leave rather than mindlessly picking up everything.</p>
                  
                  <p>Scrap is scattered across the level and players must bring them back to spawn to cash them in. This pushes players to explore deeper and deeper into the facility as the nearby scrap gets scavenged.</p>
                </div>
              </div>

              <div className="design-subsection">
                <h4 className="design-subsection-title">Electricity System</h4>
                <div className="design-subsection-content">
                  <p><strong>Generator:</strong> Powers the facility but constantly overheats and fogs up the facility, decreasing visibility, forcing players to regularly scavenge for coolant to quell it. This serves as time pressure as well as a way to split up players since usually one player will go alone to refuel as other players loot. Splitting up the players improves horror experience and increases danger.</p>
                </div>
              </div>

              <div className="design-subsection">
                <h4 className="design-subsection-title">Level Generation</h4>
                <div className="design-subsection-content">
                  <p>The level is randomly generated on a 10 x 10 x 10 voxel grid with each room and corridor being a different size in voxels. The level changes each time the player starts a day so players can't just memorize the level. This adds to the unpredictability of the game and is central to the horror element.</p>
                </div>
              </div>

              <div className="design-subsection">
                <h4 className="design-subsection-title">Items</h4>
                <div className="design-subsection-content">
                  <ul className="design-items-list">
                    <li><strong>Flashlight:</strong> lights up where the player points it to</li>
                    <li><strong>Spraypaint:</strong> paints the surface, acting as a waypoint marker</li>
                  </ul>
                </div>
              </div>

              <div className="design-subsection">
                <h4 className="design-subsection-title">The Terminal</h4>
                <div className="design-subsection-content">
                  <p>Acts like an actual command line terminal. Commands have to be inputted as if it is an actual cmd. Players can purchase items, read entity index, and see a radar view around other players depending on their command.</p>
                  
                  <p>The existence of the terminal is to foster player communication. The terminal guide can help other players avoid monsters or direct them to the nearest scrap. This makes the collaborative element more interesting.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {gameDetails.id === 'CAPACITOR' && gameDetails.conceptArt && (
          <div className="concept-art-section">
            <h3 className="game-subtitle">Concept Art</h3>
            <div className="concept-art-gallery">
              <div className="concept-art-main-image">
                <img 
                  src={gameDetails.conceptArt[selectedConceptArt].path} 
                  alt={gameDetails.conceptArt[selectedConceptArt].title}
                  className="concept-art-featured-image"
                />
                <div className="concept-art-caption">{gameDetails.conceptArt[selectedConceptArt].title}</div>
              </div>
              
              <div className="concept-art-thumbnails">
                {gameDetails.conceptArt.map((art, index) => (
                  <div 
                    key={index} 
                    className={`concept-art-thumbnail ${index === selectedConceptArt ? 'active' : ''}`}
                    onClick={() => setSelectedConceptArt(index)}
                  >
                    <img 
                      src={art.path} 
                      alt={art.title}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {gameDetails.id === 'CAPACITOR' && (
          <div className="developer-commentary-section">
            <h3 className="game-subtitle">Developer's Commentary</h3>
            <SpoilerReveal>
              <p>
                I've always been interested in creating collaborative multiplayer games. As an international student, my friends are scattered across countries, and my way of connecting and socializing with them mostly comes in the form of these games.
              </p>
              <p>
                CAPACITOR is made in the style of Lethal Company. Lethal Company is a game me and my friends loved and played extensively since its release.
              </p>
              <p>
                However, as great as Lethal Company is, it has its design tradeoffs. For one, the optimal strategy of play at the highest level is a very individualistic experience. People split up for highest coverage and no terminal operator is used. This results in people looting alone most of the time for maximum profit. Also, the flashlight is almost useless due to the basekit scan feature providing illumination, removing the tradeoff of visibility vs profit.
              </p>
              <p>
                I tried to address these issues in my game CAPACITOR. I wanted the optimal strategy to be one person being the terminal operator, helping three people navigate the facility. I made the terminal cam pretty powerful in providing direction and navigation. Also, making the flashlight necessary for seeing now encourages people sticking together to reduce the amount of flashlight needed. Although less dynamic in play, I think this genre of collaborative horror game is the most fun when players are near each other and communicating constantly.
              </p>
            </SpoilerReveal>
          </div>
        )}

        {gameDetails.githubUrl && (
          <div className="game-github-section">
            <h3 className="game-subtitle">Source Code</h3>
            <div className="github-link-container">
              <a 
                href={gameDetails.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-game github-link"
              >
                View on GitHub
              </a>
            </div>
          </div>
        )}

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

        {gameDetails.files && (
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
        )}

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
                  className={`pdf-viewer ${(gameDetails.id === '雪骤山庄' || gameDetails.id === '雾海') ? 'protected-pdf' : ''}`}
                  onContextMenu={(e) => (gameDetails.id === '雪骤山庄' || gameDetails.id === '雾海') && e.preventDefault()}
                >
                  <p className="pdf-fallback">
                    It appears your browser doesn't support embedded PDFs.
                    {(gameDetails.id === '雪骤山庄' || gameDetails.id === '雾海') ? (
                      <span>Please use a modern browser to view this content.</span>
                    ) : (
                      <a href={selectedFile} target="_blank" rel="noopener noreferrer">
                        Click here to download the PDF
                      </a>
                    )}
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
                  className={`pdf-viewer ${(gameDetails.id === '雪骤山庄' || gameDetails.id === '雾海') ? 'protected-pdf' : ''}`}
                  onContextMenu={(e) => (gameDetails.id === '雪骤山庄' || gameDetails.id === '雾海') && e.preventDefault()}
                >
                  <p className="pdf-fallback">
                    It appears your browser doesn't support embedded PDFs.
                    {(gameDetails.id === '雪骤山庄' || gameDetails.id === '雾海') ? (
                      <span>Please use a modern browser to view this content.</span>
                    ) : (
                      <a href={selectedFile} target="_blank" rel="noopener noreferrer">
                        Click here to download the PDF
                      </a>
                    )}
                  </p>
                </object>
              </div>
            )}
          </div>
        )}

        {gameDetails.id === 'Arcana' && (
          <div className="developer-commentary-section">
            <h3 className="game-subtitle">Developer's Commentary</h3>
            <SpoilerReveal>
              <p>
                I stopped development of this deck building game in Summer 2024 after realizing some of its fundamental flaws.
              </p>
              <p>
                Through balancing changes and numerous testplaying, I have already solved issues like the dominant strategy being to buy attacks only by increasing the general cost of attack cards. I also solved the problem of decks feeling sluggish to play by adding more draw cards.
              </p>
              <p>
                However, I have realized that there are several critical issues that this format of deckbuilder faces and makes it unfun to play.
              </p>
              <p>
                One is that the player's actions are largely independent. As the game goes on, a turn can be very long due to the amount of draws and combos. A player mindlessly waits around during the other players' turns, with no interaction or understanding of their decks required. (contrast this with Magic the Gathering, where understanding of the opponent's deck is critical and interaction is possible via instants)
              </p>
              <p>
                Another is the kingmaker effect: The game is very snowbally, and players that fall behind can almost never catch up. However, they can still influence the outcome of the game greatly by choosing who to attack, meaning the final victor of the game is often decided by players that have no winning chance.
              </p>
              <p>
                These major problems also exist in the games this deckbuilder is based on: Reign and Ascension. Perhaps this is why both are not as popular nowadays. I have learned valuable lessons from this failed design experiment.
              </p>
            </SpoilerReveal>
          </div>
        )}

        {gameDetails.id === 'THE-HOLLOWS' && gameDetails.conceptArt && (
          <div className="concept-art-section">
            <h3 className="game-subtitle">Concept Art</h3>
            <div className="concept-art-gallery">
              <div className="concept-art-main-image">
                <img 
                  src={gameDetails.conceptArt[selectedConceptArt].path} 
                  alt={gameDetails.conceptArt[selectedConceptArt].title}
                  className="concept-art-featured-image"
                />
                <div className="concept-art-caption">{gameDetails.conceptArt[selectedConceptArt].name.replace('.png', '')}</div>
              </div>
              
              <div className="concept-art-thumbnails">
                {gameDetails.conceptArt.map((art, index) => (
                  <div 
                    key={index} 
                    className={`concept-art-thumbnail ${index === selectedConceptArt ? 'active' : ''}`}
                    onClick={() => setSelectedConceptArt(index)}
                  >
                    <img 
                      src={art.path} 
                      alt={art.title}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {gameDetails.id === 'THE-HOLLOWS' && (
          <div className="developer-commentary-section">
            <h3 className="game-subtitle">Developer's Commentary</h3>
            <SpoilerReveal>
              <p>
                The catch of this game is that it is "unbeatable" in the traditional sense. This is a game about obsession.
              </p>
              <p>
                The game is set as a classic save-the-world JRPG, where the protagonist tries to defeat "The obelisk" with their friends to reverse calamity.
              </p>
              <p>
                However, the player soon finds the dungeon hostile and uncaring. To unlock the first door, they are required to play a card game where they do not know the rules of. This is the disorienting and uncaring world under the dungeon. The combat is also difficult and heavily RNG. Monsters are easy but can cast "Metamorphosis" at any time, transforming into extremely lethal and eldritch versions of themselves. Players will instinctively fear the Metamorphosis skill, mirroring the protagonist's fear of change.
              </p>
              <p>
                After gathering all the keys and fighting to the final boss, the player finds it difficult but beatable. Upon defeating it, the player is given false hope before a surprise, invincible second phase starts.
              </p>
              <p>
                Each time the player dies, they loop back to the beginning of the day. They retain their memories, and their dialogue changes with each death they accumulate. The deteriorating mental state of the protagonist can be seen with each additional death.
              </p>
              <p>
                The player can leave the dungeon at any point through the dungeon exit, and give up their fight with the obelisk. This is the only way to conclude the game.
              </p>
              <p>
                The game is about the obsession of the protagonist towards the obelisk, and the player's obsession with "Winning" a videogame. As the protagonist suffers death after death, loop after loop, the player too listens to repeating dialogue and dies to uncontrollable RNG. Both see what was wondrous become repetitive, what was fun become sour, yet both continue...
              </p>
              <p>
                I see the Obelisk as a cosmic uncontrollable force, like time, death, nature, or the stars in the sky. The protagonist and player accept it after their numerous struggles, and walk out of the dungeon into a colorful world in the Epilogue. I think despite everything, the game has a hopeful tone in the end.
              </p>
            </SpoilerReveal>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameDetails; 