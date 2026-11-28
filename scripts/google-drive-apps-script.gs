/**
 * MEEM Digital Invitations — Unified Private Google Drive + Live RSVP Sheet Suite
 * ===============================================================================
 * Powers ALL 3 Private Cloud Add-Ons in ONE free Google Apps Script:
 *   1. Live QR Guest Camera (Photos & Videos -> Private Google Drive subfolder)
 *   2. Voice & Written Wishes Guestbook (Audio & Wishes -> Private Google Drive subfolder)
 *   3. Live RSVP & Guest Attendance Tracker (Google Spreadsheet inside the same folder!)
 *
 * 30-SECOND SETUP:
 * 1. Open https://script.google.com -> New Project -> paste this entire file.
 * 2. Run "setupPrivateWeddingSuite" ONCE from the toolbar:
 *    - Creates the private folder + subfolders ("Photos & Videos" and "Voice & Written Wishes")
 *    - Creates the formatted Google Sheet ("RSVP & Guest Attendance Sheet")
 *    - Shares everything ONLY with COUPLE_EMAILS (strictly private!)
 * 3. Click Deploy -> New deployment -> Web app (Execute as: Me | Who has access: Anyone).
 * 4. Copy the Web App URL and paste it into your client order in MEEM Admin Studio!
 */

const WEDDING_NAME = 'MEEM — Wedding Memories & RSVP';
const COUPLE_EMAILS = []; // e.g. ['groom@gmail.com', 'bride@gmail.com']
const SECRET_TOKEN = 'CHANGE_TO_UNIQUE_WEDDING_TOKEN';
const ACCEPTING_UPLOADS = true;
const EXPIRES_AT = '2028-12-31T23:59:59+02:00';

function setupPrivateWeddingSuite() {
  const props = PropertiesService.getScriptProperties();
  const rootFolder = DriveApp.createFolder(WEDDING_NAME);
  rootFolder.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE);

  const mediaFolder = rootFolder.createFolder('Photos & Videos');
  const wishesFolder = rootFolder.createFolder('Voice & Written Wishes');

  // Create formatted Live RSVP Google Sheet inside the couple's private folder
  const ss = SpreadsheetApp.create(WEDDING_NAME + ' — RSVP Sheet');
  const sheet = ss.getActiveSheet();
  sheet.setName('RSVPs');
  sheet.appendRow(['Timestamp', 'Guest Name', 'Attendance', 'Guests Count', 'Assigned Table', 'VIP Pass Code', 'Wish / Note']);
  sheet.getRange('A1:G1').setFontWeight('bold').setBackground('#0D3B2E').setFontColor('#FAF6EE');
  sheet.setFrozenRows(1);

  const ssFile = DriveApp.getFileById(ss.getId());
  rootFolder.addFile(ssFile);
  DriveApp.getRootFolder().removeFile(ssFile);

  COUPLE_EMAILS.forEach(function(email) {
    if (email && email.indexOf('@') > 0) {
      rootFolder.addEditor(email.trim());
      ssFile.addEditor(email.trim());
    }
  });

  props.setProperty('ROOT_FOLDER_ID', rootFolder.getId());
  props.setProperty('MEDIA_FOLDER_ID', mediaFolder.getId());
  props.setProperty('WISHES_FOLDER_ID', wishesFolder.getId());
  props.setProperty('RSVP_SHEET_ID', ss.getId());

  Logger.log('SUCCESS! Private Folder URL: ' + rootFolder.getUrl());
  Logger.log('Live RSVP Google Sheet URL: ' + ss.getUrl());
}

function doPost(e) {
  try {
    if (!ACCEPTING_UPLOADS || (EXPIRES_AT && new Date() > new Date(EXPIRES_AT))) {
      return jsonOut({ ok: false, error: 'Window closed' });
    }
    const data = JSON.parse(e.postData.contents || '{}');
    if (SECRET_TOKEN && data.token !== SECRET_TOKEN) {
      return jsonOut({ ok: false, error: 'Unauthorized wedding token' });
    }

    const props = PropertiesService.getScriptProperties();

    // A) Handle Live RSVP Submission -> Append row to Google Sheet
    if (data.action === 'rsvp') {
      const sheetId = props.getProperty('RSVP_SHEET_ID');
      if (!sheetId) return jsonOut({ ok: false, error: 'Run setupPrivateWeddingSuite() first' });
      const ss = SpreadsheetApp.openById(sheetId);
      const sheet = ss.getSheetByName('RSVPs') || ss.getActiveSheet();
      const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
      sheet.appendRow([
        stamp,
        data.guestName || 'Guest',
        data.attendance || 'Attending',
        Number(data.guestsCount || 1),
        data.table || 'VIP',
        data.passCode || '',
        data.note || ''
      ]);
      return jsonOut({ ok: true, mode: 'rsvp' });
    }

    // B) Handle QR Camera Photo/Video or Voice/Text Guestbook Upload -> Save to Drive
    const mimeType = data.mimeType || 'image/jpeg';
    const isAudioOrText = mimeType.indexOf('audio') >= 0 || mimeType.indexOf('text') >= 0;
    const targetId = isAudioOrText
      ? (props.getProperty('WISHES_FOLDER_ID') || props.getProperty('ROOT_FOLDER_ID'))
      : (props.getProperty('MEDIA_FOLDER_ID') || props.getProperty('ROOT_FOLDER_ID'));

    if (!targetId) return jsonOut({ ok: false, error: 'Run setupPrivateWeddingSuite() first' });

    const folder = DriveApp.getFolderById(targetId);
    const rawBase64 = (data.base64 || '').replace(/^data:[^;]+;base64,/, '');
    const ext = mimeType.indexOf('video') >= 0
      ? (mimeType.indexOf('mp4') >= 0 ? 'mp4' : 'webm')
      : mimeType.indexOf('audio') >= 0
        ? (mimeType.indexOf('mp4') >= 0 ? 'm4a' : 'webm')
        : mimeType.indexOf('text') >= 0
          ? 'txt'
          : (mimeType.indexOf('png') >= 0 ? 'png' : 'jpg');

    const safeGuest = (data.guestName || 'Guest').replace(/[^a-zA-Z0-9\u0600-\u06FF _-]/g, '').trim() || 'Guest';
    const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd_HHmmss');
    const fileName = stamp + '_' + safeGuest + '.' + ext;

    const bytes = Utilities.base64Decode(rawBase64);
    const blob = Utilities.newBlob(bytes, mimeType, fileName);
    const file = folder.createFile(blob);
    if (data.note) file.setDescription('Guest: ' + safeGuest + '\nMessage: ' + data.note);

    return jsonOut({ ok: true, name: fileName });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  }
}

function doGet() {
  return jsonOut({ status: 'MEEM Private Wedding Suite Active (Write-Only)', couple: WEDDING_NAME });
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
