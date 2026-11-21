/* Single source of truth for MEEM (ميم): categories, samples, brand info, packages & add-ons */
window.SITE = {
  WHATSAPP: '201024190741',

  BRAND: {
    name: 'MEEM',
    ar: 'ميم',
    full: 'MEEM • ميم',
    sub: 'Digital Invitations • دعوات زفاف رقمية',
    tagline: 'Two names, one letter, one unforgettable invitation.',
    logo: 'assets/logos/meem-logo-320.png?v=2',
    icon: 'assets/logos/meem-logo-128.png',
    handle: '@meem.invitations'
  },

  CATEGORIES: [
    { id: 'cards', title: 'Tactile Opening & Silent Cards', short: 'Silent Cards', ar: 'كروت هادئة (بدون صوت)', icon: '<svg class="ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>', blurb: 'Tactile opening cards and silent luxury stationery with zero sound or voice.' },
    { id: 'weddings', title: 'Luxury Weddings & Palaces', short: 'Weddings', ar: 'الأفراح والقصور', icon: '<svg class="ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 17l2-9 4.5 4L12 5l2.5 7L19 8l2 9H3z"/><path d="M4 20h16"/></svg>', blurb: 'Grand ballrooms, palaces and 5-star Nile venues.' },
    { id: 'katb', title: 'Katb Ketab & Islamic Elegance', short: 'Katb Ketab', ar: 'عقد القران', icon: '<svg class="ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3c-2.5 2.5-6 4.5-6 9v8h12v-8c0-4.5-3.5-6.5-6-9z"/><path d="M9 20v-5a3 3 0 0 1 6 0v5"/><path d="M4 20h16"/></svg>', blurb: 'Calm, respectful designs for mosque ceremonies.' },
    { id: 'engagement', title: 'Engagement & Henna Nights', short: 'Engagement', ar: 'الخطوبة وليلة الحنة', icon: '<svg class="ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="14" r="6"/><path d="M9 6l3-3 3 3-3 2-3-2z"/></svg>', blurb: 'Ring boxes, lanterns and ladies-only celebrations.' },
    { id: 'editorial', title: 'Coastal, Destination & Modern', short: 'Coastal & Modern', ar: 'الساحل والتصاميم العصرية', icon: '<svg class="ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v3"/><path d="M5.6 5.6l2.1 2.1"/><path d="M18.4 5.6l-2.1 2.1"/><path d="M7 14a5 5 0 0 1 10 0"/><path d="M3 17c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5"/><path d="M3 20c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5"/></svg>', blurb: 'Sahel, El Gouna and magazine-style concepts.' }
  ],

  SAMPLES: [
    {
      num: '01', cat: 'weddings', file: 'samples/01-royal-emerald-gold.html',
      title: 'Royal Emerald & Gold', subtitle: 'أحمد و فريدة',
      venue: 'New Administrative Capital, Cairo', lang: 'العربية', langKey: 'ar',
      bg: 'linear-gradient(145deg,#0A3C30,#041D17)', img: 'assets/images/al-masa-capital.jpg', accent: '#F3DCAA',
      desc: 'Swinging emerald palace doors with knock reveal, floating gold dust and an Arabic tear-off calendar.',
      features: ['3-Tap Doors', 'Digital Card', 'Gold Dust', 'Calendar Card']
    },
    {
      num: '02', cat: 'weddings', file: 'samples/02-wax-seal-editorial.html',
      title: 'Ivory Wax-Seal Editorial', subtitle: 'Youssef & Zeina',
      venue: 'Marriott Mena House, Giza', lang: 'English', langKey: 'en', textDark: true,
      bg: 'linear-gradient(145deg,#EFE5D5,#D9C7AE)', img: 'assets/images/mena-house-giza.jpg', accent: '#6D1D2A',
      desc: 'Wax-seal envelope opening, gold-foil date reveal medallions and a framed venue map.',
      features: ['Wax Seal', 'Gold Foil Reveal', 'Framed Map', 'Editorial Card']
    },
    {
      num: '03', cat: 'weddings', file: 'samples/03-botanical-garden.html',
      title: 'Sage Botanical Watercolor', subtitle: 'Tarek & Yasmine',
      venue: 'Mohamed Ali Palace, Manial', lang: 'English', langKey: 'en', textDark: true,
      bg: 'linear-gradient(145deg,#E8EFE6,#D4DFD0)', img: 'assets/images/mohamed-ali-palace.jpg', accent: '#3C4D3B',
      desc: 'Watercolor eucalyptus and roses behind soft ribbon gates with drifting petals.',
      features: ['Ribbon Gates', 'Drifting Petals', 'Watercolor Art']
    },
    {
      num: '06', cat: 'weddings', file: 'samples/06-celestial-midnight.html',
      title: 'Celestial Midnight Velvet', subtitle: 'Sherif & Nadia',
      venue: 'Royal Maxim Kempinski, New Cairo', lang: 'English', langKey: 'en',
      bg: 'linear-gradient(145deg,#15224B,#060914)', img: 'assets/images/kempinski-palace.jpg', accent: '#E4C482',
      desc: 'Velvet curtains, glowing moon medallion and a twinkling starlight sky.',
      features: ['Velvet Curtains', 'Starry Sky', 'Digital Card']
    },
    {
      num: '07', cat: 'weddings', file: 'samples/07-bilingual-palace.html',
      title: 'Nile Palace', subtitle: 'Karim & Mariam | كريم و مريم',
      venue: 'Four Seasons Nile Plaza, Cairo', lang: 'Arabic & English', langKey: 'bilingual',
      bg: 'linear-gradient(145deg,#2D241C,#17120E)', img: 'assets/images/four-seasons-nile.jpg', accent: '#DFBE7F',
      desc: 'One-tap Arabic and English language switcher with gold-foil date medallions.',
      features: ['Arabic & English', 'Gold Foil Reveal', 'Golden Glow']
    },

    {
      num: '05', cat: 'katb', file: 'samples/05-arabesque-pearl.html',
      title: 'Arabesque Pearl Katb Ketab', subtitle: 'يوسف و نور',
      venue: 'مسجد الشرطة، الشيخ زايد', lang: 'العربية', langKey: 'ar', textDark: true,
      bg: 'linear-gradient(145deg,#FBF0EC,#EBD4CC)', img: 'assets/images/el-shorta-mosque.jpg', accent: '#8D5852',
      desc: 'Rose-gold lace doors, falling rose petals and Arabic gold-foil date reveal.',
      features: ['3-Tap Lace Doors', 'Arabic Foil Reveal', 'Rose Petals']
    },
    {
      num: '09', cat: 'katb', file: 'samples/09-minimal-andalus.html',
      title: 'Quiet-Luxury Minimalist', subtitle: 'مصطفى و حبيبة',
      venue: 'Dusit Thani, New Cairo', lang: 'العربية', langKey: 'ar', textDark: true,
      bg: 'linear-gradient(145deg,#F6F1E8,#E5DDD0)', img: 'assets/images/dusit-thani-cairo.jpg', accent: '#6F583D',
      desc: 'Warm linen stationery with a classic Arabic monogram and crisp page-turn sound.',
      features: ['Arch Frame', 'Arabic Monogram', 'Page-Turn Sound']
    },
    {
      num: '15', cat: 'katb', file: 'samples/15-nile-katb-ketab-arch.html',
      title: 'Royal Plum Mosque Arch', subtitle: 'عبدالرحمن و آية',
      venue: 'مسجد المشير طنطاوي، القاهرة الجديدة', lang: 'العربية', langKey: 'ar',
      bg: 'linear-gradient(145deg,#563266,#2C1736)', img: 'assets/images/moshir-tantawi-mosque.jpg', accent: '#F5E1B5',
      desc: 'Carved plum and gold gate, lavender petals, families card and tear-off calendar.',
      features: ['Carved Gate', 'Lavender Petals', 'Families Card']
    },

    {
      num: '12', cat: 'engagement', file: 'samples/12-velvet-ring-box.html',
      title: 'Velvet Engagement Ring Box', subtitle: 'أحمد و رنا',
      venue: 'Hilton Corniche, Alexandria', lang: 'العربية', langKey: 'ar',
      bg: 'linear-gradient(145deg,#1E4280,#09162D)', img: 'assets/images/alexandria-corniche.jpg', accent: '#F3D999',
      desc: 'A sapphire velvet ring box opens to reveal a sparkling ring with a soft chime.',
      features: ['Ring Box Reveal', 'Sparkle Chime', 'Alexandria']
    },
    {
      num: '13', cat: 'engagement', file: 'samples/13-henna-night-lanterns.html',
      title: 'Glowing Lanterns Henna Night', subtitle: 'ليلة حنة سارة',
      venue: 'Degla Maadi, Cairo', lang: 'العربية', langKey: 'ar',
      bg: 'linear-gradient(145deg,#6E1630,#24050E)', img: 'assets/images/al-azhar-park.jpg', accent: '#F6CB77',
      desc: 'Tap three brass lanterns to light them and open a festive ladies-only henna night.',
      features: ['Light 3 Lanterns', 'Warm Sparks', 'Ladies Henna']
    },

    {
      num: '04', cat: 'editorial', file: 'samples/04-vogue-magazine.html',
      title: 'The Wedding Issue', subtitle: 'Ziad & Dina',
      venue: 'The St. Regis Cairo', lang: 'English', langKey: 'en',
      bg: 'linear-gradient(145deg,#1E1E1E,#090909)', img: 'assets/images/st-regis-cairo.jpg', accent: '#E8D5B0',
      desc: 'Black-and-white magazine cover that flips open with a crisp page-turn sound.',
      features: ['Magazine Cover', 'Page-Turn Sound', 'Lookbook']
    },
    {
      num: '08', cat: 'editorial', file: 'samples/08-destination-boarding-pass.html',
      title: 'El Gouna Boarding Pass', subtitle: 'Aly & Hana',
      venue: 'The Chedi, El Gouna', lang: 'English', langKey: 'en',
      bg: 'linear-gradient(145deg,#144374,#0A233E)', img: 'assets/images/el-gouna-lagoon.jpg', accent: '#F4D87F',
      desc: 'Passport stamp opening and a first-class Cairo to El Gouna boarding pass.',
      features: ['Passport Stamp', 'Boarding Pass', '3-Day Itinerary']
    },
    {
      num: '10', cat: 'editorial', file: 'samples/10-golden-sunset-desert.html',
      title: 'Marassi Golden Sunset', subtitle: 'كريم و ملك',
      venue: 'Marassi, North Coast', lang: 'العربية', langKey: 'ar',
      bg: 'linear-gradient(145deg,#4B281B,#1A100D)', img: 'assets/images/desert-sunset-palace.jpg', accent: '#F7D7AD',
      desc: 'Golden-hour North Coast sunset reveal with rising warm lantern sparks.',
      features: ['Warm Sparks', 'Sunset Reveal', 'North Coast']
    },
    {
      num: '11', cat: 'editorial', file: 'samples/11-cairo-newspaper.html',
      title: 'The Cairo Chronicle', subtitle: 'Hassan & Laila',
      venue: 'Gezira Club, Zamalek', lang: 'English', langKey: 'en', textDark: true,
      bg: 'linear-gradient(145deg,#F3EDE0,#DDD2BD)', img: 'assets/images/sofitel-gezirah.jpg', accent: '#8B2626',
      desc: 'A folded vintage newspaper that opens into your wedding story and schedule.',
      features: ['Folded Newspaper', 'Page-Turn Sound', 'Story Columns']
    },
    {
      num: '14', cat: 'editorial', file: 'samples/14-polaroid-scrapbook.html',
      title: 'Polaroid Story Scrapbook', subtitle: 'Seif & Maya',
      venue: 'Baron Palace, Heliopolis', lang: 'English', langKey: 'en', textDark: true,
      bg: 'linear-gradient(145deg,#F5EFE6,#DFD3C3)', img: 'assets/images/baron-palace-cairo.jpg', accent: '#B86144',
      desc: 'Tap-to-flip Polaroid photo stack telling your story with handwritten notes.',
      features: ['Photo Deck', 'Handwritten Notes', 'Scrapbook']
    },
    {
      num: '16', cat: 'editorial', file: 'samples/16-vinyl-record-invite.html',
      title: 'Golden Vinyl Record', subtitle: 'Rami & Zeina',
      venue: 'Nile Ritz-Carlton, Downtown', lang: 'English', langKey: 'en',
      bg: 'linear-gradient(145deg,#27221B,#0D0C0A)', img: 'assets/images/nile-ritz-carlton.jpg', accent: '#E4BD73',
      desc: 'Drop the needle onto a spinning gold vinyl record to play music and open the setlist.',
      features: ['Spinning Vinyl', 'Evening Setlist', 'Song Request']
    },
    {
      num: '17', cat: 'editorial', file: 'samples/17-love-story-journey.html',
      title: 'Our Love Story Journey', subtitle: 'Khaled & Farida',
      venue: 'Four Seasons First Residence, Giza', lang: 'English', langKey: 'en', textDark: true,
      bg: 'linear-gradient(145deg,#F7EDE2,#E6D3C3)', img: 'assets/images/four-seasons-nile.jpg', accent: '#A96B5E',
      desc: 'A keepsake storybook with your 4-chapter love timeline, arched couple portrait and clickable photo gallery.',
      features: ['4-Chapter Story', 'Photo Gallery', 'Custom Photo Slot', 'Keepsake Book']
    },
    {
      num: '18', cat: 'cards', file: 'samples/18-classic-ivory-gold.html',
      title: 'Classic Ivory & Gold Crest', subtitle: 'طارق و نور',
      venue: 'Al Masa Hotel, New Capital', lang: 'العربية', langKey: 'ar', textDark: true,
      bg: 'linear-gradient(145deg,#FDFBF7,#F4EFE6)', img: 'assets/images/al-masa-capital.jpg', accent: '#C5A059',
      desc: 'Quiet luxury stationery card on warm ivory paper with embossed gold crest and instant RSVP. Zero motion, zero audio.',
      features: ['Silent Stationery', 'No Motion', 'Embossed Crest', 'WhatsApp RSVP']
    },
    {
      num: '19', cat: 'cards', file: 'samples/19-minimalist-noir.html',
      title: 'Minimalist Noir Monoline', subtitle: 'Karim & Laila',
      venue: 'The Nile Ritz-Carlton, Cairo', lang: 'English', langKey: 'en',
      bg: 'linear-gradient(145deg,#1E1E1E,#0F0F0F)', img: 'assets/images/st-regis-cairo.jpg', accent: '#9A7B4F',
      desc: 'Sleek dark-aesthetic typography card on textured natural parchment with monogram crest. Zero motion, zero audio.',
      features: ['Monoline Minimal', 'No Motion', 'Clean Typography', 'WhatsApp RSVP']
    },
    {
      num: '20', cat: 'cards', file: 'samples/20-sage-olive-botanical.html',
      title: 'Sage Olive Botanical Card', subtitle: 'Tarek & Yasmine',
      venue: 'Mohamed Ali Palace, Manial', lang: 'English', langKey: 'en', textDark: true,
      bg: 'linear-gradient(145deg,#E8EFE6,#CFDEC9)', img: 'assets/images/mohamed-ali-palace.jpg', accent: '#264D31',
      desc: 'Gentle olive wreath and Mohamed Ali Palace garden backdrop on cotton paper with live countdown and calendar save.',
      features: ['Mohamed Ali Palace', 'Botanical Frame', 'No Motion', 'Silent Luxury']
    },
    {
      num: '21', cat: 'cards', file: 'samples/21-andalus-katb-card.html',
      title: 'Andalusian Arabesque Katb Card', subtitle: 'أحمد و نور',
      venue: 'Mosque Field Marshal Tantawi, Cairo', lang: 'العربية', langKey: 'ar', textDark: false,
      bg: 'linear-gradient(145deg,#0C3B2D,#051E16)', img: 'assets/images/moshir-tantawi-mosque.jpg', accent: '#F5DC9E',
      desc: 'Traditional Islamic calligraphy with El-Moshir Tantawi Mosque backdrop and arabesque motifs for blessed ceremonies.',
      features: ['El-Moshir Mosque', 'Amiri Calligraphy', 'No Motion', 'Katb Ketab']
    },
    {
      num: '22', cat: 'cards', file: 'samples/22-dusty-rose-pearl.html',
      title: 'Dusty Rose & Pearl Floral Card', subtitle: 'Kareem & Hania',
      venue: 'Kempinski Nile Hotel, Garden City', lang: 'English', langKey: 'en', textDark: true,
      bg: 'linear-gradient(145deg,#FDF2F0,#EACBC4)', img: 'assets/images/kempinski-palace.jpg', accent: '#843C47',
      desc: 'Delicate blush and dusty rose romantic stationery card with clean schedule, directions, and WhatsApp confirmation.',
      features: ['Blush & Rose', 'No Motion', 'Romantic Stationery', 'WhatsApp RSVP']
    },
    {
      num: '23', cat: 'cards', file: 'samples/23-midnight-gold-celestial.html',
      title: 'Midnight Gold Celestial Card', subtitle: 'Sherif & Nadia',
      venue: 'The Nile Ritz-Carlton, Cairo', lang: 'English', langKey: 'en', textDark: false,
      bg: 'linear-gradient(145deg,#0E162B,#050914)', img: 'assets/images/nile-ritz-carlton.jpg', accent: '#F3D27F',
      desc: 'Constellation starlight crest on deep midnight velvet paper with metallic gold typography and instant response.',
      features: ['Celestial Stars', 'No Motion', 'Deep Midnight Paper', 'Silent Luxury']
    },
    {
      num: '24', cat: 'weddings', file: 'samples/24-liquid-chromium-pearl.html',
      title: 'Liquid Chromium & Pearl', subtitle: 'Sherif & Amina',
      venue: 'Four Seasons Nile Plaza, Cairo', lang: 'English', langKey: 'en', textDark: true,
      bg: 'linear-gradient(145deg,#F1F5F9,#CBD5E1)', img: 'assets/images/four-seasons-nile.jpg', accent: '#0F172A',
      desc: 'Interactive molten platinum seal reveal, liquid chromium specular reflections, and alabaster pearl card.',
      features: ['Liquid Chrome Seal', 'Molten Motion', 'Specular Sheen', 'VIP QR Pass']
    },
    {
      num: '25', cat: 'cards', file: 'samples/25-molten-chrome-card.html',
      title: 'Molten Chrome Minimalist Card', subtitle: 'Ziad & Malak',
      venue: 'The Nile Ritz-Carlton, Cairo', lang: 'English', langKey: 'en', textDark: true,
      bg: 'linear-gradient(145deg,#F8FAFC,#DDE5ED)', img: 'assets/images/abdeen-palace.jpg', accent: '#1E293B',
      desc: 'Silent luxury stationery on heavy pearl stock with beveled liquid chromium borders and embossed platinum monogram.',
      features: ['Liquid Chrome Border', 'No Motion', 'Embossed Monogram', 'Silent Luxury']
    },
    {
      num: '26', cat: 'cards', file: 'samples/26-bifold-folding-card.html',
      title: 'Bi-Fold Luxury Folding Card', subtitle: 'Hassan & Mariam',
      venue: 'Sofitel Cairo Nile El Gezirah', lang: 'English', langKey: 'en', textDark: true,
      bg: 'linear-gradient(145deg,#FAF5EE,#DDD1BD)', img: 'assets/images/sofitel-gezirah.jpg', accent: '#8C6721',
      desc: 'Tactile 3D bi-fold card that smoothly unfolds on tap to reveal event details, live countdown, and RSVP pass. Strictly silent with 0 sound.',
      features: ['3D Bi-Fold Open', 'Unfolds on Tap', 'Zero Sound', 'VIP QR Pass']
    },
    {
      num: '27', cat: 'cards', file: 'samples/27-pocket-sleeve-card.html',
      title: 'Pocket Sleeve Slide-Out Card', subtitle: 'Mostafa & Nadine',
      venue: 'Marriott Mena House, Giza', lang: 'English', langKey: 'en', textDark: true,
      bg: 'linear-gradient(145deg,#F3EDE1,#DAC9AF)', img: 'assets/images/mena-house-giza.jpg', accent: '#7D5518',
      desc: 'Alabaster die-cut pocket sleeve with pull ribbon tab. The gilded invitation card smoothly slides out into full view. Strictly silent with 0 sound.',
      features: ['Slide-Out Motion', 'Pull Tab Reveal', 'Zero Sound', 'Calendar & RSVP']
    },
    {
      num: '28', cat: 'cards', file: 'samples/28-gatefold-ribbon-card.html',
      title: 'French Gatefold Double-Flap Card', subtitle: 'ياسين و جومانا',
      venue: 'The Nile Ritz-Carlton, Cairo', lang: 'العربية', langKey: 'ar', textDark: false,
      bg: 'linear-gradient(145deg,#13372B,#0A2019)', img: 'assets/images/citadel-mosque.jpg', accent: '#E6C682',
      desc: 'Two symmetrical French gatefold panels with royal monogram ribbon seal. Tap to swing flaps open in 3D to reveal inner gold card. Zero sound.',
      features: ['Gatefold Double-Flap', '3D Perspective Swing', 'Zero Sound', 'Bilingual RSVP']
    },
    {
      num: '29', cat: 'cards', file: 'samples/29-envelope-slide-card.html',
      title: 'Translucent Vellum Envelope Slide Card', subtitle: 'Adam & Kenzy',
      venue: 'Kempinski Nile Hotel, Garden City', lang: 'English', langKey: 'en', textDark: true,
      bg: 'linear-gradient(145deg,#FAF6F0,#DFD3C0)', img: 'assets/images/kempinski-palace.jpg', accent: '#9A6B22',
      desc: 'Pearlescent vellum stationery envelope with a wax seal flap. On tap, the flap lifts open and the inner card slides out gracefully. Zero sound.',
      features: ['Envelope Flap Open', 'Smooth Slide Reveal', 'Zero Sound', 'Digital Pass']
    },
    {
      num: '30', cat: 'weddings', file: 'samples/30-abdeen-palace-royal.html',
      title: 'Abdeen Palace Crimson Velvet', subtitle: 'هشام و لينا',
      venue: 'Abdeen Palace, Downtown Cairo', lang: 'العربية', langKey: 'ar', textDark: false,
      bg: 'linear-gradient(145deg,#2D0B14,#140409)', img: 'assets/images/abdeen-palace.jpg', accent: '#E2BE78',
      desc: 'Royal crimson velvet palace invitation with antique gold foil seal, Abdeen Palace photography and Umm Kulthum melody.',
      features: ['Abdeen Palace', 'Crimson Velvet', 'Umm Kulthum Music', 'WhatsApp RSVP']
    },
    {
      num: '31', cat: 'katb', file: 'samples/31-citadel-mosque-katb.html',
      title: 'Citadel Alabaster Katb Ketab', subtitle: 'مازن و هاجر',
      venue: 'Muhammad Ali Mosque, Cairo Citadel', lang: 'العربية', langKey: 'ar', textDark: false,
      bg: 'linear-gradient(145deg,#0D3B2E,#062119)', img: 'assets/images/citadel-mosque.jpg', accent: '#F3DCAA',
      desc: 'Ottoman alabaster & emerald Katb Ketab invitation showcasing Muhammad Ali Mosque at the Citadel with Farha melody.',
      features: ['Cairo Citadel', 'Ottoman Alabaster', 'Farha Melody', 'Katb Ketab']
    },
    {
      num: '32', cat: 'editorial', file: 'samples/32-aswan-cataract-sunset.html',
      title: 'Old Cataract Aswan Sunset', subtitle: 'Adham & Farah',
      venue: 'Sofitel Legend Old Cataract, Aswan', lang: 'English', langKey: 'en', textDark: false,
      bg: 'linear-gradient(145deg,#4B2216,#26100A)', img: 'assets/images/old-cataract-aswan.jpg', accent: '#E8B88A',
      desc: 'Warm terracotta & Nubian gold destination wedding invitation set on the golden Nile banks of Aswan.',
      features: ['Old Cataract Aswan', 'Terracotta & Gold', 'Destination Theme', 'Live Countdown']
    },
    {
      num: '33', cat: 'engagement', file: 'samples/33-san-stefano-alexandria.html',
      title: 'San Stefano Sapphire Engagement', subtitle: 'باسل و مريم',
      venue: 'Four Seasons San Stefano, Alexandria', lang: 'العربية', langKey: 'ar', textDark: false,
      bg: 'linear-gradient(145deg,#0C2544,#051122)', img: 'assets/images/alexandria-san-stefano.jpg', accent: '#D8B979',
      desc: 'Mediterranean sapphire blue & champagne gold engagement invitation overlooking the sea at San Stefano, Alexandria.',
      features: ['Alexandria Seafront', 'Sapphire & Gold', 'Egyptian Zaffa', 'WhatsApp RSVP']
    }
  ],

  PACKAGES: [
    {
      id: 'essential',
      name: 'Essential',
      ar: 'الباقة الأساسية',
      price: 950,
      delivery: '24 – 48 hours',
      bestFor: 'Katb Ketab, Engagement & Henna',
      blurb: 'Any ready-made design from our collection personalised with your full event details.',
      items: [
        'Any of our 33 interactive designs & stationery cards',
        'Couple names, date, schedule & venue map',
        'Live countdown timer & Add-to-Calendar',
        'Opening animation, sound effects & music',
        'WhatsApp RSVP & digital entry pass',
        '2 rounds of edits included',
        'Free date or time update before the event'
      ]
    },
    {
      id: 'signature',
      name: 'Signature',
      ar: 'الباقة المميزة',
      price: 1850,
      delivery: '2 – 3 days',
      bestFor: 'Weddings & Reception Nights',
      featured: true,
      blurb: 'Tailored colours, your favourite wedding song and personalised VIP guest links.',
      items: [
        'Everything in the Essential package',
        'Colours & typography matched to your wedding',
        'Your own wedding song (with mute button)',
        'Personalised guest links (guest name on cover)',
        'Individual QR entry pass per confirmed guest',
        'Up to 4 rounds of edits included',
        'Private preview link before final payment'
      ]
    },
    {
      id: 'royal',
      name: 'Royal Bespoke',
      ar: 'الباقة الملكية الخاصة',
      price: 3500,
      delivery: '4 – 5 days',
      bestFor: 'Luxury & Destination Weddings',
      blurb: 'A custom invitation designed from scratch around your story, venue and theme.',
      items: [
        'Everything in the Signature package',
        'Bespoke design concept & custom artwork',
        'Bilingual Arabic & English live switcher',
        'Photo gallery, love story & dress code guide',
        'Guestbook / wishes section for family & friends',
        'Unlimited edits until your wedding day',
        'Dedicated WhatsApp support & priority delivery'
      ]
    }
  ],

  ADDONS: [
    { id: 'bilingual', label: 'Extra language version (Arabic & English)', price: 450 },
    { id: 'gallery', label: 'Photo gallery & couple story section', price: 500 },
    { id: 'wishes', label: 'Wishes & guestbook section', price: 600 },
    { id: 'rush', label: 'Express delivery within 24 hours', price: 500 },
    { id: 'social', label: 'Matching Save-the-Date Instagram story card', price: 300 }
  ]
};
