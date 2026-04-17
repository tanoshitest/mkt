const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ─────────────────────────────────────────────────
// 1. REPLACE #intro-video CSS  →  #intro-slides CSS
// ─────────────────────────────────────────────────
html = html.replace(
`  /* video bg */
  #intro-video {
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 2s ease;
  }
  #intro-video.loaded { opacity: 1; }`,

`  /* ── SLIDES ── */
  #intro-slides {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
  }
  .intro-slide {
    position: absolute;
    inset: 0;
    will-change: transform, opacity;
    z-index: 0;
  }
  .intro-slide-bg {
    position: absolute;
    inset: -6%;
    background-size: cover;
    background-position: center center;
    transition: transform 8s cubic-bezier(0.25,0,0,1);
  }
  .intro-slide.is-active .intro-slide-bg { transform: scale(1); }
  .intro-slide:not(.is-active) .intro-slide-bg { transform: scale(1.06); }`
);

// ─────────────────────────────────────────────────
// 2. ADD new CSS after  body.intro-active { overflow: hidden; }
// ─────────────────────────────────────────────────
html = html.replace(
`  /* body locked while intro shows */
  body.intro-active { overflow: hidden; }`,

`  /* body locked while intro shows */
  body.intro-active { overflow: hidden; }

  /* ── COLLECTION INFO (bottom-left) ── */
  #intro-col-info {
    position: absolute;
    bottom: 80px;
    left: 60px;
    z-index: 5;
  }
  .icol-eyebrow {
    display: block;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: .5em;
    text-transform: uppercase;
    color: rgba(255,255,255,.5);
    margin-bottom: 14px;
    opacity: 0;
    transform: translateY(18px);
    transition: opacity .6s ease, transform .6s cubic-bezier(.16,1,.3,1);
  }
  .icol-title {
    display: block;
    font-size: clamp(28px,4vw,58px);
    font-weight: 800;
    letter-spacing: -.04em;
    text-transform: uppercase;
    color: #fff;
    line-height: .9;
    margin: 0 0 14px;
    opacity: 0;
    transform: translateY(28px);
    transition: opacity .7s ease .1s, transform .7s cubic-bezier(.16,1,.3,1) .1s;
  }
  .icol-tagline {
    display: block;
    font-size: clamp(12px,1vw,14px);
    font-weight: 300;
    letter-spacing: .06em;
    color: rgba(255,255,255,.6);
    margin: 0 0 28px;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity .6s ease .22s, transform .6s ease .22s;
  }
  .icol-link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: .35em;
    text-transform: uppercase;
    color: #fff;
    text-decoration: none;
    border-bottom: 1px solid rgba(255,255,255,.35);
    padding-bottom: 5px;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity .5s ease .38s, transform .5s ease .38s, border-color .3s;
  }
  .icol-link:hover { border-bottom-color: #fff; }
  /* text-in state */
  #intro-col-info.text-in .icol-eyebrow,
  #intro-col-info.text-in .icol-title,
  #intro-col-info.text-in .icol-tagline,
  #intro-col-info.text-in .icol-link {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── RIGHT-SIDE NAV (counter + arrows) ── */
  #intro-right-nav {
    position: absolute;
    right: 48px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }
  .intro-arrow-btn {
    width: 40px; height: 40px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,.22);
    background: rgba(255,255,255,.04);
    color: rgba(255,255,255,.75);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    font-size: 12px;
    transition: border-color .3s, color .3s, background .3s;
    flex-shrink: 0;
  }
  .intro-arrow-btn:hover {
    border-color: rgba(255,255,255,.7);
    color: #fff;
    background: rgba(255,255,255,.1);
  }
  #intro-counter {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 14px 0;
    gap: 6px;
  }
  .intro-cnt-num {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: .2em;
    color: rgba(255,255,255,.9);
    line-height: 1;
  }
  .intro-cnt-bar {
    width: 1px;
    height: 40px;
    background: rgba(255,255,255,.18);
    position: relative;
    overflow: hidden;
  }
  .intro-cnt-bar-fill {
    position: absolute;
    top: -100%;
    left: 0; right: 0;
    height: 100%;
    background: #fff;
    transition: top 5s linear;
  }
  .intro-cnt-bar-fill.run { top: 0; }
  .intro-cnt-total {
    font-size: 10px;
    font-weight: 400;
    letter-spacing: .2em;
    color: rgba(255,255,255,.35);
    line-height: 1;
  }

  /* ── PROGRESS DOTS (bottom-center) ── */
  #intro-dots {
    position: absolute;
    bottom: 36px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .intro-dot {
    width: 18px; height: 1px;
    background: rgba(255,255,255,.3);
    cursor: pointer;
    transition: width .35s ease, background .35s ease;
  }
  .intro-dot.on { width: 34px; background: rgba(255,255,255,.9); }

  /* mobile intro col-info */
  @media (max-width: 768px) {
    #intro-col-info { left: 24px; bottom: 100px; }
    #intro-right-nav { right: 20px; }
  }`
);

