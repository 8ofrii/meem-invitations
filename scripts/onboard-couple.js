/**
 * MEEM All-in-One Couple Onboarding Automation Script
 * ====================================================
 * Generates a COMPLETE, ready-to-deliver client package in 2 seconds inside clients/<slug>/:
 *   1. index.html                -> White-labeled wedding invitation website (with OG WhatsApp preview)
 *   2. drive-apps-script.gs      -> Pre-filled Google Apps Script with couple's emails, auto-folder setup,
 *                                   random SECRET_TOKEN, and auto-expiry 5 days after the wedding
 *   3. qr-camera.html            -> White-labeled Write-Only Guest Camera page (if --qrCamera)
 *   4. voice-guestbook.html      -> White-labeled Voice & Written Wishes page (if --voiceBook)
 *   5. table-qr-card.html        -> Print-ready luxury ivory/emerald/gold Table QR Card
 *   6. DELIVERY_HANDOFF.md       -> Ready-to-send WhatsApp handoff message + 30-second deploy checklist
 *
 * Example:
 *   node scripts/onboard-couple.js \
 *     --template 49 \
 *     --slug ahmed-farida \
 *     --groom "أحمد" --bride "فريدة" \
 *     --groomEmail "ahmed@gmail.com" --brideEmail "farida@gmail.com" \
 *     --date "2027-09-18" --dateText "السبت 18 سبتمبر 2027" \
 *     --venue "قاعة الماسة الملكية" --mapUrl "https://maps.google.com/?q=..." \
 *     --song "jassmi_zaffa" --whatsapp "201024190741" \
 *     --colors "--gold:#D4AF37" \
 *     --qrCamera --voiceBook
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const BASE_URL = 'https://meem-invitations.onrender.com';

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const k = argv[i].slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) {
        args[k] = true;
      } else {
        args[k] = next;
        i++;
      }
    }
  }
  return args;
}

const args = parseArgs(process.argv);
if (!args.template || !args.slug) {
  console.log(`Usage:
  node scripts/onboard-couple.js \\
    --template <01-52> \\
    --slug <couple-slug> \\
    --groom "Name" --bride "Name" \\
    [--couple "Full Couple Title"] \\
    [--groomEmail "groom@gmail.com"] [--brideEmail "bride@gmail.com"] \\
    [--date "YYYY-MM-DD"] [--dateText "Display Date"] \\
    [--venue "Venue Name"] [--mapUrl "https://maps.google.com/..."] \\
    [--table "VIP Table 1"] [--whatsapp "2010..."] \\
    [--song "key|silent"] [--colors "--var:#hex;--var2:#hex"] \\
    [--photo "path/to/couple.jpg"] \\
    [--endpoint "https://script.google.com/macros/s/.../exec"] \\
    [--qrCamera] [--voiceBook]`);
  process.exit(0);
}

const couple = args.couple || (args.groom && args.bride
  ? (/[\u0600-\u06FF]/.test(args.groom + args.bride) ? `${args.groom} و ${args.bride}` : `${args.groom} & ${args.bride}`)
  : args.slug);

const clientDir = path.join(ROOT, 'clients', args.slug);
fs.mkdirSync(clientDir, { recursive: true });

// 1. Generate main invitation website via create-client-invite.js
const forwardFlags = ['template', 'slug', 'groom', 'bride', 'couple', 'date', 'dateText', 'venue', 'mapUrl', 'table', 'whatsapp', 'song', 'colors', 'photo'];
const forwardArgs = [path.join(__dirname, 'create-client-invite.js')];
for (const k of forwardFlags) {
  if (args[k] && args[k] !== true) forwardArgs.push('--' + k, String(args[k]));
}
execFileSync(process.execPath, forwardArgs, { stdio: 'inherit' });

// 2. Generate unique secret token & automatic expiry (5 days after wedding date)
const secretToken = 'MEEM_' + crypto.randomBytes(12).toString('hex').toUpperCase();
let expiresAt = '2027-12-31T23:59:59+02:00';
if (args.date && /^\d{4}-\d{2}-\d{2}$/.test(args.date)) {
  const d = new Date(args.date + 'T23:59:59+02:00');
  d.setDate(d.getDate() + 5);
  expiresAt = d.toISOString();
}
const emails = [args.groomEmail, args.brideEmail].filter(Boolean);
const endpointVal = args.endpoint || 'PASTE_DEPLOYED_APPS_SCRIPT_WEB_APP_URL_HERE';

// 3. Generate pre-filled per-couple Google Apps Script with 1-click auto-folder & private sharing
const gsContent = `/**
 * MEEM Private Wedding Drive Uploader — ${couple} (${args.slug})
 * ==============================================================
 * Generated automatically for: ${couple}
 * Authorized Private Emails: ${emails.length ? emails.join(', ') : '(Add Groom & Bride Gmail addresses in COUPLE_EMAILS below)'}
 * Auto-Lock Date (5 days post-event): ${expiresAt}
 *
 * 30-SECOND SETUP:
 * 1. Go to https://script.google.com -> New Project -> paste this entire file.
 * 2. Select function "setupPrivateWeddingFolder" from the top toolbar and click RUN ONCE.
 *    -> It automatically creates the private Drive folder + subfolders ("Photos & Videos" and "Voice & Wishes"),
 *       locks sharing to ONLY the Groom & Bride emails, and saves the Folder ID automatically!
 * 3. Click Deploy -> New deployment -> Web app:
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 4. Copy the Web App URL and set it inside clients/${args.slug}/qr-camera.html (and voice-guestbook.html).
 */

