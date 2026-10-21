# Harsha Matta — portfolio

Source for https://harshamatta.github.io/, based on the supplied October 21, 2026 portfolio. React is bundled with esbuild into nine directly accessible static pages. There are no API keys, external fonts, analytics, or backend services.

## Current design

The simplified project-first revision was reviewed locally and approved for publication on October 21, 2026. The retained GitHub Pages workflow deploys `main` to https://harshamatta.github.io/.

See `DESIGN.md` for visual rules, `docs/design-direction.md` for the research/route decisions, and `docs/qa.md` for verification. Real app screenshots lead the showcases; the finance and attendance controls are small interactive previews.

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

- `/`: projects, Medium articles, open-source contributions, and social links.
- `/articles/`: all four Medium articles with original thumbnails and publication dates.
- `/inoffice/`, `/paatam/`: app screenshots, phone frames, and concise product descriptions. InOffice also includes an attendance demo.
- Next cards link directly to the independent `/projNext/` product site. `/next/` remains a small compatibility page with that same destination.
- `/quant-lab/`: real local interface screenshots and the two strategy-lab modes.
- `/vrp/`: Streamlit screenshot/link, companion article, historical chart, and original notebook cells.
- `/options/`, `/greeks/`: technical showcases and calculators; Greeks leads with the original Streamlit project.

Edit copy and links in `src/data.js`, route composition in `src/App.jsx`, shared primitives in `src/components.jsx`, and browser samples in `src/demos.jsx`. `src/Chart.jsx` owns accessible charts/data tables; `src/styles/tokens.css` and `src/style.css` own tokens/layout. `src/main.jsx` hydrates the pre-rendered content. `src/math.js` implements the bounded educational pricing model; `src/vrp-data.json` holds historical monthly observations. `build.mjs` pre-renders the same React page tree, emits route-specific HTML/metadata, bundles content-hashed scripts/styles, and generates the sitemap, `.nojekyll`, and standalone 404. The temporary server-rendering module is removed before packaging. No runtime server is needed.

`public/` is copied intact into the output. It contains both supplied screenshots and historical assets. Keep `assets/resume.pdf`, `assets/Harsha_Matta_Resume.pdf`, and historical screenshot URLs available even though the new interface has no resume link. The Paatam page represents the definitive Flutter app with the developer-confirmed screenshots. The independently hosted `/projNext/` project site is outside this repository and remains untouched.

## Deployment

GitHub Pages must use **GitHub Actions** as its build source. `.github/workflows/deploy.yml` runs on pushes to `main` and manual dispatch. It installs with Node.js 22, runs mathematical tests, builds, checks all published routes/assets, and deploys only `dist/` through the official Pages actions.

Review changes and run the commands above before pushing. Check the deployment workflow result and published routes after pushing; do not infer publication merely from a successful push.

## Demonstration boundaries

The removed Next, Paatam, and Quant workflow samples are no longer rendered. Attendance data is fictional and exported as a sample CSV. Paatam presents the developer-confirmed custom spaced repetition system and definitive Flutter screenshots. Quant Lab screenshots were captured from its actual FastAPI app; its sample backtest is not a performance claim. VRP displays committed historical observations, not a live feed. Options and Greeks use hypothetical inputs with fixed strike $100 and annual rate 4%; they do not port the original Python applications.

See `SOURCE-NOTES.md` for supplied research evidence and claim boundaries. Its original inspection and testing statements describe the supplied package, not verification of native apps during this replacement.
