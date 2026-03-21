const fs = require('fs');
const files = ['brand.html','events.html','store.html','contact.html','pricing.html'];
files.forEach(f => {
  let html = fs.readFileSync(f,'utf8');
  const before = html.length;
  // Remove duplicate addEventListener for menu-btn
  html = html.replace(/[ \t]*document\.getElementById\(["']menu-btn["']\)\.addEventListener\(["']click["'],\s*toggleMenu\);?\r?\n?/g, '');
  fs.writeFileSync(f, html);
  console.log(f + ': ' + (before - html.length) + ' chars removed');
});
