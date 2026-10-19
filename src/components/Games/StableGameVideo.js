import React, { useEffect, useState } from 'react';
import './StableGameVideo.css';

export function videoPoster(url) {
  const match = url && url.match(/^https:\/\/(?:www\.)?youtube\.com\/embed\/([\w-]+)/);
  return match ? `https://i.ytimg.com/vi/${match[1]}/hqdefault.jpg` : null;
}

// The iframe's initial empty/black paint must not become part of the page turn.
// Keep its already decoded poster visible throughout the transition; the live
// player fades in only after loading and after the sheet has left.
export default function StableGameVideo({ game }) {
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!loaded) return undefined;
    const timer = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(timer);
  }, [loaded]);
  const poster = videoPoster(game.videoUrl);
  return <div className={`game-video-container stable-game-video${ready ? ' is-ready' : ''}`}>
    {poster && <img className="game-video-poster" src={poster} alt="" aria-hidden="true" />}
    <iframe src={game.videoUrl} title={`${game.name} preview`} className="game-video"
      onLoad={() => setLoaded(true)} referrerPolicy="strict-origin-when-cross-origin"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen />
  </div>;
}
