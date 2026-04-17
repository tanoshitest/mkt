with open('universe.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 0-indexed line ranges (inclusive)
# S1: lines 589-637  → idx 588-636
# S3: lines 639-720  → idx 638-719
# S2: lines 722-732  → idx 721-731
# FOOTER comment: line 734 → idx 733

s1_block = ''.join(lines[588:637])   # includes </section> + blank
s3_block = ''.join(lines[638:720])   # includes </section>
s2_block = ''.join(lines[721:732])   # includes </section>

before = ''.join(lines[:588])        # everything up to (not including) S1
after  = ''.join(lines[732:])        # FOOTER onwards

# ── New section blocks ────────────────────────────────────────────

new_s2 = '''\
<!-- ════════════════════════════════════════
     SECTION 2 — Full-bleed showroom image (scrolls away first)
════════════════════════════════════════ -->
<section class="s2">
  <img
    class="s2-img"
    src="https://images.unsplash.com/photo-1622434641406-a158123450f9?w=1920&q=90&fit=crop"
    alt="MKT Showroom"
    loading="lazy"
  >
</section>

'''

new_s3 = '''\
<!-- ════════════════════════════════════════
     SECTION 3 — Sticky full-bleed image (fixed while S1 slides over)
════════════════════════════════════════ -->
<section class="s3">
  <img
    class="s3-img"
    src="https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=1920&q=90&fit=crop"
    alt="MKT Showroom Interior"
    loading="lazy"
  >
</section>

'''

new_s1 = '''\
<!-- ════════════════════════════════════════
     SECTION 1 — Two-column: text + slider (slides over sticky S3)
════════════════════════════════════════ -->
''' + '\n'.join(s1_block.split('\n')[3:])  # skip old comment lines, keep from <section>

new_html = before + new_s2 + new_s3 + new_s1 + after

# ── Update CSS ────────────────────────────────────────────────────

import re

# S2 CSS: normal z-index 20, no sticky
new_html = re.sub(
    r'/\* S2: full-bleed showroom[^*]*\*/\s*\.s2 \{[^}]+\}\s*\.s2-img \{[^}]+\}',
    '''/* S2: showroom image — scrolls away normally */
    .s2 {
      position: relative;
      z-index: 20;
      height: 100vh;
      overflow: hidden;
    }
    .s2-img {
      width: 100%; height: 100%;
      object-fit: cover;
      object-position: center;
    }''',
    new_html, flags=re.DOTALL
)

# S3 CSS: sticky pin
new_html = re.sub(
    r'/\* S3: sticky full-bleed[^*]*\*/\s*\.s3 \{[^}]+\}\s*\.s3-img \{[^}]+\}',
    '''/* S3: sticky image — pins while S1 slides over it */
    .s3 {
      position: sticky;
      top: 0;
      height: 100vh;
      z-index: 10;
      overflow: hidden;
    }
    .s3-img {
      width: 100%; height: 100%;
      object-fit: cover;
      object-position: center;
    }''',
    new_html, flags=re.DOTALL
)

# Also fix the old CSS comment labels
new_html = new_html.replace(
    '/* ── SECTION 2: STICKY DARK IMAGE ── */',
    '/* ── SECTION 2: FULL-BLEED SHOWROOM (z-20) ── */'
)
new_html = new_html.replace(
    '/* ── SECTION 3: DETAIL CONTENT ── */',
    '/* ── SECTION 3: STICKY IMAGE BEHIND S1 (z-10) ── */'
)

with open('universe.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print('Done!')
print('New order: S2 (showroom) → S3 (sticky image) → S1 (two-col slides over)')
