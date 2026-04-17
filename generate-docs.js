const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageNumber, Header, Footer, ExternalHyperlink,
  LevelFormat, PageBreak, UnderlineType
} = require('docx');
const fs = require('fs');

// ─── HELPERS ───────────────────────────────────────────────────────────────
const GOLD   = '4169E1';
const WHITE  = 'F5F0EA';
const DARK   = '161514';
const BLACK  = '080808';
const GRAY   = '888480';
const PAGE_W = 12240; // US Letter
const PAGE_H = 15840;
const MARGIN = 1080;  // 0.75 inch
const CONTENT_W = PAGE_W - MARGIN * 2; // 10080

const border = (color = 'DDDDDD', size = 4) =>
  ({ style: BorderStyle.SINGLE, size, color });

const cellBorders = (color = 'DDDDDD') => ({
  top: border(color), bottom: border(color),
  left: border(color), right: border(color),
});

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 160 },
    children: [new TextRun({ text, bold: true, size: 36, color: WHITE, font: 'Montserrat' })],
    shading: { fill: '1A1A2E', type: ShadingType.CLEAR },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: GOLD, space: 4 } },
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 320, after: 120 },
    children: [new TextRun({ text, bold: true, size: 28, color: GOLD, font: 'Montserrat' })],
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 240, after: 80 },
    children: [new TextRun({ text, bold: true, size: 24, color: '2C3E50', font: 'Montserrat' })],
  });
}

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 80, after: 100 },
    children: [new TextRun({ text, size: 22, font: 'Calibri', color: '2C2C2C', ...opts })],
  });
}

function bold(text) { return new TextRun({ text, bold: true, size: 22, font: 'Calibri', color: '1A1A2E' }); }
function code(text) { return new TextRun({ text, font: 'Courier New', size: 20, color: '8B0000', shading: { fill: 'F5F5F5', type: ShadingType.CLEAR } }); }
function note(text) { return new TextRun({ text, size: 20, color: '888888', italics: true, font: 'Calibri' }); }

function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: 'bullets', level },
    spacing: { before: 40, after: 40 },
    children: typeof text === 'string'
      ? [new TextRun({ text, size: 21, font: 'Calibri', color: '2C2C2C' })]
      : text,
  });
}

function numbered(text, level = 0) {
  return new Paragraph({
    numbering: { reference: 'numbers', level },
    spacing: { before: 60, after: 60 },
    children: typeof text === 'string'
      ? [new TextRun({ text, size: 21, font: 'Calibri', color: '2C2C2C' })]
      : [text],
  });
}

function divider() {
  return new Paragraph({
    spacing: { before: 160, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'E0E0E0', space: 1 } },
    children: [],
  });
}

function codeBlock(lines) {
  return lines.map(line =>
    new Paragraph({
      spacing: { before: 0, after: 0 },
      shading: { fill: 'F0F0F0', type: ShadingType.CLEAR },
      children: [new TextRun({ text: line, font: 'Courier New', size: 18, color: '1A1A1A' })],
    })
  );
}

function infoBox(label, content) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [1800, CONTENT_W - 1800],
    rows: [new TableRow({
      children: [
        new TableCell({
          borders: cellBorders(GOLD),
          width: { size: 1800, type: WidthType.DXA },
          shading: { fill: '1A1A2E', type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, color: WHITE, size: 20, font: 'Montserrat' })] })],
        }),
        new TableCell({
          borders: cellBorders('E0E0E0'),
          width: { size: CONTENT_W - 1800, type: WidthType.DXA },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun({ text: content, size: 21, font: 'Calibri', color: '2C2C2C' })] })],
        }),
      ],
    })],
  });
}

function twoColTable(rows, headers, colWidths = [3360, 6720]) {
  const headerRow = headers ? new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => new TableCell({
      borders: cellBorders(GOLD),
      width: { size: colWidths[i], type: WidthType.DXA },
      shading: { fill: '1A1A2E', type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: WHITE, size: 20, font: 'Montserrat' })] })],
    })),
  }) : null;

  const dataRows = rows.map(([c1, c2]) => new TableRow({
    children: [
      new TableCell({
        borders: cellBorders('DDDDDD'),
        width: { size: colWidths[0], type: WidthType.DXA },
        shading: { fill: 'FAFAFA', type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [bold(c1)] })],
      }),
      new TableCell({
        borders: cellBorders('DDDDDD'),
        width: { size: colWidths[1], type: WidthType.DXA },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: c2, size: 21, font: 'Calibri', color: '2C2C2C' })] })],
      }),
    ],
  }));

  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: headerRow ? [headerRow, ...dataRows] : dataRows,
  });
}

function threeColTable(rows, headers, colWidths = [2520, 3528, 4032]) {
  const headerRow = headers ? new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => new TableCell({
      borders: cellBorders(GOLD),
      width: { size: colWidths[i], type: WidthType.DXA },
      shading: { fill: '1A1A2E', type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: WHITE, size: 20, font: 'Montserrat' })] })],
    })),
  }) : null;

  const dataRows = rows.map(cols => new TableRow({
    children: cols.map((c, i) => new TableCell({
      borders: cellBorders('DDDDDD'),
      width: { size: colWidths[i], type: WidthType.DXA },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      shading: { fill: 'FAFAFA', type: ShadingType.CLEAR },
      children: [new Paragraph({ children: [new TextRun({ text: c, size: 20, font: 'Calibri', color: '2C2C2C' })] })],
    })),
  }));

  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: headerRow ? [headerRow, ...dataRows] : dataRows,
  });
}

function space(n = 1) {
  return Array.from({ length: n }, () => new Paragraph({ children: [], spacing: { before: 0, after: 60 } }));
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function coverSection() {
  return [
    new Paragraph({
      spacing: { before: 1200, after: 0 },
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: 'MKT & Co.', font: 'Montserrat', size: 72, bold: true, color: GOLD })],
    }),
    new Paragraph({
      spacing: { before: 80, after: 0 },
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: 'WEAR GRILLZ NOT ONLY TO FLEX', font: 'Montserrat', size: 28, color: GRAY, bold: false })],
    }),
    new Paragraph({
      spacing: { before: 200, after: 0 },
      alignment: AlignmentType.CENTER,
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GOLD, space: 4 } },
      children: [],
    }),
    new Paragraph({
      spacing: { before: 200, after: 80 },
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: 'TECHNICAL DOCUMENTATION', font: 'Montserrat', size: 36, bold: true, color: '2C3E50' })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: 'Full-Stack Developer Reference  ·  Frontend · Backend · Database · Deployment', font: 'Calibri', size: 22, color: GRAY })],
    }),
    new Paragraph({
      spacing: { before: 120, after: 0 },
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `Version 1.0  ·  ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}`, font: 'Calibri', size: 20, color: 'AAAAAA' })],
    }),
    pageBreak(),
  ];
}