const WEDDING_NAME = ${JSON.stringify(`MEEM — ${couple} Memories`)};
const COUPLE_EMAILS = ${JSON.stringify(emails)};
const SECRET_TOKEN = ${JSON.stringify(secretToken)};
const ACCEPTING_UPLOADS = true;
const EXPIRES_AT = ${JSON.stringify(expiresAt)};

function setupPrivateWeddingFolder() {
  const props = PropertiesService.getScriptProperties();
  const rootFolder = DriveApp.createFolder(WEDDING_NAME);
  rootFolder.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE);

  const mediaFolder = rootFolder.createFolder('Photos & Videos');
  const wishesFolder = rootFolder.createFolder('Voice & Written Wishes');

  COUPLE_EMAILS.forEach(function(email) {
    if (email && email.indexOf('@') > 0) {
      rootFolder.addEditor(email.trim());
    }
  });

  props.setProperty('ROOT_FOLDER_ID', rootFolder.getId());
  props.setProperty('MEDIA_FOLDER_ID', mediaFolder.getId());
  props.setProperty('WISHES_FOLDER_ID', wishesFolder.getId());

  Logger.log('SUCCESS! Private Folder Created & Shared ONLY with: ' + COUPLE_EMAILS.join(', '));
  Logger.log('Couple Google Drive Link: ' + rootFolder.getUrl());
}

function doPost(e) {
  try {
    if (!ACCEPTING_UPLOADS || (EXPIRES_AT && new Date() > new Date(EXPIRES_AT))) {
      return jsonOut({ ok: false, error: 'Upload window closed' });
    }
    const data = JSON.parse(e.postData.contents || '{}');
    if (data.token !== SECRET_TOKEN) {
      return jsonOut({ ok: false, error: 'Unauthorized wedding token' });
    }

    const props = PropertiesService.getScriptProperties();
    const mimeType = data.mimeType || 'image/jpeg';
    const isAudioOrText = mimeType.indexOf('audio') >= 0 || mimeType.indexOf('text') >= 0;
    const targetId = isAudioOrText
      ? (props.getProperty('WISHES_FOLDER_ID') || props.getProperty('ROOT_FOLDER_ID'))
      : (props.getProperty('MEDIA_FOLDER_ID') || props.getProperty('ROOT_FOLDER_ID'));

    if (!targetId) {
      return jsonOut({ ok: false, error: 'Run setupPrivateWeddingFolder() first' });
    }

    const folder = DriveApp.getFolderById(targetId);
    const rawBase64 = (data.base64 || '').replace(/^data:[^;]+;base64,/, '');
    const ext = mimeType.indexOf('video') >= 0
      ? (mimeType.indexOf('mp4') >= 0 ? 'mp4' : 'webm')
      : mimeType.indexOf('audio') >= 0
        ? (mimeType.indexOf('mp4') >= 0 ? 'm4a' : 'webm')
        : mimeType.indexOf('text') >= 0
          ? 'txt'
          : (mimeType.indexOf('png') >= 0 ? 'png' : 'jpg');

    const safeGuest = (data.guestName || 'Guest').replace(/[^a-zA-Z0-9\\u0600-\\u06FF _-]/g, '').trim() || 'Guest';
    const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd_HHmmss');
    const fileName = stamp + '_' + safeGuest + '.' + ext;

    const bytes = Utilities.base64Decode(rawBase64);
    const blob = Utilities.newBlob(bytes, mimeType, fileName);
    const file = folder.createFile(blob);

    if (data.note) {
      file.setDescription('Guest: ' + safeGuest + '\\nMessage: ' + data.note);
    }

    return jsonOut({ ok: true, name: fileName });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  }
}

