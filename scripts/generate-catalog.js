/**
 * MEEM Master Production Catalog Generator
 * Scans all 52 HTML invitation templates, extracts exact :root CSS color variables,
 * music keys, and audio tracks, and writes CLIENT_PRODUCTION_CATALOG.md.
 *
 * Usage: node scripts/generate-catalog.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
global.window = {};
eval(fs.readFileSync(path.join(ROOT, 'assets/data.js'), 'utf8'));
const S = window.SITE;
const shared = fs.readFileSync(path.join(ROOT, 'assets/shared.js'), 'utf8');

function extractRootVars(html) {
  const m = html.match(/:root\s*\{([\s\S]*?)\}/i);
  if (!m) return [];
  return [...m[1].matchAll(/(--[a-zA-Z0-9_-]+)\s*:\s*([^;]+);?/g)].map(x => `${x[1]}: ${x[2].trim()}`);
}

const catMap = Object.fromEntries(S.CATEGORIES.map(c => [c.id, `${c.short} (${c.ar})`]));

const lines = [];
lines.push('# MEEM — Master Client Production Catalog (All 52 Templates, Colors & Songs)');
lines.push('');
lines.push('> **Purpose:** Complete technical map of every HTML template, where to edit its colors (`:root` CSS variables), how to swap songs, and how to generate a dedicated standalone client website in one step.');
lines.push('');
lines.push('---');
lines.push('');
lines.push('## 1. Quick Client Website Generator');
lines.push('');
lines.push('Run the built-in generator to create a white-labeled, ready-to-deploy client website in `clients/<slug>/index.html` (served live at `/clients/<slug>`):');
lines.push('');
lines.push('```bash');
lines.push('node scripts/create-client-invite.js \\');
lines.push('  --template 49 \\');
lines.push('  --slug karim-nour \\');
lines.push('  --groom "كريم" \\');
lines.push('  --bride "نور" \\');
lines.push('  --date "2027-08-20" \\');
lines.push('  --dateText "الجمعة 20 أغسطس 2027" \\');
lines.push('  --venue "قاعة الماسة الملكية" \\');
lines.push('  --table "طاولة رقم 7 • VIP" \\');
lines.push('  --song "einaudi_experience" \\');
lines.push('  --whatsapp "201024190741" \\');
lines.push('  --colors "--gold:#D4AF37;--ivory:#FFFDF8"');
lines.push('```');
lines.push('');
lines.push('### Where to Customize Any Template Manually');
lines.push('- **Colors:** Edit the `:root { --... }` CSS variables at the top `<style>` block of the template HTML (exact variable names for all 52 templates are listed in Section 2 below).');
lines.push('- **Global Color Finish Preset (instant URL param):** Append `?theme=gold|chromium|emerald|rose|sapphire`.');
lines.push('- **Music / Song:** Change `data-music-mood="..."` on `<body>` AND `WeddingSound.startMusic(\'...\')` (or `musicMood: \'...\'`) inside the template `<script>`, OR pass `--song <key>` (use `--song silent` for no sound).');
lines.push('- **Couple Names, Date, Venue, Table:** Search for `data-couple-title`, `data-monogram`, `data-event-date`, `data-countdown`, `data-venue-name`, `data-table-seat`.');
lines.push('- **Couple Photo:** Replace the `src` on `<img data-couple-photo ...>` (or pass `--photo path/to/couple.jpg`).');
lines.push('- **RSVP WhatsApp Number:** Default studio number lives in `assets/shared.js` (`defaultWhatsapp`) or override per client via `data-whatsapp="2010XXXXXXXX"` on `<form data-rsvp-form>`.');
lines.push('');
lines.push('---');
lines.push('');
lines.push(`## 2. All ${S.SAMPLES.length} HTML Templates — Exact Files, Colors & Default Songs`);
lines.push('');
lines.push('| # | Title | Category | HTML File | Default Song Key | Video / Photo | Exact `:root` CSS Color Variables |');
lines.push('|---|---|---|---|---|---|---|');

for (const s of S.SAMPLES) {
  const html = fs.readFileSync(path.join(ROOT, s.file), 'utf8');
  const vars = extractRootVars(html);
  const dm = (html.match(/data-music-mood="([^"]+)"/i) || [])[1] || (/data-no-music="true"/i.test(html) ? 'silent' : 'default');
  const flags = [
    /<video\b/i.test(html) ? 'Video' : '',
    /data-couple-photo/i.test(html) ? 'Photo' : '',
    /data-table-seat/i.test(html) ? 'Table' : ''
  ].filter(Boolean).join(', ') || 'Standard';
  const varStr = vars.length ? '`' + vars.slice(0, 8).join('; ') + (vars.length > 8 ? '; …' : '') + '`' : 'Inline styles';
  lines.push(`| #${s.num} | ${s.title} | ${catMap[s.cat] || s.cat} | \`${s.file}\` | \`${dm}\` | ${flags} | ${varStr} |`);
}

lines.push('');
lines.push('---');
lines.push('');
lines.push('## 3. All Available Music & Song Keys (`assets/shared.js`)');
lines.push('');
lines.push('| Song Key | Audio File (`assets/audio/`) |');
lines.push('|---|---|');

const trackBlock = shared.match(/const AUDIO_TRACKS = \{([\s\S]*?)\};/);
if (trackBlock) {
  for (const m of trackBlock[1].matchAll(/([a-z0-9_]+)\s*:\s*'\.\.\/(assets\/audio\/[^']+)'/gi)) {
    lines.push(`| \`${m[1]}\` | \`${m[2]}\` |`);
  }
}

lines.push('');
lines.push('### Curated Auto-Cycling Mix Keys (`AUDIO_MIXES`)');
const mixBlock = shared.match(/const AUDIO_MIXES = \{([\s\S]*?)\n  \};/);
if (mixBlock) {
  for (const m of mixBlock[1].matchAll(/([a-z0-9_]+)\s*:\s*\[([\s\S]*?)\]/gi)) {
    const files = [...m[2].matchAll(/assets\/audio\/([^']+)/g)].map(x => x[1]).join(', ');
    lines.push(`- \`${m[1]}\`: ${files}`);
  }
}
lines.push('- `silent`: Strictly silent (hides music button and plays zero audio)');
lines.push('');

fs.writeFileSync(path.join(ROOT, 'CLIENT_PRODUCTION_CATALOG.md'), lines.join('\n'), 'utf8');
console.log('Generated CLIENT_PRODUCTION_CATALOG.md with', S.SAMPLES.length, 'templates.');
