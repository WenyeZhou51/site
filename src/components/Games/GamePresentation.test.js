import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import GameAction, { getGameAction } from './GameAction';
import GamePreview from './GamePreview';

test('only Steam destinations produce a play action', () => {
  for (const playableLink of [
    'https://store.steampowered.com/app/4387950/Minute_Mark/',
    'https://steamcommunity.com/sharedfiles/filedetails/?id=3748204457'
  ]) {
    expect(getGameAction({ playableLink })).toEqual({ href: playableLink, label: 'Play on steam' });
  }
  expect(getGameAction({ playableLink: 'https://wenyezhou.itch.io/clean-out-the-rooms' })).toBeNull();
  expect(getGameAction({ playableLink: 'https://store.steampowered.com.example.org/game' })).toBeNull();
});

test('games without Steam or a ZIP have no secondary button', () => {
  expect(renderToStaticMarkup(<GameAction game={{}} />)).toBe('');
  expect(renderToStaticMarkup(<GameAction game={{ githubUrl: 'https://github.com/example/game' }} />)).toBe('');
});

test('a game ZIP renders a download, with Steam taking priority when both exist', () => {
  const downloadZipUrl = '/builds/game.zip';
  const markup = renderToStaticMarkup(<GameAction game={{ downloadZipUrl }} />);
  expect(markup).toContain('Download Zip');
  expect(markup).toContain('href="/builds/game.zip"');
  expect(markup).toContain('download=""');
  expect(getGameAction({ downloadZipUrl, playableLink: 'https://store.steampowered.com/app/123/' }).label).toBe('Play on steam');
});

test('a video replaces the cover image for either kind of game', () => {
  const game = { name: 'Game preview', thumbnailPath: '/cover.png', videoUrl: 'https://www.youtube.com/embed/example' };
  const video = renderToStaticMarkup(<GamePreview game={game} />);
  expect(video).toContain('<iframe');
  expect(video).toContain(game.videoUrl);
  expect(video).not.toContain('<img');
  expect(video).not.toContain('<a ');
  expect(renderToStaticMarkup(<GamePreview game={{ ...game, videoUrl: undefined }} />)).toContain('<img');
});