// Strictly Write-Only: Never lists or exposes files to guests
function doGet() {
  return jsonOut({ status: 'MEEM Private Uploader Active (Write-Only)', couple: WEDDING_NAME });
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
`;
fs.writeFileSync(path.join(clientDir, 'drive-apps-script.gs'), gsContent, 'utf8');

// 4. Generate white-labeled QR Guest Camera page (Guest-Only Write-Only)
if (args.qrCamera) {
  let qrHtml = fs.readFileSync(path.join(ROOT, 'qr-memories.html'), 'utf8');
  qrHtml = qrHtml.replace(/href="assets\//g, 'href="../../assets/').replace(/src="assets\//g, 'src="../../assets/');
  qrHtml = qrHtml.replace(
    "const COUPLE = params.get('couple') || 'كريم و نور';",
    `const COUPLE = params.get('couple') || ${JSON.stringify(couple)};`
  );
  qrHtml = qrHtml.replace(
    "const DRIVE_ENDPOINT = params.get('endpoint') || '';",
    `const DRIVE_ENDPOINT = params.get('endpoint') || ${JSON.stringify(endpointVal === 'PASTE_DEPLOYED_APPS_SCRIPT_WEB_APP_URL_HERE' ? '' : endpointVal)};`
  );
  qrHtml = qrHtml.replace(
    "const DRIVE_TOKEN = params.get('token') || '';",
    `const DRIVE_TOKEN = params.get('token') || ${JSON.stringify(secretToken)};`
  );
  qrHtml = qrHtml.replace(
    "const GUEST_ONLY = params.get('guestOnly') === '1';",
    "const GUEST_ONLY = params.get('guestOnly') !== '0';"
  );
  fs.writeFileSync(path.join(clientDir, 'qr-camera.html'), qrHtml, 'utf8');
}

// 5. Generate white-labeled Voice & Written Wishes Guestbook page
if (args.voiceBook) {
  let vbHtml = fs.readFileSync(path.join(ROOT, 'voice-guestbook.html'), 'utf8');
  vbHtml = vbHtml.replace(/href="assets\//g, 'href="../../assets/').replace(/src="assets\//g, 'src="../../assets/');
  vbHtml = vbHtml.replace(
    "const COUPLE = params.get('couple') || 'كريم و نور';",
    `const COUPLE = params.get('couple') || ${JSON.stringify(couple)};`
  );
  vbHtml = vbHtml.replace(
    "const ENDPOINT = params.get('endpoint') || '';",
    `const ENDPOINT = params.get('endpoint') || ${JSON.stringify(endpointVal === 'PASTE_DEPLOYED_APPS_SCRIPT_WEB_APP_URL_HERE' ? '' : endpointVal)};`
  );
  vbHtml = vbHtml.replace(
    "const TOKEN = params.get('token') || '';",
    `const TOKEN = params.get('token') || ${JSON.stringify(secretToken)};`
  );
  fs.writeFileSync(path.join(clientDir, 'voice-guestbook.html'), vbHtml, 'utf8');
}

// 6. Generate Print-Ready Table QR Card if qrCamera or voiceBook requested
if (args.qrCamera || args.voiceBook) {
  const targetUrl = args.qrCamera
    ? `${BASE_URL}/clients/${args.slug}/qr-camera.html`
    : `${BASE_URL}/clients/${args.slug}/voice-guestbook.html`;
  const qrCardHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>Table QR Card — ${couple}</title>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@400;700&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #FAF7F2; font-family: 'Cairo', sans-serif; display: grid; place-items: center; min-height: 100vh; padding: 24px; }
    .card {
      width: 420px; background: linear-gradient(165deg, #FFFDF9, #F6EFE2);
      border: 2.5px solid #C5A059; border-radius: 28px; padding: 38px 28px; text-align: center;
      box-shadow: 0 24px 60px rgba(13, 59, 46, 0.14), inset 0 0 0 9px #FFFDF9, inset 0 0 0 11px rgba(197, 160, 89, 0.45);
    }
    .amiri { font-family: 'Amiri', serif; }
    .qr-box { width: 220px; height: 220px; margin: 20px auto; padding: 12px; background: #FFF; border: 1.5px solid #C5A059; border-radius: 18px; }
    .qr-box img { width: 100%; height: 100%; display: block; }
    .print-btn { margin-top: 20px; padding: 10px 24px; border-radius: 999px; border: 1px solid #C5A059; background: #0D3B2E; color: #FFF; font: 700 13px inherit; cursor: pointer; }
    @media print { .print-btn { display: none; } body { background: #FFF; padding: 0; } .card { box-shadow: none; } }
  </style>
</head>
<body>
  <div class="card">
    <img src="../../assets/logos/meem-logo-320.png?v=2" alt="MEEM" style="width:52px;height:52px;object-fit:contain;margin:0 auto 8px;display:block;" />
    <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#9B7837;font-weight:700;">CAPTURE OUR MEMORIES</div>
    <h1 class="amiri" style="font-size:38px;color:#0D3B2E;margin:6px 0;">${couple}</h1>
    <p style="font-size:13px;color:#5D6862;line-height:1.7;">امسح الكود بكاميرا موبايلك وشاركنا أجمل صور وفيديوهات الليلة — تُحفظ فوراً وبسرية في ألبومنا الخاص</p>
    <div class="qr-box">
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=420x420&color=0D3B2E&bgcolor=FFFFFF&data=${encodeURIComponent(targetUrl)}" alt="Wedding QR Code" />
    </div>
    <div style="font-size:12px;color:#0D3B2E;font-weight:700;">Scan With Camera • No App Required</div>
    <button type="button" class="print-btn" onclick="window.print()">طباعة / حفظ كارت الطاولة PDF</button>
  </div>
</body>
</html>`;
  fs.writeFileSync(path.join(clientDir, 'table-qr-card.html'), qrCardHtml, 'utf8');
}

