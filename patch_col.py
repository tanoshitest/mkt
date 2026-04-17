with open('C:/Users/ADMIN/Desktop/Vibe/MKT/collection.html', 'r', encoding='utf-8') as f:
    html = f.read()

# ── 1. REPLACE CSS FOR SCROLL SECTIONS ───────────────────────────────────────

old_css = """.s3-video-wrap {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100vh;
  z-index: 5;
  overflow: hidden;
}
.s3-video {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center;
}

.s2-curtain {
  position: relative;
  z-index: 15;
  height: 100vh;
  overflow: hidden;
}
.s2-curtain-img {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center;
  filter: brightness(0.5);
}
/* S2 hero text overlay */
.s2-hero-content {
  position: absolute;
  bottom: 80px; left: 80px;
  z-index: 2;
}
.s2-hero-eyebrow {
  font-size: 9px; font-weight: 500; letter-spacing: .5em;
  text-transform: uppercase; color: var(--gold);
  margin-bottom: 20px; opacity: .85;
}
.s2-hero-title {
  font-size: clamp(52px, 8vw, 120px);
  font-weight: 300; font-style: italic;
  line-height: .95; letter-spacing: -.03em;
  color: var(--white); margin-bottom: 0;
}

.s3-spacer {
  height: 100vh;
  position: relative;
  z-index: 0;
}"""

new_css = """/* ── S2 HERO: truly fixed, always in background ── */
.s2-hero {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100vh;
  z-index: 8;
  overflow: hidden;
  transition: opacity 0.9s ease;
}
.s2-hero-img {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center;
  filter: brightness(0.45);
}
.s2-hero-content {
  position: absolute;
  bottom: 80px; left: 80px;
  z-index: 2;
}
.s2-hero-eyebrow {
  font-size: 9px; font-weight: 500; letter-spacing: .5em;
  text-transform: uppercase; color: var(--gold);
  margin-bottom: 20px; opacity: .85;
}
.s2-hero-title {
  font-size: clamp(52px, 8vw, 120px);
  font-weight: 300; font-style: italic;
  line-height: .95; letter-spacing: -.03em;
  color: var(--white); margin-bottom: 0;
}

/* Spacer so user "rests" on hero before text arrives */
.s2-spacer { height: 100vh; position: relative; z-index: 0; }

/* ── TEXT SECTION: scrolls up over fixed hero ── */
.s2-text-section {
  position: relative;
  z-index: 15;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* gradient: transparent at top (hero shows) → dark for text readability */
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(8,8,8,0.88) 18%,
    rgba(8,8,8,0.96) 50%,
    rgba(8,8,8,1) 100%
  );
  padding: 120px 80px 140px;
}
.s2-text-inner {
  max-width: 760px;
  width: 100%;
}
.s2-text-label {
  font-size: 9px; font-weight: 500; letter-spacing: .45em;
  text-transform: uppercase; color: var(--gold);
  margin-bottom: 40px; opacity: .8;
  display: flex; align-items: center; gap: 16px;
}
.s2-text-label::before {
  content: ''; width: 32px; height: 1px; background: var(--gold);
}
.s2-text-para {
  font-size: clamp(18px, 2.2vw, 28px);
  font-weight: 300; font-style: italic;
  line-height: 1.7; letter-spacing: -.01em;
  color: rgba(245,240,234,.75);
  margin-bottom: 48px;
}
.s2-text-para strong {
  color: var(--white); font-weight: 400; font-style: normal;
}
.s2-text-sig {
  font-size: 11px; letter-spacing: .3em; text-transform: uppercase;
  color: rgba(245,240,234,.3); font-weight: 400;
}

/* ── S3 VIDEO: fixed, revealed after text scrolls past ── */
.s3-video-wrap {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100vh;
  z-index: 5;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.9s ease;
}
.s3-video-wrap.visible { opacity: 1; }
.s3-video {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Spacer so user "rests" on video */
.s3-spacer { height: 100vh; position: relative; z-index: 0; }"""

html = html.replace(old_css, new_css)

# ── 2. REPLACE HTML SECTIONS ─────────────────────────────────────────────────

