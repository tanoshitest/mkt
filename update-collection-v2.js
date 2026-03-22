const fs = require('fs');

// ── COLLECTION DATA (images + content) ──
const collections = [
  {
    slug: 'mscotik', name: "M'SCOTIK",
    tagline: 'The identity of those who wear their story.',
    craftDetail: 'Custom impression mold · Hand-set stones · 7–14 day production',
    images: [
      'https://static.wixstatic.com/media/bbdef6_65d32ccb79c84bc99a9c6bee0c32aed5~mv2.jpg/v1/fill/w_980,h_980,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/481211558_1527747081482223_118554144495421154_n%20(2).jpg',
      'https://static.wixstatic.com/media/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg/v1/fill/w_762,h_1005,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg',
      'https://static.wixstatic.com/media/bbdef6_96a26e43df3447a7a58726ff6edd5495~mv2.jpg/v1/crop/x_84,y_0,w_907,h_1214/fill/w_907,h_1214,al_c,q_85,enc_avif,quality_auto/536553245_1658062488450681_1675531161089091145_n.jpg',
      'https://static.wixstatic.com/media/bbdef6_a59e50ab8b80412392908cdb89bc54dc~mv2.jpg/v1/fill/w_980,h_700,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_3939.jpg',
      'https://static.wixstatic.com/media/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg/v1/fill/w_762,h_762,al_c,q_85,enc_avif,quality_auto/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg',
      'https://static.wixstatic.com/media/bbdef6_65d32ccb79c84bc99a9c6bee0c32aed5~mv2.jpg/v1/crop/x_100,y_100,w_800,h_800/fill/w_800,h_800,al_c,q_85,enc_avif,quality_auto/481211558_1527747081482223_118554144495421154_n%20(2).jpg',
      'https://static.wixstatic.com/media/bbdef6_96a26e43df3447a7a58726ff6edd5495~mv2.jpg/v1/fill/w_600,h_600,al_c,q_85,enc_avif,quality_auto/536553245_1658062488450681_1675531161089091145_n.jpg',
      'https://static.wixstatic.com/media/bbdef6_a59e50ab8b80412392908cdb89bc54dc~mv2.jpg/v1/crop/x_0,y_0,w_700,h_700/fill/w_700,h_700,al_c,q_85,enc_avif,quality_auto/IMG_3939.jpg',
    ],
    labels: ['Campaign Shot 01','Detail 01','Lookbook 01','Manufacture 01','Campaign Shot 02','Detail 02','Lookbook 02','Catalogue 01'],
  },
  {
    slug: 'mcelestial', name: "M'CELESTIAL",
    tagline: 'Crafted from the heavens, worn on Earth.',
    craftDetail: 'Micro-pavé setting · Laser engraving · 10–18 day production',
    images: [
      'https://static.wixstatic.com/media/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg/v1/fill/w_762,h_1005,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg',
      'https://static.wixstatic.com/media/bbdef6_65d32ccb79c84bc99a9c6bee0c32aed5~mv2.jpg/v1/fill/w_980,h_980,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/481211558_1527747081482223_118554144495421154_n%20(2).jpg',
      'https://static.wixstatic.com/media/bbdef6_a59e50ab8b80412392908cdb89bc54dc~mv2.jpg/v1/fill/w_980,h_700,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_3939.jpg',
      'https://static.wixstatic.com/media/bbdef6_96a26e43df3447a7a58726ff6edd5495~mv2.jpg/v1/crop/x_84,y_0,w_907,h_1214/fill/w_907,h_1214,al_c,q_85,enc_avif,quality_auto/536553245_1658062488450681_1675531161089091145_n.jpg',
      'https://static.wixstatic.com/media/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg/v1/fill/w_762,h_762,al_c,q_85,enc_avif,quality_auto/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg',
      'https://static.wixstatic.com/media/bbdef6_65d32ccb79c84bc99a9c6bee0c32aed5~mv2.jpg/v1/crop/x_200,y_0,w_600,h_900/fill/w_600,h_900,al_c,q_85,enc_avif,quality_auto/481211558_1527747081482223_118554144495421154_n%20(2).jpg',
      'https://static.wixstatic.com/media/bbdef6_a59e50ab8b80412392908cdb89bc54dc~mv2.jpg/v1/crop/x_100,y_0,w_600,h_600/fill/w_600,h_600,al_c,q_85,enc_avif,quality_auto/IMG_3939.jpg',
      'https://static.wixstatic.com/media/bbdef6_96a26e43df3447a7a58726ff6edd5495~mv2.jpg/v1/fill/w_600,h_800,al_c,q_85,enc_avif,quality_auto/536553245_1658062488450681_1675531161089091145_n.jpg',
    ],
    labels: ['Campaign Shot 01','Detail 01','Manufacture 01','Lookbook 01','Campaign Shot 02','Detail 02','Catalogue 01','Lookbook 02'],
  },
  {
    slug: 'mrisingstar', name: "M'RISING STAR",
    tagline: 'Color as a statement. Shine as a language.',
    craftDetail: 'Color consultation · Hand-applied enamel · 10–16 day production',
    images: [
      'https://static.wixstatic.com/media/bbdef6_96a26e43df3447a7a58726ff6edd5495~mv2.jpg/v1/crop/x_84,y_0,w_907,h_1214/fill/w_907,h_1214,al_c,q_85,enc_avif,quality_auto/536553245_1658062488450681_1675531161089091145_n.jpg',
      'https://static.wixstatic.com/media/bbdef6_65d32ccb79c84bc99a9c6bee0c32aed5~mv2.jpg/v1/fill/w_980,h_980,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/481211558_1527747081482223_118554144495421154_n%20(2).jpg',
      'https://static.wixstatic.com/media/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg/v1/fill/w_762,h_1005,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg',
      'https://static.wixstatic.com/media/bbdef6_a59e50ab8b80412392908cdb89bc54dc~mv2.jpg/v1/fill/w_980,h_700,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_3939.jpg',
      'https://static.wixstatic.com/media/bbdef6_96a26e43df3447a7a58726ff6edd5495~mv2.jpg/v1/fill/w_700,h_700,al_c,q_85,enc_avif,quality_auto/536553245_1658062488450681_1675531161089091145_n.jpg',
      'https://static.wixstatic.com/media/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg/v1/fill/w_762,h_762,al_c,q_85,enc_avif,quality_auto/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg',
      'https://static.wixstatic.com/media/bbdef6_65d32ccb79c84bc99a9c6bee0c32aed5~mv2.jpg/v1/crop/x_0,y_0,w_700,h_900/fill/w_700,h_900,al_c,q_85,enc_avif,quality_auto/481211558_1527747081482223_118554144495421154_n%20(2).jpg',
      'https://static.wixstatic.com/media/bbdef6_a59e50ab8b80412392908cdb89bc54dc~mv2.jpg/v1/crop/x_200,y_0,w_500,h_500/fill/w_500,h_500,al_c,q_85,enc_avif,quality_auto/IMG_3939.jpg',
    ],
    labels: ['Campaign Shot 01','Color Detail 01','Lookbook 01','Process 01','Campaign Shot 02','Color Detail 02','Lookbook 02','Catalogue 01'],
  },
  {
    slug: 'knot', name: "K'NOT",
    tagline: 'Bound by craft. Released as art.',
    craftDetail: 'Wax carving · Lost-wax casting · Hand-polished · 12–20 day production',
    images: [
      'https://static.wixstatic.com/media/bbdef6_a59e50ab8b80412392908cdb89bc54dc~mv2.jpg/v1/fill/w_980,h_700,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_3939.jpg',
      'https://static.wixstatic.com/media/bbdef6_96a26e43df3447a7a58726ff6edd5495~mv2.jpg/v1/crop/x_84,y_0,w_907,h_1214/fill/w_907,h_1214,al_c,q_85,enc_avif,quality_auto/536553245_1658062488450681_1675531161089091145_n.jpg',
      'https://static.wixstatic.com/media/bbdef6_65d32ccb79c84bc99a9c6bee0c32aed5~mv2.jpg/v1/fill/w_980,h_980,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/481211558_1527747081482223_118554144495421154_n%20(2).jpg',
      'https://static.wixstatic.com/media/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg/v1/fill/w_762,h_1005,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg',
      'https://static.wixstatic.com/media/bbdef6_a59e50ab8b80412392908cdb89bc54dc~mv2.jpg/v1/crop/x_0,y_50,w_700,h_500/fill/w_700,h_500,al_c,q_85,enc_avif,quality_auto/IMG_3939.jpg',
      'https://static.wixstatic.com/media/bbdef6_96a26e43df3447a7a58726ff6edd5495~mv2.jpg/v1/fill/w_600,h_800,al_c,q_85,enc_avif,quality_auto/536553245_1658062488450681_1675531161089091145_n.jpg',
      'https://static.wixstatic.com/media/bbdef6_65d32ccb79c84bc99a9c6bee0c32aed5~mv2.jpg/v1/crop/x_100,y_200,w_700,h_700/fill/w_700,h_700,al_c,q_85,enc_avif,quality_auto/481211558_1527747081482223_118554144495421154_n%20(2).jpg',
      'https://static.wixstatic.com/media/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg/v1/fill/w_600,h_600,al_c,q_85,enc_avif,quality_auto/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg',
    ],
    labels: ['Campaign Shot 01','Detail 01','Lookbook 01','Wear 01','Process 01','Campaign Shot 02','Detail 02','Catalogue 01'],
  },
  {
    slug: 'kethereality', name: "K'ETHEREALITY",
    tagline: 'Between solid and light.',
    craftDetail: 'Openwork construction · Gemstone inlay · 14–22 day production',
    images: [
      'https://static.wixstatic.com/media/bbdef6_65d32ccb79c84bc99a9c6bee0c32aed5~mv2.jpg/v1/fill/w_980,h_980,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/481211558_1527747081482223_118554144495421154_n%20(2).jpg',
      'https://static.wixstatic.com/media/bbdef6_a59e50ab8b80412392908cdb89bc54dc~mv2.jpg/v1/fill/w_980,h_700,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_3939.jpg',
      'https://static.wixstatic.com/media/bbdef6_96a26e43df3447a7a58726ff6edd5495~mv2.jpg/v1/fill/w_980,h_980,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/536553245_1658062488450681_1675531161089091145_n.jpg',
      'https://static.wixstatic.com/media/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg/v1/fill/w_762,h_1005,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg',
      'https://static.wixstatic.com/media/bbdef6_65d32ccb79c84bc99a9c6bee0c32aed5~mv2.jpg/v1/crop/x_0,y_0,w_800,h_800/fill/w_800,h_800,al_c,q_85,enc_avif,quality_auto/481211558_1527747081482223_118554144495421154_n%20(2).jpg',
      'https://static.wixstatic.com/media/bbdef6_a59e50ab8b80412392908cdb89bc54dc~mv2.jpg/v1/crop/x_100,y_0,w_600,h_600/fill/w_600,h_600,al_c,q_85,enc_avif,quality_auto/IMG_3939.jpg',
      'https://static.wixstatic.com/media/bbdef6_96a26e43df3447a7a58726ff6edd5495~mv2.jpg/v1/crop/x_84,y_0,w_907,h_1214/fill/w_907,h_1214,al_c,q_85,enc_avif,quality_auto/536553245_1658062488450681_1675531161089091145_n.jpg',
      'https://static.wixstatic.com/media/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg/v1/fill/w_600,h_600,al_c,q_85,enc_avif,quality_auto/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg',
    ],
    labels: ['Campaign Shot 01','Detail 01','Lookbook 01','Wear 01','Campaign Shot 02','Detail 02','Lookbook 02','Catalogue 01'],
  },
  {
    slug: 'kharmonics', name: "K'HARMONICS",
    tagline: 'When symmetry becomes music.',
    craftDetail: 'Geometric alignment · CNC-assisted finish · 10–18 day production',
    images: [
      'https://static.wixstatic.com/media/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg/v1/fill/w_762,h_1005,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg',
      'https://static.wixstatic.com/media/bbdef6_96a26e43df3447a7a58726ff6edd5495~mv2.jpg/v1/crop/x_84,y_0,w_907,h_1214/fill/w_907,h_1214,al_c,q_85,enc_avif,quality_auto/536553245_1658062488450681_1675531161089091145_n.jpg',
      'https://static.wixstatic.com/media/bbdef6_a59e50ab8b80412392908cdb89bc54dc~mv2.jpg/v1/fill/w_980,h_700,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_3939.jpg',
      'https://static.wixstatic.com/media/bbdef6_65d32ccb79c84bc99a9c6bee0c32aed5~mv2.jpg/v1/fill/w_980,h_980,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/481211558_1527747081482223_118554144495421154_n%20(2).jpg',
      'https://static.wixstatic.com/media/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg/v1/fill/w_762,h_762,al_c,q_85,enc_avif,quality_auto/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg',
      'https://static.wixstatic.com/media/bbdef6_96a26e43df3447a7a58726ff6edd5495~mv2.jpg/v1/fill/w_600,h_600,al_c,q_85,enc_avif,quality_auto/536553245_1658062488450681_1675531161089091145_n.jpg',
      'https://static.wixstatic.com/media/bbdef6_a59e50ab8b80412392908cdb89bc54dc~mv2.jpg/v1/crop/x_0,y_50,w_700,h_700/fill/w_700,h_700,al_c,q_85,enc_avif,quality_auto/IMG_3939.jpg',
      'https://static.wixstatic.com/media/bbdef6_65d32ccb79c84bc99a9c6bee0c32aed5~mv2.jpg/v1/crop/x_50,y_50,w_800,h_800/fill/w_800,h_800,al_c,q_85,enc_avif,quality_auto/481211558_1527747081482223_118554144495421154_n%20(2).jpg',
    ],
    labels: ['Campaign Shot 01','Detail 01','Manufacture 01','Lookbook 01','Campaign Shot 02','Detail 02','Process 01','Catalogue 01'],
  },
  {
    slug: 'kboutegon', name: "K'BOUTEGON",
    tagline: 'Where tradition meets the avant-garde.',
    craftDetail: 'Atelier technique · Mixed-metal assembly · 16–24 day production',
    images: [
      'https://static.wixstatic.com/media/bbdef6_96a26e43df3447a7a58726ff6edd5495~mv2.jpg/v1/fill/w_980,h_980,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/536553245_1658062488450681_1675531161089091145_n.jpg',
      'https://static.wixstatic.com/media/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg/v1/fill/w_762,h_1005,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg',
      'https://static.wixstatic.com/media/bbdef6_65d32ccb79c84bc99a9c6bee0c32aed5~mv2.jpg/v1/fill/w_980,h_980,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/481211558_1527747081482223_118554144495421154_n%20(2).jpg',
      'https://static.wixstatic.com/media/bbdef6_a59e50ab8b80412392908cdb89bc54dc~mv2.jpg/v1/fill/w_980,h_700,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_3939.jpg',
      'https://static.wixstatic.com/media/bbdef6_96a26e43df3447a7a58726ff6edd5495~mv2.jpg/v1/crop/x_84,y_0,w_907,h_1214/fill/w_907,h_1214,al_c,q_85,enc_avif,quality_auto/536553245_1658062488450681_1675531161089091145_n.jpg',
      'https://static.wixstatic.com/media/bbdef6_65d32ccb79c84bc99a9c6bee0c32aed5~mv2.jpg/v1/crop/x_100,y_100,w_800,h_800/fill/w_800,h_800,al_c,q_85,enc_avif,quality_auto/481211558_1527747081482223_118554144495421154_n%20(2).jpg',
      'https://static.wixstatic.com/media/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg/v1/fill/w_600,h_600,al_c,q_85,enc_avif,quality_auto/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg',
      'https://static.wixstatic.com/media/bbdef6_a59e50ab8b80412392908cdb89bc54dc~mv2.jpg/v1/crop/x_200,y_100,w_500,h_500/fill/w_500,h_500,al_c,q_85,enc_avif,quality_auto/IMG_3939.jpg',
    ],
    labels: ['Campaign Shot 01','Detail 01','Lookbook 01','Process 01','Campaign Shot 02','Detail 02','Catalogue 01','Wear 01'],
  },
];

