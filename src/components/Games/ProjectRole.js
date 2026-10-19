import React, { useEffect, useRef } from 'react';
import './ProjectRole.css';

export default function ProjectRole({ gameId, role }) {
  const noteRef = useRef(null);
  const roleLabel = role || (gameId === 'CAPACITOR' || gameId === 'MINUTE-MARK' ? 'Design Lead' : 'Solo Dev');
  const isDesignLead = roleLabel === 'Design Lead';

  useEffect(() => {
    const note = noteRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animation;
    let lastFlutter = 0;
    const flutter = (event) => {
      if (event.pointerType !== 'mouse' || reducedMotion.matches ||
        document.documentElement.hasAttribute('data-explore-motion')) return;
      const bounds = note.getBoundingClientRect();
      const dx = Math.max(bounds.left - event.clientX, 0, event.clientX - bounds.right);
      const dy = Math.max(bounds.top - event.clientY, 0, event.clientY - bounds.bottom);
      const distance = Math.hypot(dx, dy);
      const now = performance.now();
      if (distance > 90 || now - lastFlutter < 650 || !note.animate) return;
      lastFlutter = now;
      const tilt = isDesignLead ? 2 : -2;
      const strength = 1 - distance / 120;
      if (animation) animation.cancel();
      animation = note.animate([
        { transform: `perspective(400px) rotate(${tilt}deg) rotateX(0deg)` },
        { transform: `perspective(400px) rotate(${tilt + 1.5 * strength}deg) rotateX(${-9 * strength}deg)` },
        { transform: `perspective(400px) rotate(${tilt - strength}deg) rotateX(${5 * strength}deg)` },
        { transform: `perspective(400px) rotate(${tilt + 0.5 * strength}deg) rotateX(${-3 * strength}deg)` },
        { transform: `perspective(400px) rotate(${tilt}deg) rotateX(0deg)` }
      ], { duration: 700, easing: 'ease-in-out' });
    };
    const stop = () => { if (animation) animation.cancel(); };
    window.addEventListener('pointermove', flutter, { passive: true });
    reducedMotion.addEventListener('change', stop);
    return () => {
      window.removeEventListener('pointermove', flutter);
      reducedMotion.removeEventListener('change', stop);
      stop();
    };
  }, [isDesignLead]);

  return (
    <span ref={noteRef} className={`project-role-note${isDesignLead ? ' project-role-note-lead' : ''}`}>
      <span className="project-role-label">My role: </span>
      {roleLabel}
    </span>
  );
}
