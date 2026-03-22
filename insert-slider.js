const fs = require('fs');

const slugs = ['mscotik','mcelestial','mrisingstar','knot','kethereality','kharmonics','kboutegon'];

const IMG = {
  A: 'https://static.wixstatic.com/media/bbdef6_65d32ccb79c84bc99a9c6bee0c32aed5~mv2.jpg/v1/fill/w_600,h_600,al_c,q_85,enc_avif,quality_auto/481211558_1527747081482223_118554144495421154_n%20(2).jpg',
  B: 'https://static.wixstatic.com/media/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg/v1/fill/w_600,h_600,al_c,q_85,enc_avif,quality_auto/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg',
  C: 'https://static.wixstatic.com/media/bbdef6_96a26e43df3447a7a58726ff6edd5495~mv2.jpg/v1/fill/w_600,h_600,al_c,q_85,enc_avif,quality_auto/536553245_1658062488450681_1675531161089091145_n.jpg',
  D: 'https://static.wixstatic.com/media/bbdef6_a59e50ab8b80412392908cdb89bc54dc~mv2.jpg/v1/fill/w_600,h_600,al_c,q_85,enc_avif,quality_auto/IMG_3939.jpg',
  A2: 'https://static.wixstatic.com/media/bbdef6_65d32ccb79c84bc99a9c6bee0c32aed5~mv2.jpg/v1/crop/x_100,y_100,w_700,h_700/fill/w_600,h_600,al_c,q_85,enc_avif,quality_auto/481211558_1527747081482223_118554144495421154_n%20(2).jpg',
  B2: 'https://static.wixstatic.com/media/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg/v1/crop/x_100,y_100,w_500,h_500/fill/w_600,h_600,al_c,q_85,enc_avif,quality_auto/bbdef6_df8fbe6f4a18452682c0e58c3394fd2b~mv2.jpg',
  C2: 'https://static.wixstatic.com/media/bbdef6_96a26e43df3447a7a58726ff6edd5495~mv2.jpg/v1/crop/x_0,y_100,w_700,h_700/fill/w_600,h_600,al_c,q_85,enc_avif,quality_auto/536553245_1658062488450681_1675531161089091145_n.jpg',
  D2: 'https://static.wixstatic.com/media/bbdef6_a59e50ab8b80412392908cdb89bc54dc~mv2.jpg/v1/crop/x_0,y_0,w_600,h_600/fill/w_600,h_600,al_c,q_85,enc_avif,quality_auto/IMG_3939.jpg',
};

const orderMap = {
  mscotik:     [IMG.A, IMG.B, IMG.C, IMG.D, IMG.A2, IMG.B2, IMG.C2, IMG.D2],
  mcelestial:  [IMG.B, IMG.A, IMG.D, IMG.C, IMG.B2, IMG.A2, IMG.D2, IMG.C2],
  mrisingstar: [IMG.C, IMG.A, IMG.B, IMG.D, IMG.C2, IMG.A2, IMG.B2, IMG.D2],
  knot:        [IMG.D, IMG.C, IMG.A, IMG.B, IMG.D2, IMG.C2, IMG.A2, IMG.B2],
  kethereality:[IMG.A, IMG.D, IMG.C, IMG.B, IMG.A2, IMG.D2, IMG.C2, IMG.B2],
  kharmonics:  [IMG.B, IMG.C, IMG.D, IMG.A, IMG.B2, IMG.C2, IMG.D2, IMG.A2],
  kboutegon:   [IMG.C, IMG.B, IMG.A, IMG.D, IMG.C2, IMG.B2, IMG.A2, IMG.D2],
};

function buildSlider(slug) {
  const imgs = orderMap[slug];
  const makeItem = src => '<div class="cld-slider-item"><img src="' + src + '" alt="" loading="lazy"></div>';
  const items = imgs.map(makeItem).join('');
  return (
    '\n<div class="cld-slider-wrap">\n' +
    '<span class="cld-slider-eyebrow">The Collection</span>\n' +
    '<div class="cld-slider-viewport"><div class="cld-slider-track">' +
    items + items +
    '</div></div>\n' +
    '</div>\n'
  );
}

slugs.forEach(function(slug) {
  const file = 'collection-' + slug + '.html';
  let html = fs.readFileSync(file, 'utf8');

  if (html.includes('cld-slider-viewport')) {
    console.log('SKIP (already has slider):', file);
    return;
  }

  // Insert slider between closing </section> of intro and <!-- GALLERY -->
  const before = html;
  html = html.replace(
    /(<\/section>)(\s*\n)(<!-- GALLERY -->)/,
    '$1$2' + buildSlider(slug) + '\n$3'
  );

  if (html === before) {
    console.log('WARN (pattern not matched):', file);
  } else {
    fs.writeFileSync(file, html);
    console.log('OK:', file);
  }
});

console.log('Done.');
