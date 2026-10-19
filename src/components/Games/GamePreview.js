import React from 'react';

// Keep videos interactive: the player must not be wrapped in a navigation link.
export default function GamePreview({ game, className }) {
  if (game.videoUrl) {
    return (
      <iframe
        src={game.videoUrl}
        title={`${game.name} preview`}
        className={className}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  if (game.coverTitle && !game.thumbnailPath) {
    return (
      <div className={`${className} game-text-cover`} role="img" aria-label={`${game.name} cover`}>
        <strong>{game.coverTitle}</strong>
        <span>{game.coverSubtitle}</span>
      </div>
    );
  }

  return game.thumbnailPath ? (
    <img src={game.thumbnailPath} alt={`${game.name} preview`} className={className} loading="lazy" />
  ) : <span>{game.name}</span>;
}
