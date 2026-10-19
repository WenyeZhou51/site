import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createInkMaterial, createPaperMaterial, prepareInkMaterial, preparePaperMaterial } from './exploreMaterials';
import { clearPaperTextures } from './paperTextureCache';
import { videoPoster } from './StableGameVideo';
import './ExploreTransition.css';

const MotionContext = createContext(null);
const rect = node => {
  if (!node) return null;
  const r = node.getBoundingClientRect();
  return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height };
};

export function shouldAnimateExplore(event) {
  return !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey &&
    !event.shiftKey && !event.altKey && (!event.currentTarget.target || event.currentTarget.target === '_self');
}

export function ExploreLink({ effect, to, children, ...props }) {
  const start = useContext(MotionContext);
  return <Link {...props} to={to} onClick={event => {
    if (start && shouldAnimateExplore(event)) {
      event.preventDefault();
      start(to, effect, event.currentTarget);
    }
  }}>{children}</Link>;
}

export default function ExploreTransitions({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const active = useRef(null);
  const canvas = useRef(null);
  const [paperFrames, setPaperFrames] = useState([]);
  const [running, setRunning] = useState(false);
  const review = process.env.NODE_ENV === 'development' && new URLSearchParams(window.location.search).has('motion-review');
  const reviewParams = new URLSearchParams(window.location.search);
  const initialFrame = Math.min(100, Math.max(0, Number(reviewParams.get('frame')) || 0));
  const initialHold = review && reviewParams.has('frame');
  const controls = useRef({ slow: false, hold: initialHold, progress: initialFrame / 100 });
  const [slow, setSlow] = useState(false), [hold, setHold] = useState(initialHold), [progress, setProgress] = useState(initialFrame);

  useEffect(() => () => { if (active.current) active.current.cancel(); clearPaperTextures(); }, []);
  useEffect(() => {
    if (!['/code-projects', '/tabletop-games'].includes(location.pathname) || !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const warm = () => {
      if (active.current) return;
      const nav = document.querySelector('.paper-navbar');
      const page = rect(document.querySelector('.paper.container'));
      if (!nav || !page) return;
      const top = nav.getBoundingClientRect().height;
      preparePaperMaterial(window.innerWidth, window.innerHeight,
        { left: page.left, right: page.right, top, bottom: window.innerHeight,
          width: page.width, height: window.innerHeight - top });
    };
    warm();
    // The same URL is used beneath the destination player, avoiding its black
    // first paint while the paper is moving.
    document.querySelectorAll('.project-card iframe').forEach(frame => {
      const url = videoPoster(frame.src);
      if (url) { const poster = new Image(); poster.src = url; }
    });
    window.addEventListener('resize', warm);
    return () => window.removeEventListener('resize', warm);
  }, [location.pathname]);
  useEffect(() => {
    if (active.current && decodeURI(active.current.to) !== decodeURI(location.pathname)) active.current.cancel();
  }, [location.pathname]);

  const start = async (to, effect, link) => {
    if (active.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const navigateNow = () => {
      flushSync(() => navigate(review ? `${to}${window.location.search}` : to));
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };
    if (!document.startViewTransition || reduce.matches) {
      navigateNow();
      return;
    }

    const root = document.documentElement;
    const card = link.closest('.game-card, .project-card');
    const nav = document.querySelector('.paper-navbar');
    const top = Math.max(0, rect(nav).bottom);
    const page = rect(document.querySelector('.paper.container'));
    const width = window.innerWidth, height = window.innerHeight;
    const source = {
      card: rect(card), button: rect(link), top,
      art: rect(card && card.querySelector('.game-thumbnail-container, .project-video-container'))
    };
    let transition, raf, done = false, navigated = false, cancelled = false, stop;
    const animations = [];
    const named = [];
    const nameCapture = (node, name) => {
      if (!node) return;
      named.push({ node, previous: node.style.viewTransitionName });
      node.style.viewTransitionName = name;
    };
    const cleanup = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      animations.forEach(animation => animation.cancel());
      root.removeAttribute('data-explore-motion');
      root.removeAttribute('data-motion-frame');
      ['--sheet-lift', '--page-zoom', '--motion-top', '--ink-old', '--ink-new', '--paper-filter',
        '--ink-out-mask', '--ink-in-mask', '--ink-grain-opacity'].forEach(name => root.style.removeProperty(name));
      document.dispatchEvent(new Event('explore-motion-end'));
      named.forEach(({ node, previous }) => { node.style.viewTransitionName = previous; });
      window.removeEventListener('resize', stop);
      window.removeEventListener('popstate', stop);
      window.removeEventListener('keydown', escape);
      document.removeEventListener('visibilitychange', visibility);
      reduce.removeEventListener('change', stop);
      active.current = null;
      setRunning(false);
    };
    stop = () => { cancelled = true; if (transition) transition.skipTransition(); cleanup(); };
    const escape = event => { if (event.key === 'Escape') stop(); };
    const visibility = () => { if (document.hidden) stop(); };
    active.current = { to, cancel: stop };
    window.addEventListener('resize', stop);
    window.addEventListener('popstate', stop);
    window.addEventListener('keydown', escape);
    document.addEventListener('visibilitychange', visibility);
    reduce.addEventListener('change', stop);
    root.dataset.exploreMotion = effect;
    root.style.setProperty('--motion-top', `${top}px`);
    flushSync(() => setRunning(effect));

    try {
      if (effect === 'ink') {
        const textures = await prepareInkMaterial();
        if (done) return;
        root.style.setProperty('--ink-out-mask', `url("${textures[63].url}")`);
        root.style.setProperty('--ink-in-mask', `url("${textures[0].url}")`);
        nameCapture(card && card.querySelector('.game-thumbnail-container'), 'ink-source-art');
        nameCapture(card && card.querySelector('.project-title-row'), 'ink-source-title');
      }
      // Prepare the first bend before capture so the old snapshot starts flat.
      const material = effect === 'paper' ? await createPaperMaterial(width, height,
        { left: page.left, right: page.right, top, bottom: height, width: page.width, height: height - top },
        frames => { if (!done) flushSync(() => setPaperFrames(frames)); }) : null;
      if (done) return;
      if (material) material.draw(0);
      // Let SVG resolve the immutable frame bank before taking the snapshot.
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      if (done) return;
      transition = document.startViewTransition(async () => {
        if (done) return;
        navigateNow();
        navigated = true;
        // Rendering is suspended in the update callback: rAF cannot be awaited
        // here. Yield a task for the detail's state effect before native capture.
        await new Promise(resolve => setTimeout(resolve, 0));
        if (done) return;
        if (effect === 'ink') {
          nameCapture(document.querySelector('.game-main-image, .campaign-card'), 'ink-destination-art');
          nameCapture(document.querySelector('.project-title-row-detail'), 'ink-destination-title');
        }
        // Decode visible cover images before exposing the new page. A broken or
        // slow asset must never trap navigation.
        const covers = [...document.querySelectorAll('.game-main-image img, .game-video-poster')];
        await Promise.race([
          Promise.all(covers.map(img => img.decode ? img.decode().catch(() => {}) : Promise.resolve())),
          new Promise(resolve => setTimeout(resolve, 700))
        ]);
      });
      await transition.ready;
      if (done) return;
      const destination = {
        title: rect(document.querySelector('.project-title-row-detail')),
        art: rect(document.querySelector('.game-main-image, .game-video-container, .campaign-card'))
      };
      const renderer = material || createInkMaterial(width, height, source, destination, canvas.current);
      // Keep the native snapshots alive while the material evolves. The review
      // controls use this same renderer, including its real source and destination.
      animations.push(root.animate([{ opacity: 1 }, { opacity: 1 }], {
        duration: 60000, pseudoElement: '::view-transition-group(explore-nav)', fill: 'both'
      }));
      const duration = (effect === 'ink' ? 900 : 1050) * (controls.current.slow ? 4 : 1);
      let lastTime = performance.now(), elapsed = 0, lastProgress = -1;
      const samples = [], intervals = [];
      renderer.draw(0);
      const tick = now => {
        if (done) return;
        if (!controls.current.hold) { elapsed += now - lastTime; intervals.push(now - lastTime); }
        else elapsed = controls.current.progress * duration;
        lastTime = now;
        const t = Math.min(elapsed / duration, 1);
        if (t !== lastProgress) {
          const before = performance.now();
          renderer.draw(t);
          samples.push(performance.now() - before);
          lastProgress = t;
        }
        if (process.env.NODE_ENV === 'development') root.dataset.motionFrame = String(Math.round(t * 100));
        if (t < 1 || controls.current.hold) raf = requestAnimationFrame(tick);
        else {
          root.removeAttribute('data-motion-frame');
          if (process.env.NODE_ENV === 'development') root.dataset.motionStats = JSON.stringify({
            effect, frames: samples.length, duration: Math.round(elapsed),
            averageDrawMs: Math.round(samples.reduce((sum, n) => sum + n, 0) / samples.length * 10) / 10,
            maxDrawMs: Math.round(Math.max(...samples)),
            maxFrameMs: Math.round(Math.max(...intervals)),
            p95FrameMs: Math.round([...intervals].sort((a, b) => a - b)[Math.floor(intervals.length * .95)] || 0)
          });
          transition.skipTransition();
        }
      };
      raf = requestAnimationFrame(tick);
      await transition.finished;
      cleanup();
      if (cancelled) return;
      const heading = document.querySelector('.project-title-row-detail h2');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
        heading.addEventListener('blur', () => heading.removeAttribute('tabindex'), { once: true });
      }
    } catch (error) {
      if (transition) transition.skipTransition();
      cleanup();
      if (!navigated && !cancelled) navigateNow();
      if (process.env.NODE_ENV === 'development') console.warn('Explore motion fell back to normal navigation:', error);
    }
  };

  return <MotionContext.Provider value={start}>
    {children}
    <svg className="explore-filter-definitions" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {paperFrames.map((frame, index) => <filter key={frame.map} id={`explore-paper-${index}`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feImage href={frame.map} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="coordinates" />
          <feOffset in="SourceGraphic" dx={Math.max(window.innerWidth, window.innerHeight) * 2.1 / 510} dy={Math.max(window.innerWidth, window.innerHeight) * 2.1 / 510} result="print" />
          <feDisplacementMap scale={Math.max(window.innerWidth, window.innerHeight) * 2.1} in="print" in2="coordinates" xChannelSelector="R" yChannelSelector="G" result="sheet" />
          <feImage href={frame.shade} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="lighting" />
          <feMerge result="paper"><feMergeNode in="sheet" /><feMergeNode in="lighting" /></feMerge>
        </filter>)}
      </defs>
    </svg>
    {running === 'ink' && <canvas ref={canvas} className="explore-particles" aria-hidden="true" />}
    {review && !reviewParams.has('capture') && <aside className="motion-review" aria-label="Motion review controls">
      <p>Motion review · use an Explore link</p>
      <label><input type="checkbox" checked={slow} onChange={e => {
        setSlow(e.target.checked); controls.current.slow = e.target.checked;
      }} />Quarter speed</label>
      <label><input type="checkbox" checked={hold} onChange={e => {
        setHold(e.target.checked); controls.current.hold = e.target.checked;
      }} />Hold at frame</label>
      <label>Frame {progress}%<input type="range" min="0" max="100" value={progress} onChange={e => {
        const value = Number(e.target.value); setProgress(value); controls.current.progress = value / 100;
      }} /></label>
      <button onClick={() => { if (active.current) active.current.cancel(); navigate('/tabletop-games?motion-review=1'); }}>Tabletop</button>
      <button onClick={() => { if (active.current) active.current.cancel(); navigate('/code-projects?motion-review=1'); }}>Videogames</button>
    </aside>}
  </MotionContext.Provider>;
}
