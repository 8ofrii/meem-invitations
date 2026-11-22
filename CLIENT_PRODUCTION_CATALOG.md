# MEEM — Master Client Production Catalog (All 52 Templates, Colors & Songs)

> **Purpose:** Complete technical map of every HTML template, where to edit its colors (`:root` CSS variables), how to swap songs, and how to generate a dedicated standalone client website in one step.

---

## 1. Quick Client Website Generator

Run the built-in generator to create a white-labeled, ready-to-deploy client website in `clients/<slug>/index.html` (served live at `/clients/<slug>`):

```bash
node scripts/create-client-invite.js \
  --template 49 \
  --slug karim-nour \
  --groom "كريم" \
  --bride "نور" \
  --date "2027-08-20" \
  --dateText "الجمعة 20 أغسطس 2027" \
  --venue "قاعة الماسة الملكية" \
  --table "طاولة رقم 7 • VIP" \
  --song "einaudi_experience" \
  --whatsapp "201024190741" \
  --colors "--gold:#D4AF37;--ivory:#FFFDF8"
```

### Where to Customize Any Template Manually
- **Colors:** Edit the `:root { --... }` CSS variables at the top `<style>` block of the template HTML (exact variable names for all 52 templates are listed in Section 2 below).
- **Global Color Finish Preset (instant URL param):** Append `?theme=gold|chromium|emerald|rose|sapphire`.
- **Music / Song:** Change `data-music-mood="..."` on `<body>` AND `WeddingSound.startMusic('...')` (or `musicMood: '...'`) inside the template `<script>`, OR pass `--song <key>` (use `--song silent` for no sound).
- **Couple Names, Date, Venue, Table:** Search for `data-couple-title`, `data-monogram`, `data-event-date`, `data-countdown`, `data-venue-name`, `data-table-seat`.
- **Couple Photo:** Replace the `src` on `<img data-couple-photo ...>` (or pass `--photo path/to/couple.jpg`).
- **RSVP WhatsApp Number:** Default studio number lives in `assets/shared.js` (`defaultWhatsapp`) or override per client via `data-whatsapp="2010XXXXXXXX"` on `<form data-rsvp-form>`.

---

## 2. All 52 HTML Templates — Exact Files, Colors & Default Songs

