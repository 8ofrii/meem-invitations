const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const crypto = require('crypto');

const PORT = Number(process.env.PORT) || 5500;
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
const STATE_FILE = path.join(DATA_DIR, 'admin-state.json');

// Private admin password (override on Render with MEEM_ADMIN_PASSWORD env var)
const ADMIN_PASSWORD = process.env.MEEM_ADMIN_PASSWORD || 'MEEM2027';
const SESSION_SECRET = process.env.MEEM_SESSION_SECRET || crypto.createHash('sha256').update(ADMIN_PASSWORD + ':meem_salt_v1').digest('hex');

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.mp3': 'audio/mpeg', '.mp4': 'video/mp4'
};
const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.json', '.svg']);
const cache = new Map();

function load(filePath, ext) {
  const stat = fs.statSync(filePath);
  const hit = cache.get(filePath);
  if (hit && hit.mtime === stat.mtimeMs) return hit;
  const raw = fs.readFileSync(filePath);
  const gz = COMPRESSIBLE.has(ext) ? zlib.gzipSync(raw, { level: 9 }) : null;
  const entry = { mtime: stat.mtimeMs, raw, gz };
  cache.set(filePath, entry);
  return entry;
}

function loadBaseSite() {
  const code = fs.readFileSync(path.join(ROOT, 'assets/data.js'), 'utf8');
  const sandbox = { window: {} };
  const fn = new Function('window', code + '\nreturn window.SITE;');
  return fn(sandbox.window);
}

function readAdminState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    }
  } catch (_) {}
  return { overrides: {}, added: [] };
}

function writeAdminState(state) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
}

function getMergedCatalog() {
  const base = loadBaseSite();
  const state = readAdminState();
  const ov = state.overrides || {};
  const samples = base.SAMPLES.map(s => {
    const patch = ov[s.num];
    if (!patch) return s;
    const merged = { ...s, ...patch };
    if (patch.moodboard) merged.moodboard = { ...(s.moodboard || {}), ...patch.moodboard };
    return merged;
  });
  for (const extra of (state.added || [])) {
    const patch = ov[extra.num] || {};
    samples.push({ ...extra, ...patch });
  }
  return { ...base, SAMPLES: samples };
}

