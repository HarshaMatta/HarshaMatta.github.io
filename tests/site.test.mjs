import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { projects } from '../src/data.js';

const output = resolve('dist');
const origin = 'https://harshamatta.github.io';
const routes = ['', ...projects.map((project) => `${project.id}/`), 'articles/'];

async function exists(path) {
  assert.ok((await stat(path)).isFile(), `Missing published file: ${path}`);
}

for (const route of routes) {
  const html = await readFile(resolve(output, route, 'index.html'), 'utf8');
  assert.match(html, new RegExp(`data-page="${route ? route.slice(0, -1) : 'home'}"`));
  assert.ok(html.includes(`<link rel="canonical" href="${origin}/${route}">`));
  assert.match(html, /<title>.+<\/title>/);
  assert.match(html, /<meta name="description" content=".+">/);
  assert.equal((html.match(/<h1>/g) || []).length, 1, `${route}: meaningful initial heading`);
  assert.match(html, /<main[^>]+id="main"/);
  assert.ok(!html.includes('dist/.render') && !html.includes('.render.mjs'));
  for (const [image] of html.matchAll(/<img\b[^>]+>/g)) {
    assert.match(image, /width="\d+"/, 'Images need intrinsic width');
    assert.match(image, /height="\d+"/, 'Images need intrinsic height');
    assert.match(image, /alt="[^"]*"/, 'Images need alt attributes');
  }
  for (const [, url] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (/^(https?:|mailto:)/.test(url)) continue;
    const target = new URL(url.replaceAll('&amp;', '&'), `https://local.invalid/${route}`);
    const path = resolve(output, `.${target.pathname}`, target.pathname.endsWith('/') ? 'index.html' : '');
    await exists(path);
    if (target.hash) {
      const destination = await readFile(path, 'utf8');
      assert.ok(destination.includes(`id="${target.hash.slice(1)}"`), `Missing anchor ${url} from ${route}`);
    }
  }
  if (['vrp/', 'options/', 'greeks/'].includes(route)) {
    assert.match(html, /View chart data/);
    assert.match(html, /<table>/);
    assert.match(html, /class="chart-summary"/);
  }
}

// Check the data-driven links and screenshots rendered by React as well as HTML shells.
const assets = new Set();
for (const project of projects) {
  for (const name of [project.image, project.icon, ...(project.gallery ?? [])].filter(Boolean)) assets.add(name);
}
for (const name of assets) await exists(resolve(output, 'assets', name));

async function checkLegacy(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const sourcePath = resolve(directory, entry.name);
    if (entry.isDirectory()) await checkLegacy(sourcePath);
    else {
      const published = resolve(output, relative(resolve('public'), sourcePath));
      assert.deepEqual(await readFile(published), await readFile(sourcePath), `Static asset changed: ${sourcePath}`);
    }
  }
}
await checkLegacy(resolve('public'));
for (const name of ['assets/resume.pdf', 'assets/Harsha_Matta_Resume.pdf']) {
  const pdf = await readFile(resolve(output, name));
  assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
}
const sitemap = await readFile(resolve(output, 'sitemap.xml'), 'utf8');
assert.deepEqual([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]), routes.map((route) => `${origin}/${route}`));
const notFound = await readFile(resolve(output, '404.html'), 'utf8');
assert.match(notFound, /Page not found/);
assert.ok(notFound.includes(`href="${origin}/"`));
assert.ok(!notFound.includes('src="./') && !notFound.includes('href="./'));
assert.ok(!notFound.includes('rel="stylesheet"'), '404 styling must be self-contained');
await assert.rejects(stat(resolve(output, '.render.mjs')));
await assert.rejects(stat(resolve(output, 'docs')));
await exists(resolve(output, '.nojekyll'));
console.log('Nine routes, metadata, local resources, legacy assets, resume PDFs, sitemap, and 404 passed.');
