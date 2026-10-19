import { paperPoint, createPaperMaterial } from './exploreMaterials';
import { warmPaperTextures } from './paperTextureCache';

jest.mock('./paperTextureCache', () => ({ warmPaperTextures: jest.fn() }));

const sheet = { left: 60, top: 110, right: 1140, bottom: 800, width: 1080, height: 690 };

test('the sheet starts exactly at the rendered page coordinates', () => {
  for (let y = sheet.top; y <= sheet.bottom; y += 30) {
    for (let x = sheet.left; x <= sheet.right; x += 30) {
      const p = paperPoint(x, y, 0, sheet);
      expect(p.x).toBeCloseTo(x);
      expect(p.y).toBeCloseTo(y);
      expect(p.back).toBe(false);
    }
  }
});

test('a mid-lift contains front, reverse and exposed destination', () => {
  const surfaces = new Set();
  for (let y = sheet.top; y < sheet.bottom; y += 12) {
    for (let x = sheet.left; x < sheet.right; x += 12) {
      const p = paperPoint(x, y, .42, sheet);
      surfaces.add(p ? p.back ? 'reverse' : 'front' : 'destination');
      if (p) {
        expect(p.x).toBeGreaterThanOrEqual(sheet.left);
        expect(p.x).toBeLessThanOrEqual(sheet.right);
        expect(p.y).toBeGreaterThanOrEqual(sheet.top);
        expect(p.y).toBeLessThanOrEqual(sheet.bottom);
      }
    }
  }
  expect([...surfaces].sort()).toEqual(['destination', 'front', 'reverse']);
});

test('the sheet fully leaves the viewport before arrival, at desktop and mobile widths', () => {
  for (const bounds of [sheet, { left: 0, right: 390, top: 78, bottom: 844, width: 390, height: 766 }]) {
    for (let y = bounds.top; y < bounds.bottom; y += 20) {
      for (let x = bounds.left; x < bounds.right; x += 20) {
        expect(paperPoint(x, y, 1, bounds)).toBeNull();
      }
    }
  }
});

test('playback waits for a complete frame bank and never replaces its resources mid-turn', async () => {
  let complete;
  warmPaperTextures.mockReturnValue(new Promise(resolve => { complete = resolve; }));
  const mount = jest.fn();
  const pending = createPaperMaterial(1200, 800, sheet, mount);
  expect(mount).not.toHaveBeenCalled();
  const frames = Object.freeze(Array.from({ length: 61 }, (_, i) => Object.freeze({ map: `map-${i}`, shade: `shade-${i}` })));
  complete(frames);
  const material = await pending;
  expect(mount).toHaveBeenCalledTimes(1);
  expect(mount).toHaveBeenCalledWith(frames);
  const setStyle = jest.spyOn(document.documentElement.style, 'setProperty');
  for (let i = 0; i <= 120; i++) material.draw(i / 120);
  expect(mount).toHaveBeenCalledTimes(1);
  expect(warmPaperTextures).toHaveBeenCalledTimes(1);
  expect(setStyle).toHaveBeenCalledWith('--paper-filter', 'url(#explore-paper-60)');
  setStyle.mockRestore();
  document.documentElement.removeAttribute('style');
});

test('missing texture support rejects before installing any partial paper effect', async () => {
  warmPaperTextures.mockResolvedValue(null);
  const mount = jest.fn();
  await expect(createPaperMaterial(1200, 800, sheet, mount)).rejects.toThrow('preparation unavailable');
  expect(mount).not.toHaveBeenCalled();
});