| # | Title | Category | HTML File | Default Song Key | Video / Photo | Exact `:root` CSS Color Variables |
|---|---|---|---|---|---|---|
| #01 | Royal Emerald & Gold | Interactive (تفاعلية) | `samples/01-royal-emerald-gold.html` | `jassmi_zaffa` | Standard | `--emerald-deep: #041D17; --emerald: #072D24; --emerald-card: #0A372C; --gold: #D8B46C; --gold-light: #F3DCAA; --gold-line: rgba(216, 180, 108, 0.32); --ivory: #FAF4E8; --muted: #B9C8C0` |
| #02 | Ivory Wax-Seal Editorial | Classic & Royal (كلاسيك وملكي) | `samples/02-wax-seal-editorial.html` | `einaudi_experience` | Standard | `--bg: #F6F1E9; --paper: #FBF8F3; --ink: #221E1A; --muted: #6E655B; --gold: #B08D57; --wax: #6D1D2A; --wax-dark: #4A111A; --line: rgba(176, 141, 87, 0.28)` |
| #03 | Sage Botanical Watercolor | Soft & Floral (ناعم وورود) | `samples/03-botanical-garden.html` | `taylor_enchanted` | Standard | `--cream: #F9F6F0; --sage: #5E715D; --sage-dark: #3C4D3B; --sage-soft: #E8EFE6; --blush: #C99488; --gold: #B6955A; --ink: #2B302A; --muted: #6C746B` |
| #04 | Celestial Midnight Velvet | Classic & Royal (كلاسيك وملكي) | `samples/06-celestial-midnight.html` | `young_and_beautiful` | Standard | `--night: #060914; --navy: #0D142B; --card: rgba(15, 22, 46, 0.72); --gold: #E4C482; --gold-soft: rgba(228, 196, 130, 0.25); --text: #F4EFE4; --muted: #A9B1C7` |
| #05 | Nile Palace | Classic & Royal (كلاسيك وملكي) | `samples/07-bilingual-palace.html` | `om_kalthoum` | Standard | `--sand: #F7F1E7; --card: #FFFDF9; --terra: #A85B43; --gold: #C29855; --ink: #24211D; --muted: #6E665C; --line: rgba(194, 152, 85, 0.3)` |
| #06 | Arabesque Pearl Katb Ketab | Classic & Royal (كلاسيك وملكي) | `samples/05-arabesque-pearl.html` | `farha_inst` | Standard | `--pearl: #FDF8F6; --blush: #F5E6E1; --rosegold: #B97A6A; --rosegold-light: #DFB0A3; --plum: #3A2329; --muted: #7C6268; --line: rgba(185, 122, 106, 0.28)` |
| #07 | Quiet-Luxury Minimalist | Classic & Royal (كلاسيك وملكي) | `samples/09-minimal-andalus.html` | `farha_inst` | Standard | `--linen: #F4EFE6; --paper: #FAF8F3; --ink: #26221E; --bronze: #967B59; --muted: #766D63; --line: rgba(38, 34, 30, 0.12)` |
| #08 | Royal Plum Mosque Arch | Classic & Royal (كلاسيك وملكي) | `samples/15-nile-katb-ketab-arch.html` | `farha_inst` | Standard | `--parchment: #FAF5E9; --paper: #FFFDF8; --plum: #663E76; --plum-dark: #4A2A57; --lavender: #EDE4F2; --gold: #C8A15A; --ink: #2E2320; --muted: #766762; …` |
| #09 | Velvet Engagement Ring Box | Interactive (تفاعلية) | `samples/12-velvet-ring-box.html` | `elissa_men_awal` | Standard | `--sapphire: #0B1933; --card: rgba(19, 40, 79, 0.78); --gold: #E6C57F; --ivory: #FAF7F0; --muted: #B6C5DE; --line: rgba(230, 197, 127, 0.28)` |
| #10 | Glowing Lanterns Henna Night | Interactive (تفاعلية) | `samples/13-henna-night-lanterns.html` | `hakim_kolo_yorkos` | Standard | `--ruby: #3B0B18; --ruby-deep: #22050D; --card: rgba(65, 14, 29, 0.84); --saffron: #F0B85A; --teal: #1D6E6B; --cream: #FFF6E8; --muted: #E0C5BC; --line: rgba(240, 184, 90, 0.34)` |
| #11 | The Wedding Issue | Modern & Photo (عصري وصور) | `samples/04-vogue-magazine.html` | `einaudi_experience` | Standard | `--black: #111111; --paper: #FAF9F6; --warm: #EFECE6; --gold: #B7965B; --muted: #66645F; --rule: rgba(17, 17, 17, 0.14)` |
| #12 | El Gouna Boarding Pass | Modern & Photo (عصري وصور) | `samples/08-destination-boarding-pass.html` | `amr_nour` | Standard | `--azure: #123B66; --azure-deep: #0B2542; --lemon: #E8BA38; --ivory: #FFFDF7; --sand: #F5EFE2; --coral: #D4674E; --muted: #5C6A7A` |
| #13 | Marassi Golden Sunset | Soft & Floral (ناعم وورود) | `samples/10-golden-sunset-desert.html` | `esseily_einy` | Standard | `--dusk: #1C1310; --earth: #2A1C16; --amber: #E4A968; --amber-light: #F7D7AD; --terra: #C66842; --cream: #FDF4E9; --muted: #CBB9AC; --line: rgba(228, 169, 104, 0.28)` |
| #14 | The Cairo Chronicle | Modern & Photo (عصري وصور) | `samples/11-cairo-newspaper.html` | `clair_de_lune` | Standard | `--newsprint: #F3EDE0; --paper: #F9F5EB; --ink: #1A1815; --muted: #5A5348; --accent: #8B2626; --rule: #23201C` |
| #15 | Polaroid Story Scrapbook | Video & Reels (فيديو وريلز) | `samples/14-polaroid-scrapbook.html` | `golden_hour` | Video, Photo | `--warm: #F5EFE6; --card: #FFFFFF; --espresso: #2B211B; --terracotta: #B86144; --muted: #76695E; --line: rgba(43, 33, 27, 0.14)` |
| #16 | Golden Vinyl Record | Modern & Photo (عصري وصور) | `samples/16-vinyl-record-invite.html` | `until_i_found_you` | Standard | `--obsidian: #0E0D0C; --surface: #191715; --gold: #E4BD73; --cream: #F6F0E4; --muted: #A69D8E; --line: rgba(228, 189, 115, 0.24)` |
| #17 | Our Love Story Journey | Video & Reels (فيديو وريلز) | `samples/17-love-story-journey.html` | `a_thousand_years` | Video, Photo | `--cream: #FBF7F0; --paper: #FFFFFF; --blush: #F3E6DE; --rose: #A96B5E; --gold: #C29958; --ink: #27201C; --muted: #72655C; --line: rgba(194, 153, 88, 0.28)` |
| #18 | Classic Ivory & Gold Crest | Silent Cards (كروت صامتة) | `samples/18-classic-ivory-gold.html` | `silent` | Standard | `--bg: #F9F6F0; --card-bg: #FFFFFF; --ink: #1C1917; --gold: #C5A059; --gold-light: #DFBE7F; --gold-dim: rgba(197, 160, 89, 0.28); --muted: #78716C` |
| #19 | Sage Olive Botanical Card | Silent Cards (كروت صامتة) | `samples/20-sage-olive-botanical.html` | `silent` | Standard | `--bg: #EAEFE9; --card-bg: #FCFDFB; --ink: #1B2B20; --sage: #5A7360; --sage-light: #C9D6C7; --muted: #6B7C70; --gold: #A3824E` |
| #20 | Andalusian Arabesque Katb Card | Silent Cards (كروت صامتة) | `samples/21-andalus-katb-card.html` | `silent` | Standard | `--bg: #F4EFE6; --card-bg: #FCFAF6; --ink: #1F2421; --emerald: #143D30; --gold: #B8860B; --gold-light: #DFBE7F; --gold-dim: rgba(184, 134, 11, 0.22); --muted: #6B726C` |
| #21 | Dusty Rose & Pearl Floral Card | Silent Cards (كروت صامتة) | `samples/22-dusty-rose-pearl.html` | `silent` | Standard | `--bg: #F7EFE9; --card-bg: #FFFDFD; --ink: #2C2627; --rose: #A36B6D; --rose-light: #ECCECF; --rose-pale: #FBF0F0; --muted: #7A696A; --gold: #C29D68` |
| #22 | Liquid Chromium & Pearl | Classic & Royal (كلاسيك وملكي) | `samples/24-liquid-chromium-pearl.html` | `einaudi_experience` | Standard | `--bg-base: #F8FAFC; --pearl-surface: #FFFFFF; --chrome-high: #FFFFFF; --chrome-mid: #94A3B8; --chrome-deep: #334155; --chrome-dark: #0F172A; --ink: #0F172A; --muted: #475569; …` |
| #23 | Molten Chrome Minimalist Card | Silent Cards (كروت صامتة) | `samples/25-molten-chrome-card.html` | `silent` | Standard | `--bg: #F4F6F9; --card-bg: #FFFFFF; --chrome-dark: #0F172A; --chrome-mid: #64748B; --chrome-light: #CBD5E1; --ink: #0F172A; --muted: #475569; --line: rgba(148, 163, 184, 0.35)` |
| #24 | Bi-Fold Luxury Folding Card | Silent Cards (كروت صامتة) | `samples/26-bifold-folding-card.html` | `silent` | Standard | `--bg: #F5F1EA; --paper: #FAF8F5; --paper-inner: #FFFFFF; --gold: #A8813A; --gold-light: #C5A059; --ink: #1C1917; --muted: #57534E; --line: rgba(168, 129, 58, 0.25)` |
| #25 | Pocket Sleeve Slide-Out Card | Silent Cards (كروت صامتة) | `samples/27-pocket-sleeve-card.html` | `silent` | Standard | `--bg: #F7F5F0; --card-bg: #FFFFFF; --sleeve-bg: linear-gradient(145deg, #EFE8DC, #DFD5C4); --gold: #A8813A; --ink: #1C1917; --muted: #57534E; --line: rgba(168, 129, 58, 0.28)` |
| #26 | French Gatefold Double-Flap Card | Silent Cards (كروت صامتة) | `samples/28-gatefold-ribbon-card.html` | `silent` | Standard | `--bg: #F6F3EC; --paper: #FAF8F5; --paper-inner: #FFFFFF; --gold: #A8813A; --gold-light: #C5A059; --ink: #1C1917; --muted: #57534E; --line: rgba(168, 129, 58, 0.28)` |
| #27 | Translucent Vellum Envelope Slide Card | Silent Cards (كروت صامتة) | `samples/29-envelope-slide-card.html` | `silent` | Standard | `--bg: #F5F2EB; --env-bg: linear-gradient(145deg, #FDFCF9, #EFECE6); --card-bg: #FFFFFF; --gold: #A8813A; --gold-light: #C5A059; --ink: #1C1917; --muted: #57534E; --line: rgba(168, 129, 58, 0.28)` |
| #28 | Abdeen Palace Crimson Velvet | Classic & Royal (كلاسيك وملكي) | `samples/30-abdeen-palace-royal.html` | `om_kalthoum_inst` | Standard | `--bg: #1E080E; --card: rgba(34, 10, 17, 0.94); --ink: #FAF3E6; --muted: #D9C4B8; --accent: #E2BE78; --accent-soft: rgba(226, 190, 120, 0.10); --border: rgba(226, 190, 120, 0.35)` |
| #29 | Citadel Alabaster Katb Ketab | Classic & Royal (كلاسيك وملكي) | `samples/31-citadel-mosque-katb.html` | `farha_katb` | Standard | `--bg: #FAF6EE; --card: rgba(255, 253, 248, 0.95); --ink: #142921; --muted: #52635B; --accent: #0D3B2E; --accent-soft: rgba(13, 59, 46, 0.06); --border: rgba(197, 160, 89, 0.45)` |
| #30 | Old Cataract Aswan Sunset | Soft & Floral (ناعم وورود) | `samples/32-aswan-cataract-sunset.html` | `amr_tamally_maak` | Standard | `--bg: #F8EFE6; --card: rgba(255, 251, 246, 0.94); --ink: #2B1B14; --muted: #6E5346; --accent: #9E4B2E; --accent-soft: rgba(158, 75, 46, 0.08); --border: rgba(197, 146, 95, 0.45)` |
| #31 | Madinet Nasr Royal Hall & Table Pass | Classic & Royal (كلاسيك وملكي) | `samples/34-madinet-nasr-triumph.html` | `jassmi_zaffa` | Table | `--bg: #FAF6EE; --card: rgba(255, 253, 248, 0.95); --ink: #1D2924; --muted: #5A6760; --accent: #9C732B; --accent-soft: rgba(197, 160, 89, 0.10); --border: rgba(197, 160, 89, 0.40)` |
| #32 | Zamalek Gezira Palace Classic Romance | Modern & Photo (عصري وصور) | `samples/35-zamalek-nile-garden.html` | `amr_tamally_maak` | Table | `--bg: #FBF8F3; --card: rgba(255, 253, 249, 0.95); --ink: #1E242B; --muted: #5C646D; --accent: #7A5426; --accent-soft: rgba(184, 142, 82, 0.10); --border: rgba(184, 142, 82, 0.38)` |
| #33 | Handwritten Wax-Ribbon Love Letter | Interactive (تفاعلية) | `samples/40-handwritten-love-letter.html` | `ed_perfect` | Standard | `--paper: #FBF7F0; --ink: #2E221D; --burgundy: #6D1D2A; --gold: #B38945; --muted: #78655B` |
| #34 | Ottoman Mashrabiya Sliding Lattice | Interactive (تفاعلية) | `samples/41-mashrabiya-sliding-katb.html` | `farha_inst` | Standard | `--wood: #241911; --gold: #D7B067; --cream: #FAF5EB; --emerald: #0E3A2C` |
| #35 | Cinema Premiere Tear-Off Golden Ticket | Video & Reels (فيديو وريلز) | `samples/42-cinema-premiere-ticket.html` | `young_and_beautiful` | Video, Table | `--bg: #09090B; --gold: #E5C168; --ivory: #FAF6EE; --muted: #A1A1AA` |
| #36 | Pressed-Glass Herbarium & 3-Tab Guide | Soft & Floral (ناعم وورود) | `samples/43-pressed-glass-herbarium.html` | `taylor_enchanted` | Table | `--sage: #2C4A3B; --gold: #B8924C; --ink: #1A2C22` |
| #37 | Haute Horology Luxury Watch Dial | Interactive (تفاعلية) | `samples/44-haute-horology-dial.html` | `amr_tamally_maak` | Table | `--obs: #0B0E11; --gold: #D9B777; --ivory: #F5EFE4` |
| #38 | Vintage Cairo 3D Flip Postcard | Modern & Photo (عصري وصور) | `samples/45-cairo-vintage-postcard.html` | `clair_de_lune` | Table | `--cream: #FAF4E8; --navy: #19324D; --terra: #B45338; --gold: #C59A4B` |
| #39 | Emerald Velvet Theatre Curtain & Guestbook | Interactive (تفاعلية) | `samples/46-velvet-curtain-gala.html` | `elissa_men_awal` | Table | `--velvet: #0B2E24; --gold: #DFBA6E; --cream: #FAF5EB` |
| #40 | Architectural Z-Fold Origami Accordion | Silent Cards (كروت صامتة) | `samples/47-origami-accordion-card.html` | `silent` | Table | `--stone: #EFECE6; --paper: #FAF9F6; --ink: #1D1D1B; --muted: #6B6963; --line: rgba(29,29,27,.14)` |
| #41 | Live Find-Your-Table Seating Concierge | Interactive (تفاعلية) | `samples/48-interactive-table-finder.html` | `egyptian_mix` | Table | `--em: #0D3B2E; --gold: #C5A059; --bg: #FAF7F1; --ink: #13241F` |
| #42 | Sahel 3-Day Coastal Weekend Linen | Soft & Floral (ناعم وورود) | `samples/49-mediterranean-coastal-linen.html` | `cant_help_falling` | Table | `--cobalt: #13427A; --linen: #FDFCF8; --sand: #F2E9DC; --ink: #142740` |
| #43 | Zellige Mosaic Henna & DJ Song Request | Interactive (تفاعلية) | `samples/50-henna-night-mosaic.html` | `hakim_el_wad` | Standard | `--teal: #0F4C5C; --terra: #B84A39; --saffron: #E3A842; --cream: #FFF8EE` |
| #44 | Cinematic Video-Hero Premiere | Video & Reels (فيديو وريلز) | `samples/51-cinematic-video-hero.html` | `young_and_beautiful` | Video, Photo, Table | `--bg: #0E1216; --gold: #E5C682; --ivory: #FAF6EE; --muted: #C8C2B8` |
| #45 | Ken Burns Multi-Photo Couple Reel | Video & Reels (فيديو وريلز) | `samples/52-ken-burns-couple-reel.html` | `ed_perfect` | Video, Photo, Table | `--bg: #12100E; --gold: #DFBC74; --ivory: #FAF6EE` |
| #46 | Swipeable Couple Engagement Album | Modern & Photo (عصري وصور) | `samples/53-couple-photo-gallery-motion.html` | `tamer_helm` | Photo | `--bg: #FAF6EF; --em: #0D3B2E; --gold: #C5A059; --ink: #1A2420` |
| #47 | 3D Floating Gold Couple Locket | Video & Reels (فيديو وريلز) | `samples/54-floating-locket-motion.html` | `a_thousand_years` | Video, Photo | `--bg: #161014; --rose: #E6B8A2; --gold: #E5C278; --ivory: #FFF8F3` |
| #48 | Interactive 4-Slide Reels Video Story | Video & Reels (فيديو وريلز) | `samples/55-vertical-reels-story.html` | `golden_hour` | Video, Photo, Table | `--gold: #E6C783; --ink: #fff` |
| #49 | Royal Ivory Ribbon Doors & Gold Oval Arch | Interactive (تفاعلية) | `samples/56-ivory-ribbon-doors-oval.html` | `jassmi_zaffa` | Table | `--ivory: #FAF5EB; --cream: #EDE3D2; --gold: #C5A059; --gold-dark: #9B7837; --cocoa: #4A3A2C; --muted: #7B6A58; --sage: #8F967E` |
| #50 | Botanical Scalloped Arch & Wax Seal Folio | Soft & Floral (ناعم وورود) | `samples/57-botanical-scalloped-folio.html` | `einaudi_experience` | Photo, Table | `--paper: #FBF8F1; --linen: #EFE8DA; --emerald-bot: #284234; --sage: #6D826B; --gold: #C6A15B; --gold-hi: #E9CD8E; --gold-deep: #967232; --ink: #2C2924` |
| #51 | Bridal Pearl Couture, Guipure Lace & Silk | Video & Reels (فيديو وريلز) | `samples/58-pearl-lace-silk-couture.html` | `jassmi_seta` | Video, Table | `--silk: #FBF7F1; --champagne: #ECE0CE; --pearl: #FFFDF9; --rose-gold: #D5AF8A; --bronze: #5B3C2B; --bronze-mid: #855D47; --cocoa: #3E281C` |
| #52 | Periwinkle Ribbon Bow & Photobooth Polaroid | Modern & Photo (عصري وصور) | `samples/59-periwinkle-photobooth-polaroid.html` | `golden_hour` | Photo, Table | `--blue-hi: #95A7CA; --blue-mid: #7A8FB6; --blue-deep: #5E739B; --blush: #F7DCE3; --blush-hi: #FFF2F6; --rg-1: #AD7D64; --rg-2: #F2D6C3; --rg-3: #C99A82; …` |

