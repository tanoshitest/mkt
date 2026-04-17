const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ─────────────────────────────────────────────────
// 1. REPLACE #intro-slides CSS — add video + pushed state
// ─────────────────────────────────────────────────
html = html.replace(
`  /* ── SLIDES ── */
  #intro-slides {`,
`  /* ── VIDEO BG ── */
  #intro-video {
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    opacity: 0;
    z-index: 0;
    transition: opacity 2s ease;
  }
  #intro-video.loaded { opacity: 1; }
  #intro-video.pushed {
    transform: scale(0.95) translateY(-3%);
    opacity: 0 !important;
    transition: transform 0.9s cubic-bezier(0.76,0,0.24,1), opacity 0.7s ease !important;
  }

  /* ── INTRO NAVBAR ── */
  #intro-navbar {
    position: absolute;
    top: 0; left: 0; right: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28px 48px;
  }
  #intro-menu-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    z-index: 11;
  }
  #intro-menu-btn span {
    display: block;
    width: 22px; height: 1.5px;
    background: rgba(255,255,255,0.85);
    border-radius: 1px;
    transition: all 0.3s ease;
  }
  #intro-menu-btn:hover span { background: #fff; }
  .intro-nav-logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  .intro-logo-img { height: 50px; width: auto; }
  .intro-nav-book {
    background: none;
    border: 1px solid rgba(255,255,255,0.28);
    color: rgba(255,255,255,0.8);
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    padding: 10px 20px;
    cursor: pointer;
    transition: border-color 0.3s, color 0.3s, background 0.3s;
    font-family: inherit;
  }
  .intro-nav-book:hover {
    border-color: rgba(255,255,255,0.8);
    color: #fff;
    background: rgba(255,255,255,0.06);
  }
  @media (max-width: 768px) {
    #intro-navbar { padding: 20px 20px; }
    .intro-logo-img { height: 38px; }
    .intro-nav-book { display: none; }
  }

  /* ── SLIDES ── */
  #intro-slides {`
);

// ─────────────────────────────────────────────────
// 2. Hide counter/dots/prev when in video state
// ─────────────────────────────────────────────────
html = html.replace(
`  /* mobile intro col-info */
  @media (max-width: 768px) {`,
`  /* Video state: hide collection UI */
  #intro-right-nav.video-state #intro-prev,
  #intro-right-nav.video-state #intro-counter { display: none; }
  #intro-dots.video-state { opacity: 0; pointer-events: none; }
  #intro-col-info.video-state { display: none; }

  /* mobile intro col-info */
  @media (max-width: 768px) {`
);

// ─────────────────────────────────────────────────
// 3. REPLACE #intro HTML — add video + navbar
// ─────────────────────────────────────────────────
html = html.replace(
`<div id="intro">

  <!-- ── 3 COLLECTION SLIDES ── -->
  <div id="intro-slides">`,
`<div id="intro">

  <!-- Background video (default intro state) -->
  <video id="intro-video" autoplay muted loop playsinline preload="auto"
    poster="https://static.wixstatic.com/media/bbdef6_2d7f0fd954de485da7f97e8c0aec682b~mv2.jpg/v1/crop/x_0,y_45,w_2048,h_861/fill/w_980,h_412,al_c,q_85,enc_avif,quality_auto/503431277_23990548667237579_6772425281413023399_n.jpg">
    <source src="https://video.richardmille.com/mobile/RM-07-01-CC3_packshot_169-header_1.mp4" type="video/mp4">
  </video>

  <!-- Navbar: hamburger · logo · book -->
  <nav id="intro-navbar">
    <button id="intro-menu-btn" onclick="toggleMenu()" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <a href="index.html" class="intro-nav-logo">
      <img src="indentify/mkt final white.png" alt="MKT" class="intro-logo-img">
    </a>
    <button class="intro-nav-book" onclick="window.openBooking ? window.openBooking() : (window.location.href='contact.html')">
      Book Appointment
    </button>
  </nav>

  <!-- ── 3 COLLECTION SLIDES ── -->
  <div id="intro-slides">`
);

// Update dots — no active dot by default (video state)
html = html.replace(
`  <div id="intro-dots">
    <div class="intro-dot on"  data-di="0"></div>
    <div class="intro-dot"     data-di="1"></div>
    <div class="intro-dot"     data-di="2"></div>
  </div>`,
`  <div id="intro-dots" class="video-state">
    <div class="intro-dot" data-di="0"></div>
    <div class="intro-dot" data-di="1"></div>
    <div class="intro-dot" data-di="2"></div>
  </div>`
);