// 7. Generate Ready-to-Send Handoff Sheet (DELIVERY_HANDOFF.md)
const handoff = `# Client Delivery Package — ${couple} (\`${args.slug}\`)

## 1. Live Links (After \`git push\`)
- **Invitation Website:** ${BASE_URL}/clients/${args.slug}
${args.qrCamera ? `- **Private Guest QR Camera (Write-Only):** ${BASE_URL}/clients/${args.slug}/qr-camera.html` : ''}
${args.voiceBook ? `- **Private Voice & Wishes Guestbook:** ${BASE_URL}/clients/${args.slug}/voice-guestbook.html` : ''}
${(args.qrCamera || args.voiceBook) ? `- **Print-Ready Table QR Card:** ${BASE_URL}/clients/${args.slug}/table-qr-card.html` : ''}

## 2. Privacy & Security Credentials
- **Couple Authorized Emails:** ${emails.length ? emails.join(', ') : 'Not specified yet'}
- **Per-Wedding Secret Token:** \`${secretToken}\`
- **Auto-Lock Expiry Date:** \`${expiresAt}\`

## 3. 30-Second Google Drive Activation (For QR Camera / Voice Guestbook)
1. Open [script.google.com](https://script.google.com) → New Project → paste \`clients/${args.slug}/drive-apps-script.gs\`.
2. Click **Run → \`setupPrivateWeddingFolder\`** once (creates private folder + shares ONLY with the couple's emails).
3. Click **Deploy → New deployment → Web App** (\`Execute as: Me\` | \`Who has access: Anyone\`).
4. Re-run with \`--endpoint "<WEB_APP_URL>"\` or paste the URL into \`DRIVE_ENDPOINT\` inside \`qr-camera.html\` / \`voice-guestbook.html\`, then \`git push\`.

## 4. Ready-to-Send WhatsApp Message to Couple
> ألف مبروك يا **${couple}** ✨🤍
> دعوتكم الرقمية الخاصة من **MEEM • ميم** جاهزة الآن للمشاركة مع ضيوفكم:
> ${BASE_URL}/clients/${args.slug}
${args.qrCamera ? `> \n> وكارت الـ QR الخاص بكاميرا الضيوف جاهز للطباعة على الطاولات (كل الصور والفيديوهات تُحفظ بسرية تامة داخل فولدر Google Drive الخاص بكم فقط):\n> ${BASE_URL}/clients/${args.slug}/table-qr-card.html` : ''}
${args.voiceBook ? `> \n> ورابط دفتر التهاني الصوتي والمكتوب الخاص بكم:\n> ${BASE_URL}/clients/${args.slug}/voice-guestbook.html` : ''}
> \n> نتمنى لكم ليلة عمر لا تُنسى 🤍
`;
fs.writeFileSync(path.join(clientDir, 'DELIVERY_HANDOFF.md'), handoff, 'utf8');

console.log('\n==================================================');
console.log(`ALL-IN-ONE PACKAGE READY: clients/${args.slug}/`);
console.log('==================================================');
console.log(` - Invitation:        clients/${args.slug}/index.html`);
console.log(` - Drive Apps Script: clients/${args.slug}/drive-apps-script.gs`);
if (args.qrCamera) console.log(` - QR Guest Camera:   clients/${args.slug}/qr-camera.html`);
if (args.voiceBook) console.log(` - Voice Guestbook:   clients/${args.slug}/voice-guestbook.html`);
if (args.qrCamera || args.voiceBook) console.log(` - Table QR Card:     clients/${args.slug}/table-qr-card.html`);
console.log(` - Handoff Message:   clients/${args.slug}/DELIVERY_HANDOFF.md`);
console.log(` - Secret Token:      ${secretToken}`);
console.log(` - Auto-Expires At:   ${expiresAt}`);
