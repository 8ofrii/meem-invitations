/* Shared shell: nav, footer, sample cards, phone preview */
(function () {
  const S = window.SITE, B = S.BRAND;
  const NAV = [
    ['index.html', 'Home'], ['collection.html', 'Designs'], ['personalise.html', 'Try it live'],
    ['pricing.html', 'Packages']
  ];
  const wa = (msg) => `https://wa.me/${S.WHATSAPP}?text=${encodeURIComponent(msg)}`;

  function buildUrl(file, extra, clean) {
    extra = extra || {};
    const q = new URLSearchParams();
    ['couple', 'venue', 'date', 'guest', 'photo'].forEach((k) => extra[k] && q.set(k, extra[k]));
    if (clean) q.set('clean', '1');
    const s = q.toString();
    return s ? `${file}?${s}` : file;
  }

  function cardMarkup(s) {
    const tc = s.textDark ? '#1D1B18' : '#FAF6EE';
    const sc = s.textDark ? 'rgba(29,27,24,.72)' : 'rgba(255,255,255,.78)';
    return `<article class="sample-card">
      <div class="card-thumb" style="background:${s.bg};color:${tc}">
        ${s.img ? `<img class="bg-art" src="${s.img}" alt="" loading="lazy" decoding="async">` : ''}
        <div class="badge-row"><span class="badge plain">#${s.num}</span><span class="badge">${s.lang}</span></div>
        <div class="thumb-inner">
          <div class="serif" style="font-size:27px;line-height:1.12;color:${s.accent}">${s.title}</div>
          <div class="arabic" style="font-size:16px;color:${sc};margin-top:6px">${s.subtitle}</div>
        </div>
      </div>
      <div class="card-body">
        <h3 class="card-title">${s.title}</h3>
        <div class="card-venue">📍 ${s.venue}</div>
        <p class="card-desc">${s.desc}</p>
        <div class="chips">${s.features.map((f) => `<span class="chip">${f}</span>`).join('')}</div>
        <div class="card-actions">
          <button type="button" class="btn btn-gold" onclick="Shell.preview('${s.num}')">📱 Preview</button>
          <a class="btn btn-ghost" href="${buildUrl(s.file)}" target="_blank">Full screen ↗</a>
        </div>
      </div>
    </article>`;
  }

  function injectShell(active) {
    const savedStyle = (typeof localStorage !== 'undefined' && localStorage.getItem('meem_logo_style')) || '1';
    const logoSrc = `assets/logos/meem-style-${savedStyle}.svg?v=4`;

    const header = document.createElement('header');
    header.className = 'topbar';
    header.innerHTML = `<div class="topbar-inner">
      <a class="brand" href="index.html">
        <img class="brand-logo-img" src="${logoSrc}" width="44" height="44" alt="MEEM ميم">
        <div><div class="brand-name">${B.name} <span class="brand-ar">${B.ar}</span></div><div class="brand-sub">${B.sub}</div></div>
      </a>
      <button class="menu-btn" id="menuBtn" aria-label="Menu">☰</button>
      <nav class="nav-links" id="navLinks">
        ${NAV.map(([h, t]) => `<a class="link${h === active ? ' active' : ''}" href="${h}">${t}</a>`).join('')}
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
      <div><h4>Explore</h4><a href="collection.html">Designs</a><a href="personalise.html">Try it live</a><a href="pricing.html">Packages</a></div>
      <div><h4>Contact</h4><a href="${wa('Hello!')}" target="_blank" rel="noopener">WhatsApp: 01024190741</a><a href="#">Instagram ${B.handle}</a><a href="#">TikTok</a></div>
    </div><div class="foot-bottom"><span>© ${new Date().getFullYear()} ${B.name} — Cairo, Egypt</span><span>Digital Wedding &amp; Katb Ketab Invitations</span></div></div>`;
    document.body.appendChild(footer);

    const modal = document.createElement('div');
    modal.id = 'preview-modal';
    modal.innerHTML = `<div class="modal-layout"><div class="phone-frame"><div class="phone-notch"></div><iframe id="previewFrame" title="Live preview"></iframe></div>
      <div class="modal-side"><button type="button" class="close-modal" id="closeModalBtn">✕ Close</button>
      <h3 id="modalTitle" class="serif gold" style="font-size:30px;line-height:1.15"></h3><p id="modalDesc" class="muted" style="font-size:13px"></p>
      <div class="tip">🔊 Tap the cover inside the phone to hear the sounds and music.</div>
      <a id="modalFull" class="btn btn-ghost" target="_blank">Open full screen ↗</a>
      <a id="modalWa" class="btn btn-gold" target="_blank" rel="noopener">Order this design</a></div></div>`;
    document.body.appendChild(modal);
    const close = () => { modal.classList.remove('is-open'); document.getElementById('previewFrame').src = 'about:blank'; };
    modal.addEventListener('click', (e) => e.target === modal && close());
    document.getElementById('closeModalBtn').addEventListener('click', close);
    document.addEventListener('keydown', (e) => e.key === 'Escape' && close());
    document.getElementById('menuBtn').addEventListener('click', () => document.getElementById('navLinks').classList.toggle('open'));
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

  window.Shell = { init: injectShell, cardMarkup, preview, buildUrl, wa, setLogo };
})();
