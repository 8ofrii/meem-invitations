/* Shared shell: nav, footer, sample cards, phone preview, clean URLs & scroll-spy */
(function () {
  const S = window.SITE, B = S.BRAND;

  // Strip .html from the browser address bar cleanly (e.g. /index.html -> /, /pricing.html -> /pricing)
  try {
    const p = location.pathname;
    if (p === '/index.html' || p.endsWith('/index.html')) {
      const clean = p.slice(0, -10) || '/';
      history.replaceState(null, '', clean + location.search + location.hash);
    } else if (p.endsWith('.html') && !p.includes('/samples/')) {
      history.replaceState(null, '', p.slice(0, -5) + location.search + location.hash);
    }
  } catch (_) {}

  const savedTheme = (typeof localStorage !== 'undefined' && localStorage.getItem('meem_site_theme'));
  const effectiveTheme = (savedTheme === 'rose-pearl' || savedTheme === 'ivory-editorial') ? savedTheme : 'ivory-editorial';
  document.documentElement.dataset.theme = effectiveTheme;
  if (typeof localStorage !== 'undefined') localStorage.setItem('meem_site_theme', effectiveTheme);

  const wa = (msg) => `https://wa.me/${S.WHATSAPP}?text=${encodeURIComponent(msg)}`;

  function buildUrl(file, extra, clean) {
    extra = extra || {};
    const q = new URLSearchParams();
    ['groom', 'bride', 'couple', 'venue', 'date', 'guest', 'table', 'theme', 'photo', 'lang', 'song'].forEach((k) => extra[k] && q.set(k, extra[k]));
    if (clean) q.set('clean', '1');
    const s = q.toString();
    return s ? `${file}?${s}` : file;
  }

  function cardMarkup(s) {
    const hasImg = !!s.img;
    const tc = hasImg ? '#FFFFFF' : (s.textDark ? '#1D1B18' : '#FAF6EE');
    const sc = hasImg ? '#F4E5C2' : (s.textDark ? 'rgba(29,27,24,.72)' : 'rgba(255,255,255,.78)');
    const ac = hasImg ? '#FFFFFF' : s.accent;
    const mb = s.moodboard || null;
    const colTag = mb && mb.collection ? `<span class="badge">${mb.collection}</span>` : '';
    const dots = mb && mb.palette ? `<div class="card-swatches" aria-label="Color palette">${mb.palette.map(c => `<span style="background:${c}"></span>`).join('')}</div>` : '';
    const moodLine = mb && mb.mood ? `<div class="card-mood">${mb.mood}${mb.paletteNames ? ' · ' + mb.paletteNames.split(' · ').slice(0, 2).join(' &amp; ') : ''}</div>` : '';
    return `<article class="sample-card">
      <div class="card-thumb ${hasImg ? 'has-art' : ''}" style="background:${s.bg};color:${tc}">
        ${hasImg ? `<img class="bg-art" src="${s.img}" alt="${s.title}" loading="lazy" decoding="async">` : ''}
        <div class="badge-row"><span class="badge plain">#${s.num}</span>${colTag}</div>
        <div class="thumb-inner">
          <div class="serif" style="font-size:26px;line-height:1.15;color:${ac};text-shadow:${hasImg ? '0 2px 10px rgba(0,0,0,0.65)' : 'none'}">${s.title}</div>
          <div class="arabic" style="font-size:16px;color:${sc};margin-top:6px;text-shadow:${hasImg ? '0 1px 6px rgba(0,0,0,0.65)' : 'none'}">${s.subtitle}</div>
        </div>
      </div>
      <div class="card-body">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:3px;">
          <h3 class="card-title" style="margin:0">${s.title}</h3>
          ${dots}
        </div>
        ${moodLine}
        <div class="card-venue"><svg class="ic-svg ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> ${s.venue}</div>
        <p class="card-desc">${s.desc}</p>
        <div class="chips">${s.features.map((f) => `<span class="chip">${f}</span>`).join('')}</div>
        <div class="card-actions">
          <button type="button" class="btn btn-gold" onclick="Shell.preview('${s.num}')">Experience this invitation →</button>
          <button type="button" class="btn btn-ghost" onclick="Shell.tryDesign('${s.num}')">Customise</button>
        </div>
      </div>
    </article>`;
  }

  function injectShell(active) {
    if (!document.querySelector('.liquid-ambient')) {
      const amb = document.createElement('div');
      amb.className = 'liquid-ambient';
      amb.setAttribute('aria-hidden', 'true');
      amb.innerHTML = '<div class="liquid-orb o1"></div><div class="liquid-orb o2"></div><div class="liquid-orb o3"></div>';
      document.body.prepend(amb);
    }

    const isHome = active === 'index.html' || active === 'home';
    const prefix = isHome ? '' : '/';
    const NAV = [
      ['home', isHome ? '#home' : '/', 'Home'],
      ['designs', `${prefix}#designs`, 'Collections'],
      ['try-it-live', `${prefix}#try-it-live`, 'Try it live'],
      ['journey', `${prefix}#journey`, 'Experience'],
      ['faq', `${prefix}#faq`, 'FAQ']
    ];

    const logoSrc = (B && B.logo) ? B.logo : 'assets/logos/meem-logo-320.png';

    const header = document.createElement('header');
    header.className = 'topbar';
    header.innerHTML = `<div class="topbar-inner">
      <a class="brand" href="${isHome ? '#home' : '/'}">
        <img class="brand-logo-img" src="${logoSrc}" width="44" height="44" alt="MEEM ميم">
        <div><div class="brand-name">${B.name} <span class="brand-ar">${B.ar}</span></div><div class="brand-sub">${B.sub}</div></div>
      </a>
      <button class="menu-btn" id="menuBtn" aria-label="Menu">☰</button>
      <nav class="nav-links" id="navLinks">
        ${NAV.map(([id, h, t]) => {
          const isActive = (isHome && id === 'home') ||
            (active === 'collection.html' && id === 'designs') ||
            (active === 'personalise.html' && id === 'try-it-live');
          return `<a class="link${isActive ? ' active' : ''}" data-section="${id}" href="${h}">${t}</a>`;
        }).join('')}
        <a class="btn btn-gold btn-pill" href="${wa('Hello MEEM! I would like to order a digital invitation.')}" target="_blank" rel="noopener">WhatsApp</a>
      </nav></div>`;
    document.body.prepend(header);

    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `<div class="container"><div class="foot-grid" style="grid-template-columns:1.6fr 1fr 1fr">
      <div>
        <div class="brand" style="margin-bottom:12px">
          <img class="brand-logo-img" src="${logoSrc}" width="44" height="44" alt="MEEM ميم">
          <div><div class="brand-name">${B.name} <span class="brand-ar">${B.ar}</span></div><div class="brand-sub">${B.sub}</div></div>
        </div>
        <p class="muted" style="font-size:13px;max-width:300px">${B.tagline}</p>
      </div>
      <div><h4>Explore</h4><a href="${prefix}#designs">Designs</a><a href="${prefix}#try-it-live">Try it live</a></div>
      <div><h4>Contact</h4><a href="${wa('Hello!')}" target="_blank" rel="noopener">WhatsApp: 01024190741</a><a href="#">Instagram ${B.handle}</a><a href="#">TikTok</a></div>
    </div><div class="foot-bottom"><span>© ${new Date().getFullYear()} ${B.name} — Online Worldwide</span><span>Digital Wedding &amp; Celebration Invitations</span></div></div>`;
    document.body.appendChild(footer);

    const modal = document.createElement('div');
    modal.id = 'preview-modal';
    modal.innerHTML = `
      <button type="button" class="close-modal" id="closeModalBtn" aria-label="Close preview">✕ Close</button>
      <div class="modal-layout">
        <div class="phone-frame"><iframe id="previewFrame" title="Live preview"></iframe></div>
        <div class="modal-side">
          <div id="modalCollection" class="pill-tag" style="align-self:flex-start;margin:0;background:rgba(197,160,89,0.22);color:#F4E5C2;border-color:rgba(197,160,89,0.5);"></div>
          <h3 id="modalTitle" class="serif gold" style="font-size:28px;line-height:1.15"></h3>
          <p id="modalDesc" style="font-size:13px;color:rgba(255,255,255,0.86);line-height:1.55"></p>
          <div class="moodboard-card" id="modalMoodboard">
            <div class="mb-head">Design Story &amp; Wedding Moodboard</div>
            <p class="mb-insp" id="mbInsp"></p>
            <div class="mb-row"><span>Mood</span><strong id="mbMood"></strong></div>
            <div class="mb-row"><span>Color Palette</span><div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px"><div class="mb-swatches" id="mbSwatches"></div><small id="mbPalNames" style="font-size:10px;color:#6E7872;text-align:right"></small></div></div>
            <div class="mb-row"><span>Typography</span><strong id="mbTypo"></strong></div>
            <div class="mb-row"><span>Floral &amp; Details</span><strong id="mbFloral"></strong></div>
            <div class="mb-row"><span>Soundtrack</span><strong id="mbSound"></strong></div>
            <div class="mb-row"><span>Customisation</span><strong id="mbCustom"></strong></div>
          </div>
          <a id="modalFull" class="btn btn-ghost" target="_blank">Open full screen ↗</a>
          <a id="modalWa" class="btn btn-gold" target="_blank" rel="noopener">Order this design</a>
        </div>
      </div>`;
    document.body.appendChild(modal);
    const close = () => { modal.classList.remove('is-open'); document.getElementById('previewFrame').src = 'about:blank'; };
    modal.addEventListener('click', (e) => e.target === modal && close());
    document.getElementById('closeModalBtn').addEventListener('click', close);
    document.addEventListener('keydown', (e) => e.key === 'Escape' && close());
    document.getElementById('menuBtn').addEventListener('click', () => document.getElementById('navLinks').classList.toggle('open'));

    // Close mobile menu when clicking a nav link
    header.querySelectorAll('.nav-links a.link').forEach((a) => {
      a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
    });

    if (isHome) initScrollSpy();
  }

  function initScrollSpy() {
    const ids = ['home', 'designs', 'try-it-live', 'journey', 'faq'];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    const links = {};
    document.querySelectorAll('.nav-links a.link[data-section]').forEach((a) => {
      links[a.dataset.section] = a;
    });

    function setActive(id) {
      Object.keys(links).forEach((k) => {
        links[k].classList.toggle('active', k === id);
      });
    }

    function onScroll() {
      const y = window.scrollY + 180;
      let current = sections[0].id;
      for (const sec of sections) {
        if (sec.offsetTop <= y) current = sec.id;
      }
      if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 40)) {
        current = sections[sections.length - 1].id;
      }
      setActive(current);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function tryDesign(num) {
    const select = document.getElementById('d');
    const target = document.getElementById('try-it-live');
    if (select && target) {
      select.value = num;
      select.dispatchEvent(new Event('change'));
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      location.href = `/#try-it-live`;
    }
  }

  function preview(num, extra) {
    const s = S.SAMPLES.find((x) => x.num === num);
    if (!s) return;
    document.getElementById('modalTitle').textContent = `#${s.num} — ${s.title}`;
    document.getElementById('modalDesc').textContent = `${s.venue} • ${s.desc}`;
    const mb = s.moodboard || {};
    const colEl = document.getElementById('modalCollection');
    if (colEl) colEl.textContent = mb.collection || 'MEEM Curated Collection';
    const inEl = document.getElementById('mbInsp'); if (inEl) inEl.textContent = mb.inspiration || 'Inspired by timeless modern celebrations.';
    const mdEl = document.getElementById('mbMood'); if (mdEl) mdEl.textContent = mb.mood || 'Elegant & Timeless';
    const swEl = document.getElementById('mbSwatches');
    if (swEl) swEl.innerHTML = (mb.palette || ['#0D3B2E', '#C5A059', '#FAF6EE']).map((c) => `<span style="background:${c}" title="${c}"></span>`).join('');
    const pnEl = document.getElementById('mbPalNames'); if (pnEl) pnEl.textContent = mb.paletteNames || '';
    const tyEl = document.getElementById('mbTypo'); if (tyEl) tyEl.textContent = mb.typography || 'Cormorant Garamond · Amiri';
    const flEl = document.getElementById('mbFloral'); if (flEl) flEl.textContent = mb.floral || 'Garden Roses & Gold Wax Seal';
    const snEl = document.getElementById('mbSound'); if (snEl) snEl.textContent = mb.soundtrack || 'Curated Wedding Soundtrack';
    const cuEl = document.getElementById('mbCustom'); if (cuEl) cuEl.textContent = mb.customization || 'Colors · Music · AR / EN · Photo · QR';
    document.getElementById('previewFrame').src = buildUrl(s.file, extra, true);
    document.getElementById('modalFull').href = buildUrl(s.file, extra);
    document.getElementById('modalWa').href = wa(`Hello! I love design #${s.num} (${s.title})${extra && extra.couple ? ' for ' + extra.couple : ''}.`);
    document.getElementById('preview-modal').classList.add('is-open');
  }

  function setLogo(styleNum) {
    if (typeof localStorage !== 'undefined') localStorage.setItem('meem_logo_style', styleNum);
    const path = `assets/logos/meem-style-${styleNum}.svg?v=4`;
    document.querySelectorAll('.brand-logo-img').forEach((el) => { el.src = path; });
  }

  function setTheme(themeId) {
    if (typeof localStorage !== 'undefined') localStorage.setItem('meem_site_theme', themeId);
    document.documentElement.dataset.theme = themeId;
  }

  window.Shell = { init: injectShell, cardMarkup, preview, buildUrl, wa, setLogo, setTheme, tryDesign };
})();