// ── CSS TO ADD ──
const NEW_CSS = `
/* ── PRODUCT SLIDER ── */
.cld-slider-wrap{overflow:hidden;padding:48px 0;border-top:1px solid rgba(65,105,225,.07);border-bottom:1px solid rgba(65,105,225,.07);position:relative;}
.cld-slider-eyebrow{font-size:9px;font-weight:500;letter-spacing:.45em;text-transform:uppercase;color:var(--gold);padding:0 80px;margin-bottom:28px;opacity:.8;display:block;}
.cld-slider-viewport{overflow:hidden;}
.cld-slider-track{display:flex;gap:4px;animation:sliderMarquee 36s linear infinite;}
.cld-slider-track:hover{animation-play-state:paused;}
.cld-slider-item{flex-shrink:0;width:300px;height:300px;overflow:hidden;background:var(--dark);position:relative;}
.cld-slider-item img{width:100%;height:100%;object-fit:cover;filter:grayscale(15%) brightness(.7);transition:filter .7s;}
.cld-slider-item:hover img{filter:grayscale(0%) brightness(.9);}
@keyframes sliderMarquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

/* ── WHITE EDITORIAL SECTIONS ── */
.cld-ws{background:#f5f0ea;color:#080808;position:relative;overflow:hidden;}
.cld-ws-eyebrow{font-size:9px;font-weight:600;letter-spacing:.5em;text-transform:uppercase;color:#4169E1;margin-bottom:24px;display:block;}
.cld-ws-heading{font-size:clamp(48px,8vw,130px);font-weight:800;line-height:.88;letter-spacing:-.04em;text-transform:uppercase;color:#080808;}
.cld-ws-body{font-size:clamp(14px,1.3vw,18px);font-weight:400;line-height:1.8;color:rgba(8,8,8,.6);max-width:580px;margin-top:28px;}
.cld-ws-quote{font-size:clamp(20px,2.5vw,36px);font-weight:300;font-style:italic;line-height:1.3;border-left:4px solid #4169E1;padding-left:28px;color:#080808;margin-top:36px;}
/* Full-width layout */
.cld-ws--full{padding:110px 80px;}
/* Split layout */
.cld-ws--split{display:grid;grid-template-columns:1fr 1fr;min-height:560px;}
.cld-ws-side-text{padding:80px;display:flex;flex-direction:column;justify-content:center;}
.cld-ws-side-img{position:relative;overflow:hidden;background:#111;}
.cld-ws-side-img img{width:100%;height:100%;object-fit:cover;opacity:.85;display:block;}
/* Stats */
.cld-ws-stats{display:flex;gap:60px;margin-top:48px;flex-wrap:wrap;}
.cld-ws-stat-num{font-size:clamp(42px,5vw,80px);font-weight:900;color:#4169E1;line-height:1;}
.cld-ws-stat-lbl{font-size:9px;font-weight:500;letter-spacing:.25em;text-transform:uppercase;color:rgba(8,8,8,.45);margin-top:6px;}
/* Background accent text */
.cld-ws-bg-text{position:absolute;bottom:-40px;right:-20px;font-size:clamp(80px,14vw,220px);font-weight:900;color:rgba(8,8,8,.04);line-height:1;letter-spacing:-.06em;text-transform:uppercase;pointer-events:none;white-space:nowrap;}
/* Dark inverse variant */
.cld-ws--dark{background:#080808;color:#f5f0ea;}
.cld-ws--dark .cld-ws-heading{color:#f5f0ea;}
.cld-ws--dark .cld-ws-body{color:rgba(245,240,234,.55);}
.cld-ws--dark .cld-ws-stat-num{color:#4169E1;}
.cld-ws--dark .cld-ws-stat-lbl{color:rgba(245,240,234,.35);}
.cld-ws--dark .cld-ws-bg-text{color:rgba(245,240,234,.03);}
.cld-ws--dark .cld-ws-quote{color:rgba(245,240,234,.75);}

/* ── MINI IMAGE GRIDS (2-up) ── */
.cld-mini-grid{display:grid;grid-template-columns:1fr 1fr;gap:3px;}
.cld-mini-item{position:relative;overflow:hidden;background:var(--dark);height:520px;}
.cld-mini-item img{width:100%;height:100%;object-fit:cover;filter:grayscale(25%) brightness(.65);transition:transform 1.1s cubic-bezier(.16,1,.3,1),filter 1s;display:block;}
.cld-mini-item:hover img{transform:scale(1.05);filter:grayscale(0%) brightness(.8);}
.cld-mini-label{position:absolute;bottom:0;left:0;right:0;padding:14px 18px;background:linear-gradient(to top,rgba(8,8,8,.8),transparent);font-size:8px;font-weight:500;letter-spacing:.3em;text-transform:uppercase;color:rgba(245,240,234,.35);opacity:0;transition:opacity .4s;}
.cld-mini-item:hover .cld-mini-label{opacity:1;}

/* ── VIDEO SECTION ── */
.cld-video-sec{position:relative;overflow:hidden;background:#000;max-height:75vh;}
.cld-video-sec video{width:100%;display:block;max-height:75vh;object-fit:cover;}
.cld-video-sec-overlay{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:48px 80px;background:linear-gradient(to top,rgba(8,8,8,.6),transparent 50%);}
.cld-video-tag{font-size:9px;font-weight:500;letter-spacing:.45em;text-transform:uppercase;color:rgba(255,255,255,.45);}
.cld-video-title{font-size:clamp(22px,3vw,44px);font-weight:300;font-style:italic;color:rgba(255,255,255,.85);margin-top:8px;}

/* ── RESPONSIVE ── */
@media(max-width:1024px){
  .cld-ws--split{grid-template-columns:1fr;}
  .cld-ws-side-img{min-height:400px;}
  .cld-ws-side-text{padding:64px 48px;}
  .cld-ws--full{padding:80px 48px;}
  .cld-slider-eyebrow{padding:0 48px;}
  .cld-video-sec-overlay{padding:36px 48px;}
}
@media(max-width:768px){
  .cld-slider-item{width:220px;height:220px;}
  .cld-ws--full{padding:64px 28px;}
  .cld-ws-side-text{padding:48px 28px;}
  .cld-mini-item{height:280px;}
  .cld-ws-stats{gap:32px;}
  .cld-slider-eyebrow{padding:0 28px;}
  .cld-video-sec-overlay{padding:28px 28px;}
}
`;

