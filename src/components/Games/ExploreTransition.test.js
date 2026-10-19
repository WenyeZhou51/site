import React, { act } from 'react';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import ExploreTransitions, { ExploreLink, shouldAnimateExplore } from './ExploreTransition';
import { createInkMaterial } from './exploreMaterials';

jest.mock('./exploreMaterials', () => ({
  createInkMaterial: jest.fn(() => ({ draw: jest.fn() })),
  createPaperMaterial: jest.fn(() => Promise.resolve({ draw: jest.fn() })),
  prepareInkMaterial: jest.fn(() => Promise.resolve(Array.from({ length: 64 }, () => ({ url: 'ink-mask.png' })))),
  preparePaperMaterial: jest.fn()
}));

function Location() {
  return <output data-testid="location">{useLocation().pathname}</output>;
}
function Fixture() {
  return <MemoryRouter initialEntries={['/tabletop-games']}><ExploreTransitions>
    <div className="paper container"><nav className="paper-navbar">Navigation</nav>
      <article className="game-card"><div className="game-thumbnail-container" />
        <ExploreLink effect="ink" to="/games/雪骤山庄">Explore Game</ExploreLink>
      </article><Location />
    </div>
  </ExploreTransitions></MemoryRouter>;
}

beforeEach(() => {
  window.scrollTo = jest.fn();
  window.matchMedia = jest.fn(() => ({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
  delete document.startViewTransition;
});
afterEach(() => { cleanup(); jest.clearAllMocks(); });

test('modifier clicks, new tabs and handled clicks keep normal link behavior', () => {
  const event = { button: 0, currentTarget: { target: '' } };
  expect(shouldAnimateExplore(event)).toBe(true);
  for (const change of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true },
    { button: 1 }, { defaultPrevented: true }, { currentTarget: { target: '_blank' } }]) {
    expect(shouldAnimateExplore({ ...event, ...change })).toBe(false);
  }
});

test.each(['unsupported', 'reduced motion'])('%s navigates without a visual capture or overlay', async mode => {
  if (mode === 'reduced motion') {
    document.startViewTransition = jest.fn();
    window.matchMedia.mockReturnValue({ matches: true });
  }
  render(<Fixture />);
  fireEvent.click(screen.getByText('Explore Game'));
  expect(decodeURI(screen.getByTestId('location').textContent)).toBe('/games/雪骤山庄');
  expect(document.querySelector('.explore-particles')).toBeNull();
  expect(document.documentElement.hasAttribute('data-explore-motion')).toBe(false);
  expect(window.scrollTo).toHaveBeenCalled();
  if (mode === 'reduced motion') expect(document.startViewTransition).not.toHaveBeenCalled();
});

test('capture failure still reaches the destination and cleans up', async () => {
  const warning = jest.spyOn(console, 'warn').mockImplementation(() => {});
  document.startViewTransition = () => { throw new Error('capture unavailable'); };
  render(<Fixture />);
  fireEvent.click(screen.getByText('Explore Game'));
  await act(async () => { await new Promise(resolve => setTimeout(resolve, 80)); });
  expect(decodeURI(screen.getByTestId('location').textContent)).toBe('/games/雪骤山庄');
  expect(document.querySelector('.explore-particles')).toBeNull();
  expect(document.documentElement.hasAttribute('data-explore-motion')).toBe(false);
  warning.mockRestore();
});

test('Chinese destination routes keep their transition, and Escape releases the capture', async () => {
  let finish;
  const animation = { cancel: jest.fn() };
  document.documentElement.animate = jest.fn(() => animation);
  const finished = new Promise(resolve => { finish = resolve; });
  const skip = jest.fn(() => finish());
  let ready;
  document.startViewTransition = callback => { ready = Promise.resolve().then(callback); return { ready, finished, skipTransition: skip }; };
  render(<Fixture />);
  fireEvent.click(screen.getByText('Explore Game'));
  await act(async () => { await new Promise(resolve => setTimeout(resolve, 80)); });
  expect(createInkMaterial).toHaveBeenCalled();
  // Keeping the transition alive must not override the old page's dissolve.
  expect(document.documentElement.animate.mock.calls[0][1].pseudoElement).toBe('::view-transition-group(explore-nav)');
  expect(document.documentElement.dataset.exploreMotion).toBe('ink');
  fireEvent.keyDown(window, { key: 'Escape' });
  await act(async () => { await finished; });
  expect(document.querySelector('.explore-particles')).toBeNull();
  expect(document.documentElement.hasAttribute('data-explore-motion')).toBe(false);
  expect(skip).toHaveBeenCalledTimes(1);
  expect(animation.cancel).toHaveBeenCalled();
  expect(document.querySelector('.game-thumbnail-container').style.viewTransitionName).toBeFalsy();
});

test('Escape during preparation cancels without a delayed navigation', async () => {
  document.startViewTransition = jest.fn();
  render(<Fixture />);
  fireEvent.click(screen.getByText('Explore Game'));
  fireEvent.keyDown(window, { key: 'Escape' });
  await act(async () => { await new Promise(resolve => setTimeout(resolve, 80)); });
  expect(document.startViewTransition).not.toHaveBeenCalled();
  expect(screen.getByTestId('location').textContent).toBe('/tabletop-games');
  expect(document.documentElement.hasAttribute('data-explore-motion')).toBe(false);
});
