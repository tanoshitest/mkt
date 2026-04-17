import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('universe.html', 'r', encoding='utf-8') as f:
    content = f.read()

# ── Replace S1 CSS ──
old_css_marker = '/* ── SECTION 1: FULL-BLEED IMAGE HERO ── */'
new_css_marker = '/* ── SECTION 2: STICKY DARK IMAGE ── */'

idx_start = content.find(old_css_marker)
idx_end   = content.find(new_css_marker)

if idx_start == -1 or idx_end == -1:
    print(f'CSS markers not found: start={idx_start} end={idx_end}')
else:
    new_s1_css = """    /* ── SECTION 1: TWO-COLUMN LIGHT ── */
    .s1 {
      position: relative;
      z-index: 20;
      background: #fff;
      min-height: 100vh;
      display: grid;
      grid-template-columns: 38% 62%;
    }
    .s1-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 140px 60px 80px 80px;
      border-right: 1px solid rgba(0,0,0,0.06);
    }
    .eyebrow {
      font-size: 9px;
      font-weight: 400;
      letter-spacing: 0.38em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 28px;
    }
    .s1-title {
      font-family: var(--serif);
      font-size: clamp(52px, 5.5vw, 86px);
      font-weight: 700;
      line-height: 0.92;
      letter-spacing: -0.02em;
      color: var(--text);
      margin-bottom: 36px;
    }
    .s1-body {
      font-size: 13px;
      font-weight: 300;
      line-height: 1.9;
      color: var(--muted);
      letter-spacing: 0.01em;
      max-width: 400px;
    }
    .s1-right {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .s1-tabs {
      display: flex;
      align-items: flex-end;
      padding: 120px 60px 0;
      justify-content: flex-end;
      border-bottom: 1px solid rgba(0,0,0,0.08);
      flex-shrink: 0;
    }
    .s1-tab {
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 0.01em;
      color: rgba(100,96,92,0.5);
      padding: 0 24px 16px;
      cursor: pointer;
      background: none;
      border: none;
      font-family: var(--sans);
      position: relative;
      transition: color 0.3s;
      white-space: nowrap;
    }
    .s1-tab::after {
      content: '';
      position: absolute;
      bottom: -1px; left: 24px; right: 24px;
      height: 1.5px;
      background: var(--text);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
    }
    .s1-tab.active { color: var(--text); font-weight: 500; }
    .s1-tab.active::after { transform: scaleX(1); }
    .s1-tab:hover:not(.active) { color: var(--text); }
    .s1-slider-wrap {
      flex: 1;
      overflow: hidden;
      cursor: grab;
      user-select: none;
      min-height: 0;
    }
    .s1-slider-wrap:active { cursor: grabbing; }
    .s1-slider {
      display: flex;
      height: 100%;
      gap: 4px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding: 4px 0 0 4px;
    }
    .s1-slider::-webkit-scrollbar { display: none; }
    .s1-slide {
      flex: 0 0 calc(50% - 2px);
      scroll-snap-align: start;
      overflow: hidden;
      position: relative;
      background: #111;
    }
    .s1-slide img {
      width: 100%; height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.7s cubic-bezier(0.16,1,0.3,1);
      pointer-events: none;
    }
    .s1-slide:hover img { transform: scale(1.04); }
    .s1-slide-lbl {
      position: absolute;
      bottom: 16px; left: 16px;
      font-size: 8px;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.4);
      font-weight: 500;
    }
    .scroll-hint {
      position: absolute;
      bottom: 36px; left: 80px;
      display: flex; align-items: center; gap: 12px;
      font-size: 9px; letter-spacing: 0.32em; text-transform: uppercase;
      color: rgba(26,22,20,0.3); pointer-events: none;
    }
    .scroll-hint-line {
      width: 36px; height: 1px;
      background: rgba(26,22,20,0.2);
      position: relative; overflow: hidden;
    }
    .scroll-hint-line::after {
      content: '';
      position: absolute; left: -100%; top: 0; bottom: 0; width: 100%;
      background: var(--gold);
      animation: lineSlide 2s ease-in-out infinite;
    }
    @keyframes lineSlide { 0%{left:-100%} 50%{left:0%} 100%{left:100%} }

    """
    content = content[:idx_start] + new_s1_css + content[idx_end:]
    print('CSS replaced OK')