// ── BUILD NEW GALLERY BLOCK ──
function buildNewGallery(col) {
  const imgs = col.images;
  const lbs  = col.labels;

  function miniGrid(i1, i2) {
    return (
      '<div class="cld-mini-grid">\n' +
      '  <div class="cld-mini-item reveal"><img src="' + imgs[i1] + '" alt="' + lbs[i1] + '" loading="lazy"><div class="cld-mini-label">' + lbs[i1] + '</div></div>\n' +
      '  <div class="cld-mini-item reveal-right"><img src="' + imgs[i2] + '" alt="' + lbs[i2] + '" loading="lazy"><div class="cld-mini-label">' + lbs[i2] + '</div></div>\n' +
      '</div>'
    );
  }

  const sectionOurManifest =
    '<div class="cld-ws cld-ws--full reveal">' +
    '<span class="cld-ws-eyebrow">MKT · Philosophy</span>' +
    '<h2 class="cld-ws-heading">Our<br>Manifest</h2>' +
    '<p class="cld-ws-body">Every piece begins with a single conversation. We listen before we design, ask before we create. MKT exists at the intersection of personal identity and precious craft — where your story becomes metal and stone that lasts a lifetime.</p>' +
    '<blockquote class="cld-ws-quote">"' + col.tagline + '"</blockquote>' +
    '<span class="cld-ws-bg-text">MKT</span>' +
    '</div>';

  const sectionDetails =
    '<div class="cld-ws cld-ws--split">' +
    '<div class="cld-ws-side-text reveal">' +
    '<span class="cld-ws-eyebrow">Craft Standard</span>' +
    '<h2 class="cld-ws-heading">Details<br>Define<br>Excellence</h2>' +
    '<p class="cld-ws-body">' + col.craftDetail + '. No seam goes unexamined. No stone is set without intention. MKT\'s production standard demands that every surface, every edge, every reflection meets our absolute criterion.</p>' +
    '<div class="cld-ws-stats">' +
    '<div><div class="cld-ws-stat-num">100%</div><div class="cld-ws-stat-lbl">Hand-finished</div></div>' +
    '<div><div class="cld-ws-stat-num">0</div><div class="cld-ws-stat-lbl">Remakes accepted</div></div>' +
    '<div><div class="cld-ws-stat-num">1/1</div><div class="cld-ws-stat-lbl">Each piece unique</div></div>' +
    '</div></div>' +
    '<div class="cld-ws-side-img reveal-right"><img src="' + imgs[2] + '" alt="Details" loading="lazy"></div>' +
    '</div>';

  const videoSection =
    '<div class="cld-video-sec">' +
    '<video autoplay muted loop playsinline poster="' + imgs[0] + '">' +
    '<source src="https://video.richardmille.com/mobile/RM-07-01-CC3_packshot_169-header_1.mp4" type="video/mp4">' +
    '</video>' +
    '<div class="cld-video-sec-overlay">' +
    '<span class="cld-video-tag">Production · Behind the Craft</span>' +
    '<p class="cld-video-title">From sketch to skin — the making of ' + col.name + '</p>' +
    '</div>' +
    '</div>';

  const sectionCreativeDir =
    '<div class="cld-ws cld-ws--split cld-ws--dark">' +
    '<div class="cld-ws-side-img reveal"><img src="' + imgs[5] + '" alt="Creative Director" loading="lazy"></div>' +
    '<div class="cld-ws-side-text reveal-right">' +
    '<span class="cld-ws-eyebrow">Creative Director</span>' +
    '<h2 class="cld-ws-heading">Mai Kim<br>Thanh</h2>' +
    '<p class="cld-ws-body">Founder, designer, and the creative force behind every MKT collection. Rooted in Vietnamese craft tradition, elevated by international fine jewelry standards. Every MKT piece carries her signature and her silence.</p>' +
    '<blockquote class="cld-ws-quote">"I don\'t make jewelry for display. I make it for people who feel it when they wear it."</blockquote>' +
    '<span class="cld-ws-bg-text">MKT</span>' +
    '</div>' +
    '</div>';

  const sectionEternal =
    '<div class="cld-ws cld-ws--full" style="text-align:center;padding:130px 80px;">' +
    '<span class="cld-ws-eyebrow" style="display:block;text-align:center;">MKT · Standard</span>' +
    '<h2 class="cld-ws-heading" style="margin:0 auto;">Eternal<br>Standards</h2>' +
    '<p class="cld-ws-body" style="margin:28px auto 0;text-align:center;">We don\'t compromise. We don\'t replicate. We don\'t rush. Every MKT piece is a declaration — of craft, of identity, and of the unyielding belief that nothing worth wearing should ever be ordinary.</p>' +
    '<span class="cld-ws-bg-text" style="right:50%;transform:translateX(50%);bottom:-60px;">∞</span>' +
    '</div>';

  return (
    '<!-- GALLERY -->\n' +
    miniGrid(0, 1) + '\n\n' +
    sectionOurManifest + '\n\n' +
    miniGrid(2, 3) + '\n\n' +
    sectionDetails + '\n\n' +
    videoSection + '\n\n' +
    miniGrid(4, 5) + '\n\n' +
    sectionCreativeDir + '\n\n' +
    miniGrid(6, 7) + '\n\n' +
    sectionEternal + '\n\n'
  );
}

