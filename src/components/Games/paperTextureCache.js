// Prepare the bend fields off the UI thread while the gallery is being read.
// These are coordinate/lighting maps, never screenshots or page content.
let cache = null;

export const paperCacheKey = (width, height, bounds) =>
  [width, height, bounds.left, bounds.right, Math.round(bounds.top / 8) * 8].map(Math.round).join(':');

const textureWorkerSource = `
  self.onmessage = async ({ data }) => {
    const { width, height, bounds, geometries } = data;
    const w = Math.min(512, width), h = Math.round(w * height / width);
    const canvas = new OffscreenCanvas(w, h), ctx = canvas.getContext('2d');
    const map = ctx.createImageData(w, h), shade = ctx.createImageData(w, h);
    const scale = Math.max(width, height) * 2.1;
    const inside = (x, y) => x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom;
    // Produce the key poses first, then fill in every frame.
    const order = [...new Set([0, 12, 24, 36, 48, 60, ...Array.from({ length: 61 }, (_, i) => i)])];
    for (const index of order) {
      const { nx, ny, radius, crease } = geometries[index];
      // Empty samples point beyond the snapshot, so displacement itself clips
      // the sheet. This avoids two full-viewport filter passes per frame.
      map.data.fill(255); shade.data.fill(0);
      for (let py = 0; py < h; py++) {
        for (let px = 0; px < w; px++) {
          const x = px * width / w, y = py * height / h;
          const q = x * nx + y * ny, across = (q - crease) / radius;
          let u, v, theta = 0, back = false, valid = false;
          if (across <= 1) {
            theta = across >= 0 ? Math.PI - Math.asin(across) : Math.PI;
            const s = across >= 0 ? crease + theta * radius : 2 * crease + Math.PI * radius - q;
            u = x + (s - q) * nx; v = y + (s - q) * ny;
            valid = inside(u, v); back = valid;
          }
          if (!valid && across >= 0 && across <= 1) {
            theta = Math.asin(across);
            const delta = crease + theta * radius - q;
            u = x + delta * nx; v = y + delta * ny; valid = inside(u, v);
          } else if (!valid && across < 0) {
            u = x; v = y; theta = 0; valid = inside(u, v);
          }
          if (!valid) continue;
          const at = (py * w + px) * 4;
          map.data[at] = 128 + (u - x) / scale * 255;
          map.data[at + 1] = 128 + (v - y) / scale * 255;
          map.data[at + 2] = !back && theta === 0 ? 255 : 0;
          map.data[at + 3] = 255;
          const light = back ? 251 - Math.sin(theta) * 22 : 0;
          shade.data[at] = light; shade.data[at + 1] = light; shade.data[at + 2] = light;
          shade.data[at + 3] = back ? 246 : Math.sin(theta) * 9;
        }
      }
      ctx.putImageData(map, 0, 0);
      const mapBlob = await canvas.convertToBlob();
      ctx.putImageData(shade, 0, 0);
      const shadeBlob = await canvas.convertToBlob();
      self.postMessage({ index, mapBlob, shadeBlob });
    }
  };
`;

export function clearPaperTextures() {
  if (!cache) return;
  cache.worker.terminate();
  clearTimeout(cache.timeout);
  cache.resolve(null);
  cache.urls.forEach(url => URL.revokeObjectURL(url));
  cache = null;
  if (process.env.NODE_ENV === 'development') document.documentElement.removeAttribute('data-paper-cache');
}

export function warmPaperTextures(width, height, bounds, geometries) {
  if (typeof Worker === 'undefined' || typeof OffscreenCanvas === 'undefined') return Promise.resolve(null);
  const key = paperCacheKey(width, height, bounds);
  if (cache && cache.key === key) return cache.promise;
  clearPaperTextures();
  const source = URL.createObjectURL(new Blob([textureWorkerSource], { type: 'text/javascript' }));
  let worker;
  try { worker = new Worker(source); } catch (error) { URL.revokeObjectURL(source); return Promise.resolve(null); }
  let resolve;
  const promise = new Promise(done => { resolve = done; });
  const entry = { key, worker, frames: [], urls: [source], ready: false, promise, resolve };
  cache = entry;
  entry.timeout = setTimeout(() => { if (cache === entry) clearPaperTextures(); }, 4000);
  if (process.env.NODE_ENV === 'development') document.documentElement.dataset.paperCache = 'preparing';
  worker.onmessage = async ({ data }) => {
    if (cache !== entry) return;
    const map = URL.createObjectURL(data.mapBlob), shade = URL.createObjectURL(data.shadeBlob);
    entry.urls.push(map, shade);
    // Keep decoded resources alive. Each belongs to one immutable SVG filter;
    // playback selects the filter, never changes its feImage resource.
    const images = [map, shade].map(url => { const img = new Image(); img.src = url; return img; });
    try { await Promise.all(images.map(img => img.decode())); } catch (error) { if (cache === entry) clearPaperTextures(); return; }
    if (cache !== entry) return;
    entry.frames[data.index] = { map, shade, images };
    if (entry.frames.filter(Boolean).length === 61) {
      entry.ready = true;
      clearTimeout(entry.timeout);
      resolve(entry.frames);
      if (process.env.NODE_ENV === 'development') document.documentElement.dataset.paperCache = 'ready';
      worker.terminate();
    }
  };
  worker.onerror = () => { if (cache === entry) clearPaperTextures(); };
  worker.postMessage({ width, height, bounds, geometries });
  return promise;
}
