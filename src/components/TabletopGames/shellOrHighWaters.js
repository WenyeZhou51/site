const description = 'A dice-rolling, push-your-luck boardgame where units can stack on and freeload off each other. Similar to Up the River.';
const asset = (filename) => `${process.env.PUBLIC_URL}/assets/tabletop-games/Shell%20or%20High%20Water/${encodeURIComponent(filename)}`;
const preview = (filename) => `${process.env.PUBLIC_URL}/assets/tabletop-games/Shell%20or%20High%20Water/previews/${filename}`;

export const shellMaterials = {
  rulebook: {
    title: 'Rulebook',
    original: asset('Shell-or-High-Water-Rules-Booklet (1).pdf'),
    pages: [
      { src: preview('rulebook-1.webp'), title: 'Rulebook · Page 1', caption: 'Setup, your turn, stacking, and rocks.', width: 1132, height: 1600 },
      { src: preview('rulebook-2.webp'), title: 'Rulebook · Page 2', caption: 'Food, the tide, negotiation, and scoring.', width: 1132, height: 1600 }
    ]
  },
  components: [
    { title: 'Board', src: preview('board.webp'), original: asset('True board.png'), format: 'PNG', description: 'Printable river board', caption: 'The river board, with the shore, food spaces, and rock locations.', width: 1280, height: 1600 },
    { title: 'Food Tokens', src: preview('tokens.webp'), original: asset('Turtle-Tide-5.8x8.3-Inch-Sticker-Sheet (1).pdf'), format: 'PDF', description: 'Printable food token sheet', caption: 'The printable sticker sheet of food tokens, valued from 1 to 6.', width: 979, height: 1400 }
  ],
  photos: [
    { title: 'Stacking up', src: preview('gameplay-1.webp'), original: asset('turtle 3.jpg'), caption: 'A tower of turtles shares a space on the river.', width: 1600, height: 1200 },
    { title: 'Around the table', src: preview('gameplay-2.webp'), original: asset('turtle.jpg'), caption: 'The physical board, turtles, rocks, and food tokens in play.', width: 1600, height: 1200 },
    { title: 'A ride downriver', src: preview('gameplay-3.webp'), original: asset('turtle 2.jpg'), caption: 'Turtles carry food and hitch rides on other players’ stacks.', width: 1600, height: 1200 }
  ]
};

const shellOrHighWaters = {
  id: 'SHELL-OR-HIGH-WATERS',
  name: 'Shell or High Waters',
  language: 'en',
  type: 'boardgame',
  role: 'Design Lead',
  coverTitle: 'Shell or High Waters',
  coverSubtitle: 'Boardgame',
  thumbnailPath: shellMaterials.photos[0].src,
  description,
  longDescription: description
};

export default shellOrHighWaters;
