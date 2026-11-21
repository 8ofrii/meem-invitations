/* ==========================================================================
   ATELIER INVITE — Cinematic Motion, Sound FX & Interactive Wedding Engine
   Inspired by viral luxury digital invitations (3-Knock Doors, Gold-Foil
   Scratch Cards, Wax-Seal Golden Light Bursts, Auto-Start Soundtrack & FX)
   ========================================================================== */

(function () {
  'use strict';

  const STUDIO_CONFIG = {
    studioName: 'ATELIER INVITE',
    studioNameAr: 'أتيليه دعوة',
    defaultWhatsapp: '201024190741',
    instagramHandle: '@atelier.invite'
  };
  window.WeddingStudio = STUDIO_CONFIG;

  const params = new URLSearchParams(window.location.search);
  const readParam = (keys) => {
    for (const k of keys) {
      const v = params.get(k);
      if (v && v.trim()) return v.trim();
    }
    return '';
  };
  const guestName = readParam(['guest', 'name', 'to']);
  const customCouple = readParam(['couple']);
  const customVenue = readParam(['venue']);
  const customDate = readParam(['date']);
  const isCleanMode = params.get('clean') === '1';

  /* ========================================================================
     1. GLOBAL CINEMATIC STYLES (Shimmer, Ripples, Music Pulse, Scratch)
     ======================================================================== */
  function injectEngineStyles() {
    if (document.getElementById('wi-engine-styles')) return;
    const style = document.createElement('style');
    style.id = 'wi-engine-styles';
    style.textContent = `
      body.wi-scroll-locked { overflow: hidden !important; height: 100vh; }

      .wi-shimmer {
        position: relative;
        overflow: hidden;
      }
      .wi-shimmer::after {
        content: '';
        position: absolute;
        top: -20%;
        left: -130%;
        width: 55%;
        height: 140%;
        background: linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.42) 50%, transparent 80%);
        transform: skewX(-18deg);
        animation: wiShimmerSweep 3.4s linear infinite;
        pointer-events: none;
      }
      @keyframes wiShimmerSweep {
        0% { left: -130%; }
        45%, 100% { left: 160%; }
      }

      .wi-ripple {
        position: fixed;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid rgba(243, 220, 170, 0.92);
        box-shadow: 0 0 24px rgba(216, 180, 108, 0.65);
        transform: translate(-50%, -50%) scale(0.4);
        pointer-events: none;
        z-index: 99998;
        animation: wiRippleOut 0.85s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      }
      @keyframes wiRippleOut {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(0.35); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(6.8); }
      }

      .wi-golden-flash {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 99990;
        background: radial-gradient(circle at var(--fx, 50%) var(--fy, 50%),
          rgba(255, 245, 212, 0.92) 0%,
          rgba(229, 191, 117, 0.55) 28%,
          rgba(229, 191, 117, 0) 68%);
        opacity: 0;
        animation: wiGoldenBloom 1.15s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      }
      @keyframes wiGoldenBloom {
        0% { opacity: 0; transform: scale(0.45); }
        28% { opacity: 1; transform: scale(1.1); }
        100% { opacity: 0; transform: scale(1.75); }
      }

      #wi-music-fab {
        position: fixed;
        bottom: 22px;
        right: 22px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: rgba(18, 18, 22, 0.78);
        color: #F3DCAA;
        border: 1.5px solid rgba(243, 220, 170, 0.55);
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
        backdrop-filter: blur(12px);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        cursor: pointer;
        z-index: 9995;
        transition: transform 0.25s ease, background 0.25s ease, opacity 0.4s ease;
      }
      html[dir="rtl"] #wi-music-fab { right: auto; left: 22px; }
      #wi-music-fab:hover { transform: scale(1.08); }
      #wi-music-fab.is-playing {
        animation: wiMusicPulse 2.4s ease-in-out infinite;
      }
      @keyframes wiMusicPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(216, 180, 108, 0.48), 0 10px 28px rgba(0,0,0,0.28); }
        50% { box-shadow: 0 0 0 12px rgba(216, 180, 108, 0), 0 10px 28px rgba(0,0,0,0.28); }
      }

      /* Interactive Scratch-Off Date Cards */
      .wi-scratch-grid {
        display: flex;
        justify-content: center;
        gap: 16px;
        flex-wrap: wrap;
        margin: 22px auto 12px;
      }
      .wi-scratch-card {
        position: relative;
        width: 112px;
        height: 112px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid rgba(207, 171, 102, 0.75);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.14), inset 0 0 18px rgba(207, 171, 102, 0.25);
        user-select: none;
        touch-action: none;
        cursor: grab;
        background: radial-gradient(circle, #FFFDF8 0%, #F4E7CF 100%);
        color: #3A2B18;
      }
      .wi-scratch-card:active { cursor: grabbing; }
      .wi-scratch-under {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 8px;
        text-align: center;
      }
      .wi-scratch-val {
        font-size: 26px;
        font-weight: 700;
        line-height: 1.1;
      }
      .wi-scratch-sub {
        font-size: 11px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        opacity: 0.75;
        margin-top: 3px;
      }
      .wi-scratch-canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        transition: opacity 0.6s ease;
      }
      .wi-scratch-card.is-revealed .wi-scratch-canvas {
        opacity: 0;
        pointer-events: none;
      }

      /* Tear-Off Calendar Widget */
      .wi-tear-cal {
        width: 196px;
        margin: 18px auto 24px;
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid rgba(176, 141, 87, 0.35);
        box-shadow: 0 14px 32px rgba(0, 0, 0, 0.12);
        background: #FFFDF9;
        color: #26211C;
      }
      .wi-tear-top {
        padding: 10px 14px;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.08em;
        color: #fff;
        background: var(--cal-accent, #7A5838);
      }
      .wi-tear-body {
        padding: 14px 12px 16px;
      }
      .wi-tear-day {
        font-size: 46px;
        font-weight: 700;
        line-height: 1;
        margin: 4px 0;
      }
      .wi-tear-meta {
        font-size: 12px;
        opacity: 0.75;
      }

      /* Scroll-down prompt */
      .wi-scroll-cue {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        margin-top: 22px;
        font-size: 11px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        opacity: 0.75;
        text-decoration: none;
        color: inherit;
        animation: wiBounceDown 2.2s ease-in-out infinite;
      }
      @keyframes wiBounceDown {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(7px); }
      }
    `;
    document.head.appendChild(style);
  }

  /* ========================================================================
     2. PROCEDURAL WEB AUDIO SOUND FX + ROMANTIC MULTI-MOOD SOUNDTRACK
     ======================================================================== */
  let audioCtx = null;
  let musicTimer = null;
  let musicPlaying = false;
  let currentMood = 'classic';
  let stepIdx = 0;

  function ensureAudio() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!audioCtx) audioCtx = new AC();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  function makeNoiseBuffer(ctx, seconds = 0.25) {
    const len = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    return buf;
  }

  function playKnock() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Resonant wooden body thump
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(165, now);
    osc.frequency.exponentialRampToValueAtTime(62, now + 0.11);
    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);

    // Crisp wood tap transient
    const noise = ctx.createBufferSource();
    noise.buffer = makeNoiseBuffer(ctx, 0.08);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(720, now);
    bp.Q.value = 3.2;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.32, now);
    ng.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    noise.connect(bp);
    bp.connect(ng);
    ng.connect(ctx.destination);
    noise.start(now);
  }

  function playDoorOpen() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Warm air/door whoosh
    const noise = ctx.createBufferSource();
    noise.buffer = makeNoiseBuffer(ctx, 0.9);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(240, now);
    lp.frequency.exponentialRampToValueAtTime(980, now + 0.45);
    lp.frequency.exponentialRampToValueAtTime(180, now + 0.9);
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.001, now);
    ng.gain.linearRampToValueAtTime(0.14, now + 0.25);
    ng.gain.exponentialRampToValueAtTime(0.001, now + 0.88);
    noise.connect(lp);
    lp.connect(ng);
    ng.connect(ctx.destination);
    noise.start(now);

    // Golden ascending harp glissando
    const notes = [293.66, 369.99, 440, 587.33, 739.99, 880, 1174.66];
    notes.forEach((f, i) => {
      playPluck(f, now + 0.08 + i * 0.075, 2.2, 0.06);
    });
  }

  function playWaxBreak() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Crisp wax snap
    const noise = ctx.createBufferSource();
    noise.buffer = makeNoiseBuffer(ctx, 0.12);
    const hp = ctx.createBiquadFilter();
    hp.type = 'bandpass';
    hp.frequency.setValueAtTime(1900, now);
    hp.Q.value = 1.8;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.28, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    noise.connect(hp);
    hp.connect(g);
    g.connect(ctx.destination);
    noise.start(now);

    // Paper slide rustle
    const paper = ctx.createBufferSource();
    paper.buffer = makeNoiseBuffer(ctx, 0.45);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(1100, now + 0.1);
    const pg = ctx.createGain();
    pg.gain.setValueAtTime(0.001, now + 0.08);
    pg.gain.linearRampToValueAtTime(0.08, now + 0.22);
    pg.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    paper.connect(bp);
    bp.connect(pg);
    pg.connect(ctx.destination);
    paper.start(now + 0.08);

    // Golden sparkle chord
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      playPluck(f, now + 0.14 + i * 0.07, 1.9, 0.055);
    });
  }

  function playPageTurn() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    const noise = ctx.createBufferSource();
    noise.buffer = makeNoiseBuffer(ctx, 0.35);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(900, now);
    bp.frequency.exponentialRampToValueAtTime(2400, now + 0.28);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(0.14, now + 0.1);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
    noise.connect(bp);
    bp.connect(g);
    g.connect(ctx.destination);
    noise.start(now);
    playPluck(587.33, now + 0.12, 1.4, 0.045);
    playPluck(880, now + 0.2, 1.6, 0.04);
  }

  function playStamp() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.frequency.setValueAtTime(125, now);
    osc.frequency.exponentialRampToValueAtTime(42, now + 0.12);
    g.gain.setValueAtTime(0.42, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
    // Boarding chime
    playPluck(659.25, now + 0.14, 1.2, 0.055);
    playPluck(880, now + 0.28, 1.8, 0.055);
  }

  let lastScratchTs = 0;
  function playScratch() {
    const t = performance.now();
    if (t - lastScratchTs < 90) return;
    lastScratchTs = t;
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    const noise = ctx.createBufferSource();
    noise.buffer = makeNoiseBuffer(ctx, 0.06);
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.setValueAtTime(3200, now);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.05, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
    noise.connect(hp);
    hp.connect(g);
    g.connect(ctx.destination);
    noise.start(now);
  }

  function playSparkle() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    [587.33, 739.99, 880, 1174.66].forEach((f, i) => {
      playPluck(f, now + i * 0.065, 1.5, 0.055);
    });
  }

  function playPluck(freq, startTime, duration = 2.4, peak = 0.045) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const filter = audioCtx.createBiquadFilter();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc2.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);
    osc2.frequency.setValueAtTime(freq * 2, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, startTime);
    filter.frequency.exponentialRampToValueAtTime(650, startTime + duration);

    const g2 = audioCtx.createGain();
    g2.gain.setValueAtTime(0.18, startTime);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(peak, startTime + 0.035);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    osc2.connect(g2);
    g2.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(startTime);
    osc2.start(startTime);
    osc.stop(startTime + duration + 0.06);
    osc2.stop(startTime + duration + 0.06);
  }

  function playWarmPad(freqs, startTime, duration = 3.8, peak = 0.018) {
    if (!audioCtx) return;
    freqs.forEach((f) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, startTime);
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(peak, startTime + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration + 0.08);
    });
  }

  const MOODS = {
    classic: {
      tempo: 820,
      melody: [261.63, 329.63, 392.0, 493.88, 523.25, 493.88, 392.0, 329.63, 220.0, 261.63, 329.63, 392.0, 440.0, 392.0, 329.63, 293.66],
      chords: [[130.81, 196.0, 261.63], [110.0, 164.81, 220.0], [174.61, 220.0, 261.63], [196.0, 246.94, 293.66]]
    },
    oriental: {
      // Romantic Arabic Hijaz / warm acoustic oud-harp cadence
      tempo: 780,
      melody: [293.66, 311.13, 369.99, 392.0, 440.0, 392.0, 369.99, 311.13, 293.66, 369.99, 440.0, 466.16, 587.33, 466.16, 440.0, 369.99],
      chords: [[146.83, 220.0, 293.66], [155.56, 233.08, 311.13], [146.83, 220.0, 293.66], [196.0, 293.66, 369.99]]
    },
    celestial: {
      tempo: 950,
      melody: [329.63, 392.0, 493.88, 659.25, 587.33, 493.88, 392.0, 329.63, 293.66, 369.99, 440.0, 587.33, 493.88, 440.0, 369.99, 329.63],
      chords: [[164.81, 246.94, 329.63], [146.83, 220.0, 293.66], [130.81, 196.0, 261.63], [196.0, 246.94, 293.66]]
    },
    mediterranean: {
      tempo: 700,
      melody: [349.23, 440.0, 523.25, 659.25, 587.33, 523.25, 440.0, 392.0, 349.23, 440.0, 523.25, 587.33, 523.25, 440.0, 392.0, 329.63],
      chords: [[174.61, 220.0, 261.63], [130.81, 196.0, 261.63], [146.83, 220.0, 293.66], [196.0, 246.94, 329.63]]
    }
  };

  function startMusic(mood) {
    const ctx = ensureAudio();
    if (!ctx) return;
    if (mood && MOODS[mood]) currentMood = mood;
    if (musicPlaying) return;

    const cfg = MOODS[currentMood] || MOODS.classic;
    musicPlaying = true;
    const tick = () => {
      if (!musicPlaying || !audioCtx) return;
      const now = audioCtx.currentTime;
      const note = cfg.melody[stepIdx % cfg.melody.length];
      playPluck(note, now, 2.5, 0.042);
      if (stepIdx % 4 === 0) {
        const chord = cfg.chords[Math.floor(stepIdx / 4) % cfg.chords.length];
        playWarmPad(chord, now, 3.6, 0.017);
      }
      stepIdx++;
    };
    tick();
    musicTimer = setInterval(tick, cfg.tempo);
    updateMusicFab();
  }

  function stopMusic() {
    clearInterval(musicTimer);
    musicPlaying = false;
    updateMusicFab();
  }

  function toggleMusic(mood) {
    if (musicPlaying) stopMusic();
    else startMusic(mood || currentMood);
  }

  function updateMusicFab() {
    const fab = document.getElementById('wi-music-fab');
    if (!fab) return;
    fab.classList.toggle('is-playing', musicPlaying);
    fab.setAttribute('aria-pressed', musicPlaying ? 'true' : 'false');
    fab.textContent = musicPlaying ? '♫' : '♪';
  }

  window.WeddingSound = {
    playKnock,
    playDoorOpen,
    playWaxBreak,
    playPageTurn,
    playStamp,
    playScratch,
    playSparkle,
    startMusic,
    stopMusic,
    toggleMusic
  };
  window.WeddingMusic = { toggle: () => toggleMusic() };

  /* ========================================================================
     3. VISUAL MOTION EFFECTS (Ripples, Golden Bloom, Ambient Petals/Sparkles)
     ======================================================================== */
  function spawnRipple(x, y) {
    const r = document.createElement('div');
    r.className = 'wi-ripple';
    r.style.left = `${x}px`;
    r.style.top = `${y}px`;
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 900);
  }

  function burstGoldenLight(x = window.innerWidth / 2, y = window.innerHeight / 2) {
    const flash = document.createElement('div');
    flash.className = 'wi-golden-flash';
    flash.style.setProperty('--fx', `${x}px`);
    flash.style.setProperty('--fy', `${y}px`);
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 1200);
  }

  function startParticles(theme = 'gold-dust') {
    if (document.getElementById('wi-particles')) return;
    const canvas = document.createElement('canvas');
    canvas.id = 'wi-particles';
    Object.assign(canvas.style, {
      position: 'fixed',
      inset: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: '4'
    });
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const palettes = {
      'gold-dust': ['rgba(232,199,130,0.65)', 'rgba(255,244,214,0.55)', 'rgba(196,154,78,0.45)'],
      'petals-rose': ['rgba(229,176,163,0.62)', 'rgba(246,214,207,0.58)', 'rgba(185,122,106,0.4)'],
      'petals-lavender': ['rgba(186,154,209,0.55)', 'rgba(220,196,236,0.5)', 'rgba(216,180,108,0.42)'],
      'botanical-leaves': ['rgba(130,158,125,0.48)', 'rgba(230,206,162,0.45)', 'rgba(208,154,142,0.42)'],
      'embers': ['rgba(244,180,104,0.65)', 'rgba(214,112,68,0.55)', 'rgba(255,229,178,0.5)']
    };
    const colors = palettes[theme] || palettes['gold-dust'];
    const isPetal = theme.startsWith('petals') || theme === 'botanical-leaves';
    const isEmber = theme === 'embers';

    let w = 0, h = 0, items = [];
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(34, Math.max(18, Math.floor(w / 38)));
      items = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: isPetal ? 5 + Math.random() * 6 : 1.5 + Math.random() * 2.6,
        vy: isEmber ? -(0.35 + Math.random() * 0.7) : (0.35 + Math.random() * 0.75),
        vx: (Math.random() - 0.5) * 0.45,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.025,
        sway: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
    }

    function loop() {
      ctx.clearRect(0, 0, w, h);
      for (const p of items) {
        p.sway += 0.015;
        p.x += p.vx + Math.sin(p.sway) * 0.35;
        p.y += p.vy;
        p.angle += p.spin;
        if (p.y > h + 20) { p.y = -20; p.x = Math.random() * w; }
        if (p.y < -20) { p.y = h + 20; p.x = Math.random() * w; }
        if (p.x > w + 20) p.x = -20;
        if (p.x < -20) p.x = w + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        if (isPetal) {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);
    resize();
    loop();
  }

  /* ========================================================================
     4. INTERACTIVE 3-TAP DOOR REVEAL HELPER
     ======================================================================== */
  function initThreeKnockDoor(opts) {
    const overlay = document.getElementById(opts.overlayId);
    const trigger = document.getElementById(opts.triggerId) || overlay;
    const dotsWrap = document.getElementById(opts.dotsId);
    const hintEl = document.getElementById(opts.hintId);
    if (!overlay || !trigger) return;

    document.body.classList.add('wi-scroll-locked');
    let knocks = 0;
    const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll('.knock-dot')) : [];
    const isRTL = document.documentElement.dir === 'rtl';

    function handleKnock(e) {
      if (knocks >= 3) return;
      knocks++;

      const rect = trigger.getBoundingClientRect();
      const x = e.clientX || rect.left + rect.width / 2;
      const y = e.clientY || rect.top + rect.height / 2;
      spawnRipple(x, y);
      playKnock();

      // Subtle door shake feedback
      if (opts.shakeTargetId) {
        const st = document.getElementById(opts.shakeTargetId);
        if (st) {
          st.style.transform = 'scale(0.96)';
          setTimeout(() => (st.style.transform = ''), 140);
        }
      }

      if (dots[knocks - 1]) dots[knocks - 1].classList.add('is-lit');

      if (hintEl && knocks < 3) {
        const rem = 3 - knocks;
        hintEl.textContent = isRTL
          ? rem === 2 ? 'طرقتان متبقيتان لفتح القصر...' : 'طرقة أخيرة لتنفتح لك الأمسية...'
          : rem === 2 ? 'Two more taps to unlock...' : 'One final tap to enter...';
      }

      if (knocks === 3) {
        setTimeout(() => {
          playDoorOpen();
          burstGoldenLight(x, y);
          overlay.classList.add('is-open');
          document.body.classList.remove('wi-scroll-locked');
          startMusic(opts.musicMood || 'oriental');
          if (typeof opts.onOpen === 'function') opts.onOpen();
        }, 220);
      }
    }

    trigger.addEventListener('click', handleKnock);
  }

  /* ========================================================================
     5. INTERACTIVE GOLD-FOIL REVEAL MEDALLIONS
     ======================================================================== */
  function initScratchCards() {
    document.querySelectorAll('[data-scratch-card]').forEach((card) => {
      if (card.dataset.scratchReady) return;
      card.dataset.scratchReady = '1';

      const canvas = card.querySelector('canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const size = 112;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.scale(dpr, dpr);

      // Paint metallic gold foil texture
      const foilColor1 = card.getAttribute('data-foil-1') || '#E8CA82';
      const foilColor2 = card.getAttribute('data-foil-2') || '#B98D3E';
      const grad = ctx.createLinearGradient(0, 0, size, size);
      grad.addColorStop(0, foilColor1);
      grad.addColorStop(0.45, '#F5DFAA');
      grad.addColorStop(0.55, foilColor2);
      grad.addColorStop(1, foilColor1);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      // Subtle foil shimmer speckles
      for (let i = 0; i < 140; i++) {
        ctx.fillStyle = i % 2 ? 'rgba(255,255,255,0.22)' : 'rgba(90,62,18,0.12)';
        ctx.fillRect(Math.random() * size, Math.random() * size, 2, 2);
      }

      // Prompt glyph in center
      ctx.fillStyle = 'rgba(65, 44, 12, 0.55)';
      ctx.font = '600 11px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(card.getAttribute('data-foil-label') || '✦ BRUSH ✦', size / 2, size / 2 + 4);

      let drawing = false;
      let revealed = false;
      let strokes = 0;

      function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const pt = e.touches ? e.touches[0] : e;
        return {
          x: ((pt.clientX - rect.left) / rect.width) * size,
          y: ((pt.clientY - rect.top) / rect.height) * size
        };
      }

      function scratchAt(e) {
        if (revealed) return;
        const { x, y } = getPos(e);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.fill();
        playScratch();
        strokes++;

        if (strokes % 6 === 0) {
          const img = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
          let cleared = 0;
          const total = img.length / 4;
          for (let i = 3; i < img.length; i += 16) {
            if (img[i] < 40) cleared++;
          }
          if (cleared / (total / 4) > 0.38) {
            revealed = true;
            card.classList.add('is-revealed');
            playSparkle();
          }
        }
      }

      canvas.addEventListener('pointerdown', (e) => {
        drawing = true;
        canvas.setPointerCapture(e.pointerId);
        scratchAt(e);
      });
      canvas.addEventListener('pointermove', (e) => {
        if (drawing) scratchAt(e);
      });
      canvas.addEventListener('pointerup', () => (drawing = false));
      canvas.addEventListener('pointercancel', () => (drawing = false));
      // Allow quick tap fallback on desktop/accessibility
      card.addEventListener('dblclick', () => {
        if (!revealed) {
          revealed = true;
          card.classList.add('is-revealed');
          playSparkle();
        }
      });
    });
  }

  window.WeddingMotion = {
    spawnRipple,
    burstGoldenLight,
    startParticles,
    initThreeKnockDoor,
    initScratchCards
  };

  /* ========================================================================
     6. TOAST, PERSONALIZATION, COUNTDOWN, CALENDAR, QR PASS & RSVP
     ======================================================================== */
  function showToast(message) {
    let toast = document.getElementById('wi-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'wi-toast';
      Object.assign(toast.style, {
        position: 'fixed',
        bottom: '26px',
        left: '50%',
        transform: 'translateX(-50%) translateY(20px)',
        background: 'rgba(18, 18, 22, 0.92)',
        color: '#fff',
        padding: '12px 22px',
        borderRadius: '999px',
        fontSize: '13px',
        zIndex: '99999',
        opacity: '0',
        pointerEvents: 'none',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        boxShadow: '0 10px 30px rgba(0,0,0,0.28)',
        backdropFilter: 'blur(10px)',
        maxWidth: '90vw',
        textAlign: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      });
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, 3000);
  }
  window.showToast = showToast;

  function applyGuestPersonalization() {
    if (guestName) {
      document.querySelectorAll('[data-guest-name]').forEach((el) => {
        const prefix = el.getAttribute('data-guest-prefix') || '';
        const suffix = el.getAttribute('data-guest-suffix') || '';
        el.textContent = `${prefix}${guestName}${suffix}`;
        el.style.display = '';
      });
      document.querySelectorAll('input[name="guestName"]').forEach((input) => {
        if (!input.value) input.value = guestName;
      });
    }

    if (customCouple) {
      document.querySelectorAll('h1, [data-couple-title]').forEach((el) => {
        el.textContent = customCouple;
      });
      document.querySelectorAll('form[data-rsvp-form]').forEach((f) => {
        f.setAttribute('data-couple', customCouple);
      });
    }

    if (customVenue) {
      document.querySelectorAll('[data-venue-name], .venue-sub, .venue-name').forEach((el) => {
        el.textContent = customVenue;
      });
    }

    if (customDate) {
      const parsed = new Date(customDate);
      if (!Number.isNaN(parsed.getTime())) {
        const isRTL = document.documentElement.dir === 'rtl';
        const formatted = parsed.toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        document.querySelectorAll('[data-event-date]').forEach((el) => {
          el.textContent = formatted;
        });
        const isoTarget = `${customDate}T19:00:00+02:00`;
        document.querySelectorAll('[data-countdown]').forEach((box) => {
          box.setAttribute('data-countdown', isoTarget);
        });
      }
    }

    // Apply custom couple photo if uploaded in personalise.html
    try {
      const savedPhoto = sessionStorage.getItem('meem_custom_photo');
      if (savedPhoto && params.get('photo') === '1') {
        applyCustomPhoto(savedPhoto);
      }
    } catch (_) {}
  }

  function applyCustomPhoto(dataUrl) {
    if (!dataUrl) return;
    const targets = document.querySelectorAll('img[data-couple-photo]');
    if (targets.length) {
      targets.forEach((img) => { img.src = dataUrl; });
      return;
    }
    // For templates without a built-in photo slot, inject a refined arched portrait frame under h1
    let slot = document.getElementById('wi-injected-photo');
    if (!slot) {
      const h1 = document.querySelector('main h1') || document.querySelector('h1');
      if (!h1) return;
      slot = document.createElement('div');
      slot.id = 'wi-injected-photo';
      Object.assign(slot.style, {
        width: 'min(220px, 68vw)',
        aspectRatio: '3 / 4',
        margin: '18px auto 14px',
        borderRadius: '130px 130px 14px 14px',
        overflow: 'hidden',
        border: '2px solid rgba(216, 180, 108, 0.72)',
        padding: '5px',
        boxShadow: '0 16px 36px rgba(0,0,0,0.18)'
      });
      slot.innerHTML = `<img alt="Couple portrait" style="width:100%;height:100%;object-fit:cover;border-radius:124px 124px 10px 10px;display:block;">`;
      h1.insertAdjacentElement('afterend', slot);
    }
    const img = slot.querySelector('img');
    if (img) img.src = dataUrl;
  }

  function toArabicDigits(str) {
    return str.replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
  }

  function initCountdowns() {
    const containers = document.querySelectorAll('[data-countdown]');
    if (!containers.length) return;
    function update() {
      const now = Date.now();
      containers.forEach((box) => {
        const target = new Date(box.getAttribute('data-countdown')).getTime();
        const diff = Math.max(0, target - now);
        const pad = (n) => String(n).padStart(2, '0');
        const useArDigits = box.hasAttribute('data-ar-digits');
        const fmt = (n) => (useArDigits ? toArabicDigits(pad(n)) : pad(n));

        const dEl = box.querySelector('[data-cd="days"]');
        const hEl = box.querySelector('[data-cd="hours"]');
        const mEl = box.querySelector('[data-cd="minutes"]');
        const sEl = box.querySelector('[data-cd="seconds"]');
        if (dEl) dEl.textContent = fmt(Math.floor(diff / 86400000));
        if (hEl) hEl.textContent = fmt(Math.floor((diff / 3600000) % 24));
        if (mEl) mEl.textContent = fmt(Math.floor((diff / 60000) % 60));
        if (sEl) sEl.textContent = fmt(Math.floor((diff / 1000) % 60));
      });
    }
    update();
    setInterval(update, 1000);
  }

  function formatICSDate(isoString) {
    return new Date(isoString).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  }

  function downloadICS(event) {
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Atelier Invite//Digital Wedding Invitation//EN',
      'BEGIN:VEVENT',
      `DTSTART:${formatICSDate(event.start)}`,
      `DTEND:${formatICSDate(event.end)}`,
      `SUMMARY:${event.title}`,
      `LOCATION:${event.location}`,
      `DESCRIPTION:${event.description || ''}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(event.filename || 'wedding-invitation').replace(/\s+/g, '-').toLowerCase()}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(document.documentElement.dir === 'rtl' ? 'تم تنزيل ملف التقويم بنجاح' : 'Calendar invite (.ics) downloaded');
  }

  function openGoogleCalendar(event) {
    const url =
      `https://calendar.google.com/calendar/render?action=TEMPLATE` +
      `&text=${encodeURIComponent(event.title)}` +
      `&dates=${formatICSDate(event.start)}/${formatICSDate(event.end)}` +
      `&location=${encodeURIComponent(event.location)}` +
      `&details=${encodeURIComponent(event.description || '')}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  window.WeddingCalendar = { downloadICS, openGoogleCalendar };

  function generateQRSVG(seedText, fg = '#111111', bg = '#ffffff') {
    const size = 21;
    let hash = 2166136261;
    for (let i = 0; i < seedText.length; i++) {
      hash ^= seedText.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    const nextBit = () => {
      hash ^= hash << 13;
      hash ^= hash >>> 17;
      hash ^= hash << 5;
      return (hash >>> 0) % 2 === 0;
    };
    const isFinder = (r, c) =>
      (r < 7 && c < 7) || (r < 7 && c >= size - 7) || (r >= size - 7 && c < 7);
    const drawFinder = (ox, oy) =>
      `<rect x="${ox}" y="${oy}" width="7" height="7" fill="${fg}"/>` +
      `<rect x="${ox + 1}" y="${oy + 1}" width="5" height="5" fill="${bg}"/>` +
      `<rect x="${ox + 2}" y="${oy + 2}" width="3" height="3" fill="${fg}"/>`;

    let rects = `<rect width="${size + 2}" height="${size + 2}" fill="${bg}" rx="1.5"/>`;
    rects += drawFinder(1, 1) + drawFinder(size - 6, 1) + drawFinder(1, size - 6);
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (isFinder(r, c)) continue;
        if (r === 6 || c === 6) {
          if ((r + c) % 2 === 0) rects += `<rect x="${c + 1}" y="${r + 1}" width="1" height="1" fill="${fg}"/>`;
          continue;
        }
        if (nextBit()) rects += `<rect x="${c + 1}" y="${r + 1}" width="1" height="1" fill="${fg}"/>`;
      }
    }
    return `<svg viewBox="0 0 ${size + 2} ${size + 2}" width="116" height="116" xmlns="http://www.w3.org/2000/svg" aria-label="VIP QR Pass">${rects}</svg>`;
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  }

  function initRSVPForms() {
    document.querySelectorAll('form[data-rsvp-form]').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        playSparkle();
        const isRTL = document.documentElement.dir === 'rtl' || form.getAttribute('data-lang') === 'ar';
        const data = new FormData(form);
        const name = (data.get('guestName') || '').toString().trim() || (isRTL ? 'ضيف كريم' : 'Honored Guest');
        const status = (data.get('attendance') || 'yes').toString();
        const count = (data.get('guestsCount') || '1').toString();
        const note = (data.get('note') || '').toString().trim();
        const couple = form.getAttribute('data-couple') || 'Wedding Celebration';
        const phone = form.getAttribute('data-whatsapp') || STUDIO_CONFIG.defaultWhatsapp;

        const attending = status === 'yes';
        const waText = isRTL
          ? `مرحباً، تأكيد حضور لحفل زفاف ${couple}\nالاسم: ${name}\nالحالة: ${attending ? 'سأحضر بكل سرور' : 'أعتذر عن الحضور'}\nعدد الضيوف: ${attending ? count : '0'}${note ? `\nتهنئة/ملاحظة: ${note}` : ''}`
          : `Hello! RSVP for ${couple}\nName: ${name}\nStatus: ${attending ? 'Joyfully Accepts' : 'Regretfully Declines'}\nGuests: ${attending ? count : '0'}${note ? `\nNote: ${note}` : ''}`;

        const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(waText)}`;
        const passCode = `VIP-${Math.abs(
          Array.from(name + couple).reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) | 0, 7)
        )
          .toString(36)
          .toUpperCase()
          .slice(0, 6)}`;

        const resultId = form.getAttribute('data-result-target');
        const resultEl = resultId ? document.getElementById(resultId) : null;
        if (resultEl) {
          const qrBg = form.getAttribute('data-qr-bg') || '#ffffff';
          const qrFg = form.getAttribute('data-qr-fg') || '#1a1a1a';
          const qrMarkup = attending ? generateQRSVG(`${couple}|${name}|${passCode}`, qrFg, qrBg) : '';

          resultEl.innerHTML = `
            <div style="text-align:center; padding: 24px 18px; border: 1px solid currentColor; border-radius: 16px; margin-top: 18px;">
              <div style="font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.78; margin-bottom: 6px;">
                ${isRTL ? (attending ? 'بطاقة دخول رقمية مؤكدة' : 'تم استلام ردكم') : (attending ? 'CONFIRMED DIGITAL ENTRY PASS' : 'RESPONSE RECEIVED')}
              </div>
              <div style="font-size: 20px; font-weight: 600; margin-bottom: 4px;">${escapeHtml(name)}</div>
              <div style="font-size: 13px; opacity: 0.82; margin-bottom: 16px;">
                ${
                  attending
                    ? isRTL
                      ? `عدد الضيوف: ${escapeHtml(count)} • رمز الدعوة: ${passCode}`
                      : `Admit ${escapeHtml(count)} Guest${count === '1' ? '' : 's'} • Pass ${passCode}`
                    : isRTL
                      ? 'شكراً لمشاركتنا ردكم ونتمنى لكم كل الخير'
                      : 'Thank you for letting us know. You will be missed!'
                }
              </div>
              ${attending ? `<div style="display:inline-block; padding:10px; background:${qrBg}; border-radius:12px; margin-bottom:16px; box-shadow:0 8px 20px rgba(0,0,0,0.14);">${qrMarkup}</div>` : ''}
              <div>
                <a href="${waUrl}" target="_blank" rel="noopener noreferrer"
                   style="display:inline-flex; align-items:center; gap:8px; padding:11px 22px; border-radius:999px; background:#25D366; color:#fff; text-decoration:none; font-size:13px; font-weight:700; font-family:system-ui,sans-serif;">
                  ${isRTL ? 'إرسال التأكيد عبر واتساب' : 'Send Confirmation via WhatsApp'}
                </a>
              </div>
            </div>
          `;
          resultEl.style.display = 'block';
          resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        showToast(isRTL ? 'تم تجهيز بطاقة التأكيد بنجاح ✨' : 'Your RSVP & VIP pass are ready! ✨');
      });
    });
  }

  function initCopyButtons() {
    document.querySelectorAll('[data-copy-text]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const text = btn.getAttribute('data-copy-text');
        try {
          await navigator.clipboard.writeText(text);
        } catch (_) {
          const ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        showToast(document.documentElement.dir === 'rtl' ? 'تم نسخ العنوان بنجاح' : 'Venue address copied!');
      });
    });
  }

  function injectFloatingControls() {
    if (document.body.hasAttribute('data-no-floating-bar')) return;

    const isRTL = document.documentElement.dir === 'rtl';

    if (!isCleanMode) {
      const back = document.createElement('a');
      back.href = '../collection.html';
      back.textContent = isRTL ? '← كل التصاميم' : '← All Designs';
      Object.assign(back.style, {
        position: 'fixed',
        top: '14px',
        left: '14px',
        padding: '7px 14px',
        borderRadius: '999px',
        background: 'rgba(15, 15, 18, 0.62)',
        color: '#fff',
        textDecoration: 'none',
        fontSize: '12px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
        zIndex: '9995'
      });
      document.body.appendChild(back);
    }

    const mood = document.body.getAttribute('data-music-mood') || (isRTL ? 'oriental' : 'classic');
    currentMood = mood;

    const fab = document.createElement('button');
    fab.id = 'wi-music-fab';
    fab.type = 'button';
    fab.title = isRTL ? 'تشغيل أو إيقاف الموسيقى' : 'Play / Pause Music';
    fab.textContent = '♪';
    fab.addEventListener('click', () => toggleMusic(mood));
    document.body.appendChild(fab);
  }

  function initScrollReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    items.forEach((el) => obs.observe(el));
  }

  
  document.addEventListener('DOMContentLoaded', () => {
    injectEngineStyles();
    applyGuestPersonalization();
    initCountdowns();
    initRSVPForms();
    initCopyButtons();
    injectFloatingControls();
    initScrollReveal();
    initScratchCards();

    const particles = document.body.getAttribute('data-particles');
    if (particles) startParticles(particles);
  });
})();