// ─────────────────────────────────────────────────
// 4. REPLACE carousel JS — video state + manual nav
// ─────────────────────────────────────────────────
const OLD_JS = `  // ── INTRO CAROUSEL ──
  (function(){
    const COLLECTIONS = [
      { eyebrow:'01 · Grillz',   title:"M'SCOTIK",    tagline:'Raw luxury. Zero compromise.',          href:'collection-mscotik.html' },
      { eyebrow:'02 · Grillz',   title:"M'CELESTIAL", tagline:'Inspired by the cosmos. Worn by few.',  href:'collection-mcelestial.html' },
      { eyebrow:'03 · Jewelry',  title:"K'HARMONICS", tagline:'Precious stones. Perfect harmony.',     href:'collection-kharmonics.html' }
    ];
    const slides   = Array.from(document.querySelectorAll('.intro-slide'));
    const dots     = Array.from(document.querySelectorAll('.intro-dot'));
    const colInfo  = document.getElementById('intro-col-info');
    const eyebrow  = document.getElementById('icol-eyebrow');
    const title    = document.getElementById('icol-title');
    const tagline  = document.getElementById('icol-tagline');
    const link     = document.getElementById('icol-link');
    const cntCur   = document.getElementById('intro-cnt-cur');
    const barFill  = document.getElementById('intro-bar-fill');
    const EASE     = 'cubic-bezier(0.76,0,0.24,1)';
    const DUR      = 900;
    let cur        = 0;
    let busy       = false;

    function pad(n){ return n < 10 ? '0'+n : ''+n; }

    /* Set text content + trigger stagger animation */
    function setText(idx){
      const c = COLLECTIONS[idx];
      colInfo.classList.remove('text-in');
      eyebrow.textContent = c.eyebrow;
      title.textContent   = c.title;
      tagline.textContent = c.tagline;
      link.href           = c.href;
      setTimeout(() => colInfo.classList.add('text-in'), 30);
    }

    /* Auto-advance progress bar */
    function startBar(){
      clearTimeout(window._introTimer);
      barFill.classList.remove('run');
      barFill.offsetHeight; // reflow
      barFill.classList.add('run');
      window._introTimer = setTimeout(() => goTo((cur + 1) % slides.length, 1), 5000);
    }

    /* Core transition */
    function goTo(next, dir){
      if(busy || next === cur) return;
      busy = true;

      const from = slides[cur];
      const to   = slides[next];

      // Position incoming slide
      to.style.transition = 'none';
      to.style.opacity    = '1';
      to.style.transform  = dir > 0 ? 'translateY(100%)' : 'translateY(-100%)';
      to.style.zIndex     = '3';
      from.style.zIndex   = '2';
      to.offsetHeight; // force reflow

      // Animate in
      to.style.transition = \`transform \${DUR}ms \${EASE}\`;
      to.style.transform  = 'translateY(0)';

      // Animate out: push back + scale + fade
      from.style.transition = \`transform \${DUR}ms \${EASE}, opacity \${DUR}ms ease\`;
      from.style.transform  = dir > 0 ? 'translateY(-7%) scale(0.96)' : 'translateY(7%) scale(0.96)';
      from.style.opacity    = '0';

      // Update dots + counter
      dots[cur].classList.remove('on');
      dots[next].classList.add('on');
      cntCur.textContent = pad(next + 1);
      cur = next;

      setTimeout(() => {
        from.style.zIndex    = '0';
        from.style.transform = 'translateY(100%)'; // reset below
        from.style.opacity   = '1';
        busy = false;
        setText(cur);
        startBar();
      }, DUR + 50);
    }

    /* Init */
    slides.forEach((s, i) => {
      s.style.transition = 'none';
      s.style.transform  = i === 0 ? 'translateY(0)' : 'translateY(100%)';
      s.style.opacity    = '1';
      s.style.zIndex     = i === 0 ? '2' : '0';
    });
    setTimeout(() => { setText(0); startBar(); }, 1400); // wait for intro fade-in

    /* Dots */
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i, i > cur ? 1 : -1)));

    /* Arrows */
    document.getElementById('intro-prev').addEventListener('click', () => goTo((cur - 1 + slides.length) % slides.length, -1));
    document.getElementById('intro-next').addEventListener('click', () => goTo((cur + 1) % slides.length, 1));

    /* Keyboard */
    document.addEventListener('keydown', e => {
      if(document.getElementById('intro').classList.contains('hide')) return;
      if(e.key === 'ArrowDown' || e.key === 'ArrowRight') goTo((cur + 1) % slides.length, 1);
      if(e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  goTo((cur - 1 + slides.length) % slides.length, -1);
    });

    /* Scroll wheel — throttled */
    let wThrottle = false;
    document.getElementById('intro').addEventListener('wheel', e => {
      if(wThrottle || document.getElementById('intro').classList.contains('hide')) return;
      wThrottle = true;
      setTimeout(() => wThrottle = false, 1100);
      goTo(e.deltaY > 0 ? (cur+1)%slides.length : (cur-1+slides.length)%slides.length, e.deltaY > 0 ? 1 : -1);
    }, { passive: true });

    /* Touch swipe */
    let tY = 0;
    const introEl = document.getElementById('intro');
    introEl.addEventListener('touchstart', e => { tY = e.touches[0].clientY; }, { passive: true });
    introEl.addEventListener('touchend',   e => {
      const d = tY - e.changedTouches[0].clientY;
      if(Math.abs(d) > 50) goTo(d > 0 ? (cur+1)%slides.length : (cur-1+slides.length)%slides.length, d > 0 ? 1 : -1);
    });
  })();`;