// ─────────────────────────────────────────────────
// 3. REPLACE #intro HTML
// ─────────────────────────────────────────────────
html = html.replace(
`<div id="intro">
  <!-- Fullscreen video -->
  <video id="intro-video" autoplay muted loop playsinline preload="auto"
    poster="https://static.wixstatic.com/media/bbdef6_2d7f0fd954de485da7f97e8c0aec682b~mv2.jpg/v1/crop/x_0,y_45,w_2048,h_861/fill/w_980,h_412,al_c,q_85,enc_avif,quality_auto/503431277_23990548667237579_6772425281413023399_n.jpg">
    <source src="https://video.richardmille.com/mobile/RM-07-01-CC3_packshot_169-header_1.mp4" type="video/mp4">
  </video>
  <div id="intro-noise"></div>
  <!-- Center content -->
  <div id="intro-content">
    <button id="intro-btn" onclick="enterSite()">
      <span>Explore</span>
      <span class="btn-arrow">→</span>
    </button>
  </div>
</div>`,

`<div id="intro">

  <!-- ── 3 COLLECTION SLIDES ── -->
  <div id="intro-slides">
    <div class="intro-slide" data-idx="0">
      <div class="intro-slide-bg" style="background-image:url('https://static.wixstatic.com/media/bbdef6_2d7f0fd954de485da7f97e8c0aec682b~mv2.jpg/v1/fill/w_1920,h_1080,al_c,q_85,enc_avif,quality_auto/img.jpg')"></div>
    </div>
    <div class="intro-slide" data-idx="1">
      <div class="intro-slide-bg" style="background-image:url('https://static.wixstatic.com/media/bbdef6_65d32ccb79c84bc99a9c6bee0c32aed5~mv2.jpg/v1/fill/w_1920,h_1080,al_c,q_85,enc_avif,quality_auto/img.jpg')"></div>
    </div>
    <div class="intro-slide" data-idx="2">
      <div class="intro-slide-bg" style="background-image:url('https://static.wixstatic.com/media/bbdef6_96a26e43df3447a7a58726ff6edd5495~mv2.jpg/v1/fill/w_1920,h_1080,al_c,q_85,enc_avif,quality_auto/img.jpg')"></div>
    </div>
  </div>

  <!-- Noise overlay -->
  <div id="intro-noise"></div>

  <!-- Collection info — bottom left -->
  <div id="intro-col-info">
    <span class="icol-eyebrow" id="icol-eyebrow"></span>
    <span class="icol-title"   id="icol-title"></span>
    <span class="icol-tagline" id="icol-tagline"></span>
    <a    class="icol-link"    id="icol-link" href="#">Discover →</a>
  </div>

  <!-- EXPLORE button — center -->
  <div id="intro-content">
    <button id="intro-btn" onclick="enterSite()">
      <span>Explore</span>
      <span class="btn-arrow">→</span>
    </button>
  </div>

  <!-- Right nav: arrow up · counter · arrow down -->
  <div id="intro-right-nav">
    <button class="intro-arrow-btn" id="intro-prev" aria-label="Previous">&#8593;</button>
    <div id="intro-counter">
      <span class="intro-cnt-num" id="intro-cnt-cur">01</span>
      <div class="intro-cnt-bar"><div class="intro-cnt-bar-fill" id="intro-bar-fill"></div></div>
      <span class="intro-cnt-total">03</span>
    </div>
    <button class="intro-arrow-btn" id="intro-next" aria-label="Next">&#8595;</button>
  </div>

  <!-- Dots — bottom center -->
  <div id="intro-dots">
    <div class="intro-dot on"  data-di="0"></div>
    <div class="intro-dot"     data-di="1"></div>
    <div class="intro-dot"     data-di="2"></div>
  </div>

</div>`
);

// ─────────────────────────────────────────────────
// 4. REPLACE intro JS init  →  keep enterSite + add carousel
// ─────────────────────────────────────────────────
html = html.replace(
`  // ── INTRO SCREEN ──
  document.body.classList.add('intro-active');

  const introVideo = document.getElementById('intro-video');
  introVideo.addEventListener('canplay', () => introVideo.classList.add('loaded'));
  setTimeout(() => introVideo.classList.add('loaded'), 800);

  window.enterSite = function() {
    const intro = document.getElementById('intro');
    intro.classList.add('hide');
    document.body.classList.remove('intro-active');
    sessionStorage.setItem('mkt_entered', '1');
    setTimeout(() => { if (intro.parentNode) intro.remove(); }, 1400);
  };`,

`  // ── INTRO SCREEN ──
  document.body.classList.add('intro-active');

  window.enterSite = function() {
    const intro = document.getElementById('intro');
    intro.classList.add('hide');
    document.body.classList.remove('intro-active');
    sessionStorage.setItem('mkt_entered', '1');
    clearTimeout(window._introTimer);
    setTimeout(() => { if (intro.parentNode) intro.remove(); }, 1400);
  };

  // ── INTRO CAROUSEL ──
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
      requestAnimationFrame(() => requestAnimationFrame(() => colInfo.classList.add('text-in')));
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
  })();`
);

fs.writeFileSync('index.html', html);
console.log('Done!');
