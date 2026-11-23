/**
 * MEEM Standalone Client Website Generator
 * Generates a white-labeled, ready-to-share client invitation website at:
 *   clients/<slug>/index.html  (served live at /clients/<slug>)
 *
 * Example:
 *   node scripts/create-client-invite.js --template 49 --slug karim-nour --groom "كريم" --bride "نور" --date "2027-08-20" --venue "قاعة الماسة" --song "einaudi_experience" --colors "--gold:#D4AF37;--ivory:#FFFDF8"
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const k = argv[i].slice(2);
      const v = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : 'true';
      args[k] = v;
    }
  }
  return args;
}

const args = parseArgs(process.argv);
if (!args.template || !args.slug) {
  console.error('Usage: node scripts/create-client-invite.js --template <01-52> --slug <client-slug> [--groom "..."] [--bride "..."] [--couple "..."] [--date "YYYY-MM-DD"] [--dateText "..."] [--venue "..."] [--mapUrl "..."] [--table "..."] [--whatsapp "2010..."] [--song "key|silent"] [--colors "--var:#hex;--var2:#hex"] [--photo "path/to/photo.jpg"]');
  process.exit(1);
}

global.window = {};
eval(fs.readFileSync(path.join(ROOT, 'assets/data.js'), 'utf8'));
const numStr = String(args.template).padStart(2, '0');
const sample = window.SITE.SAMPLES.find(s => s.num === numStr);
if (!sample) {
  console.error('Template not found:', numStr);
  process.exit(1);
}

const clientDir = path.join(ROOT, 'clients', args.slug);
fs.mkdirSync(clientDir, { recursive: true });

let html = fs.readFileSync(path.join(ROOT, sample.file), 'utf8');

// 1. Rewrite relative asset paths from ../assets/ to ../../assets/ for clients/<slug>/index.html
html = html.replace(/\.\.\/assets\//g, '../../assets/');

// 2. Clean title & couple names
const couple = args.couple || (args.groom && args.bride
  ? (/[\u0600-\u06FF]/.test(args.groom + args.bride) ? `${args.groom} و ${args.bride}` : `${args.groom} & ${args.bride}`)
  : '');

if (couple) {
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${couple} — MEEM Digital Invitation</title>`);
  const ogImg = `https://meem-invitations.onrender.com/${sample.img || 'assets/images/classic-ivory-gold-crest.jpg'}`;
  const ogDesc = `${args.dateText ? args.dateText + ' • ' : ''}${args.venue || 'You are warmly invited to celebrate with us.'}`;
  const ogTags = `\n  <meta property="og:type" content="website" />\n  <meta property="og:title" content="${couple}" />\n  <meta property="og:description" content="${ogDesc}" />\n  <meta property="og:image" content="${ogImg}" />\n  <meta name="twitter:card" content="summary_large_image" />`;
  html = html.replace(/<\/title>/i, `</title>${ogTags}`);
  html = html.replace(/(data-couple-title[^>]*>)([\s\S]*?)(<\/[a-z0-9]+>)/gi, `$1${couple}$3`);
  html = html.replace(/data-couple="[^"]*"/gi, `data-couple="${couple}"`);
}
if (args.groom && args.bride) {
  const mono = `${args.groom.trim()[0]} &amp; ${args.bride.trim()[0]}`;
  html = html.replace(/(data-monogram[^>]*>)([\s\S]*?)(<\/[a-z0-9]+>)/gi, `$1${mono}$3`);
}

// 3. Date, countdown, venue, map, table, WhatsApp
if (args.dateText) {
  html = html.replace(/(data-event-date[^>]*>)([\s\S]*?)(<\/[a-z0-9]+>)/gi, `$1${args.dateText}$3`);
}
if (args.date && /^\d{4}-\d{2}-\d{2}$/.test(args.date)) {
  html = html.replace(/data-countdown="[^"]*"/gi, `data-countdown="${args.date}T19:00:00+02:00"`);
}
if (args.venue) {
  html = html.replace(/(data-venue-name[^>]*>)([\s\S]*?)(<\/[a-z0-9]+>)/gi, `$1${args.venue}$3`);
}
if (args.mapUrl) {
  html = html.replace(/href="https:\/\/maps\.google\.com[^"]*"/gi, `href="${args.mapUrl}"`);
}
if (args.table) {
  html = html.replace(/(data-table-seat[^>]*>)([\s\S]*?)(<\/[a-z0-9]+>)/gi, `$1${args.table}$3`);
}
if (args.whatsapp) {
  html = html.replace(/<form([^>]*data-rsvp-form[^>]*)>/gi, `<form$1 data-whatsapp="${args.whatsapp}">`);
}

// 4. Song or Silent override
if (args.song) {
  if (args.song === 'silent') {
    html = html.replace(/\s*data-music-mood="[^"]*"/gi, '');
    html = html.replace(/<body([^>]*)>/i, '<body$1 data-no-music="true">');
    html = html.replace(/WeddingSound\.startMusic\([^)]*\)/g, 'void 0');
  } else {
    html = html.replace(/\s*data-no-music="true"/gi, '');
    if (/data-music-mood="[^"]*"/i.test(html)) {
      html = html.replace(/data-music-mood="[^"]*"/i, `data-music-mood="${args.song}"`);
    } else {
      html = html.replace(/<body([^>]*)>/i, `<body$1 data-music-mood="${args.song}">`);
    }
    html = html.replace(/WeddingSound\.startMusic\(\s*['"][^'"]+['"]\s*\)/g, `WeddingSound.startMusic('${args.song}')`);
    html = html.replace(/musicMood\s*:\s*['"][^'"]+['"]/g, `musicMood: '${args.song}'`);
  }
}

// 5. Custom CSS :root color overrides (--colors "--gold:#D4AF37;--ivory:#FFFDF8")
if (args.colors) {
  const pairs = args.colors.split(';').map(s => s.trim()).filter(Boolean);
  const overrideBlock = `\n    :root { ${pairs.join('; ')}; }\n  `;
  html = html.replace(/<\/style>/i, `${overrideBlock}</style>`);
}

// 6. Optional couple photo copy into clients/<slug>/couple.jpg
if (args.photo && fs.existsSync(args.photo)) {
  const ext = path.extname(args.photo) || '.jpg';
  const destName = 'couple' + ext;
  fs.copyFileSync(args.photo, path.join(clientDir, destName));
  html = html.replace(/(<img[^>]*data-couple-photo[^>]*src=")[^"]*(")/gi, `$1${destName}$2`);
}

// 7. Ensure clean white-label client mode (hide studio back button)
html = html.replace(/<body([^>]*)>/i, '<body$1 data-client-site="true">');

const outPath = path.join(clientDir, 'index.html');
fs.writeFileSync(outPath, html, 'utf8');
console.log(`Created standalone client invitation: clients/${args.slug}/index.html`);
console.log(`Live URL once pushed: https://meem-invitations.onrender.com/clients/${args.slug}`);
