const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PORT = Number(process.env.PORT) || 5500;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.mp3': 'audio/mpeg'
};
const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.json', '.svg']);
const cache = new Map(); // path -> { mtime, raw, gz }

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

http.createServer((req, res) => {
  const rawUrl = req.url || '/';
  const qIndex = rawUrl.indexOf('?');
  const urlPath = decodeURIComponent(qIndex >= 0 ? rawUrl.slice(0, qIndex) : rawUrl);
  const query = qIndex >= 0 ? rawUrl.slice(qIndex) : '';

  // Clean URLs: redirect /index.html -> / and /page.html -> /page (except /samples/)
  if (urlPath === '/index.html') {
    res.writeHead(301, { Location: '/' + query });
    return res.end();
  }
  if (urlPath.endsWith('.html') && !urlPath.startsWith('/samples/')) {
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
  const isAsset = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.mp3'].includes(ext);
  const headers = {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    // images are cached for a week; code is always revalidated so edits show instantly
    'Cache-Control': isAsset ? 'public, max-age=604800' : 'no-cache',
    'Vary': 'Accept-Encoding'
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
