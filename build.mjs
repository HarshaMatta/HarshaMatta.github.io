import { build } from 'esbuild';
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { projects } from './src/data.js';

const origin = 'https://harshamatta.github.io';
const pages = [
  {
    id: 'home',
    name: 'Harsha Matta',
    description: 'Apps, mathematics, and ideas made tangible. Applied math and computer science at UNC–Chapel Hill.',
  },
  ...projects,
];
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('public', 'dist', { recursive: true });
await build({
  entryPoints: ['src/main.jsx'],
  bundle: true,
  minify: true,
  outfile: 'dist/app.js',
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"production"' },
});

for (const page of pages) {
  const home = page.id === 'home';
  const directory = home ? 'dist' : `dist/${page.id}`;
  const base = home ? './' : '../';
  const title = `${page.name}${home ? ' — Apps, mathematics & ideas' : ' — A project by Harsha Matta'}`;
  const url = `${origin}/${home ? '' : `${page.id}/`}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f8f7f2">
  <title>${escape(title)}</title>
  <meta name="description" content="${escape(page.description)}">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(page.description)}">
  <meta property="og:url" content="${url}">
  <link rel="icon" type="image/svg+xml" href="${base}favicon.svg">
  <link rel="stylesheet" href="${base}app.css">
</head>
<body data-page="${page.id}">
  <a class="skip-link" href="#main">Skip to content</a>
  <div id="root"></div>
  <noscript><h1>${escape(page.name)}</h1><p>${escape(page.description)}</p><p>Enable JavaScript to explore this interactive portfolio.</p></noscript>
  <script type="module" src="${base}app.js"></script>
</body>
</html>
`);
}

// Absolute URLs work when Pages serves this document at an arbitrary missing path.
await writeFile('dist/404.html', `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <meta name="theme-color" content="#f8f7f2">
  <title>Page not found — Harsha Matta</title>
  <link rel="icon" type="image/svg+xml" href="${origin}/favicon.svg">
  <link rel="stylesheet" href="${origin}/app.css">
</head>
<body>
  <main id="main"><section class="home-hero">
    <p class="eyebrow">404 / PAGE NOT FOUND</p>
    <h1>Let’s find your<br>way back.</h1>
    <p>This page may have moved. Explore my work from the portfolio homepage.</p>
    <a class="button" href="${origin}/">Back to the portfolio →</a>
  </section></main>
</body>
</html>
`);

await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url><loc>${origin}/${page.id === 'home' ? '' : `${page.id}/`}</loc></url>`).join('\n')}
</urlset>
`);
await writeFile('dist/.nojekyll', '');
console.log('Built homepage, seven project pages, sitemap, and standalone 404 in dist/.');