# ── Replace S1 HTML ──
old_html_start = '<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n     SECTION 1'
old_html_end   = '<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n     SECTION 2'

idx_h1 = content.find(old_html_start)
idx_h2 = content.find(old_html_end)

if idx_h1 == -1 or idx_h2 == -1:
    print(f'HTML markers not found: start={idx_h1} end={idx_h2}')
else:
    new_s1_html = """<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
     SECTION 1 \u2014 Two-column: text + slider
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->
<section class="s1">

  <!-- Left: text -->
  <div class="s1-left">
    <span class="eyebrow">RM 07-01 \u00b7 Coloured Ceramics</span>
    <h1 class="s1-title">LAVENDER<br>PINK</h1>
    <p class="s1-body">
      Every reflection emanating from the new RM 07-01 Coloured Ceramics awakens the memory, brilliantly sealing the creativity of an object that has become truly symbolic. The dials radiate, textures come to life, and colours vibrate as the world undergoes a metamorphosis: the shades compose a dreamlike universe where technical mastery diffracts the ordinary. The diamond, placed upon the material like an eternal snowflake, immortalises this moment.
    </p>
  </div>

  <!-- Right: tabs + draggable image slider -->
  <div class="s1-right">
    <div class="s1-tabs">
      <button class="s1-tab active" data-tab="lavender">Lavender Pink</button>
      <button class="s1-tab" data-tab="blue">Powder Blue</button>
      <button class="s1-tab" data-tab="blush">Blush Pink</button>
    </div>
    <div class="s1-slider-wrap" id="s1SliderWrap">
      <div class="s1-slider" id="s1Slider">
        <div class="s1-slide">
          <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=85&fit=crop" alt="Front view" loading="lazy">
          <span class="s1-slide-lbl">Front view</span>
        </div>
        <div class="s1-slide">
          <img src="https://images.unsplash.com/photo-1619134778706-7015533a6150?w=900&q=85&fit=crop" alt="Side view" loading="lazy">
          <span class="s1-slide-lbl">Side view</span>
        </div>
        <div class="s1-slide">
          <img src="https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=900&q=85&fit=crop" alt="Movement" loading="lazy">
          <span class="s1-slide-lbl">Movement</span>
        </div>
        <div class="s1-slide">
          <img src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=900&q=85&fit=crop" alt="Detail" loading="lazy">
          <span class="s1-slide-lbl">Detail</span>
        </div>
      </div>
    </div>
  </div>

  <div class="scroll-hint">
    <div class="scroll-hint-line"></div>
    Scroll to explore
  </div>

</section>

"""
    content = content[:idx_h1] + new_s1_html + content[idx_h2:]
    print('HTML replaced OK')

# ── Also fix responsive CSS ──
content = content.replace(
    '      .s1-inner { grid-template-columns: 1fr; }\n      .s1-left { padding: 60px 40px 40px; border-right: none; border-bottom: 1px solid var(--border); }\n      .s1-right { padding: 40px 40px 60px; }',
    '      .s1 { grid-template-columns: 1fr; }\n      .s1-left { padding: 80px 40px 40px; border-right: none; border-bottom: 1px solid rgba(0,0,0,0.06); }\n      .s1-right { min-height: 60vh; }'
)
content = content.replace(
    '      .s1-content { padding: 0 24px 60px; }',
    '      .s1-left { padding: 60px 24px 40px; }\n      .s1-tabs { padding: 24px 24px 0; justify-content: flex-start; }'
)

with open('universe.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('File saved OK')