// ── BUILD SLIDER ──
function buildSlider(col) {
  const items = col.images.map(src =>
    '<div class="cld-slider-item"><img src="' + src + '" alt="" loading="lazy"></div>'
  ).join('\n');
  // Duplicate for seamless loop
  return (
    '<div class="cld-slider-wrap">\n' +
    '<span class="cld-slider-eyebrow">The Collection</span>\n' +
    '<div class="cld-slider-viewport">\n' +
    '<div class="cld-slider-track">\n' +
    items + '\n' +
    items + '\n' + // duplicate
    '</div>\n' +
    '</div>\n' +
    '</div>'
  );
}

// ── PROCESS EACH FILE ──
collections.forEach(col => {
  const file = 'collection-' + col.slug + '.html';
  if (!fs.existsSync(file)) { console.log('SKIP (not found):', file); return; }

  let html = fs.readFileSync(file, 'utf8');

  // 1. Add new CSS before closing </style> of main style block (first occurrence)
  if (!html.includes('cld-slider-wrap')) {
    html = html.replace('/* SCROLL REVEAL */', NEW_CSS + '\n/* SCROLL REVEAL */');
  }

  // 2. Insert slider after </section> that closes cld-intro
  if (!html.includes('cld-slider-wrap')) {
    html = html.replace(
      /(<\/section>\s*)(<!-- GALLERY -->)/,
      '$1\n' + buildSlider(col) + '\n\n$2'
    );
  } else if (!html.includes('cld-slider-viewport')) {
    // CSS added but slider HTML not yet — insert it
    html = html.replace(
      /(<\/section>\s*)(<!-- GALLERY -->)/,
      '$1\n' + buildSlider(col) + '\n\n$2'
    );
  }

  // 3. Replace everything from <!-- GALLERY --> through the next </section> (gallery)
  // and substitute with new structured gallery
  html = html.replace(
    /<!-- GALLERY -->[\s\S]*?(?=<!-- PREV)/,
    buildNewGallery(col)
  );

  fs.writeFileSync(file, html);
  console.log('Updated:', file);
});

console.log('\nDone! All collection pages updated.');
