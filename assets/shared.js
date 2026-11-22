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
  const customSong = readParam(['song', 'music', 'm', 'audio']);
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

  function playPluck(freq, startTime, duration = 1.6, volume = 0.055) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const over = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      over.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      over.frequency.setValueAtTime(freq * 2, startTime);
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
      osc.connect(gain);
      over.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(startTime);
      over.start(startTime);
      osc.stop(startTime + duration + 0.05);
      over.stop(startTime + duration + 0.05);
    } catch (_) {}
  }

  // Opening sound effects disabled per user preference so only the pure wedding song plays without mixing
  function playKnock() {}
  function playDoorOpen() {}
  function playWaxBreak() {}
  function playPageTurn() {}
  function playStamp() {}
  function playScratch() {}
  function playSparkle() {}

  // =========================================================================
  // MULTI-GENRE WEDDING MUSIC & AUDIO SYNTHESIS ENGINE
  // Real-time acoustic instruments: Grand Piano, Arabic Oud, Nay Flute,
  // Violins String Ensemble, Liquid Chrome Bells & Egyptian Zaffa Percussion
  // =========================================================================

  function playPiano(freq, time, duration = 2.2, vel = 0.055) {
    if (!audioCtx) return;
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const osc3 = audioCtx.createOscillator();
    const filter = audioCtx.createBiquadFilter();
    const gain = audioCtx.createGain();

    osc1.type = 'triangle';
    osc2.type = 'sine';
    osc3.type = 'sine';
    osc1.frequency.setValueAtTime(freq, time);
    osc2.frequency.setValueAtTime(freq * 2.002, time);
    osc3.frequency.setValueAtTime(freq * 3.004, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3400, time);
    filter.frequency.exponentialRampToValueAtTime(420, time + duration);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(vel, time + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc1.start(time);
    osc2.start(time);
    osc3.start(time);
    osc1.stop(time + duration + 0.05);
    osc2.stop(time + duration + 0.05);
    osc3.stop(time + duration + 0.05);
  }

  function playOud(freq, time, duration = 1.6, vel = 0.058) {
    if (!audioCtx) return;
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const bp = audioCtx.createBiquadFilter();
    const gain = audioCtx.createGain();

    osc1.type = 'triangle';
    osc2.type = 'sawtooth';
    osc1.frequency.setValueAtTime(freq, time);
    osc2.frequency.setValueAtTime(freq + 1.2, time); // Natural double string detune

    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(1150, time);
    bp.frequency.exponentialRampToValueAtTime(360, time + duration);
    bp.Q.value = 1.9;

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(vel, time + 0.009);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc1.connect(bp);
    osc2.connect(bp);
    bp.connect(gain);
    gain.connect(audioCtx.destination);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration + 0.05);
    osc2.stop(time + duration + 0.05);
  }

  function playNay(freq, time, duration = 1.5, vel = 0.042) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const lp = audioCtx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.setValueAtTime(freq, time + 0.12);
    osc.frequency.linearRampToValueAtTime(freq * 1.012, time + 0.28);
    osc.frequency.linearRampToValueAtTime(freq * 0.99, time + 0.48);
    osc.frequency.linearRampToValueAtTime(freq, time + 0.7);

    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(1500, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(vel, time + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(lp);
    lp.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(time);
    osc.stop(time + duration + 0.05);
  }

  function playStrings(freq, time, duration = 2.4, vel = 0.038) {
    if (!audioCtx) return;
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const lp = audioCtx.createBiquadFilter();
    const gain = audioCtx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, time);
    osc2.frequency.setValueAtTime(freq * 1.0035, time);

    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(1700, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(vel, time + 0.18);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc1.connect(lp);
    osc2.connect(lp);
    lp.connect(gain);
    gain.connect(audioCtx.destination);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration + 0.05);
    osc2.stop(time + duration + 0.05);
  }

  function playChromeBell(freq, time, duration = 2.6, vel = 0.048) {
    if (!audioCtx) return;
    const carrier = audioCtx.createOscillator();
    const mod = audioCtx.createOscillator();
    const modGain = audioCtx.createGain();
    const mainGain = audioCtx.createGain();

    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(freq, time);
    mod.type = 'sine';
    mod.frequency.setValueAtTime(freq * 2.76, time);

    modGain.gain.setValueAtTime(freq * 1.5, time);
    modGain.gain.exponentialRampToValueAtTime(0.1, time + 0.55);

    mod.connect(modGain);
    modGain.connect(carrier.frequency);

    mainGain.gain.setValueAtTime(0.0001, time);
    mainGain.gain.linearRampToValueAtTime(vel, time + 0.015);
    mainGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    carrier.connect(mainGain);
    mainGain.connect(audioCtx.destination);

    carrier.start(time);
    mod.start(time);
    carrier.stop(time + duration + 0.05);
    mod.stop(time + duration + 0.05);
  }

  function playZaffaDrum(isDum, time, vel = 0.38) {
    if (!audioCtx) return;
    if (isDum) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(135, time);
      osc.frequency.exponentialRampToValueAtTime(46, time + 0.16);
      gain.gain.setValueAtTime(vel, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(time);
      osc.stop(time + 0.24);
    } else {
      const noise = audioCtx.createBufferSource();
      noise.buffer = makeNoiseBuffer(audioCtx, 0.08);
      const bp = audioCtx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(2600, time);
      bp.Q.value = 2.5;
      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(vel * 0.72, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.07);
      noise.connect(bp);
      bp.connect(gain);
      gain.connect(audioCtx.destination);
      noise.start(time);
    }
  }

  const MOODS = {
    // 1. Classical Bridal Entrance — Pachelbel's Canon in D Major
    canon_in_d: {
      tempo: 680,
      render: (step, now) => {
        // Canon 8-chord cycle: D, A, Bm, F#m, G, D, G, A
        const cycle = [
          { bass: 73.42, chord: [293.66, 369.99, 440.0], melody: [587.33, 554.37], inst: 'strings' },
          { bass: 55.00, chord: [220.00, 277.18, 329.63], melody: [440.00, 369.99], inst: 'piano' },
          { bass: 61.74, chord: [246.94, 293.66, 369.99], melody: [493.88, 440.00], inst: 'strings' },
          { bass: 46.25, chord: [185.00, 220.00, 277.18], melody: [369.99, 329.63], inst: 'piano' },
          { bass: 49.00, chord: [196.00, 246.94, 293.66], melody: [392.00, 369.99], inst: 'strings' },
          { bass: 73.42, chord: [293.66, 369.99, 440.00], melody: [293.66, 329.63], inst: 'piano' },
          { bass: 49.00, chord: [196.00, 246.94, 293.66], melody: [392.00, 440.00], inst: 'strings' },
          { bass: 55.00, chord: [220.00, 277.18, 329.63], melody: [440.00, 493.88], inst: 'piano' }
        ];
        const bar = cycle[step % cycle.length];
        playPiano(bar.bass, now, 2.6, 0.05);
        bar.chord.forEach((f, i) => playPiano(f, now + 0.08 + i * 0.09, 1.8, 0.038));
        const melNote = bar.melody[(Math.floor(step / 2)) % bar.melody.length];
        if (bar.inst === 'strings') playStrings(melNote, now + 0.12, 2.2, 0.045);
        else playPiano(melNote, now + 0.12, 1.9, 0.05);
      }
    },

    // 2. Royal Egyptian Zaffa & Strings (زفة ملكية مصرية وأوتار)
    egyptian_zaffa: {
      tempo: 440,
      render: (step, now) => {
        // Classic Egyptian Zaffa cadence: Dum - - Tak, Tak - Dum - Tak
        const drumPattern = [
          { dum: true }, { dum: false }, { tak: true }, { rest: true },
          { tak: true }, { dum: true }, { tak: true }, { rest: true }
        ];
        const beat = drumPattern[step % drumPattern.length];
        if (beat.dum) playZaffaDrum(true, now, 0.42);
        if (beat.tak) playZaffaDrum(false, now, 0.28);

        // Maqam Bayati / Rast melody
        const melody = [293.66, 311.13, 369.99, 440.0, 466.16, 440.0, 369.99, 311.13, 293.66, 369.99, 440.0, 587.33, 440.0, 369.99, 311.13, 293.66];
        const note = melody[step % melody.length];
        if (step % 2 === 0) {
          playOud(note, now, 1.4, 0.055);
        } else {
          playStrings(note, now, 1.2, 0.04);
        }
      }
    },

    // 3. Romantic Grand Piano & Cello Waltz (بيانو وأوتار رومانسية)
    romantic_piano: {
      tempo: 520,
      render: (step, now) => {
        const chords = [
          { bass: 130.81, arpm: [261.63, 329.63, 392.0, 523.25], cello: 523.25 },
          { bass: 110.00, arpm: [220.00, 261.63, 329.63, 440.00], cello: 493.88 },
          { bass: 87.31,  arpm: [174.61, 220.00, 261.63, 349.23], cello: 440.00 },
          { bass: 98.00,  arpm: [196.00, 246.94, 293.66, 392.00], cello: 392.00 }
        ];
        const bar = chords[Math.floor(step / 3) % chords.length];
        const sub = step % 3;
        if (sub === 0) {
          playPiano(bar.bass, now, 2.5, 0.06);
          playStrings(bar.cello, now + 0.1, 2.4, 0.045);
        } else {
          bar.arpm.slice(0, 3).forEach((f, i) => playPiano(f, now + i * 0.07, 1.6, 0.038));
        }
      }
    },

    // 4. Liquid Chromium & Platinum Chimes (الكروم السائل والبريق البلاتيني)
    liquid_chromium: {
      tempo: 780,
      render: (step, now) => {
        const bells = [587.33, 739.99, 880.0, 1174.66, 1318.51, 880.0, 739.99, 587.33];
        const note = bells[step % bells.length];
        playChromeBell(note, now, 2.8, 0.05);

        if (step % 4 === 0) {
          const pads = [
            [146.83, 220.0, 293.66, 440.0],
            [174.61, 220.0, 261.63, 392.0],
            [196.0, 246.94, 293.66, 440.0],
            [146.83, 220.0, 329.63, 440.0]
          ];
          const pad = pads[(step / 4) % pads.length];
          pad.forEach((f) => playStrings(f, now, 3.8, 0.025));
        }
      }
    },

    // 5. Katb Ketab Peaceful Nay & Oud (كتب كتاب وألحان روحانية هادئة)
    katb_ketab: {
      tempo: 740,
      render: (step, now) => {
        const nayScale = [329.63, 349.23, 392.0, 440.0, 392.0, 349.23, 329.63, 293.66, 329.63, 392.0, 440.0, 493.88, 440.0, 392.0, 349.23, 329.63];
        const note = nayScale[step % nayScale.length];
        playNay(note, now, 1.8, 0.048);

        if (step % 2 === 0) {
          const oudBass = [164.81, 146.83, 130.81, 146.83][(step / 2) % 4];
          playOud(oudBass, now + 0.08, 2.2, 0.045);
        }
      }
    },

    // 6. Sahel Sunset & Breezy Acoustic (أجواء الساحل والجونة الصيفية)
    sahel_sunset: {
      tempo: 560,
      render: (step, now) => {
        const chords = [
          { bass: 174.61, strum: [220.0, 261.63, 349.23], mel: 523.25 },
          { bass: 130.81, strum: [196.0, 261.63, 329.63], mel: 440.00 },
          { bass: 146.83, strum: [220.0, 293.66, 369.99], mel: 587.33 },
          { bass: 196.00, strum: [246.94, 329.63, 392.00], mel: 493.88 }
        ];
        const bar = chords[Math.floor(step / 2) % chords.length];
        if (step % 2 === 0) {
          playPiano(bar.bass, now, 1.8, 0.05);
          bar.strum.forEach((f, i) => playPiano(f, now + 0.06 + i * 0.05, 1.4, 0.035));
        } else {
          playChromeBell(bar.mel, now + 0.1, 1.6, 0.04);
        }
      }
    },

    // 7. Katb Ketab — موسيقى أغنية فرحة (Farha Katb Ketab Melody)
    farha_katb: {
      tempo: 520,
      render: (step, now) => {
        // Warm joyful Hijaz/Rast celebratory Katb Ketab progression
        const mel = [
          293.66, 329.63, 369.99, 392.00, 440.00, 392.00, 369.99, 329.63,
          392.00, 440.00, 493.88, 587.33, 493.88, 440.00, 392.00, 369.99
        ];
        const note = mel[step % mel.length];
        playNay(note, now, 1.5, 0.045);
        if (step % 2 === 0) {
          const oudNotes = [146.83, 196.00, 220.00, 146.83];
          playOud(oudNotes[(step / 2) % oudNotes.length], now + 0.04, 1.8, 0.05);
        }
        if (step % 4 === 0) {
          playStrings(note / 2, now, 2.6, 0.03);
        }
      }
    },

    // 8. Wedding — A Thousand Years (Christina Perri, 6/8 Bb Major)
    a_thousand_years: {
      tempo: 460,
      render: (step, now) => {
        // Iconic Bb - F - Gm - Eb romantic 6/8 piano & cello ballad
        const bars = [
          { bass: 116.54, arp: [233.08, 293.66, 349.23], mel: 466.16 }, // Bb
          { bass: 87.31,  arp: [220.00, 261.63, 349.23], mel: 440.00 }, // F
          { bass: 98.00,  arp: [196.00, 233.08, 293.66], mel: 392.00 }, // Gm
          { bass: 77.78,  arp: [155.56, 233.08, 311.13], mel: 349.23 }  // Eb
        ];
        const bar = bars[Math.floor(step / 3) % bars.length];
        const sub = step % 3;
        if (sub === 0) {
          playPiano(bar.bass, now, 2.4, 0.058);
          playStrings(bar.mel, now + 0.08, 2.3, 0.042);
        }
        playPiano(bar.arp[sub], now + 0.03, 1.5, 0.042);
      }
    },

    // 9. Wedding — Perfect (Ed Sheeran, 12/8 Ab Major)
    perfect: {
      tempo: 430,
      render: (step, now) => {
        // Ab - Fm - Db - Eb tender romantic sway
        const bars = [
          { bass: 103.83, arp: [207.65, 261.63, 311.13], mel: 415.30 }, // Ab
          { bass: 87.31,  arp: [174.61, 207.65, 261.63], mel: 349.23 }, // Fm
          { bass: 69.30,  arp: [138.59, 174.61, 207.65], mel: 277.18 }, // Db
          { bass: 77.78,  arp: [155.56, 196.00, 233.08], mel: 311.13 }  // Eb
        ];
        const bar = bars[Math.floor(step / 3) % bars.length];
        const sub = step % 3;
        if (sub === 0) {
          playPiano(bar.bass, now, 2.2, 0.056);
          playStrings(bar.mel, now + 0.06, 2.1, 0.04);
        }
        playPluck(bar.arp[sub], now + 0.02, 1.3, 0.045);
      }
    },

    // 10. Wedding — Bridgerton Strings (Regency Chamber Quartet Waltz)
    bridgerton: {
      tempo: 420,
      render: (step, now) => {
        // G - D - Em - C elegant classical string quartet waltz
        const bars = [
          { cello: 98.00,  pizz: [196.00, 246.94, 293.66], violin: [587.33, 659.25, 587.33] },
          { cello: 73.42,  pizz: [146.83, 185.00, 220.00], violin: [554.37, 587.33, 440.00] },
          { cello: 82.41,  pizz: [164.81, 196.00, 246.94], violin: [493.88, 587.33, 493.88] },
          { cello: 65.41,  pizz: [130.81, 164.81, 196.00], violin: [523.25, 493.88, 392.00] }
        ];
        const bar = bars[Math.floor(step / 3) % bars.length];
        const sub = step % 3;
        if (sub === 0) {
          playStrings(bar.cello, now, 2.0, 0.048);
        } else {
          playPluck(bar.pizz[sub], now, 0.9, 0.042);
        }
        playStrings(bar.violin[sub], now + 0.04, 1.4, 0.038);
      }
    },

    // 11. Wedding — أم كلثوم: الليل وسماه (ألف ليلة وليلة)
    om_kalthoum: {
      tempo: 540,
      render: (step, now) => {
        // Classic Nahawand/Farahfaza orchestral Egyptian strings + Oud
        const phrases = [
          261.63, 293.66, 311.13, 349.23, 392.00, 415.30, 392.00, 349.23,
          311.13, 349.23, 392.00, 493.88, 523.25, 493.88, 392.00, 311.13
        ];
        const note = phrases[step % phrases.length];
        playStrings(note, now, 1.9, 0.046);
        if (step % 2 === 0) {
          playOud(note / 2, now + 0.05, 1.8, 0.052);
        }
        if (step % 4 === 0) {
          playNay(note * 1.0, now + 0.14, 1.5, 0.028);
        }
      }
    },

    // 12. Wedding — سموا باسم الله عليها (Sammoo Besm Allah Aleiha)
    sammoo_besm_allah: {
      tempo: 420,
      render: (step, now) => {
        const drumPattern = [
          { dum: true }, { rest: true }, { tak: true }, { rest: true },
          { dum: true }, { tak: true }, { dum: true }, { tak: true }
        ];
        const beat = drumPattern[step % drumPattern.length];
        if (beat.dum) playZaffaDrum(true, now, 0.34);
        if (beat.tak) playZaffaDrum(false, now, 0.22);

        // Joyful Egyptian Bayati bridal motif
        const mel = [
          293.66, 329.63, 349.23, 392.00, 349.23, 329.63, 293.66, 261.63,
          293.66, 349.23, 392.00, 440.00, 392.00, 349.23, 329.63, 293.66
        ];
        const note = mel[step % mel.length];
        playOud(note, now, 1.3, 0.054);
        if (step % 2 === 0) {
          playStrings(note, now + 0.03, 1.5, 0.042);
        }
      }
    }
  };

  // Backward compatibility aliases
  MOODS.classic = MOODS.a_thousand_years;
  MOODS.oriental = MOODS.sammoo_besm_allah;
  MOODS.katb_ketab = MOODS.farha_katb;
  MOODS.celestial = MOODS.bridgerton;
  MOODS.mediterranean = MOODS.perfect;

  // Real Egyptian & Wedding MP3 tracks (all trimmed to start immediately on the words or main melody)
  const AUDIO_TRACKS = {
    // 1. Instrumental Music Only (موسيقى الأغاني بدون غناء)
    om_kalthoum_inst: '../assets/audio/om-kalthoum-instrumental.mp3',
    farha_inst: '../assets/audio/farha-instrumental.mp3',
    egyptian_zaffa: '../assets/audio/egyptian-zaffa.mp3',
    sammoo_besm_allah: '../assets/audio/egyptian-zaffa.mp3',
    thousand_years_inst: '../assets/audio/thousand-years-instrumental.mp3',
    bridgerton: '../assets/audio/thousand-years-instrumental.mp3',
    canon_in_d: '../assets/audio/thousand-years-instrumental.mp3',
    classic: '../assets/audio/thousand-years-instrumental.mp3',
    romantic_piano: '../assets/audio/thousand-years-instrumental.mp3',
    liquid_chromium: '../assets/audio/om-kalthoum-instrumental.mp3',
    celestial: '../assets/audio/thousand-years-instrumental.mp3',

    // 2. Original Vocal Marriage Songs (تبدأ بالكلمات مباشرة)
    om_kalthoum: '../assets/audio/om-kalthoum-alf-leila.mp3',
    farha_katb: '../assets/audio/farha-katb.mp3',
    katb_ketab: '../assets/audio/farha-instrumental.mp3',
    esseily_einy: '../assets/audio/esseily-einy-shayfa.mp3',
    esseily_wakheeran: '../assets/audio/esseily-wakheeran.mp3',
    jassmi_zaffa: '../assets/audio/jassmi-zaffa.mp3',
    jassmi_seta: '../assets/audio/jassmi-seta-el-sobah.mp3',
    tamer_helm: '../assets/audio/tamer-helm-seneen.mp3',
    ramy_mabrook: '../assets/audio/ramy-sabry-mabrook.mp3',
    amr_nour: '../assets/audio/amr-diab-nour-el-ein.mp3',
    hakim_kolo_yorkos: '../assets/audio/hakim-kolo-yorkos.mp3',
    hakim_el_wad: '../assets/audio/hakim-el-wad-da-helw.mp3',
    oriental: '../assets/audio/hakim-kolo-yorkos.mp3',
    a_thousand_years: '../assets/audio/a-thousand-years.mp3',
    ed_perfect: '../assets/audio/ed-sheeran-perfect.mp3',
    cant_help_falling: '../assets/audio/cant-help-falling.mp3',
    until_i_found_you: '../assets/audio/until-i-found-you.mp3',
    classic_romance_inst: '../assets/audio/classic-romance-inst.mp3',
    einaudi_experience: '../assets/audio/einaudi-experience.mp3',
    clair_de_lune: '../assets/audio/clair-de-lune.mp3',
    golden_hour: '../assets/audio/golden-hour.mp3',
    young_and_beautiful: '../assets/audio/young-and-beautiful.mp3',
    taylor_enchanted: '../assets/audio/taylor-enchanted.mp3',
    amr_tamally_maak: '../assets/audio/amr-tamally-maak.mp3',
    elissa_men_awal: '../assets/audio/elissa-men-awal-deqiqa.mp3',
    perfect: '../assets/audio/ed-sheeran-perfect.mp3',
    sahel_sunset: '../assets/audio/farha-katb.mp3',
    mediterranean: '../assets/audio/amr-diab-nour-el-ein.mp3'
  };

  // Curated Egyptian Wedding Song & Instrumental Mixes
  const AUDIO_MIXES = {
    english_mix: [
      '../assets/audio/ed-sheeran-perfect.mp3',
      '../assets/audio/a-thousand-years.mp3',
      '../assets/audio/cant-help-falling.mp3',
      '../assets/audio/until-i-found-you.mp3',
      '../assets/audio/classic-romance-inst.mp3'
    ],
    instrumental_mix: [
      '../assets/audio/om-kalthoum-instrumental.mp3',
      '../assets/audio/farha-instrumental.mp3',
      '../assets/audio/classic-romance-inst.mp3',
      '../assets/audio/thousand-years-instrumental.mp3'
    ],
    egyptian_mix: [
      '../assets/audio/jassmi-zaffa.mp3',
      '../assets/audio/farha-katb.mp3',
      '../assets/audio/tamer-helm-seneen.mp3',
      '../assets/audio/ramy-sabry-mabrook.mp3',
      '../assets/audio/esseily-einy-shayfa.mp3',
      '../assets/audio/om-kalthoum-alf-leila.mp3'
    ],
    esseily_mix: [
      '../assets/audio/farha-katb.mp3',
      '../assets/audio/esseily-einy-shayfa.mp3',
      '../assets/audio/esseily-wakheeran.mp3'
    ],
    jassmi_mix: [
      '../assets/audio/jassmi-zaffa.mp3',
      '../assets/audio/jassmi-seta-el-sobah.mp3'
    ],
    hakim_mix: [
      '../assets/audio/hakim-kolo-yorkos.mp3',
      '../assets/audio/hakim-el-wad-da-helw.mp3'
    ]
  };

  let bgAudioEl = null;
  let fadeTimer = null;
  let activeMixList = null;
  let activeMixIdx = 0;

  function startSynthFallback(moodKey) {
    const ctx = ensureAudio();
    if (!ctx) return;
    const cfg = MOODS[moodKey] || MOODS.egyptian_zaffa;
    const tick = () => {
      if (!musicPlaying || !audioCtx) return;
      const now = audioCtx.currentTime;
      if (typeof cfg.render === 'function') cfg.render(stepIdx, now);
      stepIdx++;
    };
    tick();
    musicTimer = setInterval(tick, cfg.tempo);
  }

  function startMusic(mood) {
    if (customSong === 'silent' || customSong === 'none' || customSong === 'mute') return;
    const chosenMood = customSong && (AUDIO_MIXES[customSong] || AUDIO_TRACKS[customSong] || MOODS[customSong])
      ? customSong
      : (mood || currentMood || 'egyptian_mix');
    currentMood = chosenMood;
    if (musicPlaying) return;

    activeMixList = AUDIO_MIXES[currentMood] || null;
    activeMixIdx = 0;
    const trackSrc = activeMixList ? activeMixList[0] : (AUDIO_TRACKS[currentMood] || AUDIO_TRACKS.om_kalthoum);
    musicPlaying = true;
    updateMusicFab();

    try {
      if (!bgAudioEl) {
        bgAudioEl = new Audio();
        bgAudioEl.preload = 'auto';
        bgAudioEl.addEventListener('ended', () => {
          if (!musicPlaying) return;
          if (activeMixList && activeMixList.length > 1) {
            activeMixIdx = (activeMixIdx + 1) % activeMixList.length;
            bgAudioEl.src = activeMixList[activeMixIdx];
            bgAudioEl.play().catch(() => {});
          } else {
            bgAudioEl.currentTime = 0;
            bgAudioEl.play().catch(() => {});
          }
        });
      }
      bgAudioEl.loop = !(activeMixList && activeMixList.length > 1);
      if (!bgAudioEl.src || !bgAudioEl.src.endsWith(trackSrc.replace(/^\.\.\//, ''))) {
        bgAudioEl.src = trackSrc;
      }
      bgAudioEl.volume = 0.72;
      const p = bgAudioEl.play();
      if (p && typeof p.then === 'function') {
        p.catch(() => {
          if (musicPlaying) startSynthFallback(currentMood);
        });
      }
    } catch (_) {
      startSynthFallback(currentMood);
    }
  }

  function stopMusic() {
    clearInterval(musicTimer);
    clearInterval(fadeTimer);
    musicPlaying = false;
    if (bgAudioEl) {
      try { bgAudioEl.pause(); } catch (_) {}
    }
    updateMusicFab();
  }

  function toggleMusic(mood) {
    if (musicPlaying) stopMusic();
    else startMusic(mood || (document.body && document.body.dataset.musicMood) || currentMood);
  }

  const ICON_MUSIC_PLAYING = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;
  const ICON_MUSIC_PAUSED = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;

  function updateMusicFab() {
    const fab = document.getElementById('wi-music-fab');
    const isRTL = document.documentElement.dir === 'rtl';
    if (fab) {
      fab.classList.toggle('is-playing', musicPlaying);
      fab.setAttribute('aria-pressed', musicPlaying ? 'true' : 'false');
      const lbl = musicPlaying
        ? (isRTL ? 'إيقاف الصوت' : 'Mute music')
        : (isRTL ? 'تشغيل الصوت' : 'Play music');
      fab.title = lbl;
      fab.innerHTML = musicPlaying ? ICON_MUSIC_PLAYING : ICON_MUSIC_PAUSED;
    }
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'meem_music_state', playing: musicPlaying }, '*');
      }
    } catch (_) {}
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
      try { spawnRipple(x, y); } catch (_) {}
      try { playKnock(); } catch (_) {}

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
          try { playDoorOpen(); } catch (_) {}
          try { burstGoldenLight(x, y); } catch (_) {}
          overlay.classList.add('is-open');
          document.body.classList.remove('wi-scroll-locked');
          if (opts.musicMood) {
            try { startMusic(opts.musicMood); } catch (_) {}
          }
          if (typeof opts.onOpen === 'function') {
            try { opts.onOpen(); } catch (_) {}
          }
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
    const customTable = (params.get('table') || '').trim();
    const customTheme = (params.get('theme') || '').trim();

    if (customTheme) {
      const palettes = {
        gold:     { accent: '#C5A059', soft: 'rgba(197, 160, 89, 0.14)', border: 'rgba(197, 160, 89, 0.45)' },
        chromium: { accent: '#64748B', soft: 'rgba(148, 163, 184, 0.16)', border: 'rgba(148, 163, 184, 0.50)' },
        rose:     { accent: '#9E4B5A', soft: 'rgba(158, 75, 90, 0.13)', border: 'rgba(158, 75, 90, 0.42)' },
        emerald:  { accent: '#0D3B2E', soft: 'rgba(13, 59, 46, 0.13)', border: 'rgba(13, 59, 46, 0.42)' },
        sapphire: { accent: '#1D4ED8', soft: 'rgba(29, 78, 216, 0.13)', border: 'rgba(29, 78, 216, 0.42)' }
      };
      const pal = palettes[customTheme];
      if (pal) {
        const root = document.documentElement;
        ['--accent', '--gold', '--gold-2', '--sage', '--rose', '--plum', '--terra', '--amber', '--saffron'].forEach((v) => root.style.setProperty(v, pal.accent));
        root.style.setProperty('--accent-soft', pal.soft);
        root.style.setProperty('--border', pal.border);
      }
    }

    if (customTable) {
      const seats = document.querySelectorAll('[data-table-seat]');
      if (seats.length) {
        seats.forEach((el) => { el.textContent = customTable; el.style.display = ''; });
      } else {
        const anchor = document.querySelector('h1, [data-couple-title]');
        if (anchor && anchor.parentNode && !document.querySelector('.meem-auto-table-pill')) {
          const pill = document.createElement('div');
          pill.className = 'meem-auto-table-pill';
          Object.assign(pill.style, {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            margin: '8px auto 14px',
            padding: '6px 16px',
            borderRadius: '999px',
            background: 'rgba(197, 160, 89, 0.16)',
            border: '1px solid rgba(197, 160, 89, 0.55)',
            color: '#C5A059',
            fontSize: '12.5px',
            fontWeight: '700'
          });
          pill.textContent = (isRTL ? 'رقم الطاولة المخصصة: ' : 'Reserved Table: ') + customTable;
          anchor.parentNode.insertBefore(pill, anchor.nextSibling);
        }
      }
    }

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
      ['تتشرف عائلتا الحاج طارق الشريف والمهندس إبراهيم المنياوي بدعوتكم لحضور حفل زفاف', 'Together with their families, you are warmly invited to celebrate the wedding of', 'تتشرف عائلتا العروسين بدعوتكم • Together with their families'],
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
      ['العاصمة الإدارية، القاهرة', 'New Administrative Capital, Cairo', 'العاصمة الإدارية، القاهرة • Cairo'],
      ['قاعة القصر الملكي — فندق الماسة كابيتال', 'The Royal Palace Hall — Al Masa Hotel Capital', 'قاعة القصر الملكي — Al Masa Hotel Capital'],
      ['العاصمة الإدارية الجديدة، القاهرة، جمهورية مصر العربية', 'New Administrative Capital, Cairo, Egypt', 'العاصمة الإدارية الجديدة، القاهرة • Cairo, Egypt'],
      ['فندق الماسة كابيتال، العاصمة الإدارية الجديدة، القاهرة، مصر', 'Al Masa Hotel Capital, New Administrative Capital, Cairo, Egypt', 'فندق الماسة كابيتال • Al Masa Hotel Capital'],
      ['٢٢', '22', '22']
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
        if (el.textContent.includes('م') || el.textContent.includes('ع')) {
          el.textContent = 'O & S';
        }
      });
      // Convert tear-off calendar day and other date elements to Latin numbers
      document.querySelectorAll('.wi-tear-day, .date-strip span, time, .time, .prog-time').forEach((el) => {
        el.textContent = toLatinDigits(el.textContent);
      });
      // Update RSVP placeholders to English
      document.querySelectorAll('form[data-rsvp-form]').forEach((f) => {
        f.setAttribute('data-lang', 'en');
        const ni = f.querySelector('input[name="guestName"]');
        if (ni) ni.placeholder = 'e.g. Mr. Ahmed Abdel Rahman';
        const no = f.querySelector('textarea[name="note"]');
        if (no) no.placeholder = 'May Allah bless your union with love and happiness...';
      });
      // If couple title is still in Arabic calligraphy, switch to English
      if (!customCouple) {
        document.querySelectorAll('h1, [data-couple-title], .couple-names').forEach((el) => {
          if (/[\u0600-\u06FF]/.test(el.textContent) && el.dataset.coupleEn) {
            el.textContent = el.dataset.coupleEn;
            el.style.fontFamily = "'Cormorant Garamond', 'Cinzel', serif";
          }
        });
      }
    } else if (isAr) {
      document.querySelectorAll('[data-monogram]').forEach((el) => {
        if (el.dataset.monogramAr) {
          el.textContent = el.dataset.monogramAr;
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
    if (!str) return '';
    return String(str).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
  }

  function toLatinDigits(str) {
    if (!str) return '';
    return String(str).replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
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
        const useArDigits = box.hasAttribute('data-ar-digits') && customLang !== 'en';
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

    // Floating Music Mute / Unmute button (shown on all musical invitations, hidden on silent cards)
    const isSilentCard = document.body && document.body.dataset.noMusic === 'true' && !customSong;
    if (!isSilentCard && customSong !== 'silent' && customSong !== 'none' && customSong !== 'mute') {
      const fab = document.createElement('button');
      fab.id = 'wi-music-fab';
      fab.type = 'button';
      fab.setAttribute('aria-label', isRTL ? 'تشغيل أو إيقاف الموسيقى' : 'Toggle Music');
      fab.setAttribute('aria-pressed', musicPlaying ? 'true' : 'false');
      Object.assign(fab.style, {
        position: 'fixed',
        bottom: '18px',
        right: '18px',
        zIndex: '9998',
        width: '36px',
        height: '36px',
        padding: '0',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        background: 'rgba(13, 59, 46, 0.88)',
        color: '#F4E5C2',
        border: '1px solid rgba(197, 160, 89, 0.65)',
        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.28)',
        backdropFilter: 'blur(10px)',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, opacity 0.2s ease'
      });
      fab.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMusic();
      });
      document.body.appendChild(fab);
      updateMusicFab();
    }

    // Allow parent page (Try It Live / Preview Modal) to mute or toggle music cleanly
    window.addEventListener('message', (ev) => {
      if (!ev || !ev.data) return;
      if (ev.data.type === 'meem_music_stop') stopMusic();
      else if (ev.data.type === 'meem_music_toggle') toggleMusic();
    });
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

  
  function initVenuePhoto() {
    const imgSrc = document.body.getAttribute('data-venue-img');
    if (!imgSrc || document.querySelector('.meem-venue-hero, .meem-venue-showcase')) return;
    const label = document.body.getAttribute('data-venue-label') || '';

    // Locate the venue/location section (anchor near maps link or venue-name element)
    const mapLink = document.querySelector('a[href*="maps.google"], a[href*="goo.gl/maps"]');
    let targetContainer = mapLink ? mapLink.closest('section, .card, .venue-card, .box, .panel, .details-card, .section') : null;
    if (!targetContainer) {
      const venueEl = document.querySelector('[data-venue-name]');
      targetContainer = venueEl ? venueEl.closest('section, .card, .venue-card, .box, .panel, main') : null;
    }
    if (!targetContainer) return;

    const wrap = document.createElement('div');
    wrap.className = 'meem-venue-showcase';
    Object.assign(wrap.style, {
      position: 'relative',
      width: '100%',
      maxWidth: '560px',
      height: '200px',
      margin: '16px auto 22px',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid rgba(197, 160, 89, 0.42)',
      boxShadow: '0 14px 36px rgba(0, 0, 0, 0.22)'
    });
    wrap.innerHTML = `<img src="${imgSrc}" alt="${label || 'Venue'}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;">` +
      `<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.04) 42%,rgba(0,0,0,0.68) 100%);pointer-events:none;"></div>` +
      (label ? `<div style="position:absolute;left:14px;right:14px;bottom:11px;color:#FFFDF8;font-size:12px;font-weight:600;letter-spacing:0.08em;text-shadow:0 1px 6px rgba(0,0,0,0.7);text-align:center;">${label}</div>` : '');

    // Insert cleanly before the map buttons group or at the top of the venue card
    const btnGroup = mapLink ? mapLink.closest('.btn-group, .actions, .cta-row') : null;
    if (btnGroup && btnGroup.parentNode) {
      btnGroup.parentNode.insertBefore(wrap, btnGroup);
    } else if (mapLink && mapLink.parentNode) {
      mapLink.parentNode.insertBefore(wrap, mapLink);
    } else {
      targetContainer.appendChild(wrap);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    injectEngineStyles();
    applyGuestPersonalization();
    initVenuePhoto();
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