old_html = """<!-- S3: truly fixed video background -->
<div class="s3-video-wrap">
  <video class="s3-video" autoplay muted loop playsinline>
    <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4">
    <source src="https://videos.pexels.com/video-files/2278095/2278095-hd_1920_1080_24fps.mp4" type="video/mp4">
  </video>
</div>

<!-- S2: curtain — covers video, scrolls away to reveal it -->
<section class="s2-curtain">
  <img class="s2-curtain-img"
    src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=90&fit=crop"
    alt="MKT Collection">
  <div class="s2-hero-content">
    <div class="s2-hero-eyebrow">2025 · Handcrafted in Vietnam</div>
    <h1 class="s2-hero-title">THE<br>COLLECTION</h1>
  </div>
</section>

<!-- Spacer: user "views" the video before S1 arrives -->
<div class="s3-spacer"></div>"""

new_html = """<!-- S2: Hero image — truly fixed in background -->
<div class="s2-hero" id="s2Hero">
  <img class="s2-hero-img"
    src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=90&fit=crop"
    alt="MKT Collection">
  <div class="s2-hero-content">
    <div class="s2-hero-eyebrow">2025 · Handcrafted in Vietnam</div>
    <h1 class="s2-hero-title">THE<br>COLLECTION</h1>
  </div>
</div>

<!-- Spacer: user views hero initially -->
<div class="s2-spacer"></div>

<!-- Text section: scrolls up over fixed hero, user reads before video -->
<section class="s2-text-section" id="s2TextSection">
  <div class="s2-text-inner">
    <div class="s2-text-label">Our Philosophy</div>
    <p class="s2-text-para">
      At <strong>MKT</strong>, we believe that jewelry is not merely decoration — it is an extension of identity. Each grillz, each chain, each custom piece is born from a conversation between the wearer and the craftsman. We listen to your vision, translate it into gold and stone, and return to you something that is undeniably, irreversibly <strong>yours</strong>.
    </p>
    <p class="s2-text-para">
      Our artisans in Ho Chi Minh City work with the same precision that defines the world's finest ateliers — yet we bring to it something no European house can replicate: the soul of Vietnamese craftsmanship, the rhythm of the street, the language of flex spoken fluently and authentically.
    </p>
    <div class="s2-text-sig">MKT · Wear Grillz Not Only To Flex</div>
  </div>
</section>

<!-- S3: Video — fixed, fades in after text scrolls away -->
<div class="s3-video-wrap" id="s3VideoWrap">
  <video class="s3-video" autoplay muted loop playsinline>
    <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4">
    <source src="https://videos.pexels.com/video-files/2278095/2278095-hd_1920_1080_24fps.mp4" type="video/mp4">
  </video>
</div>

<!-- Spacer: user views video -->
<div class="s3-spacer"></div>"""

html = html.replace(old_html, new_html)

# ── 3. REPLACE JS SCROLL HANDLER ─────────────────────────────────────────────

# Find and replace the drag-scroll section + add reveal logic
old_js = """/* Drag-scroll for collection slider */
(function(){
  var wrap = document.getElementById('colSliderWrap');
  var slider = document.getElementById('colSlider');"""

new_js = """/* Scroll reveal: hero fades out, video fades in after text section */
(function(){
  var s2Hero = document.getElementById('s2Hero');
  var s3Video = document.getElementById('s3VideoWrap');
  var textSection = document.getElementById('s2TextSection');
  if (!s2Hero || !s3Video || !textSection) return;

  function updateReveal() {
    var textBottom = textSection.getBoundingClientRect().bottom;
    var textPast = textBottom <= 0;
    // Video fades in when text has fully scrolled past viewport
    s3Video.classList.toggle('visible', textPast);
    s2Hero.style.opacity = textPast ? '0' : '1';
  }

  window.addEventListener('scroll', updateReveal, { passive: true });
  updateReveal();
})();

/* Drag-scroll for collection slider */
(function(){
  var wrap = document.getElementById('colSliderWrap');
  var slider = document.getElementById('colSlider');"""

html = html.replace(old_js, new_js)

with open('C:/Users/ADMIN/Desktop/Vibe/MKT/collection.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Done')