// ─── DOCUMENT BUILD ─────────────────────────────────────────────────────────
const doc = new Document({
  numbering: {
    config: [
      {
        reference: 'bullets',
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: '\u2022', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 560, hanging: 280 } } },
        }, {
          level: 1, format: LevelFormat.BULLET, text: '\u25E6', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1080, hanging: 280 } } },
        }],
      },
      {
        reference: 'numbers',
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 560, hanging: 280 } } },
        }],
      },
    ],
  },
  styles: {
    default: { document: { run: { font: 'Calibri', size: 22 } } },
    paragraphStyles: [
      {
        id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 36, bold: true, font: 'Montserrat', color: WHITE },
        paragraph: { spacing: { before: 400, after: 160 }, outlineLevel: 0 },
      },
      {
        id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 28, bold: true, font: 'Montserrat', color: GOLD },
        paragraph: { spacing: { before: 320, after: 120 }, outlineLevel: 1 },
      },
      {
        id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 24, bold: true, font: 'Montserrat', color: '2C3E50' },
        paragraph: { spacing: { before: 240, after: 80 }, outlineLevel: 2 },
      },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: PAGE_W, height: PAGE_H },
        margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: GOLD, space: 4 } },
          children: [new TextRun({ text: 'MKT & Co. — Technical Documentation', font: 'Montserrat', size: 18, color: GRAY })],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 4, color: 'E0E0E0', space: 4 } },
          children: [
            new TextRun({ text: 'MKT & Co. Confidential  ·  Page ', font: 'Calibri', size: 18, color: GRAY }),
            new TextRun({ children: [PageNumber.CURRENT], font: 'Calibri', size: 18, color: GRAY }),
          ],
        })],
      }),
    },
    children: [
      // ─── COVER ───────────────────────────────────────────────────────
      ...coverSection(),

      // ─── 1. PROJECT OVERVIEW ─────────────────────────────────────────
      h1('1. Project Overview'),
      p('MKT & Co. is a premium custom grillz brand based in Ho Chi Minh City, Vietnam. The website serves as the primary digital storefront, brand experience, and client acquisition platform targeting the streetwear, hip-hop, and fashion communities in Vietnam.'),
      ...space(),
      h3('1.1 Business Purpose'),
      bullet('Showcase brand identity and craftsmanship'),
      bullet('Display 3 product collections: M\'SCOTIK, M\'CELESTIAL, K\'HARMONICS'),
      bullet('Enable appointment booking for consultation sessions'),
      bullet('Highlight celebrity collaborations (23+ clients) to build social proof'),
      bullet('Link to Store Locator, Pricing, and Contact pages'),
      ...space(),
      h3('1.2 Current Tech Stack (Frontend-Only)'),
      twoColTable([
        ['Type', 'Value'],
        ['Language', 'Vanilla HTML5 / CSS3 / JavaScript (ES6+)'],
        ['Fonts', 'Google Fonts — Montserrat, Great Vibes, Pinyon Script'],
        ['Images', 'Wix Static CDN (external) + local assets'],
        ['Video', 'Local MP4 (1222-compressed.mp4, H.264, 16MB)'],
        ['Hosting', 'Vercel (GitHub auto-deploy from main branch)'],
        ['Repo', 'github.com/tanoshitest/mkt'],
        ['Live URL', 'https://mkt-topaz.vercel.app/'],
        ['No frameworks', 'No React, Vue, or Angular — pure vanilla JS'],
        ['No backend', 'No server, no database — all static files'],
      ], null, [3000, 7080]),
      ...space(),
      h3('1.3 Recommended Full-Stack Architecture'),
      twoColTable([
        ['Layer', 'Recommendation'],
        ['Frontend', 'Next.js 14 (App Router) — keep current design, add SSR'],
        ['Backend', 'Node.js + Express OR Next.js API Routes'],
        ['Database', 'PostgreSQL (Supabase) — bookings, users, collections'],
        ['Auth', 'NextAuth.js + JWT — admin dashboard login'],
        ['Email', 'Resend or Nodemailer — booking confirmations'],
        ['File Storage', 'Cloudflare R2 or Supabase Storage — images/video'],
        ['CMS', 'Sanity.io or Contentful — manage collections & clients'],
        ['Deployment', 'Vercel (frontend) + Supabase (DB) — free tier works'],
        ['Analytics', 'Vercel Analytics + Google Analytics 4'],
      ], null, [3000, 7080]),

      pageBreak(),

      // ─── 2. DESIGN SYSTEM ────────────────────────────────────────────
      h1('2. Design System'),
      p('All design tokens are defined as CSS Custom Properties on :root and shared across all pages.'),
      ...space(),
      h3('2.1 Color Palette'),
      threeColTable([
        ['--black', '#080808', 'Page background, darkest layer'],
        ['--off-black', '#111010', 'Section backgrounds'],
        ['--dark', '#161514', 'Card backgrounds, pillar tiles'],
        ['--gold', '#4169E1', 'Primary brand accent (blue, named gold historically)'],
        ['--gold-light', '#6B8EF0', 'Hover states, lighter accent'],
        ['--gold-dim', '#2A4AB5', 'Disabled/muted accent'],
        ['--white', '#F5F0EA', 'Body text, warm white'],
        ['--gray', '#888480', 'Secondary text, meta labels'],
        ['--gray-light', '#B8B4AE', 'Placeholder text, tertiary info'],
      ], ['Token', 'Value', 'Usage'], [2400, 2160, 5520]),
      ...space(),
      h3('2.2 Typography'),
      twoColTable([
        ['--serif / --sans', 'Montserrat (Google Fonts) — all weights 300–700'],
        ['Decorative', 'Great Vibes, Pinyon Script (script fonts for accent use)'],
        ['Section labels', 'Montserrat 500, 11–12px, letter-spacing 0.12em, uppercase'],
        ['Headings (H1–H2)', 'Montserrat 300 (light) italic + normal, clamp() fluid sizing'],
        ['Body text', 'Montserrat 300–400, 15–16px, line-height 1.7, color var(--gray-light)'],
        ['Code/data', 'Montserrat 500, tabular numerals for counters (01 / 23 format)'],
      ], null, [3000, 7080]),
      ...space(),
      h3('2.3 Spacing & Layout'),
      twoColTable([
        ['Section padding', '140px 80px (desktop) — large breathing room'],
        ['Cooperation margins', '100px each side — aligns head / image / bottom'],
        ['Grid gaps', '80px (founder), 48px (vision pillars), 48px (cc-bottom)'],
        ['Border radius', '2px (cards, images) — minimal, editorial feel'],
        ['Max content width', 'No max-width container — full-bleed design'],
        ['Responsive', 'Breakpoints: ≤1024px (tablet), ≤768px (mobile)'],
      ], null, [3000, 7080]),
      ...space(),
      h3('2.4 Animation Easings'),
      twoColTable([
        ['Primary (snap)', 'cubic-bezier(0.76, 0, 0.24, 1) — 900ms — all card transitions'],
        ['Entrance', 'cubic-bezier(0.16, 1, 0.3, 1) — 1s–1.4s — content reveal on load'],
        ['Hover', 'ease — 0.3s–0.35s — buttons, links, subtle interactions'],
        ['Hero zoom', 'cubic-bezier(0.25, 0.46, 0.45, 0.94) — 12s — parallax zoom'],
        ['Reveal scroll', 'cubic-bezier(0.76, 0, 0.24, 1) — 0.85s — IntersectionObserver'],
        ['Menu open', 'cubic-bezier(0.76, 0, 0.24, 1) — 0.65s — fullscreen overlay'],
      ], null, [3000, 7080]),
      ...space(),
      h3('2.5 Z-Index Layer Stack'),
      twoColTable([
        ['Login modal', 'z-index: 9999 — topmost layer'],
        ['Menu overlay', 'z-index: 9000'],
        ['Booking modal', 'z-index: 9500'],
        ['Intro screen', 'z-index: 8000 — dismissable on Explore click'],
        ['Coop nav dots', 'z-index: 600 — fixed right side'],
        ['Coop nav buttons', 'z-index: 600 — fixed bottom center'],
        ['Navbar', 'z-index: 1000 — fixed top'],
      ], null, [3000, 7080]),

      pageBreak(),

      // ─── 3. SITEMAP & PAGES ──────────────────────────────────────────
      h1('3. Sitemap & Pages'),
      ...space(),
      h3('3.1 All Routes'),
      threeColTable([
        ['index.html', 'Homepage', 'Full brand experience, all interactive sections'],
        ['brand.html', 'Brand Story', 'Philosophy, founder, process, manifesto'],
        ['collection.html', 'Collections Index', '7 pieces listed with images and links'],
        ['collection-mscotik.html', 'M\'SCOTIK Detail', 'Full collection page'],
        ['collection-mcelestial.html', 'M\'CELESTIAL Detail', 'Full collection page'],
        ['collection-kharmonics.html', 'K\'HARMONICS Detail', 'Full collection page'],
        ['store.html', 'Store Locator', 'Rue Miche Studio address, map, hours'],
        ['pricing.html', 'Pricing & Options', 'Tier table, quote form'],
        ['events.html', 'Events', 'Coming Soon placeholder'],
        ['contact.html', 'Contact', 'Partnership and general contact form'],
      ], ['Route', 'Page Name', 'Description'], [2520, 2520, 5040]),
      ...space(),
      h3('3.2 Navigation Structure'),
      p('Three navigation entry points are used across the site:'),
      bullet([bold('Main Navbar (#navbar): '), new TextRun({ text: 'Fixed top, transparent → blur on scroll (scrollY > 60px). Contains hamburger menu trigger only.', size: 21, font: 'Calibri' })]),
      bullet([bold('Hamburger Menu (#menu-overlay): '), new TextRun({ text: 'Full-screen overlay. Links: Home, Brand, Collections, Events, Pricing, Book Appointment, Store Locator.', size: 21, font: 'Calibri' })]),
      bullet([bold('Footer: '), new TextRun({ text: '4-column grid. Navigate: Home, Brand, Collections, Events. Services: Store Locator, Book Appointment, Pricing & Options. Contact: Events, Partnerships.', size: 21, font: 'Calibri' })]),
      ...space(),
      h3('3.3 Internal Link Map'),
      twoColTable([
        ['"Book Appointment"', 'Opens #booking-modal (same page). Triggered from: navbar CTA, menu, hero, footer, quick links.'],
        ['"Store Locator"', 'Links to store.html'],
        ['"Pricing & Options"', 'Links to pricing.html'],
        ['"Contact Us"', 'Links to contact.html'],
        ['Collection items', 'Links to collection-[name].html'],
        ['Logo', 'Links back to index.html'],
      ], null, [3000, 7080]),

      pageBreak(),

      // ─── 4. HOMEPAGE SECTIONS ────────────────────────────────────────
      h1('4. Homepage — Section Breakdown'),
      p('The homepage (index.html, ~3800 lines) contains 10 major sections loaded sequentially. The intro screen is a fixed overlay that dismisses on user interaction, revealing the scrollable page behind it.'),
      ...space(),

      h2('4.1 Intro Screen (#intro)'),
      p('A fixed fullscreen overlay (z-index: 8000) that covers the entire page on first load. Dismissed via sessionStorage so it only shows once per browser session.'),
      ...space(),
      h3('Structure'),
      twoColTable([
        ['#intro-video', 'Looping background video (1222-compressed.mp4). Fades in on canplay event. opacity:0 → 1 (2s ease).'],
        ['#intro-navbar', 'Absolute top bar: hamburger (left) · MKT logo (center) · login button (right).'],
        ['#intro-slides', '3 collection slides, each with a fullscreen background image. Initially all translateY(100%) — below viewport.'],
        ['#intro-col-info', 'Bottom-left collection info panel. Hidden in video state. Shows eyebrow / title / tagline / link when a slide is active.'],
        ['#intro-right-nav', 'Right side: ↑↓ arrow buttons + XX/03 counter. Hidden in video state.'],
        ['#intro-dots', 'Bottom center: 3 progress dots. Hidden in video state.'],
        ['#intro-content', 'Center: large "Explore →" button. Only visible in video state.'],
        ['#intro-noise', 'Subtle grain overlay via CSS background noise for texture.'],
        ['#login-overlay', 'Full-screen login modal (z-index: 9999). Triggered by login button.'],
      ], null, [2520, 7560]),
      ...space(),
      h3('State Machine (cur variable)'),
      twoColTable([
        ['cur = -1', 'Video state — video visible, collection info hidden, explore button shown'],
        ['cur = 0', 'Collection slide 0 (M\'SCOTIK) — slide animates up from bottom'],
        ['cur = 1', 'Collection slide 1 (M\'CELESTIAL) — RM-style cross-transition'],
        ['cur = 2', 'Collection slide 2 (K\'HARMONICS) — last slide, next button disabled'],
      ], null, [2520, 7560]),
      ...space(),
      h3('Navigation Events'),
      bullet('Mouse wheel: deltaY > 0 → goTo(cur+1), deltaY < 0 → goTo(cur-1). Throttled to 1100ms.'),
      bullet('Arrow buttons: #intro-prev / #intro-next → goTo()'),
      bullet('Dot clicks: direct navigation to slide index'),
      bullet('Keyboard: ArrowDown/Right → next, ArrowUp/Left → prev'),
      bullet('Touch swipe: 50px threshold, touchstart + touchend listeners'),
      bullet('Explore button: enterSite() → hides intro, sets sessionStorage("mkt_entered","1")'),
      ...space(),
      h3('Transition Animation (goTo function)'),
      bullet('Video → Collection 0: slide animates up translateY(100%) → translateY(0), video class .pushed (scale shrink + fade)'),
      bullet('Collection → Collection: incoming from translateY(100%), outgoing to translateY(-7%) scale(0.96) opacity:0 — Richard Mille style'),
      bullet('Collection → Video: slide drops to translateY(100%), video .pushed removed — video fades back'),
      bullet('Duration: 900ms, easing: cubic-bezier(0.76,0,0.24,1)'),

      divider(),
      h2('4.2 Hero Section (#home .hero)'),
      bullet('Full viewport height (100dvh) — visual-only, no text content'),
      bullet('Background image with brightness(0.72) filter'),
      bullet('heroZoom animation: scale(1.04) → scale(1) over 12s — subtle parallax effect'),
      bullet('Dual gradient vignette overlay for depth'),
      bullet('Purpose: transition buffer from intro screen to main content'),

      divider(),
      h2('4.3 Founder Section (#founder)'),
      bullet('Background: var(--off-black) — padding 140px 80px'),
      bullet('2-column CSS grid (1fr 1fr), 80px gap'),
      bullet('Left col: section-label "The Founder" + h2 name + bio text + philosophy quote'),
      bullet('Right col: portrait photo, aspect-ratio 3/4, grayscale(20%) filter'),
      bullet('Scroll reveal: left col .reveal (from left), right col .reveal-right (from right)'),

      divider(),
      h2('4.4 Vision & Pillars (#vision)'),
      bullet('Background: var(--black) — 3 pillars side by side'),
      bullet('Header: "Identity, not imitation." in serif italic + standard text'),
      bullet('.vision-pillars: CSS grid repeat(3, 1fr), gap 1px (hairline dividers)'),
      bullet('Each .pillar: bg var(--dark), overflow hidden, relative position'),
      bullet('Hover effects: background image fades in (opacity 0→1), zooms slightly (scale 1.05→1)'),
      bullet('Gold accent line: ::before pseudo-element, scaleX(0→1) on hover, 0.6s cubic-bezier'),
      bullet('3 pillars: Story Telling · Meticulous Craft · Unique Masterpiece'),

      divider(),
      h2('4.5 Quote Band (.quote-band)'),
      bullet('Full-width section, centered layout'),
      bullet('Large italic serif quote text with decorative quotation marks'),
      bullet('Attribution: Doan Nguyen — Artist'),
      bullet('Background: var(--off-black), subtle border top/bottom'),

      divider(),
      h2('4.6 Cooperation Stack (#cooperation .coop)'),
      p('The most complex section. A sticky scroll stack with 4 full-viewport cards using Richard Mille-style snap transitions.'),
      ...space(),
      h3('Layout Architecture'),
      bullet('.coop: padding:0, overflow:visible, background var(--off-black)'),
      bullet('.coop-stack (#coopStack): height = N × 100vh (set by JS applyLayout). Contains sticky viewport.'),
      bullet('.coop-sticky-viewport: position:sticky, top:0, height:100vh, overflow:hidden, clip-path:inset(0)'),
      bullet('clip-path:inset(0) is critical — prevents transformed child elements from visually escaping the overflow boundary in sticky-positioned parents'),
      bullet('Each .coop-card: position:absolute, width:100vw, height:100vh, display:flex, flex-direction:column'),
      ...space(),
      h3('Card Internal Structure (flex column, 3 zones)'),
      twoColTable([
        ['.cc-head', 'Flex row, padding 40px 100px 14px. Contains section-label "Collaborations" + h2 "Our Cooperation" (left) + project count "01"–"04" (right).'],
        ['.cc-top', 'flex:1, min-height:0, margin:0 100px, overflow:hidden. Full-width hero image fills remaining space between head and bottom.'],
        ['.cc-bottom', 'flex-shrink:0, CSS grid 1fr auto, padding 24px 100px. Left: project info text. Right: .cc-side portrait image (aspect-ratio 4/6, width clamp(140px,14vw,185px)).'],
      ], null, [2520, 7560]),
      ...space(),
      h3('JavaScript State (cooperation IIFE)'),
      bullet('let cur = 0 — current active card index (0–3)'),
      bullet('let busy = false — prevents double-triggering during animation'),
      bullet('let lastDesired = 0 — prevents scroll event re-triggering after programmatic scroll'),
      ...space(),
      h3('Transition Logic'),
      bullet('Forward (next > cur): incoming slides up from translateY(100%), outgoing scales down + fades'),
      bullet('Backward (next < cur): incoming scales in from above, outgoing slides down to translateY(100%)'),
      bullet('Hidden cards: visibility:hidden + opacity:0 + transform:none — NOT transform-based hiding (avoids overflow escape bug)'),
      bullet('After animation: outgoing card gets visibility:hidden, transform reset to none'),
      ...space(),
      h3('Wheel Event Handling'),
      bullet('window.addEventListener("wheel", onWheel, { passive: false }) — passive:false required to call preventDefault()'),
      bullet('Active detection: stack.getBoundingClientRect().top <= 1 && .bottom >= winH - 1'),
      bullet('On scroll down (deltaY > 0): if cur < N-1 → navigate(cur+1), else → allow natural scroll to next section'),
      bullet('On scroll up (deltaY < 0): if cur > 0 → navigate(cur-1), else → allow natural scroll up'),
      bullet('navigate(next): calls goTo(next) + window.scrollTo({ top: sectionTop + next*winH, behavior:"instant" }) to sync scroll position'),

      divider(),
      h2('4.7 Marquee Section (.marquee-section)'),
      bullet('Single scrolling row of 23 celebrity client names'),
      bullet('Content duplicated via JS for seamless infinite loop'),
      bullet('@keyframes marqueeScroll: translateX(0) → translateX(-50%) — 45s linear infinite'),
      bullet('Hover pauses animation via animation-play-state: paused'),
      bullet('Border top and bottom: 1px solid var(--gold) with 20% opacity'),

      divider(),
      h2('4.8 Worn By Carousel (#clients .worn-by-section)'),
      bullet('"WORN BY" section-label centered above portrait'),
      bullet('One portrait displayed at a time — crossfade transitions (opacity 0↔1)'),
      bullet('Arrow buttons flank the portrait (← left, → right)'),
      bullet('Counter display: "05 / 23" format, updates on each transition'),
      bullet('Artist name + role displayed below portrait'),
      bullet('23 total clients: Quynh Anh Shyn, Big Daddy, B-ray, Addree, Soobin, Phuong My Chi, Ricky Star, Doan Nguyen, Tlinh, Duy Khanh Zhou Zhou, Low-G, Wrxdie, Duy Manh, Cuong Seven...'),
      bullet('Touch swipe support: 40px threshold'),
      bullet('Images hosted on Wix Static CDN (460×615px resolution)'),

      divider(),
      h2('4.9 Quick Links (#contact .quicklinks)'),
      bullet('4-card CSS grid (repeat(4, 1fr))'),
      bullet('Each card: aspect-ratio 3/4, overflow hidden, relative position'),
      bullet('Background image fills card, brightness filter (no grayscale — shows real color)'),
      bullet('Hover: slight scale(1.03) on image, text reveal from bottom'),
      bullet('Cards: Store Locator / Book Appointment / Pricing & Options / Contact Us'),
      bullet('"Book Appointment" card triggers #booking-modal'),

      divider(),
      h2('4.10 Footer'),
      bullet('4-column grid (1.5fr 1fr 1fr 1fr)'),
      bullet('Col 1: MKT logo (white version, mix-blend-mode: screen) + tagline + social icons'),
      bullet('Col 2: Navigate — Home, Brand, Collections, Events'),
      bullet('Col 3: Services — Store Locator, Book Appointment, Pricing & Options'),
      bullet('Col 4: Contact — Events, Partnerships'),
      bullet('Border-top: 1px solid rgba(255,255,255,0.08)'),
      bullet('Copyright line at bottom'),

      pageBreak(),

      // ─── 5. INTERACTIVE SYSTEMS ──────────────────────────────────────
      h1('5. Interactive Systems'),
      ...space(),
      h2('5.1 Booking Modal (3-Step Flow)'),
      p('A fullscreen booking system triggered from multiple points on the page. Built entirely in vanilla JS with no external dependencies.'),
      ...space(),
      h3('Trigger Points'),
      bullet('#ql-book-btn — Quick Links "Book Appointment" card'),
      bullet('#menu-book-btn — Hamburger menu'),
      bullet('#hero-book-btn — Hero section'),
      bullet('#footer-book-btn — Footer'),
      bullet('Any .nav-cta containing "BOOK" text'),
      ...space(),
      h3('Layout'),
      bullet('Fixed overlay (z-index: 9500), two-panel layout'),
      bullet('Left panel (380px, dark): Service summary card + selected date/time display'),
      bullet('Right panel (flex:1): Step content + navigation footer'),
      bullet('Left panel hidden on mobile (≤768px)'),
      ...space(),
      h3('Step 1 — Select Date'),
      bullet('Calendar widget, custom-built in JS'),
      bullet('Month navigation: ← → arrows update calViewDate'),
      bullet('Available weekdays: Thursday (4), Friday (5), Saturday (6), Sunday (0)'),
      bullet('Disabled: all past dates, Monday/Tuesday/Wednesday'),
      bullet('Selected date stored in selectedDate (Date object)'),
      bullet('Next button disabled until selectedDate is set'),
      ...space(),
      h3('Step 2 — Select Time'),
      bullet('10 time slots: 11:30, 12:00, 12:30, 13:00, 13:30, 14:00, 14:30, 15:00, 15:30, 16:00'),
      bullet('Grid layout: 2–3 columns of buttons'),
      bullet('Selected slot gets .selected class (gold background)'),
      bullet('selectedTime stored as "HH:MM" string'),
      bullet('Next button disabled until selectedTime is set'),
      ...space(),
      h3('Step 3 — Your Details'),
      threeColTable([
        ['#bm-ho', 'text', 'Họ (First Name) — required'],
        ['#bm-ten', 'text', 'Tên (Last Name) — required'],
        ['#bm-email', 'email', 'Email — required, HTML5 validation'],
        ['#bm-phone', 'tel', 'Phone — optional'],
        ['#bm-note', 'textarea', 'Ghi chú (Notes) — optional, 3 rows'],
      ], ['Field ID', 'Type', 'Description'], [2520, 1800, 5760]),
      ...space(),
      bullet('Submit shows .bm-confirm overlay with Vietnamese success message'),
      bullet('No actual backend submission — TODO: connect to API endpoint'),
      ...space(),
      h3('State Variables'),
      bullet('currentStep: 1 | 2 | 3'),
      bullet('selectedDate: Date object | null'),
      bullet('selectedTime: string "HH:MM" | null'),
      bullet('calViewDate: Date — current calendar view month'),

      divider(),
      h2('5.2 Custom Cursor'),
      bullet('Native cursor hidden globally: body { cursor: none }'),
      bullet('#cursor-dot: 8px dot, position:fixed, border-radius:50%, background:#4169E1, z-index:10000'),
      bullet('#cursor-ring: 36px ring, border:1.5px solid #4169E1, position:fixed, transition:0.12s ease'),
      bullet('Expands on hover over a/button: dot 16px, ring 56px'),
      bullet('mix-blend-mode: difference on ring — inverts color over light backgrounds'),
      bullet('mousemove updates transform:translate(x,y) with requestAnimationFrame for performance'),

      divider(),
      h2('5.3 Scroll Reveal System'),
      bullet('IntersectionObserver on all .reveal and .reveal-right elements'),
      bullet('threshold: 0.08 — triggers when 8% of element is visible'),
      bullet('rootMargin: "0px 0px -30px 0px" — slight early trigger'),
      bullet('.reveal: starts at opacity:0, translateX(-80px) → opacity:1, translateX(0)'),
      bullet('.reveal-right: starts at translateX(80px) → translateX(0)'),
      bullet('Delay classes: .reveal-delay-1 (0.1s), -2 (0.2s), -3 (0.35s), -4 (0.5s)'),
      bullet('Duration: 0.85s cubic-bezier(0.76,0,0.24,1)'),
      bullet('Once triggered, observer.unobserve(el) — no re-animation'),

      divider(),
      h2('5.4 Scroll → Section Snap (Cooperation ↔ Worn By)'),
      bullet('Separate IIFE handles the boundary between cooperation exit and worn-by entry'),
      bullet('Detects when user is partially between sections (not fully in either)'),
      bullet('Uses wbSnapping boolean to prevent repeated snap triggers'),
      bullet('window.scrollTo({ behavior: "smooth" }) to snap to nearest full section'),

      divider(),
      h2('5.5 Navbar Scroll Effect'),
      bullet('window.addEventListener("scroll") — checks scrollY > 60'),
      bullet('Adds .scrolled class: backdrop-filter:blur(12px) + background rgba(8,8,8,0.85)'),
      bullet('Removes .scrolled class when scrolled back to top'),

      pageBreak(),

      // ─── 6. BACKEND ARCHITECTURE ─────────────────────────────────────
      h1('6. Backend Architecture (Recommended)'),
      p('Currently the site has no backend. Below is the recommended architecture to add real booking, admin, and CMS functionality.'),
      ...space(),
      h2('6.1 API Endpoints'),
      threeColTable([
        ['POST /api/bookings', 'Create new booking from form submission', 'Body: { date, time, ho, ten, email, phone, note }'],
        ['GET /api/bookings', 'List all bookings (admin only)', 'Query: ?date=YYYY-MM-DD, ?status=pending'],
        ['PATCH /api/bookings/:id', 'Update booking status', 'Body: { status: "confirmed" | "cancelled" }'],
        ['DELETE /api/bookings/:id', 'Cancel booking', 'Auth required'],
        ['POST /api/contact', 'Submit contact/partnership form', 'Body: { name, email, company, message }'],
        ['GET /api/collections', 'List all collections (CMS-driven)', 'Returns array of collection objects'],
        ['GET /api/clients', 'List worn-by clients', 'Returns 23 client objects with image URLs'],
        ['POST /api/auth/login', 'Admin login', 'Body: { email, password } → JWT token'],
        ['GET /api/slots/:date', 'Get available time slots for a date', 'Returns array of available slots minus booked ones'],
        ['POST /api/email/confirm', 'Send booking confirmation email', 'Triggered after booking created'],
      ], ['Endpoint', 'Purpose', 'Details'], [2400, 3360, 4320]),
      ...space(),
      h2('6.2 Database Schema (PostgreSQL / Supabase)'),
      ...space(),
      h3('bookings table'),
      threeColTable([
        ['id', 'UUID PRIMARY KEY', 'DEFAULT gen_random_uuid()'],
        ['created_at', 'TIMESTAMPTZ', 'DEFAULT now()'],
        ['booking_date', 'DATE', 'NOT NULL — appointment date'],
        ['booking_time', 'TIME', 'NOT NULL — appointment time e.g. 14:30'],
        ['first_name', 'VARCHAR(100)', 'NOT NULL'],
        ['last_name', 'VARCHAR(100)', 'NOT NULL'],
        ['email', 'VARCHAR(255)', 'NOT NULL'],
        ['phone', 'VARCHAR(30)', 'NULLABLE'],
        ['note', 'TEXT', 'NULLABLE — customer notes'],
        ['status', 'VARCHAR(20)', 'DEFAULT \'pending\' — pending | confirmed | cancelled'],
        ['service_type', 'VARCHAR(50)', 'DEFAULT \'consultation\''],
        ['admin_note', 'TEXT', 'NULLABLE — internal staff notes'],
      ], ['Column', 'Type', 'Notes'], [2160, 2520, 5400]),
      ...space(),
      h3('collections table'),
      threeColTable([
        ['id', 'UUID PRIMARY KEY', ''],
        ['slug', 'VARCHAR(100) UNIQUE', 'e.g. "mscotik", "mcelestial"'],
        ['name', 'VARCHAR(200)', 'Display name'],
        ['eyebrow', 'VARCHAR(100)', 'e.g. "01 · Grillz"'],
        ['tagline', 'TEXT', 'Short description'],
        ['description', 'TEXT', 'Full description'],
        ['cover_image_url', 'TEXT', 'Hero image URL'],
        ['gallery_images', 'JSONB', 'Array of image URLs'],
        ['is_active', 'BOOLEAN', 'DEFAULT true'],
        ['sort_order', 'INTEGER', 'Display order'],
      ], ['Column', 'Type', 'Notes'], [2160, 2520, 5400]),
      ...space(),
      h3('clients (worn_by) table'),
      threeColTable([
        ['id', 'UUID PRIMARY KEY', ''],
        ['name', 'VARCHAR(200)', 'Full name'],
        ['role', 'VARCHAR(100)', 'e.g. "Rapper", "Singer", "Fashionista"'],
        ['image_url', 'TEXT', 'Portrait URL (460×615px recommended)'],
        ['sort_order', 'INTEGER', 'Carousel order'],
        ['is_active', 'BOOLEAN', 'DEFAULT true'],
        ['instagram_handle', 'VARCHAR(100)', 'NULLABLE'],
      ], ['Column', 'Type', 'Notes'], [2160, 2520, 5400]),
      ...space(),
      h3('contact_submissions table'),
      threeColTable([
        ['id', 'UUID PRIMARY KEY', ''],
        ['created_at', 'TIMESTAMPTZ', 'DEFAULT now()'],
        ['name', 'VARCHAR(200)', 'NOT NULL'],
        ['email', 'VARCHAR(255)', 'NOT NULL'],
        ['company', 'VARCHAR(200)', 'NULLABLE'],
        ['message', 'TEXT', 'NOT NULL'],
        ['type', 'VARCHAR(50)', '"partnership" | "general" | "press"'],
        ['is_read', 'BOOLEAN', 'DEFAULT false'],
      ], ['Column', 'Type', 'Notes'], [2160, 2520, 5400]),
      ...space(),
      h3('admins table'),
      threeColTable([
        ['id', 'UUID PRIMARY KEY', ''],
        ['email', 'VARCHAR(255) UNIQUE', 'NOT NULL'],
        ['password_hash', 'TEXT', 'bcrypt hash'],
        ['name', 'VARCHAR(200)', ''],
        ['role', 'VARCHAR(20)', '"admin" | "staff"'],
        ['last_login', 'TIMESTAMPTZ', 'NULLABLE'],
      ], ['Column', 'Type', 'Notes'], [2160, 2520, 5400]),

      pageBreak(),

      // ─── 7. BOOKING FLOW ─────────────────────────────────────────────
      h1('7. Booking Flow — Frontend to Backend'),
      ...space(),
      p('Current state: booking form submits but only shows a UI confirmation — NO data is saved. To make it functional:'),
      ...space(),
      h3('Step-by-step integration'),
      numbered('User fills Step 1 (date), Step 2 (time), Step 3 (form)'),
      numbered('On form submit: call GET /api/slots/:date to validate slot still available'),
      numbered('If available: POST /api/bookings with all form data'),
      numbered('Backend saves to DB, sends confirmation email via Resend/Nodemailer'),
      numbered('Frontend shows success message with booking reference ID'),
      numbered('Admin receives email notification of new booking'),
      ...space(),
      h3('Available Slots Logic'),
      bullet('Available days: Thursday (4), Friday (5), Saturday (6), Sunday (0)'),
      bullet('Time slots: 11:30 to 16:00 every 30 minutes = 10 slots per day'),
      bullet('GET /api/slots/:date should query bookings table for that date'),
      bullet('Return array of all 10 slots, each with available: true/false'),
      bullet('Frontend disables already-booked time slots in the picker'),
      ...space(),
      h3('Email Confirmation Template'),
      bullet('TO: customer email'),
      bullet('SUBJECT: "Booking Confirmed — MKT & Co. Custom Grillz Consultation"'),
      bullet('Content (bilingual VI/EN): date, time, address (Rue Miche Studio, HCMC), contact number'),
      bullet('Reply-to: studio contact email'),

      pageBreak(),

      // ─── 8. FRONTEND MIGRATION TO NEXT.JS ────────────────────────────
      h1('8. Frontend Migration Guide (Vanilla → Next.js)'),
      p('If migrating from static HTML to Next.js, follow this component breakdown.'),
      ...space(),
      h2('8.1 File Structure'),
      ...codeBlock([
        'app/',
        '  layout.tsx              ← Root layout: cursor, navbar, footer, fonts',
        '  page.tsx                ← Homepage (index.html)',
        '  brand/page.tsx          ← brand.html',
        '  collections/page.tsx    ← collection.html',
        '  collections/[slug]/page.tsx  ← collection-mscotik.html etc.',
        '  store/page.tsx          ← store.html',
        '  pricing/page.tsx        ← pricing.html',
        '  events/page.tsx         ← events.html',
        '  contact/page.tsx        ← contact.html',
        '  api/',
        '    bookings/route.ts     ← POST/GET /api/bookings',
        '    slots/[date]/route.ts ← GET /api/slots/:date',
        '    contact/route.ts      ← POST /api/contact',
        '    auth/[...nextauth]/route.ts',
        'components/',
        '  IntroScreen.tsx         ← Entire #intro system',
        '  Navbar.tsx              ← Fixed navbar + menu overlay',
        '  BookingModal.tsx        ← 3-step booking modal',
        '  CustomCursor.tsx        ← Cursor dot + ring',
        '  CoopStack.tsx           ← Sticky card stack + wheel snap',
        '  WornByCarousel.tsx      ← Portrait carousel',
        '  MarqueeSection.tsx      ← Scrolling ticker',
        '  QuickLinks.tsx          ← 4-card grid',
        '  Footer.tsx              ← Site footer',
        '  ScrollReveal.tsx        ← IntersectionObserver wrapper',
        'lib/',
        '  db.ts                   ← Supabase client',
        '  email.ts                ← Resend email functions',
        '  auth.ts                 ← NextAuth config',
        'styles/',
        '  globals.css             ← CSS variables + base styles',
        '  mobile.css              ← Responsive breakpoints',
      ]),
      ...space(),
      h2('8.2 Component Notes'),
      twoColTable([
        ['IntroScreen', '"use client" — uses sessionStorage, wheel events, touch events. State: cur(-1,0,1,2), busy. Self-removes from DOM after enterSite().'],
        ['CoopStack', '"use client" — uses ResizeObserver, wheel event (passive:false), scroll listener. Must set clip-path:inset(0) on sticky viewport.'],
        ['BookingModal', '"use client" — portal via ReactDOM.createPortal to document.body. Steps managed by useState. Form uses react-hook-form recommended.'],
        ['CustomCursor', '"use client" — useEffect + mousemove listener. Must set body { cursor: none } globally.'],
        ['WornByCarousel', '"use client" — touch events + crossfade transition. Images should use next/image for optimization.'],
        ['MarqueeSection', 'Can be server component — just CSS animation. Duplicate content via array.concat(array).'],
        ['Navbar', '"use client" — scroll listener for .scrolled state. Menu overlay uses CSS transform for animation.'],
        ['ScrollReveal', '"use client" — IntersectionObserver wrapper component, wraps children with reveal animation.'],
      ], null, [2520, 7560]),

      pageBreak(),

      // ─── 9. ASSETS & MEDIA ───────────────────────────────────────────
      h1('9. Assets & Media'),
      ...space(),
      h2('9.1 Current Asset Sources'),
      twoColTable([
        ['Video', '1222-compressed.mp4 — Local file, H.264, 1280p, 16MB, no audio, loop'],
        ['Images (CDN)', 'Wix Static CDN: static.wixstatic.com/media/ — format: avif/jpeg, quality_auto'],
        ['Logo', 'indentify/logo mkt xoa nen den.png (dark bg version)'],
        ['Logo (light)', 'indentify/mkt final white.png (white, for footer, mix-blend-mode: screen)'],
        ['Fonts', 'Google Fonts API — Montserrat, Great Vibes, Pinyon Script'],
        ['Icons', 'Inline SVG only — no icon library dependency'],
      ], null, [2520, 7560]),
      ...space(),
      h2('9.2 Recommended: Migrate to Cloudflare R2 / Supabase Storage'),
      bullet('Upload 1222-compressed.mp4 to R2 → use public URL instead of relative path'),
      bullet('Upload all portrait images (23 clients) from Wix CDN → own storage for reliability'),
      bullet('Use Cloudflare Image Resizing or next/image for responsive image optimization'),
      bullet('Add WebM version of intro video for better Chrome/Firefox performance'),
      ...space(),
      h3('Recommended Image Sizes'),
      threeColTable([
        ['Intro slides', '1920 × 1080px', 'Widescreen background — WebP/AVIF, q85'],
        ['Client portraits', '460 × 615px', 'Portrait 3:4 — WebP, q80'],
        ['cc-top (card hero)', '1280 × 720px', 'Card top image — WebP, q85'],
        ['cc-side (card thumb)', '300 × 450px', 'Portrait 4:6 — WebP, q80'],
        ['Quick Links cards', '800 × 1067px', 'Portrait 3:4 — WebP, q80'],
      ], ['Usage', 'Dimensions', 'Format Recommendation'], [2880, 2520, 4680]),

      pageBreak(),

      // ─── 10. DEPLOYMENT ──────────────────────────────────────────────
      h1('10. Deployment & Environment'),
      ...space(),
      h2('10.1 Current Setup'),
      twoColTable([
        ['Hosting', 'Vercel — auto-deploy from GitHub main branch'],
        ['Repo', 'github.com/tanoshitest/mkt'],
        ['Branch strategy', 'main branch → production only'],
        ['Build', 'Static HTML — no build step required'],
        ['Live URL', 'https://mkt-topaz.vercel.app/'],
        ['Domain', 'Custom domain not yet configured'],
        ['HTTPS', 'Vercel handles SSL automatically'],
        ['Git LFS', 'Not configured — video compressed to 16MB to stay under GitHub 100MB limit'],
      ], null, [2520, 7560]),
      ...space(),
      h2('10.2 Environment Variables (When Backend Added)'),
      twoColTable([
        ['DATABASE_URL', 'PostgreSQL connection string (Supabase)'],
        ['SUPABASE_ANON_KEY', 'Public Supabase API key'],
        ['SUPABASE_SERVICE_KEY', 'Private Supabase service role key (server only)'],
        ['NEXTAUTH_SECRET', 'Random 32-char string for JWT signing'],
        ['NEXTAUTH_URL', 'https://mkt-topaz.vercel.app (production)'],
        ['RESEND_API_KEY', 'Resend email API key for booking confirmations'],
        ['FROM_EMAIL', 'noreply@mktgrillz.com — booking confirmation sender'],
        ['ADMIN_EMAIL', 'Studio email to receive booking notifications'],
        ['NEXT_PUBLIC_SITE_URL', 'https://mkt-topaz.vercel.app'],
      ], null, [3000, 7080]),
      ...space(),
      h2('10.3 Deployment Checklist'),
      numbered('Configure custom domain in Vercel dashboard'),
      numbered('Set up Supabase project + run migrations (create tables from Section 6.2)'),
      numbered('Add all environment variables to Vercel project settings'),
      numbered('Connect booking form to POST /api/bookings'),
      numbered('Test email sending with Resend sandbox'),
      numbered('Set up Vercel Analytics for traffic monitoring'),
      numbered('Add Google Analytics 4 tag in layout.tsx'),
      numbered('Configure Vercel cron job for booking reminder emails (24h before)'),
      numbered('Test mobile on real devices (iOS Safari, Android Chrome)'),
      numbered('Run Lighthouse audit — target: Performance > 85, Accessibility > 90'),

      pageBreak(),

      // ─── 11. KNOWN ISSUES & TODO ─────────────────────────────────────
      h1('11. Known Issues & TODO'),
      ...space(),
      h2('11.1 Current Limitations'),
      twoColTable([
        ['Booking not saved', 'Form submits but data goes nowhere — needs API endpoint'],
        ['Login modal dummy', '#login-modal has no actual auth — needs backend + JWT'],
        ['Events page empty', 'events.html is a "Coming Soon" placeholder'],
        ['No CMS', 'Collections and clients are hardcoded in JS arrays — need CMS'],
        ['Wix CDN dependency', 'Images sourced from Wix CDN — if Wix account changes, images break'],
        ['Video path', '1222-compressed.mp4 is a relative path — breaks if subfolder structure changes'],
        ['No 404 page', 'Vercel serves default 404 — should add custom branded page'],
        ['No sitemap.xml', 'SEO: needs auto-generated sitemap for Google indexing'],
        ['No robots.txt', 'SEO: needs robots.txt'],
        ['Contact form', 'contact.html form not connected to backend'],
      ], null, [3000, 7080]),
      ...space(),
      h2('11.2 Performance Recommendations'),
      bullet('Preload intro video: <link rel="preload" as="video" href="1222-compressed.mp4">'),
      bullet('Add WebM format alongside MP4 for better codec support'),
      bullet('Lazy load all images below the fold (attr loading="lazy" — already partially done)'),
      bullet('Add will-change: transform on .coop-card for GPU acceleration hint'),
      bullet('Consider reducing Marquee from 45s to 30s for better perceived performance'),
      bullet('Add font-display: swap to Google Fonts URL to prevent FOUT blocking render'),
      ...space(),
      h2('11.3 Accessibility'),
      bullet('Custom cursor hides native cursor — add prefers-reduced-motion media query to disable'),
      bullet('Intro video should have aria-hidden="true" (it\'s decorative)'),
      bullet('Cooperation cards need aria-live for screen reader announcements on transition'),
      bullet('Color contrast: var(--gray) #888480 on --dark #161514 may fail WCAG AA — verify'),
      bullet('Add skip-to-content link at top of page for keyboard navigation'),

      pageBreak(),

      // ─── 12. QUICK REFERENCE ─────────────────────────────────────────
      h1('12. Quick Reference'),
      ...space(),
      h2('12.1 Key CSS Classes'),
      threeColTable([
        ['.reveal', 'Scroll reveal — fade in from left', 'Add to any element for entrance animation'],
        ['.reveal-right', 'Scroll reveal — fade in from right', 'Pair with .reveal-delay-* for stagger'],
        ['.reveal-delay-1/2/3/4', 'Stagger delays (0.1–0.5s)', 'Use on sibling elements'],
        ['.section-label', 'Small uppercase tracking label', 'e.g. "Collaborations", "The Founder"'],
        ['.coop-card', 'Full-viewport cooperation card', 'absolute, full w/h, flex column'],
        ['.cc-head', 'Card header band', 'padding 40px 100px 14px'],
        ['.cc-top', 'Card hero image area', 'flex:1, margin 0 100px'],
        ['.cc-bottom', 'Card info + side image', 'grid 1fr auto, padding 24px 100px'],
        ['.intro-slide', 'Intro carousel slide', 'Absolute fullscreen, bg-image'],
        ['#intro-video.loaded', 'Video visible state', 'opacity:0 → 1 on canplay'],
        ['#navbar.scrolled', 'Navbar with backdrop blur', 'Triggered at scrollY > 60'],
        ['.bm-step-1/2/3', 'Booking modal step panels', 'display:none ↔ block via JS'],
      ], ['Class', 'Purpose', 'Notes'], [2520, 3024, 4536]),
      ...space(),
      h2('12.2 Key JavaScript Functions'),
      threeColTable([
        ['enterSite()', 'Dismiss intro screen', 'Sets sessionStorage, adds .hide class, removes #intro from DOM'],
        ['toggleMenu()', 'Open/close hamburger menu', 'Toggles .open on #menu-overlay'],
        ['openLogin() / closeLogin()', 'Login modal', 'Toggles .open on #login-overlay'],
        ['handleLogin()', 'Login form validation', 'Validates ID/account, currently no backend'],
        ['goTo(next) [intro]', 'Intro carousel transition', 'Handles video↔slide and slide↔slide transitions'],
        ['goTo(next) [coop]', 'Cooperation snap transition', 'Richard Mille style, 900ms cubic-bezier'],
        ['navigate(next) [coop]', 'Coop card nav + scroll sync', 'Calls goTo() + window.scrollTo() to sync scroll'],
        ['applyLayout() [coop]', 'Set card/stack dimensions', 'Called on init and window resize'],
        ['goTo(next) [worn-by]', 'Portrait carousel transition', 'Crossfade, updates counter'],
      ], ['Function', 'Purpose', 'Notes'], [2880, 2880, 4320]),
      ...space(),
      h2('12.3 Asset Paths'),
      twoColTable([
        ['Intro video', './1222-compressed.mp4 (local, 16MB)'],
        ['Logo (dark bg)', './indentify/logo mkt xoa nen den.png'],
        ['Logo (white)', './indentify/mkt final white.png'],
        ['Mobile styles', './mobile.css (external stylesheet)'],
        ['Image CDN base', 'https://static.wixstatic.com/media/bbdef6_[hash]~mv2.jpg/v1/fill/...'],
        ['Fonts CDN', 'https://fonts.googleapis.com/css2?family=Montserrat:...'],
      ], null, [2520, 7560]),

      ...space(),
      divider(),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 0 },
        children: [new TextRun({ text: 'MKT & Co. Technical Documentation — Confidential', font: 'Montserrat', size: 18, color: GRAY })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: 'Generated by Claude Code · mkt-topaz.vercel.app', font: 'Calibri', size: 18, color: 'BBBBBB' })],
      }),
    ],
  }],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('C:/Users/ADMIN/Desktop/MKT-Technical-Docs.docx', buffer);
  console.log('✅ Done: C:/Users/ADMIN/Desktop/MKT-Technical-Docs.docx');
});