---

## 3. All Available Music & Song Keys (`assets/shared.js`)

| Song Key | Audio File (`assets/audio/`) |
|---|---|
| `om_kalthoum_inst` | `assets/audio/om-kalthoum-instrumental.mp3` |
| `farha_inst` | `assets/audio/farha-instrumental.mp3` |
| `egyptian_zaffa` | `assets/audio/egyptian-zaffa.mp3` |
| `sammoo_besm_allah` | `assets/audio/egyptian-zaffa.mp3` |
| `thousand_years_inst` | `assets/audio/thousand-years-instrumental.mp3` |
| `bridgerton` | `assets/audio/thousand-years-instrumental.mp3` |
| `canon_in_d` | `assets/audio/thousand-years-instrumental.mp3` |
| `classic` | `assets/audio/thousand-years-instrumental.mp3` |
| `romantic_piano` | `assets/audio/thousand-years-instrumental.mp3` |
| `liquid_chromium` | `assets/audio/om-kalthoum-instrumental.mp3` |
| `celestial` | `assets/audio/thousand-years-instrumental.mp3` |
| `om_kalthoum` | `assets/audio/om-kalthoum-alf-leila.mp3` |
| `farha_katb` | `assets/audio/farha-katb.mp3` |
| `katb_ketab` | `assets/audio/farha-instrumental.mp3` |
| `esseily_einy` | `assets/audio/esseily-einy-shayfa.mp3` |
| `esseily_wakheeran` | `assets/audio/esseily-wakheeran.mp3` |
| `jassmi_zaffa` | `assets/audio/jassmi-zaffa.mp3` |
| `jassmi_seta` | `assets/audio/jassmi-seta-el-sobah.mp3` |
| `tamer_helm` | `assets/audio/tamer-helm-seneen.mp3` |
| `ramy_mabrook` | `assets/audio/ramy-sabry-mabrook.mp3` |
| `amr_nour` | `assets/audio/amr-diab-nour-el-ein.mp3` |
| `hakim_kolo_yorkos` | `assets/audio/hakim-kolo-yorkos.mp3` |
| `hakim_el_wad` | `assets/audio/hakim-el-wad-da-helw.mp3` |
| `oriental` | `assets/audio/hakim-kolo-yorkos.mp3` |
| `a_thousand_years` | `assets/audio/a-thousand-years.mp3` |
| `ed_perfect` | `assets/audio/ed-sheeran-perfect.mp3` |
| `cant_help_falling` | `assets/audio/cant-help-falling.mp3` |
| `until_i_found_you` | `assets/audio/until-i-found-you.mp3` |
| `classic_romance_inst` | `assets/audio/classic-romance-inst.mp3` |
| `einaudi_experience` | `assets/audio/einaudi-experience.mp3` |
| `clair_de_lune` | `assets/audio/clair-de-lune.mp3` |
| `golden_hour` | `assets/audio/golden-hour.mp3` |
| `young_and_beautiful` | `assets/audio/young-and-beautiful.mp3` |
| `taylor_enchanted` | `assets/audio/taylor-enchanted.mp3` |
| `amr_tamally_maak` | `assets/audio/amr-tamally-maak.mp3` |
| `elissa_men_awal` | `assets/audio/elissa-men-awal-deqiqa.mp3` |
| `perfect` | `assets/audio/ed-sheeran-perfect.mp3` |
| `sahel_sunset` | `assets/audio/farha-katb.mp3` |
| `mediterranean` | `assets/audio/amr-diab-nour-el-ein.mp3` |

### Curated Auto-Cycling Mix Keys (`AUDIO_MIXES`)
- `english_mix`: ed-sheeran-perfect.mp3, a-thousand-years.mp3, cant-help-falling.mp3, until-i-found-you.mp3, classic-romance-inst.mp3
- `instrumental_mix`: om-kalthoum-instrumental.mp3, farha-instrumental.mp3, classic-romance-inst.mp3, thousand-years-instrumental.mp3
- `egyptian_mix`: jassmi-zaffa.mp3, farha-katb.mp3, tamer-helm-seneen.mp3, ramy-sabry-mabrook.mp3, esseily-einy-shayfa.mp3, om-kalthoum-alf-leila.mp3
- `esseily_mix`: farha-katb.mp3, esseily-einy-shayfa.mp3, esseily-wakheeran.mp3
- `jassmi_mix`: jassmi-zaffa.mp3, jassmi-seta-el-sobah.mp3
- `hakim_mix`: hakim-kolo-yorkos.mp3, hakim-el-wad-da-helw.mp3
- `silent`: Strictly silent (hides music button and plays zero audio)