const NEW_JS = `  // ── INTRO CAROUSEL (manual, video-first) ──
  (function(){
    const COLLECTIONS = [
      { eyebrow:'01 · Grillz',   title:"M'SCOTIK",    tagline:'Raw luxury. Zero compromise.',         href:'collection-mscotik.html' },
      { eyebrow:'02 · Grillz',   title:"M'CELESTIAL", tagline:'Inspired by the cosmos. Worn by few.', href:'collection-mcelestial.html' },
      { eyebrow:'03 · Jewelry',  title:"K'HARMONICS", tagline:'Precious stones. Perfect harmony.',    href:'collection-kharmonics.html' }
    ];
    const slides    = Array.from(document.querySelectorAll('.intro-slide'));
    const dots      = Array.from(document.querySelectorAll('.intro-dot'));
    const colInfo   = document.getElementById('intro-col-info');
    const eyebrowEl = document.getElementById('icol-eyebrow');
    const titleEl   = document.getElementById('icol-title');
    const taglineEl = document.getElementById('icol-tagline');
    const linkEl    = document.getElementById('icol-link');
    const cntCur    = document.getElementById('intro-cnt-cur');
    const rightNav  = document.getElementById('intro-right-nav');
    const dotsWrap  = document.getElementById('intro-dots');
    const video     = document.getElementById('intro-video');
    const EASE      = 'cubic-bezier(0.76,0,0.24,1)';
    const DUR       = 900;
    // cur = -1 → video state; cur = 0,1,2 → collection slides
    let cur  = -1;
    let busy = false;

    function pad(n){ return n < 10 ? '0'+n : ''+n; }

    /* Update UI state based on cur */
    function updateUI(){
      const isVideo = cur === -1;
      const isLast  = cur === slides.length - 1;

      // Video element
      if(isVideo){ video.classList.remove('pushed'); }
      else        { video.classList.add('pushed'); }

      // Collection info
      colInfo.classList.toggle('video-state', isVideo);
      if(isVideo) colInfo.classList.remove('text-in');

      // Right nav: hide prev + counter in video state
      rightNav.classList.toggle('video-state', isVideo);

      // Dots
      dotsWrap.classList.toggle('video-state', isVideo);
      dots.forEach((d, i) => d.classList.toggle('on', i === cur));

      // Counter text
      if(!isVideo) cntCur.textContent = pad(cur + 1);

      // Disable ↓ on last collection
      document.getElementById('intro-next').style.opacity = isLast ? '0.25' : '1';
      document.getElementById('intro-next').style.pointerEvents = isLast ? 'none' : '';
    }

    /* Set collection text with stagger */
    function setText(idx){
      const c = COLLECTIONS[idx];
      colInfo.classList.remove('text-in');
      eyebrowEl.textContent = c.eyebrow;
      titleEl.textContent   = c.title;
      taglineEl.textContent = c.tagline;
      linkEl.href           = c.href;
      setTimeout(() => colInfo.classList.add('text-in'), 30);
    }

    /* Transition: cur → next
       next = -1  means go back to video
       next = 0..2 means show collection slide  */
    function goTo(next){
      if(busy || next === cur) return;
      if(next < -1 || next >= slides.length) return;
      busy = true;

      const dir  = next > cur ? 1 : -1;
      const TRANS = \`transform \${DUR}ms \${EASE}, opacity \${DUR}ms ease\`;

      if(next === -1){
        // Collection → video: slide current collection DOWN + restore video
        const from = slides[cur];
        from.style.transition = TRANS;
        from.style.transform  = 'translateY(100%)';
        from.style.opacity    = '0';
        video.classList.remove('pushed'); // video fades back in
        cur = -1;
        setTimeout(() => {
          from.style.transition = 'none';
          from.style.zIndex     = '0';
          from.style.opacity    = '1';
          busy = false;
          updateUI();
        }, DUR + 50);

      } else if(cur === -1){
        // Video → collection 0: slide collection up from below
        const to = slides[next];
        to.style.transition = 'none';
        to.style.transform  = 'translateY(100%)';
        to.style.opacity    = '1';
        to.style.zIndex     = '3';
        to.offsetHeight;
        to.style.transition = \`transform \${DUR}ms \${EASE}\`;
        to.style.transform  = 'translateY(0)';
        video.classList.add('pushed');
        cur = next;
        setTimeout(() => {
          busy = false;
          updateUI();
          setText(cur);
        }, DUR + 50);

      } else {
        // Collection → collection
        const from = slides[cur];
        const to   = slides[next];
        to.style.transition = 'none';
        to.style.opacity    = '1';
        to.style.transform  = dir > 0 ? 'translateY(100%)' : 'translateY(-100%)';
        to.style.zIndex     = '3';
        from.style.zIndex   = '2';
        to.offsetHeight;
        to.style.transition = \`transform \${DUR}ms \${EASE}\`;
        to.style.transform  = 'translateY(0)';
        from.style.transition = TRANS;
        from.style.transform  = dir > 0 ? 'translateY(-7%) scale(0.96)' : 'translateY(7%) scale(0.96)';
        from.style.opacity    = '0';
        cur = next;
        setTimeout(() => {
          from.style.transition = 'none';
          from.style.zIndex     = '0';
          from.style.transform  = 'translateY(100%)';
          from.style.opacity    = '1';
          busy = false;
          updateUI();
          setText(cur);
        }, DUR + 50);
      }
    }

    /* Init: all slides below viewport, video visible */
    slides.forEach(s => {
      s.style.transition = 'none';
      s.style.transform  = 'translateY(100%)';
      s.style.opacity    = '1';
      s.style.zIndex     = '0';
    });

    // Init video load
    video.addEventListener('canplay', () => video.classList.add('loaded'));
    setTimeout(() => video.classList.add('loaded'), 800);

    updateUI(); // set initial state

    /* Dots */
    dots.forEach((d, i) => d.addEventListener('click', () => {
      if(cur === -1) goTo(i);
      else goTo(i);
    }));

    /* Arrows */
    document.getElementById('intro-prev').addEventListener('click', () => goTo(cur - 1));
    document.getElementById('intro-next').addEventListener('click', () => goTo(cur + 1));

    /* Keyboard */
    document.addEventListener('keydown', e => {
      if(document.getElementById('intro').classList.contains('hide')) return;
      if(e.key === 'ArrowDown' || e.key === 'ArrowRight') goTo(cur + 1);
      if(e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  goTo(cur - 1);
    });

    /* Scroll wheel — throttled */
    let wThrottle = false;
    document.getElementById('intro').addEventListener('wheel', e => {
      if(wThrottle || document.getElementById('intro').classList.contains('hide')) return;
      wThrottle = true;
      setTimeout(() => wThrottle = false, 1100);
      goTo(e.deltaY > 0 ? cur + 1 : cur - 1);
    }, { passive: true });

    /* Touch swipe */
    let tY = 0;
    const introEl = document.getElementById('intro');
    introEl.addEventListener('touchstart', e => { tY = e.touches[0].clientY; }, { passive: true });
    introEl.addEventListener('touchend', e => {
      const d = tY - e.changedTouches[0].clientY;
      if(Math.abs(d) > 50) goTo(d > 0 ? cur + 1 : cur - 1);
    });
  })();`;

html = html.replace(OLD_JS, NEW_JS);

// Remove old video init (now handled inside IIFE)
html = html.replace(
`  // ── INTRO SCREEN ──
  document.body.classList.add('intro-active');

  window.enterSite = function() {`,
`  // ── INTRO SCREEN ──
  document.body.classList.add('intro-active');

  // Video loaded state now handled in carousel IIFE below

  window.enterSite = function() {`
);

fs.writeFileSync('index.html', html);
console.log('Done!');
