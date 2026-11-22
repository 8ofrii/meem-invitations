/**
 * MEEM Digital Invitations — Free Google Drive Uploader for Live QR Guest Camera Add-On
 * ======================================================================================
 * Setup (2 minutes per client, $0 cost, 100% private to the Couple's Google Drive):
 *
 * 1. Create a folder in Google Drive for the couple (e.g., "Karim & Nour Wedding Memories").
 * 2. Copy the Folder ID from the Drive URL: https://drive.google.com/drive/folders/<FOLDER_ID>
 * 3. Go to https://script.google.com -> New Project -> paste this entire file.
 * 4. Replace YOUR_GOOGLE_DRIVE_FOLDER_ID below with the Folder ID.
 * 5. Click Deploy -> New deployment -> Web app:
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 6. Copy the generated Web App URL (https://script.google.com/macros/s/.../exec)
 *    and pass it into the couple's MEEM QR Memories page (?endpoint=YOUR_WEB_APP_URL&drive=YOUR_FOLDER_URL).
 */

const FOLDER_ID = 'YOUR_GOOGLE_DRIVE_FOLDER_ID';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const folder = DriveApp.getFolderById(FOLDER_ID);

    const rawBase64 = (data.base64 || '').replace(/^data:[^;]+;base64,/, '');
    const mimeType = data.mimeType || 'image/jpeg';
    const ext = mimeType.indexOf('video') >= 0
      ? (mimeType.indexOf('mp4') >= 0 ? 'mp4' : 'webm')
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

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, id: file.getId(), name: fileName }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'MEEM QR Memories Drive Uploader Ready' }))
    .setMimeType(ContentService.MimeType.JSON);
}
