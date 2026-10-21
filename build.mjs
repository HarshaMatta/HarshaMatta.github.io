import { build } from 'esbuild';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { projects } from './src/data.js';
import React from 'react';
import { renderToString } from 'react-dom/server';

const origin = 'https://harshamatta.github.io';
const pages = [
  {
    id: 'home',
    name: 'Harsha Matta',
    description: 'Projects and articles by Harsha Matta. Applied mathematics and computer science at UNC–Chapel Hill.',
  },
  ...projects,
  {id:'articles',name:'Medium articles',description:'Articles by Harsha Matta on quantitative finance and mathematics.'},
];
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('public', 'dist', { recursive: true });
// Render the same React tree used by the client. This module is temporary and never published.
const renderer = await build({
  entryPoints: ['src/App.jsx'], bundle: true, platform: 'node', format: 'esm',
  packages: 'external', jsx: 'automatic', write: false,
});
await writeFile('dist/.render.mjs', renderer.outputFiles[0].contents);
const { default: App } = await import(new URL('./dist/.render.mjs', import.meta.url));
await rm('dist/.render.mjs');
const bundle = await build({
  entryPoints: { app: 'src/main.jsx' },
  bundle: true,
  minify: true,
  outdir: 'dist',
  entryNames: '[name]-[hash]',
  metafile: true,
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"production"' },
});
const [scriptPath, scriptOutput] = Object.entries(bundle.metafile.outputs).find(([, output]) => output.entryPoint);
const script = scriptPath.replace(/^dist\//, '');
const stylesheet = scriptOutput.cssBundle.replace(/^dist\//, '');

for (const page of pages) {
  const home = page.id === 'home';
  const directory = home ? 'dist' : `dist/${page.id}`;
  const base = home ? './' : '../';
  const title = `${page.name}${home ? ' — Projects & articles' : ' — A project by Harsha Matta'}`;
  const url = `${origin}/${home ? '' : `${page.id}/`}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#fafafa">
  <title>${escape(title)}</title>
  <meta name="description" content="${escape(page.description)}">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(page.description)}">
  <meta property="og:url" content="${url}">
  <link rel="icon" type="image/svg+xml" href="${base}favicon.svg">
  <link rel="stylesheet" href="${base}${stylesheet}">
</head>
<body data-page="${page.id}">
  <a class="skip-link" href="#main">Skip to content</a>
  <div id="root">${renderToString(React.createElement(App, { page: page.id }))}</div>
  <noscript><p class="shell">Enable JavaScript to use the interactive samples. Project explanations, screenshots, and links remain available below.</p></noscript>
  <script type="module" src="${base}${script}"></script>
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
  <meta name="theme-color" content="#fafafa">
  <title>Page not found — Harsha Matta</title>
  <link rel="icon" type="image/svg+xml" href="${origin}/favicon.svg">
  <style>${await readFile('src/styles/tokens.css', 'utf8')}
  *{box-sizing:border-box}body{margin:0;background:var(--background);color:var(--text);font:1rem/1.7 var(--font-body)}main{max-width:76rem;margin:auto;padding:clamp(24px,8vw,100px)}h1{font:400 clamp(2.75rem,7vw,5rem)/1.1 var(--font-display);letter-spacing:-.04em}p{max-width:40rem}.eyebrow{font-size:.8rem;letter-spacing:.12em;color:var(--accent)}.button{display:inline-flex;min-height:44px;align-items:center;background:var(--accent);color:white;padding:12px 20px;border-radius:var(--radius-small);text-decoration:none}a:focus-visible{outline:3px solid var(--focus);outline-offset:4px}
  </style>
</head>
<body>
  <main id="main" class="shell"><section class="research-heading">
    <p class="eyebrow">404 / PAGE NOT FOUND</p>
    <h1>Page not found</h1>
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
console.log('Built homepage, Articles, seven project routes, sitemap, and standalone 404 in dist/.');
