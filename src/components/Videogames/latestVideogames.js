// Shared by the collection and detail pages so previews and downloads stay in sync.
const latestVideogames = [
  {
    id: 'DISPLACE',
    name: 'DISPLACE',
    type: 'videogame',
    description: 'Displace is a retro-style box and buttons puzzle game where the player has the ability to switch positions with objects.',
    longDescription: 'Displace is a retro-style box and buttons puzzle game where the player has the ability to switch positions with objects.',
    videoUrl: 'https://www.youtube.com/embed/mG1KlHB48iw',
    downloadZipUrl: process.env.PUBLIC_URL + '/assets/videogames/Displace/Displace.zip'
  },
  {
    id: 'ARIADNE',
    name: 'ARIADNE',
    type: 'videogame',
    description: 'Ariadne is a short narrative game about navigating a maze with a needle. The player walks through the maze and sees their memories, putting together what has happened, and understanding what the maze really is.',
    longDescription: 'Ariadne is a short narrative game about navigating a maze with a needle. The player walks through the maze and sees their memories, putting together what has happened, and understanding what the maze really is.',
    videoUrl: 'https://www.youtube.com/embed/q0dahVtWeMY',
    downloadZipUrl: 'https://github.com/WenyeZhou51/site/releases/download/game-downloads/Ariadne.zip'
  }
];

export default latestVideogames;