function makeToken() {
  const ts = Date.now().toString(36);
  const sig = crypto.createHmac('sha256', SESSION_SECRET).update(ts).digest('hex').slice(0, 32);
  return `${ts}.${sig}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string') return false;
  const [ts, sig] = token.split('.');
  if (!ts || !sig) return false;
  const expected = crypto.createHmac('sha256', SESSION_SECRET).update(ts).digest('hex').slice(0, 32);
  try {
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch (_) {
    return false;
  }
}

function isAuthed(req) {
  const auth = req.headers['authorization'] || '';
  if (auth.startsWith('Bearer ') && verifyToken(auth.slice(7).trim())) return true;
  const cookies = (req.headers['cookie'] || '').split(';').map(c => c.trim());
  for (const c of cookies) {
    if (c.startsWith('meem_admin=')) {
      return verifyToken(decodeURIComponent(c.slice(11)));
    }
  }
  return false;
}

function readJsonBody(req, maxBytes = 2_000_000) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', chunk => {
      size += chunk.length;
      if (size > maxBytes) { req.destroy(); reject(new Error('Body too large')); return; }
      chunks.push(chunk);
    });
    req.on('end', () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')); }
      catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, obj, extraHeaders = {}) {
  const body = Buffer.from(JSON.stringify(obj), 'utf8');
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Content-Length': body.length,
    ...extraHeaders
  });
  res.end(body);
}

http.createServer(async (req, res) => {
  const rawUrl = req.url || '/';
  const qIndex = rawUrl.indexOf('?');
  const urlPath = decodeURIComponent(qIndex >= 0 ? rawUrl.slice(0, qIndex) : rawUrl);
  const query = qIndex >= 0 ? rawUrl.slice(qIndex) : '';

  // ===== LIVE CATALOG & PASSWORD-PROTECTED ADMIN API =====
  if (urlPath === '/api/catalog' && req.method === 'GET') {
    try {
      const cat = getMergedCatalog();
      return sendJson(res, 200, { ok: true, CATEGORIES: cat.CATEGORIES, SAMPLES: cat.SAMPLES });
    } catch (e) {
      return sendJson(res, 500, { ok: false, error: String(e) });
    }
  }

  if (urlPath === '/api/admin/login' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req, 16_000);
      if (String(body.password || '') !== ADMIN_PASSWORD) {
        return sendJson(res, 401, { ok: false, error: 'Incorrect password' });
      }
      const token = makeToken();
      return sendJson(res, 200, { ok: true, token }, {
        'Set-Cookie': `meem_admin=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`
      });
    } catch (e) {
      return sendJson(res, 400, { ok: false, error: 'Invalid request' });
    }
  }

  if (urlPath === '/api/admin/logout' && req.method === 'POST') {
    return sendJson(res, 200, { ok: true }, {
      'Set-Cookie': 'meem_admin=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0'
    });
  }

  if (urlPath === '/api/admin/status' && req.method === 'GET') {
    return sendJson(res, 200, { ok: true, authed: isAuthed(req) });
  }

  if (urlPath.startsWith('/api/admin/')) {
    if (!isAuthed(req)) return sendJson(res, 401, { ok: false, error: 'Unauthorized' });

    if (urlPath === '/api/admin/toggle' && req.method === 'POST') {
      try {
        const body = await readJsonBody(req, 32_000);
        const num = String(body.num || '').padStart(2, '0');
        const state = readAdminState();
        state.overrides = state.overrides || {};
        state.overrides[num] = { ...(state.overrides[num] || {}), hidden: Boolean(body.hidden) };
        writeAdminState(state);
        return sendJson(res, 200, { ok: true, num, hidden: Boolean(body.hidden) });
      } catch (e) {
        return sendJson(res, 400, { ok: false, error: String(e) });
      }
    }

    if (urlPath === '/api/admin/update' && req.method === 'POST') {
      try {
        const body = await readJsonBody(req, 64_000);
        const num = String(body.num || '').padStart(2, '0');
        const state = readAdminState();
        state.overrides = state.overrides || {};
        const patch = {};
        if (body.cat) patch.cat = String(body.cat);
        if (body.title) patch.title = String(body.title).trim();
        if (body.subtitle) patch.subtitle = String(body.subtitle).trim();
        if (body.venue) patch.venue = String(body.venue).trim();
        if (body.desc) patch.desc = String(body.desc).trim();
        if (typeof body.hidden === 'boolean') patch.hidden = body.hidden;
        if (body.soundtrack) patch.moodboard = { ...(state.overrides[num]?.moodboard || {}), soundtrack: String(body.soundtrack).trim() };
        state.overrides[num] = { ...(state.overrides[num] || {}), ...patch };
        writeAdminState(state);
        return sendJson(res, 200, { ok: true, num, patch: state.overrides[num] });
      } catch (e) {
        return sendJson(res, 400, { ok: false, error: String(e) });
      }
    }

    if (urlPath === '/api/admin/add' && req.method === 'POST') {
      try {
        const body = await readJsonBody(req, 1_800_000);
        const cat = getMergedCatalog();
        const nextNum = String(cat.SAMPLES.length + 1).padStart(2, '0');
        const slug = String(body.title || 'custom-invite').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'custom';
        const fileName = `${nextNum}-${slug}.html`;
        const relFile = `samples/${fileName}`;
        const absFile = path.join(ROOT, relFile);

        let html = String(body.html || '').trim();
        if (!html && body.cloneFrom) {
          const src = cat.SAMPLES.find(x => x.num === String(body.cloneFrom).padStart(2, '0'));
          if (src && fs.existsSync(path.join(ROOT, src.file))) {
            html = fs.readFileSync(path.join(ROOT, src.file), 'utf8');
            if (body.subtitle) {
              html = html.replace(/(data-couple-title[^>]*>)([\s\S]*?)(<\/[a-z0-9]+>)/gi, `$1${body.subtitle}$3`);
            }
            if (body.venue) {
              html = html.replace(/(data-venue-name[^>]*>)([\s\S]*?)(<\/[a-z0-9]+>)/gi, `$1${body.venue}$3`);
            }
            if (body.song) {
              html = html.replace(/data-music-mood="[^"]*"/gi, `data-music-mood="${body.song}"`);
              html = html.replace(/WeddingSound\.startMusic\(\s*['"][^'"]+['"]\s*\)/g, `WeddingSound.startMusic('${body.song}')`);
            }
          }
        }
        if (!html) return sendJson(res, 400, { ok: false, error: 'Provide custom HTML or choose a base template to clone.' });

        fs.writeFileSync(absFile, html, 'utf8');

        const CAT_AES = { luxury: 'luxury', floral: 'floral', modern: 'modern', royal: 'midnight', arabic: 'katb', motion: 'modern', cards: 'classic' };
        const chosenCat = String(body.cat || 'luxury');
        const catObj = cat.CATEGORIES.find(c => c.id === chosenCat);
        const palette = Array.isArray(body.palette) && body.palette.length ? body.palette : ['#0D3B2E', '#C5A059', '#FAF6EE', '#2C1810'];
        const newItem = {
          num: nextNum,
          cat: chosenCat,
          file: relFile,
          title: String(body.title || `New Design #${nextNum}`).trim(),
          subtitle: String(body.subtitle || 'كريم و نور').trim(),
          venue: String(body.venue || 'Royal Grand Hall').trim(),
          lang: body.lang || 'Bilingual',
          langKey: body.langKey || 'bilingual',
          bg: 'linear-gradient(145deg,#0D3B2E,#164F3E)',
          img: body.img || 'assets/images/classic-ivory-gold-crest.jpg',
          accent: palette[1] || '#C5A059',
          desc: String(body.desc || 'Bespoke MEEM digital invitation customised with interactive motion and curated music.').trim(),
          features: ['Custom Motion', 'Live Countdown', 'RSVP & Map'],
          aesthetic: CAT_AES[chosenCat] || 'luxury',
          hidden: Boolean(body.hidden),
          moodboard: {
            collection: catObj ? catObj.short : 'MEEM Curated',
            palette,
            paletteNames: 'Curated Palette',
            typography: 'Cormorant Garamond · Amiri',
            floral: 'Bespoke MEEM Styling',
            soundtrack: String(body.soundtrack || 'Curated Wedding Soundtrack'),
            inspiration: String(body.inspiration || 'Crafted exclusively for MEEM celebrations.'),
            mood: 'Elegant & timeless',
            customization: 'Colors · Music · AR / EN · Couple Photo · Table & QR'
          }
        };

        const state = readAdminState();
        state.added = state.added || [];
        state.added.push(newItem);
        writeAdminState(state);
        return sendJson(res, 200, { ok: true, sample: newItem });
      } catch (e) {
        return sendJson(res, 500, { ok: false, error: String(e) });
      }
    }

    if (urlPath === '/api/admin/export-data-js' && req.method === 'GET') {
      const merged = getMergedCatalog();
      const js = '/* Single source of truth for MEEM — Exported from Admin Panel */\nwindow.SITE = ' + JSON.stringify(merged, null, 2) + ';\n';
      const buf = Buffer.from(js, 'utf8');
      res.writeHead(200, {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Content-Disposition': 'attachment; filename="data.js"',
        'Content-Length': buf.length
      });
      return res.end(buf);
    }

    return sendJson(res, 404, { ok: false, error: 'Unknown admin endpoint' });
  }

  // ===== STATIC FILE & CLEAN URL SERVING =====
  if (urlPath === '/index.html') {
    res.writeHead(301, { Location: '/' + query });
    return res.end();
  }
  if (urlPath.endsWith('.html') && !urlPath.startsWith('/samples/') && !urlPath.startsWith('/clients/')) {
    res.writeHead(301, { Location: urlPath.slice(0, -5) + query });
    return res.end();
  }

  let filePath = path.join(ROOT, path.normalize(urlPath === '/' ? '/index.html' : urlPath));
  if (!fs.existsSync(filePath) && !path.extname(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }
  if (!filePath.startsWith(ROOT) || !fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('404 Not Found');
  }
  if (fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');
  const ext = path.extname(filePath).toLowerCase();
  const { raw, gz } = load(filePath, ext);
  const isAsset = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.mp3', '.mp4'].includes(ext);
  const headers = {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Cache-Control': isAsset ? 'public, max-age=604800, immutable' : 'no-cache',
    'Vary': 'Accept-Encoding',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(self), microphone=(self), geolocation=()',
    'Content-Security-Policy': "default-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com https://api.qrserver.com https://script.google.com https://script.googleusercontent.com data: blob:;"
  };
  if (gz && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) {
    headers['Content-Encoding'] = 'gzip';
    headers['Content-Length'] = gz.length;
    res.writeHead(200, headers);
    return res.end(gz);
  }
  headers['Content-Length'] = raw.length;
  res.writeHead(200, headers);
  res.end(raw);
}).listen(PORT, process.env.HOST || '0.0.0.0', () => console.log(`Meem Studio running at http://localhost:${PORT}`));
