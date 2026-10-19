import React from 'react';

export function getGameAction(game) {
  // An itch.io page or source repository is not a downloadable game ZIP.
  if (game.playableLink && /^https:\/\/(store\.steampowered\.com|steamcommunity\.com)\//i.test(game.playableLink)) {
    return { href: game.playableLink, label: 'Play on steam' };
  }
  // Set downloadZipUrl to an actual game build when one is available.
  if (game.downloadZipUrl) {
    return { href: game.downloadZipUrl, label: 'Download Zip', download: true };
  }
  return null;
}

export default function GameAction({ game, className }) {
  const action = getGameAction(game);
  if (!action) return null;

  return (
    <a href={action.href} className={className} download={action.download}
      target={action.download ? undefined : '_blank'} rel="noopener noreferrer">
      {action.label}
    </a>
  );
}
