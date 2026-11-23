/**
 * MEEM Digital Invitations — Private Write-Only Google Drive Uploader (Per-Wedding Isolated)
 * ==========================================================================================
 * Privacy & Security Guarantees:
 * - Each wedding gets its OWN private Google Drive folder (Restricted to Bride & Groom only).
 * - Strictly WRITE-ONLY: Guests can ONLY upload photos/videos; they can NEVER list, view, or download any file.
 * - Protected by a unique per-wedding SECRET_TOKEN + automatic expiration date (EXPIRES_AT).
 * - Zero shared database between weddings — 100% isolated per couple.
 *
 * Setup (2 minutes per client, $0 cost):
 * 1. Create a private folder in Google Drive (shared ONLY with Groom & Bride emails — NOT "Anyone with link").
 * 2. Copy its Folder ID from the URL: https://drive.google.com/drive/folders/<FOLDER_ID>
 * 3. Go to https://script.google.com -> New Project -> paste this file.
 * 4. Fill in FOLDER_ID, a random SECRET_TOKEN, and EXPIRES_AT (e.g., 3 days after the wedding).
 * 5. Deploy -> New deployment -> Web app (Execute as: Me | Who has access: Anyone).
 * 6. Put the Web App URL + token in the client's QR page URL:
 *    /qr-memories?couple=...&guestOnly=1&token=<SECRET_TOKEN>&endpoint=<WEB_APP_URL>
 * 7. After the event ends, uploads automatically stop after EXPIRES_AT (or set ACCEPTING_UPLOADS = false).
 */

const FOLDER_ID = 'YOUR_PRIVATE_GOOGLE_DRIVE_FOLDER_ID';
const SECRET_TOKEN = 'CHANGE_TO_UNIQUE_RANDOM_WEDDING_TOKEN';
const ACCEPTING_UPLOADS = true;
const EXPIRES_AT = '2027-12-31T23:59:59+02:00'; // Auto-locks uploads after event window

function doPost(e) {
  try {
    if (!ACCEPTING_UPLOADS || (EXPIRES_AT && new Date() > new Date(EXPIRES_AT))) {
      return jsonOut({ ok: false, error: 'Upload window closed' });
    }

    const data = JSON.parse(e.postData.contents || '{}');
    if (SECRET_TOKEN && data.token !== SECRET_TOKEN) {
      return jsonOut({ ok: false, error: 'Unauthorized wedding token' });
    }

    const folder = DriveApp.getFolderById(FOLDER_ID);
    const rawBase64 = (data.base64 || '').replace(/^data:[^;]+;base64,/, '');
    const mimeType = data.mimeType || 'image/jpeg';
    const isVideo = mimeType.indexOf('video') >= 0;
    const isAudio = mimeType.indexOf('audio') >= 0;
    const ext = isVideo
      ? (mimeType.indexOf('mp4') >= 0 ? 'mp4' : 'webm')
      : isAudio
        ? (mimeType.indexOf('mp4') >= 0 ? 'm4a' : 'webm')
        : (mimeType.indexOf('png') >= 0 ? 'png' : 'jpg');

    const safeGuest = (data.guestName || 'Guest').replace(/[^a-zA-Z0-9\u0600-\u06FF _-]/g, '').trim() || 'Guest';
    const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd_HHmmss');
    const fileName = `${stamp}_${safeGuest}.${ext}`;

    const bytes = Utilities.base64Decode(rawBase64);
    const blob = Utilities.newBlob(bytes, mimeType, fileName);
    const file = folder.createFile(blob);

    if (data.note) {
      file.setDescription(`Guest: ${safeGuest}\nMessage: ${data.note}`);
    }

    return jsonOut({ ok: true, name: fileName });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  }
}

// Strictly write-only: doGet never lists or exposes any files
function doGet() {
  return jsonOut({ status: 'MEEM Private Uploader Active (Write-Only)' });
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
