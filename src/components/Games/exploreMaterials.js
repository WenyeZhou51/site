// Material coordinates are in viewport pixels, matching the browser's native
// view-transition snapshot. No DOM copies are used to bend the page.
import { warmPaperTextures } from './paperTextureCache';
export const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
export const smooth = (a, b, n) => {
  const t = clamp((n - a) / (b - a));
  return t * t * (3 - 2 * t);
};

function hash(x, y) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

const contains = (r, x, y) => r && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;

let inkPreparation, inkFrames;
export function prepareInkMaterial() {
  if (!inkPreparation) {
    // Small, independently decoded alpha masks. Each mask is native-sized;
    // there is no large atlas to rasterize and no SVG image mutation.
    const w = 256, h = 192;
    const tile = document.createElement('canvas'); tile.width = w; tile.height = h;
    const ctx = tile.getContext('2d'), pixels = ctx.createImageData(w, h);
    const field = new Float32Array(w * h), frames = [];
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const edge = Math.max(Math.abs(x / w - .5), Math.abs(y / h - .5)) * 2;
      field[y * w + x] = hash(x, y) * .25 + hash(Math.floor(x / 2), Math.floor(y / 2)) * .12 + edge * edge * .63;
    }
    pixels.data.fill(255);
    for (let frame = 0; frame < 64; frame++) {
      for (let i = 0; i < field.length; i++) pixels.data[i * 4 + 3] = clamp(frame / 63 * 18 - 1 - field[i] * 16) * 255;
      ctx.putImageData(pixels, 0, 0);
      const url = tile.toDataURL();
      const image = new Image(); image.src = url;
      frames.push({ url, image });
    }
    inkPreparation = Promise.all(frames.map(({ image }) => image.decode ? image.decode() : Promise.resolve()))
      .then(() => { inkFrames = frames; return frames; });
  }
  return inkPreparation;
}

export function createInkMaterial(width, height, source, destination, canvas) {
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = width * dpr; canvas.height = height * dpr;
  ctx.scale(dpr, dpr);
  const particles = [];
  [source.button, source.art, destination.art, destination.title].forEach((r, index) => {
    if (!r) return;
    const perimeter = 2 * (r.width + r.height);
    for (let i = 0; i < Math.min(240, perimeter / 4); i++) {
      const f = hash(i, index + 2), v = hash(i + 79, index + 4);
      const side = i % 4;
      const x = side === 0 ? r.left : side === 1 ? r.right : r.left + f * r.width;
      const y = side === 2 ? r.top : side === 3 ? r.bottom : r.top + f * r.height;
      const angle = side === 0 ? Math.PI : side === 1 ? 0 : side === 2 ? -Math.PI / 2 : Math.PI / 2;
      particles.push({ x, y, angle: angle + (v - .5) * 1.6, length: 1 + v * v * 10,
        size: .25 + v * .7, stage: index < 2 ? 0 : 1, branch: i % 5 === 0 });
    }
  });
  let lastStage = -1;
  return {
    draw(t) {
      const out = smooth(.08, .56, t), incoming = smooth(.26, .94, t);
      const mask = value => `url("${inkFrames[Math.round(value * 63)].url}")`;
      const style = document.documentElement.style;
      style.setProperty('--ink-out-mask', mask(1 - out));
      style.setProperty('--ink-in-mask', mask(incoming));
      style.setProperty('--ink-old', 1 - smooth(.20, .60, t));
      style.setProperty('--ink-new', smooth(.32, .78, t));
      const stage = t < .34 ? 0 : 1;
      const life = stage === 0 ? smooth(0, .34, t) : smooth(.34, .94, t);
      style.setProperty('--ink-grain-opacity', Math.sin(life * Math.PI));
      // A changing full-screen canvas forces a fresh native snapshot every
      // frame. Paint each fine edge treatment once, then composite its opacity.
      if (stage === lastStage) return;
      lastStage = stage;
      ctx.clearRect(0, 0, width, height);
      ctx.save(); ctx.beginPath(); ctx.rect(0, source.top, width, height - source.top); ctx.clip();
      particles.forEach(p => {
        if (p.stage !== stage) return;
        const strength = .75, growth = .85;
        const dx = Math.cos(p.angle) * p.length * growth, dy = Math.sin(p.angle) * p.length * growth;
        ctx.fillStyle = `rgba(22,22,22,${strength * .7})`;
        ctx.beginPath(); ctx.arc(p.x + dx, p.y + dy, p.size * strength, 0, Math.PI * 2); ctx.fill();
        if (p.branch) {
          ctx.strokeStyle = `rgba(30,30,30,${strength * .42})`;
          ctx.lineWidth = .55; ctx.beginPath(); ctx.moveTo(p.x, p.y);
          ctx.quadraticCurveTo(p.x + dx * .3 - dy * .2, p.y + dy * .3 + dx * .2, p.x + dx, p.y + dy); ctx.stroke();
        }
      });
      ctx.restore();
    }
  };
}

// Inverse projection of a continuous cylindrical bend. Front and reverse are
// two branches of the same sheet; the reverse occludes the front naturally.
function paperGeometry(t, bounds) {
  const nx = .78, ny = Math.sqrt(1 - nx * nx);
  const radius = Math.min(bounds.width, bounds.height) * (.18 + .07 * Math.sin(t * Math.PI));
  const minS = bounds.left * nx + bounds.top * ny;
  const maxS = bounds.right * nx + bounds.bottom * ny;
  const progress = smooth(0, .96, Math.pow(t, 1.2));
  const crease = maxS + 2 - progress * (maxS - minS + Math.PI * radius + radius + 20);
  return { nx, ny, radius, crease, minS, maxS };
}

export function preparePaperMaterial(width, height, bounds) {
  return warmPaperTextures(width, height, bounds, Array.from({ length: 61 }, (_, i) => paperGeometry(i / 60, bounds)));
}

export function paperPoint(x, y, t, bounds) {
  const { nx, ny, radius, crease } = paperGeometry(t, bounds);
  const q = x * nx + y * ny;
  const across = (q - crease) / radius;
  const sample = (s, back, theta) => {
    const u = x + (s - q) * nx, v = y + (s - q) * ny;
    return contains(bounds, u, v) ? { x: u, y: v, back, theta } : null;
  };
  if (across <= 1) {
    const theta = across >= 0 ? Math.PI - Math.asin(across) : Math.PI;
    const s = across >= 0 ? crease + theta * radius : crease + Math.PI * radius - (q - crease);
    const back = sample(s, true, theta);
    if (back) return back;
  }
  if (across >= 0 && across <= 1) return sample(crease + Math.asin(across) * radius, false, Math.asin(across));
  if (across < 0) return sample(q, false, 0);
  return null;
}

export async function createPaperMaterial(width, height, bounds, mountFrames) {
  const frames = await preparePaperMaterial(width, height, bounds);
  if (!frames) throw new Error('Paper texture preparation unavailable');
  mountFrames(frames);
  let lastIndex = -1;
  return {
    draw(t) {
      const lift = Math.sin(smooth(0, 1, t) * Math.PI);
      const style = document.documentElement.style;
      style.setProperty('--sheet-lift', `translate(${-lift * 12}px, ${-lift * 20}px) rotate(${-lift * 1.4}deg)`);
      style.setProperty('--page-zoom', .94 + .06 * smooth(.12, .98, t));
      const index = Math.round(t * (frames.length - 1));
      if (index !== lastIndex) style.setProperty('--paper-filter', `url(#explore-paper-${index})`);
      lastIndex = index;
    }
  };
}
