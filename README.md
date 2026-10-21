# Harsha Matta — portfolio

Source for https://harshamatta.github.io/, based on the supplied October 21, 2026 portfolio. React is bundled with esbuild into eight directly accessible static pages. There are no API keys, external fonts, analytics, or backend services.

## Build and verify

Requires Node.js 22 or newer:

```sh
npm ci
npm test
npm run build
npm run test:site
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173/ over HTTP. The `dist/` directory is generated and ignored by Git.

## Pages and editing

- `/`: selected work, writing, about, and contact.
- `/next/`, `/inoffice/`, `/paatam/`: app showcases and illustrative browser demos.
- `/quant-lab/`, `/vrp/`, `/options/`, `/greeks/`: technical project showcases and browser demonstrations.

Edit copy and links in `src/data.js`, presentation and browser interactions in `src/main.jsx`, and styling in `src/style.css`. `src/math.js` implements the bounded educational pricing model; `src/vrp-data.json` holds historical monthly observations. `build.mjs` generates route-specific HTML, metadata, sitemap, `.nojekyll`, and a standalone 404 page.

`public/` is copied intact into the output. It contains both supplied screenshots and historical assets. Keep `assets/resume.pdf`, `assets/Harsha_Matta_Resume.pdf`, and historical screenshot URLs available even though the new interface has no resume link. The old `/paatam/` page is replaced with the supplied original Flutter showcase. The independently hosted `/projNext/` project site is outside this repository and remains untouched.

## Deployment

GitHub Pages must use **GitHub Actions** as its build source. `.github/workflows/deploy.yml` runs on pushes to `main` and manual dispatch. It installs with Node.js 22, runs mathematical tests, builds, checks all published routes/assets, and deploys only `dist/` through the official Pages actions.

Review changes and run the commands above before pushing. Check the deployment workflow result and published routes after pushing; do not infer publication merely from a successful push.

## Demonstration boundaries

Next approvals affect only browser state. Attendance data is fictional; its CSV export never accesses location. Paatam illustrates five characters in five scripts from the original Flutter concept. Quant Lab illustrates a workflow without a backend. VRP displays committed historical observations, not a live feed. Options and Greeks use hypothetical inputs with fixed strike $100 and annual rate 4%; they do not port the original Python applications.

See `SOURCE-NOTES.md` for supplied research evidence and claim boundaries. Its original inspection and testing statements describe the supplied package, not verification of native apps during this replacement.
