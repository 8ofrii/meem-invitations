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
    ['groom', 'bride', 'couple', 'venue', 'date', 'guest', 'photo', 'lang', 'song'].forEach((k) => extra[k] && q.set(k, extra[k]));
    if (clean) q.set('clean', '1');
    const s = q.toString();
    return s ? `${file}?${s}` : file;
  }

  function cardMarkup(s) {
    const hasImg = !!s.img;
    const tc = hasImg ? '#FFFFFF' : (s.textDark ? '#1D1B18' : '#FAF6EE');
    const sc = hasImg ? '#F4E5C2' : (s.textDark ? 'rgba(29,27,24,.72)' : 'rgba(255,255,255,.78)');
    const ac = hasImg ? '#FFFFFF' : s.accent;
    return `<article class="sample-card">
      <div class="card-thumb ${hasImg ? 'has-art' : ''}" style="background:${s.bg};color:${tc}">
        ${hasImg ? `<img class="bg-art" src="${s.img}" alt="${s.title}" loading="lazy" decoding="async">` : ''}
        <div class="badge-row"><span class="badge plain">#${s.num}</span></div>
        <div class="thumb-inner">
          <div class="serif" style="font-size:26px;line-height:1.15;color:${ac};text-shadow:${hasImg ? '0 2px 10px rgba(0,0,0,0.65)' : 'none'}">${s.title}</div>
          <div class="arabic" style="font-size:16px;color:${sc};margin-top:6px;text-shadow:${hasImg ? '0 1px 6px rgba(0,0,0,0.65)' : 'none'}">${s.subtitle}</div>
        </div>
      </div>
      <div class="card-body">
        <h3 class="card-title">${s.title}</h3>
        <div class="card-venue"><svg class="ic-svg ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> ${s.venue}</div>
        <p class="card-desc">${s.desc}</p>
        <div class="chips">${s.features.map((f) => `<span class="chip">${f}</span>`).join('')}</div>
        <div class="card-actions">
          <button type="button" class="btn btn-gold" onclick="Shell.preview('${s.num}')"><svg class="ic-svg ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="2.5"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg> Preview</button>
          <button type="button" class="btn btn-ghost" onclick="Shell.tryDesign('${s.num}')">Try live →</button>
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
      ['designs', `${prefix}#designs`, 'Designs'],
      ['try-it-live', `${prefix}#try-it-live`, 'Try it live']
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
    </div><div class="foot-bottom"><span>© ${new Date().getFullYear()} ${B.name} — Cairo, Egypt</span><span>Digital Wedding &amp; Katb Ketab Invitations</span></div></div>`;
    document.body.appendChild(footer);

    const modal = document.createElement('div');
    modal.id = 'preview-modal';
    modal.innerHTML = `
      <button type="button" class="close-modal" id="closeModalBtn" aria-label="Close preview">✕ Close</button>
      <div class="modal-layout">
        <div class="phone-frame"><iframe id="previewFrame" title="Live preview"></iframe></div>
        <div class="modal-side">
          <h3 id="modalTitle" class="serif gold" style="font-size:30px;line-height:1.15"></h3>
          <p id="modalDesc" style="font-size:13.5px;color:rgba(255,255,255,0.85);line-height:1.6"></p>
          <div class="tip"><svg class="ic-svg ic-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2L12 3z"/></svg> Tap the cover inside the phone to experience the interactive motion.</div>
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
    const ids = ['home', 'designs', 'try-it-live'];
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
