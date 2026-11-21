/* ==========================================================================
   ATELIER INVITE — Cinematic Motion, Sound FX & Interactive Wedding Engine
   Inspired by viral luxury digital invitations (3-Knock Doors, Gold-Foil
   Scratch Cards, Wax-Seal Golden Light Bursts, Auto-Start Soundtrack & FX)
   ========================================================================== */

(function () {
  'use strict';

  // Completely eliminate native scrollbar track & thumb inside mobile iframe across all models
  try {
    const noScrollStyle = document.createElement('style');
    noScrollStyle.id = 'wi-no-scrollbar-style';
    noScrollStyle.textContent = `
      html, body, * {
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
      ::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        background: transparent !important;
      }
    `;
    (document.head || document.documentElement).appendChild(noScrollStyle);
  } catch (_) {}

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
  const customGroom = readParam(['groom', 'g']);
  const customBride = readParam(['bride', 'b']);
  let customCouple = readParam(['couple', 'c']);
  const customVenue = readParam(['venue', 'v']);
  const customDate = readParam(['date', 'dt']);
  const customLang = readParam(['lang', 'language', 'l']);
  const isCleanMode = params.get('clean') === '1';

  if (!customCouple && (customGroom || customBride)) {
    if (customGroom && customBride) {
      const hasAr = /[\u0600-\u06FF]/.test(customGroom + customBride);
      if (customLang === 'en') {
        customCouple = `${customGroom} & ${customBride}`;
      } else if (customLang === 'bi') {
        customCouple = hasAr ? `${customGroom} و ${customBride}` : `${customGroom} & ${customBride}`;
      } else {
        customCouple = `${customGroom} و ${customBride}`;
      }
    } else {
      customCouple = customGroom || customBride;
    }
  }

  let groomInitial = '';
  let brideInitial = '';
  if (customGroom) groomInitial = customGroom.trim()[0];
  if (customBride) brideInitial = customBride.trim()[0];
  if (!groomInitial && !brideInitial && customCouple) {
    const parts = customCouple.split(/\s*(?:&|and|و|\+)\s*/i);
    if (parts[0]) groomInitial = parts[0].trim()[0];
    if (parts[1]) brideInitial = parts[1].trim()[0];
  }
  if (customLang === 'en') {
    groomInitial = groomInitial ? groomInitial.toUpperCase() : 'M';
    brideInitial = brideInitial ? brideInitial.toUpperCase() : 'M';
  }

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

      html, body {
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
      ::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        background: transparent !important;
      }

      #wi-music-fab {
        position: fixed;
        bottom: 16px;
        right: 16px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(14, 14, 18, 0.72);
        color: #F3DCAA;
        border: 1px solid rgba(243, 220, 170, 0.5);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.28);
        backdrop-filter: blur(8px);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 9995;
        padding: 0;
        transition: transform 0.2s ease, background 0.2s ease, opacity 0.3s ease;
      }
      html[dir="rtl"] #wi-music-fab { right: auto; left: 16px; }
      #wi-music-fab:hover { transform: scale(1.1); }
      #wi-music-fab.is-playing {
        animation: wiMusicPulse 2s ease-in-out infinite;
      }
      @keyframes wiMusicPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(216, 180, 108, 0.4), 0 4px 14px rgba(0,0,0,0.28); }
        50% { box-shadow: 0 0 0 4px rgba(216, 180, 108, 0), 0 4px 14px rgba(0,0,0,0.28); }
      }

      /* Dynamic couple portrait photo slot */
      #wi-injected-photo {
        display: flex;
        justify-content: center;
        margin: 16px auto 14px;
        position: relative;
        z-index: 5;
      }
      .wi-photo-frame {
        width: min(200px, 60vw);
        aspect-ratio: 3 / 4;
        border-radius: 110px 110px 14px 14px;
        overflow: hidden;
        border: 2px solid rgba(216, 180, 108, 0.85);
        box-shadow: 0 14px 32px rgba(0,0,0,0.38), 0 0 18px rgba(216, 180, 108, 0.22);
        background: #000;
      }
      .wi-photo-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
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

  const ICON_MUSIC_PLAYING = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>`;
  const ICON_MUSIC_PAUSED = `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;

  function updateMusicFab() {
    const fab = document.getElementById('wi-music-fab');
    if (!fab) return;
    fab.classList.toggle('is-playing', musicPlaying);
    fab.setAttribute('aria-pressed', musicPlaying ? 'true' : 'false');
    fab.title = musicPlaying
      ? (document.documentElement.dir === 'rtl' ? 'إيقاف الموسيقى مؤقتاً' : 'Pause Music')
      : (document.documentElement.dir === 'rtl' ? 'تشغيل الموسيقى' : 'Play Music');
    fab.innerHTML = musicPlaying ? ICON_MUSIC_PLAYING : ICON_MUSIC_PAUSED;
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
    const isEn = customLang === 'en';
    const isRTL = document.documentElement.dir === 'rtl';

    if (guestName) {
      document.querySelectorAll('[data-guest-name]').forEach((el) => {
        let prefix = el.getAttribute('data-guest-prefix');
        if (prefix === null || prefix === undefined) {
          prefix = isEn ? 'To our honored guest: ' : 'إلى ضيفنا العزيز: ';
        } else if (isEn && prefix.includes('ضيف')) {
          prefix = 'To our honored guest: ';
        } else if (!isEn && prefix.toLowerCase().includes('dear')) {
          prefix = 'إلى ضيفنا العزيز: ';
        }
        const suffix = el.getAttribute('data-guest-suffix') || '';
        el.textContent = `${prefix}${guestName}${suffix}`;
        el.style.display = '';
      });
      document.querySelectorAll('input[name="guestName"]').forEach((input) => {
        if (!input.value) input.value = guestName;
      });
    } else if (customCouple) {
      // If no specific guest is entered, personalize cover to show couple names and venue
      document.querySelectorAll('.gate-crest-wrap [data-guest-name]').forEach((el) => {
        el.textContent = `${customCouple} — ${customVenue || (isEn ? 'Cairo' : 'القاهرة')}`;
        el.style.display = '';
      });
    }

    if (customCouple) {
      const hasArabic = /[\u0600-\u06FF]/.test(customCouple);
      document.querySelectorAll('h1, [data-couple-title], [data-couple-title-ar], .couple-names, .couple-title, .hero-names, .big-title, .cover-headline').forEach((el) => {
        el.textContent = customCouple;
        if (hasArabic) {
          el.style.fontFamily = "'Amiri', 'Reem Kufi', serif";
          el.style.lineHeight = '1.35';
          el.style.padding = '4px 0';
        } else {
          el.style.fontFamily = "'Cormorant Garamond', 'Cinzel', 'Playfair Display', Georgia, serif";
          el.style.letterSpacing = '0.04em';
        }
      });
      document.querySelectorAll('form[data-rsvp-form]').forEach((f) => {
        f.setAttribute('data-couple', customCouple);
      });
    }

    if (customGroom) {
      document.querySelectorAll('[data-groom-name], .groom-name').forEach((el) => {
        el.textContent = customGroom;
      });
    }

    if (customBride) {
      document.querySelectorAll('[data-bride-name], .bride-name').forEach((el) => {
        el.textContent = customBride;
      });
    }

    // Monogram & Initial Seals on Cover & Gate
    if (groomInitial || brideInitial) {
      const mono = (groomInitial && brideInitial)
        ? (isEn ? `${groomInitial}&${brideInitial}` : `${groomInitial} & ${brideInitial}`)
        : (groomInitial || brideInitial);

      document.querySelectorAll('.royal-seal .ruqaa, .royal-seal span:first-child, .monogram, .monogram-line, [data-monogram], [data-initials], .seal-initials, .wax-seal-btn').forEach((el) => {
        el.textContent = mono;
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
        const formatted = parsed.toLocaleDateString(isEn ? 'en-US' : 'ar-EG', {
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

    // Apply custom couple photo if uploaded in preview studio
    try {
      let savedPhoto = sessionStorage.getItem('meem_custom_photo') || localStorage.getItem('meem_custom_photo');
      if (!savedPhoto && window.parent && window.parent !== window) {
        try {
          savedPhoto = (window.parent.sessionStorage && window.parent.sessionStorage.getItem('meem_custom_photo')) ||
                       (window.parent.localStorage && window.parent.localStorage.getItem('meem_custom_photo'));
        } catch (_) {}
      }
      if (savedPhoto && (params.get('photo') === '1' || params.has('photo'))) {
        applyCustomPhoto(savedPhoto);
      }
    } catch (_) {}

    if (customLang) {
      applyCustomLanguage(customLang);
    }
  }

  function applyCustomLanguage(l) {
    if (!l) return;
    const isAr = (l === 'ar');
    const isEn = (l === 'en');
    const isBi = (l === 'bi');

    // Update html dir/lang
    if (isAr) {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else if (isEn) {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    } else if (isBi) {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    }

    // Trigger existing language buttons in templates that have them (e.g. #07 Nile Palace)
    document.querySelectorAll('.lang-pill button, [data-lang-btn]').forEach((b) => {
      const txt = (b.textContent || '').toLowerCase();
      const attr = b.getAttribute('data-lang-btn') || '';
      if (isAr && (txt.includes('عربي') || attr === 'ar')) b.click();
      if (isEn && (txt.includes('english') || attr === 'en')) b.click();
    });

    // 1. Process explicit [data-en] and [data-ar] attributes first
    document.querySelectorAll('[data-en], [data-ar]').forEach((el) => {
      if (isEn && el.dataset.en) {
        el.textContent = el.dataset.en;
        if (el.hasAttribute('data-en-dir')) el.dir = el.dataset.enDir;
        else el.removeAttribute('dir');
      } else if (isAr && el.dataset.ar) {
        el.textContent = el.dataset.ar;
      } else if (isBi && el.dataset.ar && el.dataset.en) {
        el.textContent = el.dataset.ar + ' • ' + el.dataset.en;
      }
    });

    // 2. Comprehensive wedding dictionary for leaf text nodes
    const WEDDING_DICT = [
      // Seals & Cover hints
      ['دعوة ملكية', 'Royal Wedding Invitation', 'دعوة ملكية • Royal Wedding'],
      ['ثلاث طرقات تفتح لك أبواب الأمسية ✨', 'Tap 3 times to open the royal gates ✨', 'ثلاث طرقات تفتح لك أبواب الأمسية • Tap 3 times to open ✨'],
      ['ثلاث طرقات تفتح لك أبواب الأمسية', 'Tap 3 times to open the royal gates', 'ثلاث طرقات • Tap 3 times to open'],
      ['طرقتان متبقيتان لفتح القصر...', 'Two more taps to enter...', 'طرقتان متبقيتان • Two more taps'],
      ['طرقة أخيرة لتنفتح لك الأمسية...', 'One final tap to enter...', 'طرقة أخيرة • One final tap'],
      ['المس ختم الشمع لفتح الدعوة ✨', 'Tap the wax seal to open ✨', 'المس ختم الشمع • Tap wax seal ✨'],
      ['المس لفتح الدعوة ✨', 'Tap to open invitation ✨', 'المس لفتح الدعوة • Tap to open ✨'],
      ['اضغط لفتح الدعوة', 'Tap to open invitation', 'اضغط لفتح الدعوة • Tap to open'],
      ['فتح الدعوة', 'Open Invitation', 'فتح الدعوة • Open Invitation'],
      ['Tap the wax seal to open', 'المس ختم الشمع لفتح الدعوة', 'المس ختم الشمع • Tap wax seal'],
      ['Tap to open invitation', 'المس لفتح الدعوة', 'المس لفتح الدعوة • Tap to open'],
      ['Tap to open', 'المس لفتح الدعوة', 'المس لفتح الدعوة • Tap to open'],
      ['You are cordially invited', 'يسعدنا ويشرفنا دعوتكم لحضور حفلنا', 'دعوة زفاف • Cordially Invited'],

      // Verses & Invocations
      ['﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ﴾',
       '"And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them; and He placed between you love and mercy."',
       '﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا ﴾'],
      ['بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 'In the Name of Allah, the Most Gracious, the Most Merciful', 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'],
      ['بارك الله لهما وبارك عليهما وجمع بينهما في خير', '"May Allah bless their union with eternal love, harmony and happiness."', 'بارك الله لهما وبارك عليهما • May Allah bless their union'],

      // Invitation Text & Family
      ['تتشرف عائلتا العروسين بدعوتكم لحضور حفل زفاف', 'Together with their families, you are warmly invited to celebrate the wedding of', 'تتشرف عائلتا العروسين بدعوتكم • Together with their families'],
      ['تتشرف عائلتا الحاج محمود الشريف والمهندس طارق المنياوي بدعوتكم لحضور حفل زفاف', 'Together with their families, you are warmly invited to celebrate the wedding of', 'تتشرف عائلتا العروسين بدعوتكم • Together with their families'],
      ['تتشرف عائلتا العروسين بدعوتكم لحضور عقد قران', 'Together with their families, you are warmly invited to celebrate the Katb Ketab of', 'عقد قران مبارك • Katb Ketab Ceremony'],
      ['تتشرف عائلتا العروسين بدعوتكم لحضور حفل خطوبة', 'Together with their families, you are warmly invited to celebrate the engagement of', 'حفل خطوبة مبارك • Engagement Party'],
      ['تتشرف عائلتا العروسين بدعوتكم لحضور ليلة الحنة', 'You are warmly invited to celebrate the Henna Night of', 'ليلة الحنة السعيدة • Henna Night Celebration'],
      ['Together with their families', 'تتشرف عائلتا العروسين بدعوتكم لمشاركتنا فرحة العمر', 'تتشرف عائلتا العروسين • Together with their families'],
      ['Request the honor of your presence', 'يسرنا ويسعدنا دعوتكم لمشاركتنا ليلة العمر', 'يسرنا دعوتكم • Request the honor of your presence'],
      ['Request the honour of your presence', 'يسرنا ويسعدنا دعوتكم لمشاركتنا ليلة العمر', 'يسرنا دعوتكم • Request the honour of your presence'],
      ['لتكتمل فرحتنا بحضوركم وتشريفكم، وتزدان ليلتنا بدعواتكم الطيبة ومشاركتكم أسعد لحظات العمر.',
       'Your presence honors us and completes our joy as we begin this new chapter together.',
       'لتكتمل فرحتنا بحضوركم • Your presence completes our joy'],
      ['فرحتنا مش هتكمل غير بوجودكم ومشاركتكم لينا', 'Our joy is complete with your presence and warm wishes', 'فرحتنا بوجودكم • Complete with your presence'],
      ['يسعدنا حضوركم،', 'We are honored to have you,', 'يسعدنا حضوركم • Honored to have you,'],
      ['إلى ضيفنا العزيز:', 'To our honored guest:', 'إلى ضيفنا العزيز • To our honored guest:'],
      ['دامت أفراحكم عامرة بالمسرات', 'May your days be filled with love and joy', 'دامت أفراحكم عامرة • Always in celebration'],

      // Occasions
      ['Wedding Invitation', 'دعوة زفاف', 'دعوة زفاف • Wedding Invitation'],
      ['Royal Wedding', 'حفل زفاف ملكي', 'دعوة ملكية • Royal Wedding'],
      ['Katb Ketab Invitation', 'دعوة عقد قران', 'دعوة عقد قران • Katb Ketab'],
      ['Engagement Party', 'حفل خطوبة', 'حفل خطوبة • Engagement Party'],
      ['Henna Night', 'ليلة الحنة', 'ليلة الحنة • Henna Night'],
      ['Save the Date', 'احفظوا التاريخ', 'احفظوا التاريخ • Save the Date'],

      // Section Headings & Tags
      ['العد التنازلي لليلة العمر', 'Countdown to the Big Day', 'العد التنازلي • Countdown'],
      ['العد التنازلي', 'Countdown', 'العد التنازلي • Countdown'],
      ['موعد الفرحة الكبرى', 'The Grand Celebration', 'موعد الفرحة الكبرى • The Celebration'],
      ['موعدنا المنتظر', 'The Wedding Date', 'موعدنا • Wedding Date'],
      ['تفاصيل الحفل', 'Celebration Details', 'تفاصيل الحفل • Event Details'],
      ['تفاصيل الأمسية الملكية', 'Royal Evening Program', 'تفاصيل الأمسية • Evening Program'],
      ['برنامج الحفل', 'Evening Program', 'برنامج الحفل • Evening Program'],
      ['برنامج الأمسية', 'Evening Program', 'برنامج الأمسية • Evening Program'],
      ['ألوان الحفل والموقع', 'Dress Code & Venue', 'ألوان الحفل والموقع • Dress Code & Venue'],
      ['إطلالة الأمسية وقاعة الاحتفال', 'Evening Attire & Ballroom', 'إطلالة الأمسية • Evening Attire'],
      ['موقع الحفل', 'Venue Location', 'موقع الحفل • Venue Location'],
      ['خريطة الوصول', 'Location Map', 'خريطة الوصول • Location Map'],
      ['تأكيد الحضور', 'RSVP & Confirmation', 'تأكيد الحضور • RSVP'],
      ['بطاقة الدخول الرقمية', 'Digital VIP Pass (QR)', 'بطاقة الدخول • Digital Pass'],
      ['يرجى تأكيد حضوركم للحصول على بطاقة الدخول الرقمية (QR) وإرسال التهنئة مباشرة عبر واتساب.',
       'Kindly confirm your attendance to receive your personal digital QR pass and send your warm wishes via WhatsApp.',
       'يرجى تأكيد حضوركم • Kindly confirm your attendance'],

      // Timeline entries
      ['استقبال الضيوف والضيافة المصرية الراقية', 'Guest Reception & Welcome Hospitality', 'استقبال الضيوف • Guest Reception'],
      ['مشروبات الترحيب الفاخرة، الضيافة الشرقية، وترحيب العائلتين.', 'Welcome drinks, oriental refreshments, and family greetings.', 'مشروبات وترحيب • Welcome drinks'],
      ['مراسم التهاني والصور التذكارية', 'Ceremony & Commemorative Photos', 'مراسم التهاني • Photos & Greetings'],
      ['لقاء الأحبة وتوثيق أجمل اللحظات في بهو القاعة.', 'Gathering of loved ones and capturing precious moments.', 'توثيق اللحظات • Capturing memories'],
      ['الزفة الملكية', 'Grand Couple Entrance', 'الزفة الملكية • Grand Entrance'],
      ['دخول العروسين وسط أنغام هادئة وإضاءة ساحرة.', 'The grand couple entrance amidst enchanting ambiance.', 'دخول العروسين • Couple entrance'],
      ['مأدبة العشاء', 'Royal Dinner Banquet', 'مأدبة العشاء • Dinner Banquet'],
      ['مأدبة العشاء الملكي والحلويات', 'Royal Dinner Banquet & Desserts', 'العشاء والحلويات • Dinner Banquet'],
      ['تقديم مأدبة العشاء الفاخرة والحلويات الشرقية والعالمية.', 'Exquisite dinner buffet and curated dessert selection.', 'مأدبة العشاء • Dinner buffet'],

      // Dress Code & Notes
      ['يسعدنا حضوركم بالزي الرسمي أو الفساتين المسائية الراقية — ونعتذر بلطف عن اصطحاب الأطفال لراحتكم.',
       'Dress Code: Black Tie / Formal Evening Attire. To ensure everyone enjoys the evening, this is an adult-only celebration.',
       'الزي الرسمي • Black Tie / Formal Attire'],
      ['الزي الرسمي', 'Formal Attire / Black Tie', 'الزي الرسمي • Formal Attire'],
      ['أسود رسمي', 'Black Tie', 'أسود رسمي • Black Tie'],
      ['زمردي ملكي', 'Royal Emerald', 'زمردي ملكي • Emerald'],
      ['ذهبي عتيق', 'Antique Gold', 'ذهبي عتيق • Antique Gold'],
      ['عاجي', 'Ivory', 'عاجي • Ivory'],

      // Buttons & CTAs
      ['إضافة إلى تقويم جوجل', 'Add to Google Calendar', 'إضافة لتقويم جوجل • Google Calendar'],
      ['إضافة لتقويم جوجل', 'Add to Google Calendar', 'إضافة لتقويم جوجل • Google Calendar'],
      ['حفظ في تقويم الهاتف (.ICS)', 'Save to Calendar (.ICS)', 'حفظ في الهاتف • Save to Calendar'],
      ['تحميل ملف التقويم (.ICS)', 'Download Calendar (.ICS)', 'تحميل التقويم • Download .ICS'],
      ['الاتجاهات عبر خرائط جوجل', 'Directions on Google Maps', 'الاتجاهات • Google Maps'],
      ['فتح الموقع على خرائط جوجل', 'Open in Google Maps', 'خرائط جوجل • Google Maps'],
      ['عرض الموقع على خرائط جوجل', 'View on Google Maps', 'عرض الموقع • Google Maps'],
      ['الموقع على الخريطة', 'View on Map', 'الموقع على الخريطة • View on Map'],
      ['نسخ العنوان', 'Copy Venue Address', 'نسخ العنوان • Copy Address'],
      ['نسخ عنوان القاعة', 'Copy Venue Address', 'نسخ العنوان • Copy Address'],
      ['تأكيد الحضور وإصدار بطاقة الدخول', 'Confirm Attendance & Get Pass', 'تأكيد الحضور • Confirm RSVP'],
      ['إرسال التأكيد عبر واتساب', 'Confirm via WhatsApp', 'تأكيد عبر واتساب • Confirm via WhatsApp'],
      ['تأكيد الحضور الآن', 'Confirm Attendance Now', 'تأكيد الحضور • RSVP Now'],
      ['RSVP Now', 'تأكيد الحضور', 'تأكيد الحضور • RSVP Now'],
      ['View Location', 'موقع الحفل', 'موقع الحفل • View Location'],

      // RSVP Form Labels & Options
      ['الاسم الكريم', 'Your Full Name', 'الاسم الكريم • Full Name'],
      ['حالة الحضور', 'Attendance Status', 'حالة الحضور • Attendance'],
      ['سأحضر بكل سرور', 'Joyfully Accept', 'سأحضر بكل سرور • Joyfully Accept'],
      ['نعم، بكل سرور سأحضر', 'Joyfully Accept', 'بكل سرور • Joyfully Accept'],
      ['نعم، يشرفني الحضور بكل سرور', 'Joyfully Accept', 'يشرفني الحضور • Joyfully Accept'],
      ['أعتذر عن الحضور', 'Regretfully Decline', 'أعتذر عن الحضور • Regretfully Decline'],
      ['للأسف أعتذر عن الحضور', 'Regretfully Decline', 'أعتذر عن الحضور • Regretfully Decline'],
      ['عدد الضيوف', 'Number of Guests', 'عدد الضيوف • Number of Guests'],
      ['عدد المرافقين', 'Number of Guests', 'عدد المرافقين • Number of Guests'],
      ['شخص واحد', '1 Guest', 'شخص واحد • 1 Guest'],
      ['شخصان', '2 Guests', 'شخصان • 2 Guests'],
      ['٣ أشخاص', '3 Guests', '٣ أشخاص • 3 Guests'],
      ['٤ أشخاص', '4 Guests', '٤ أشخاص • 4 Guests'],
      ['كلمة تهنئة للعروسين', 'A wish for the couple', 'تهنئة للعروسين • Warm wishes'],
      ['كلمة تهنئة للعروسين (اختياري)', 'A wish for the couple (optional)', 'تهنئة للعروسين • Warm wishes'],

      // Date, time & calendar
      ['يوم', 'Day', 'Day • يوم'],
      ['ساعة', 'Hour', 'Hour • ساعة'],
      ['دقيقة', 'Min', 'Min • دقيقة'],
      ['ثانية', 'Sec', 'Sec • ثانية'],
      ['مايو ٢٠٢٧', 'May 2027', 'مايو 2027 • May 2027'],
      ['الخميس', 'Thursday', 'Thursday • الخميس'],
      ['الجمعة', 'Friday', 'Friday • الجمعة'],
      ['السبت', 'Saturday', 'Saturday • السبت'],
      ['الأحد', 'Sunday', 'Sunday • الأحد'],
      ['الأربعاء', 'Wednesday', 'Wednesday • الأربعاء'],
      ['الساعة ٨:٠٠ مساءً', '8:00 PM', '8:00 PM • ٨:٠٠ م'],
      ['٨:٠٠ م', '8:00 PM', '8:00 PM'],
      ['٩:٠٠ م', '9:00 PM', '9:00 PM'],
      ['١٠:١٥ م', '10:15 PM', '10:15 PM'],
      ['١١:٠٠ م', '11:00 PM', '11:00 PM'],
      ['الخميس ٢٢ مايو ٢٠٢٧', 'Thursday, May 22, 2027', 'Thursday, May 22, 2027 • الخميس ٢٢ مايو ٢٠٢٧'],
      ['العاصمة الإدارية، القاهرة', 'New Administrative Capital, Cairo', 'العاصمة الإدارية، القاهرة • Cairo']
    ];

    // Apply translations strictly to leaf elements (elements with no child HTML tags)
    const candidates = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, button, a, label, option, .subtitle, .verse, .sec-tag, .sec-title, .prog-name, .prog-desc, .prog-time, #knockHint, .env-hint, .eyebrow');
    candidates.forEach((el) => {
      if (['SCRIPT', 'STYLE', 'IFRAME', 'SVG', 'PATH'].includes(el.tagName)) return;
      if (el.hasAttribute('data-couple-title') || el.classList.contains('couple-names') || el.classList.contains('couple-title')) return;
      if (el.children.length > 0) return; // STRICTLY leaf nodes only!

      const raw = (el.textContent || '').trim();
      if (!raw) return;

      for (const [ar, en, bi] of WEDDING_DICT) {
        if (isEn && (raw === ar || raw.toLowerCase() === ar.toLowerCase())) {
          el.textContent = en;
          break;
        } else if (isAr && (raw === en || raw.toLowerCase() === en.toLowerCase())) {
          el.textContent = ar;
          break;
        } else if (isBi && (raw === ar || raw === en)) {
          el.textContent = bi;
          break;
        }
      }
    });

    // Translate countdown units
    const cdMap = isAr
      ? { days: 'أيام', hours: 'ساعات', minutes: 'دقائق', seconds: 'ثواني' }
      : (isBi ? { days: 'Days • أيام', hours: 'Hours • ساعات', minutes: 'Mins • دقائق', seconds: 'Secs • ثواني' }
              : { days: 'Days', hours: 'Hours', minutes: 'Mins', seconds: 'Secs' });

    document.querySelectorAll('.cd-unit span, .time-box span, .count-label, .cd-label').forEach((el) => {
      const t = (el.textContent || '').trim().toLowerCase();
      if (t.includes('day') || t.includes('أيام') || t.includes('يوم')) el.textContent = cdMap.days;
      else if (t.includes('hour') || t.includes('ساعات') || t.includes('ساعة')) el.textContent = cdMap.hours;
      else if (t.includes('min') || t.includes('دقائق') || t.includes('دقيقة')) el.textContent = cdMap.minutes;
      else if (t.includes('sec') || t.includes('ثواني') || t.includes('ثانية')) el.textContent = cdMap.seconds;
    });

    // In English mode, ensure monograms with Arabic letters switch to English letters
    if (isEn) {
      document.querySelectorAll('[data-monogram]').forEach((el) => {
        if (el.textContent.includes('م')) {
          el.textContent = 'M & M';
        }
      });
    } else if (isAr) {
      document.querySelectorAll('[data-monogram]').forEach((el) => {
        if (el.textContent.includes('M')) {
          el.textContent = 'م & م';
        }
      });
    }
  }

  function applyCustomPhoto(dataUrl) {
    if (!dataUrl) return;

    // 1. Any existing image elements designated for couple photo
    const explicit = document.querySelectorAll('img[data-couple-photo], .cover-photo, img.cover-photo, img[src*="editorial-couple"]');
    if (explicit.length) {
      explicit.forEach((img) => {
        img.src = dataUrl;
        if (img.srcset) img.removeAttribute('srcset');
      });
      return;
    }

    // 2. For templates without a dedicated slot, inject an arched portrait frame after the couple title
    let slot = document.getElementById('wi-injected-photo');
    if (!slot) {
      const anchor = document.querySelector('[data-couple-title]') ||
                     document.querySelector('.couple-names') ||
                     document.querySelector('.couple-title') ||
                     document.querySelector('.hero-names') ||
                     document.querySelector('main h1') ||
                     document.querySelector('h1');
      if (!anchor) return;

      slot = document.createElement('div');
      slot.id = 'wi-injected-photo';
      slot.innerHTML = `
        <div class="wi-photo-frame">
          <img alt="Couple portrait" class="wi-photo-img" src="${dataUrl}">
        </div>
      `;
      anchor.insertAdjacentElement('afterend', slot);
    } else {
      const img = slot.querySelector('img');
      if (img) img.src = dataUrl;
    }
  }

  // Real-time photo reception via postMessage from preview studio (origin-validated)
  window.addEventListener('message', (e) => {
    // Validate message source: must come from same-origin or localhost
    if (e.origin && e.origin !== window.location.origin && !e.origin.includes('localhost') && !e.origin.includes('127.0.0.1') && !e.origin.includes('onrender.com')) {
      return;
    }
    if (e.data && e.data.type === 'meem_photo' && e.data.dataUrl) {
      // Validate dataUrl starts with safe image data scheme
      if (typeof e.data.dataUrl === 'string' && e.data.dataUrl.startsWith('data:image/')) {
        applyCustomPhoto(e.data.dataUrl);
      }
    }
  });

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

    // Cards only concept — ambient background music FAB disabled per user preference
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

