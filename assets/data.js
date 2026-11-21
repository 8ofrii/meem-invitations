/* Single source of truth for MEEM (ميم): categories, samples, brand info, packages & add-ons */
window.SITE = {
  WHATSAPP: '201024190741',

  BRAND: {
    name: 'MEEM',
    ar: 'ميم',
    full: 'MEEM • ميم',
    sub: 'Digital Invitations',
    tagline: 'Two names, one letter, one unforgettable invitation.',
    logo: 'assets/logos/meem-mark.svg?v=2',
    icon: 'assets/logos/meem-mark.svg?v=2',
    handle: '@meem.invitations'
  },

  CATEGORIES: [
    { id: 'weddings', title: 'Luxury Weddings & Palaces', ar: 'الأفراح والقصور', blurb: 'Grand ballrooms, palaces and 5-star Nile venues.' },
    { id: 'katb', title: 'Katb Ketab & Islamic Elegance', ar: 'عقد القران وكتب الكتاب', blurb: 'Calm, respectful designs for mosque ceremonies.' },
    { id: 'engagement', title: 'Engagement & Henna Nights', ar: 'الخطوبة وليلة الحنة', blurb: 'Ring boxes, lanterns and ladies-only celebrations.' },
    { id: 'editorial', title: 'Coastal, Destination & Modern', ar: 'الساحل والتصاميم العصرية', blurb: 'Sahel, El Gouna and magazine-style concepts.' },
    { id: 'cards', title: 'Classic Cards (No Motion)', ar: 'كروت كلاسيكية هادئة (بدون حركة أو صوت)', blurb: 'Instant, silent luxury stationery cards without motion or sound.' }
  ],

  SAMPLES: [
    {
      num: '01', cat: 'weddings', file: 'samples/01-royal-emerald-gold.html',
      title: 'Royal Emerald & Gold', subtitle: 'محمود و ميرنا',
      venue: 'New Administrative Capital, Cairo', lang: 'العربية', langKey: 'ar',
      bg: 'linear-gradient(145deg,#0A3C30,#041D17)', accent: '#F3DCAA',
      desc: 'Swinging emerald palace doors with knock reveal, floating gold dust and an Arabic tear-off calendar.',
      features: ['3-Tap Doors', 'Digital Card', 'Gold Dust', 'Calendar Card']
    },
    {
      num: '02', cat: 'weddings', file: 'samples/02-wax-seal-editorial.html',
      title: 'Ivory Wax-Seal Editorial', subtitle: 'Mahmoud & Merna',
      venue: 'Marriott Mena House, Giza', lang: 'English', langKey: 'en', textDark: true,
      bg: 'linear-gradient(145deg,#EFE5D5,#D9C7AE)', accent: '#6D1D2A',
      desc: 'Wax-seal envelope opening, gold-foil date reveal medallions and a framed venue map.',
      features: ['Wax Seal', 'Gold Foil Reveal', 'Framed Map', 'Editorial Card']
    },
    {
      num: '03', cat: 'weddings', file: 'samples/03-botanical-garden.html',
      title: 'Sage Botanical Watercolor', subtitle: 'Tarek & Yasmine',
      venue: 'Mohamed Ali Palace, Manial', lang: 'English', langKey: 'en', textDark: true,
      bg: 'linear-gradient(145deg,#E8EFE6,#D4DFD0)', img: 'assets/images/botanical-watercolor.jpg', accent: '#3C4D3B',
      desc: 'Watercolor eucalyptus and roses behind soft ribbon gates with drifting petals.',
      features: ['Ribbon Gates', 'Drifting Petals', 'Watercolor Art']
    },
    {
      num: '06', cat: 'weddings', file: 'samples/06-celestial-midnight.html',
      title: 'Celestial Midnight Velvet', subtitle: 'Sherif & Nadia',
      venue: 'Royal Maxim Kempinski, New Cairo', lang: 'English', langKey: 'en',
      bg: 'linear-gradient(145deg,#15224B,#060914)', accent: '#E4C482',
      desc: 'Velvet curtains, glowing moon medallion and a twinkling starlight sky.',
      features: ['Velvet Curtains', 'Starry Sky', 'Digital Card']
    },
    {
      num: '07', cat: 'weddings', file: 'samples/07-bilingual-palace.html',
      title: 'Nile Palace', subtitle: 'Karim & Mariam | كريم و مريم',
      venue: 'Four Seasons Nile Plaza, Cairo', lang: 'Arabic & English', langKey: 'bilingual',
      bg: 'linear-gradient(145deg,#2D241C,#17120E)', accent: '#DFBE7F',
      desc: 'One-tap Arabic and English language switcher with gold-foil date medallions.',
      features: ['Arabic & English', 'Gold Foil Reveal', 'Golden Glow']
    },

    {
      num: '05', cat: 'katb', file: 'samples/05-arabesque-pearl.html',
      title: 'Arabesque Pearl Katb Ketab', subtitle: 'يوسف و نور',
      venue: 'مسجد الشرطة، الشيخ زايد', lang: 'العربية', langKey: 'ar', textDark: true,
      bg: 'linear-gradient(145deg,#FBF0EC,#EBD4CC)', accent: '#8D5852',
      desc: 'Rose-gold lace doors, falling rose petals and Arabic gold-foil date reveal.',
      features: ['3-Tap Lace Doors', 'Arabic Foil Reveal', 'Rose Petals']
    },
    {
      num: '09', cat: 'katb', file: 'samples/09-minimal-andalus.html',
      title: 'Quiet-Luxury Minimalist', subtitle: 'مصطفى و حبيبة',
      venue: 'Dusit Thani, New Cairo', lang: 'العربية', langKey: 'ar', textDark: true,
      bg: 'linear-gradient(145deg,#F6F1E8,#E5DDD0)', accent: '#6F583D',
      desc: 'Warm linen stationery with a classic Arabic monogram and crisp page-turn sound.',
      features: ['Arch Frame', 'Arabic Monogram', 'Page-Turn Sound']
    },
    {
      num: '15', cat: 'katb', file: 'samples/15-nile-katb-ketab-arch.html',
      title: 'Royal Plum Mosque Arch', subtitle: 'عبدالرحمن و آية',
      venue: 'مسجد المشير طنطاوي، القاهرة الجديدة', lang: 'العربية', langKey: 'ar',
      bg: 'linear-gradient(145deg,#563266,#2C1736)', accent: '#F5E1B5',
      desc: 'Carved plum and gold gate, lavender petals, families card and tear-off calendar.',
      features: ['Carved Gate', 'Lavender Petals', 'Families Card']
    },

    {
      num: '12', cat: 'engagement', file: 'samples/12-velvet-ring-box.html',
      title: 'Velvet Engagement Ring Box', subtitle: 'أحمد و رنا',
      venue: 'Hilton Corniche, Alexandria', lang: 'العربية', langKey: 'ar',
      bg: 'linear-gradient(145deg,#1E4280,#09162D)', accent: '#F3D999',
      desc: 'A sapphire velvet ring box opens to reveal a sparkling ring with a soft chime.',
      features: ['Ring Box Reveal', 'Sparkle Chime', 'Alexandria']
    },
    {
      num: '13', cat: 'engagement', file: 'samples/13-henna-night-lanterns.html',
      title: 'Glowing Lanterns Henna Night', subtitle: 'ليلة حنة سارة',
      venue: 'Degla Maadi, Cairo', lang: 'العربية', langKey: 'ar',
      bg: 'linear-gradient(145deg,#6E1630,#24050E)', accent: '#F6CB77',
      desc: 'Tap three brass lanterns to light them and open a festive ladies-only henna night.',
      features: ['Light 3 Lanterns', 'Warm Sparks', 'Ladies Henna']
    },

    {
      num: '04', cat: 'editorial', file: 'samples/04-vogue-magazine.html',
      title: 'The Wedding Issue', subtitle: 'Ziad & Dina',
      venue: 'The St. Regis Cairo', lang: 'English', langKey: 'en',
      bg: 'linear-gradient(145deg,#1E1E1E,#090909)', img: 'assets/images/editorial-couple.jpg', accent: '#E8D5B0',
      desc: 'Black-and-white magazine cover that flips open with a crisp page-turn sound.',
      features: ['Magazine Cover', 'Page-Turn Sound', 'Lookbook']
    },
    {
      num: '08', cat: 'editorial', file: 'samples/08-destination-boarding-pass.html',
      title: 'El Gouna Boarding Pass', subtitle: 'Aly & Hana',
      venue: 'The Chedi, El Gouna', lang: 'English', langKey: 'en',
      bg: 'linear-gradient(145deg,#144374,#0A233E)', img: 'assets/images/amalfi-coast.jpg', accent: '#F4D87F',
      desc: 'Passport stamp opening and a first-class Cairo to El Gouna boarding pass.',
      features: ['Passport Stamp', 'Boarding Pass', '3-Day Itinerary']
    },
    {
      num: '10', cat: 'editorial', file: 'samples/10-golden-sunset-desert.html',
      title: 'Marassi Golden Sunset', subtitle: 'محمود و ملك',
      venue: 'Marassi, North Coast', lang: 'العربية', langKey: 'ar',
      bg: 'linear-gradient(145deg,#4B281B,#1A100D)', img: 'assets/images/desert-sunset-palace.jpg', accent: '#F7D7AD',
      desc: 'Golden-hour North Coast sunset reveal with rising warm lantern sparks.',
      features: ['Warm Sparks', 'Sunset Reveal', 'North Coast']
    },
    {
      num: '11', cat: 'editorial', file: 'samples/11-cairo-newspaper.html',
      title: 'The Cairo Chronicle', subtitle: 'Hassan & Laila',
      venue: 'Gezira Club, Zamalek', lang: 'English', langKey: 'en', textDark: true,
      bg: 'linear-gradient(145deg,#F3EDE0,#DDD2BD)', accent: '#8B2626',
      desc: 'A folded vintage newspaper that opens into your wedding story and schedule.',
      features: ['Folded Newspaper', 'Page-Turn Sound', 'Story Columns']
    },
    {
      num: '14', cat: 'editorial', file: 'samples/14-polaroid-scrapbook.html',
      title: 'Polaroid Story Scrapbook', subtitle: 'Seif & Maya',
      venue: 'Baron Palace, Heliopolis', lang: 'English', langKey: 'en', textDark: true,
      bg: 'linear-gradient(145deg,#F5EFE6,#DFD3C3)', img: 'assets/images/polaroid-couple.jpg', accent: '#B86144',
      desc: 'Tap-to-flip Polaroid photo stack telling your story with handwritten notes.',
      features: ['Photo Deck', 'Handwritten Notes', 'Scrapbook']
    },
    {
      num: '16', cat: 'editorial', file: 'samples/16-vinyl-record-invite.html',
      title: 'Golden Vinyl Record', subtitle: 'Rami & Zeina',
      venue: 'Nile Ritz-Carlton, Downtown', lang: 'English', langKey: 'en',
      bg: 'linear-gradient(145deg,#27221B,#0D0C0A)', accent: '#E4BD73',
      desc: 'Drop the needle onto a spinning gold vinyl record to play music and open the setlist.',
      features: ['Spinning Vinyl', 'Evening Setlist', 'Song Request']
    },
    {
      num: '17', cat: 'editorial', file: 'samples/17-love-story-journey.html',
      title: 'Our Love Story Journey', subtitle: 'Khaled & Farida',
      venue: 'Four Seasons First Residence, Giza', lang: 'English', langKey: 'en', textDark: true,
      bg: 'linear-gradient(145deg,#F7EDE2,#E6D3C3)', img: 'assets/images/love-story-couple.jpg', accent: '#A96B5E',
      desc: 'A keepsake storybook with your 4-chapter love timeline, arched couple portrait and clickable photo gallery.',
      features: ['4-Chapter Story', 'Photo Gallery', 'Custom Photo Slot', 'Keepsake Book']
    },
    {
      num: '18', cat: 'cards', file: 'samples/18-classic-ivory-gold.html',
      title: 'Classic Ivory & Gold Crest', subtitle: 'محمود و ميرنا',
      venue: 'Al Masa Hotel, New Capital', lang: 'العربية', langKey: 'ar', textDark: true,
      bg: 'linear-gradient(145deg,#FDFBF7,#F4EFE6)', accent: '#C5A059',
      desc: 'Quiet luxury stationery card on warm ivory paper with embossed gold crest and instant RSVP. Zero motion, zero audio.',
      features: ['Silent Stationery', 'No Motion', 'Embossed Crest', 'WhatsApp RSVP']
    },
    {
      num: '19', cat: 'cards', file: 'samples/19-minimalist-noir.html',
      title: 'Minimalist Noir Monoline', subtitle: 'Omar & Salma',
      venue: 'The Nile Ritz-Carlton, Cairo', lang: 'English', langKey: 'en',
      bg: 'linear-gradient(145deg,#1E1E1E,#0F0F0F)', accent: '#9A7B4F',
      desc: 'Sleek dark-aesthetic typography card on textured natural parchment with monogram crest. Zero motion, zero audio.',
      features: ['Monoline Minimal', 'No Motion', 'Clean Typography', 'WhatsApp RSVP']
    },
    {
      num: '20', cat: 'cards', file: 'samples/20-sage-olive-botanical.html',
      title: 'Sage Olive Botanical Card', subtitle: 'Tarek & Yasmine',
      venue: 'Mohamed Ali Palace, Manial', lang: 'English', langKey: 'en', textDark: true,
      bg: 'linear-gradient(145deg,#F2F6F1,#E2EBE0)', accent: '#5A7360',
      desc: 'Gentle olive wreath and garden greenery border on cotton paper with live countdown and calendar save.',
      features: ['Botanical Frame', 'No Motion', 'Olive Wreath', 'Silent Luxury']
    },
    {
      num: '21', cat: 'cards', file: 'samples/21-andalus-katb-card.html',
      title: 'Andalusian Arabesque Katb Card', subtitle: 'أحمد و نور',
      venue: 'Mosque Field Marshal Tantawi, Cairo', lang: 'العربية', langKey: 'ar', textDark: true,
      bg: 'linear-gradient(145deg,#FBF8F2,#EFE7D8)', accent: '#143D30',
      desc: 'Traditional Islamic calligraphy and arabesque corner motifs on cream card stock for blessed mosque ceremonies.',
      features: ['Arabesque Corners', 'Amiri Calligraphy', 'No Motion', 'Katb Ketab']
    },
    {
      num: '22', cat: 'cards', file: 'samples/22-dusty-rose-pearl.html',
      title: 'Dusty Rose & Pearl Floral Card', subtitle: 'Kareem & Salma',
      venue: 'Kempinski Nile Hotel, Garden City', lang: 'English', langKey: 'en', textDark: true,
      bg: 'linear-gradient(145deg,#FDF8F6,#F5E8E4)', accent: '#A36B6D',
      desc: 'Delicate blush and dusty rose romantic stationery card with clean schedule, directions, and WhatsApp confirmation.',
      features: ['Blush & Rose', 'No Motion', 'Romantic Stationery', 'WhatsApp RSVP']
    },
    {
      num: '23', cat: 'cards', file: 'samples/23-midnight-gold-celestial.html',
      title: 'Midnight Gold Celestial Card', subtitle: 'Sherif & Nadia',
      venue: 'The Nile Ritz-Carlton, Cairo', lang: 'English', langKey: 'en',
      bg: 'linear-gradient(145deg,#131B33,#070B16)', accent: '#E5C378',
      desc: 'Constellation starlight crest on deep midnight velvet paper with metallic gold typography and instant response.',
      features: ['Celestial Stars', 'No Motion', 'Deep Midnight Paper', 'Silent Luxury']
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
        'Any of our 23 interactive designs & classic cards',
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
