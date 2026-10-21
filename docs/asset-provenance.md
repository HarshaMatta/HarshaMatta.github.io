# Asset provenance

Native app images are existing local screenshots/icons. The technical screenshots listed below were captured from the actual applications for this revision. No synthetic app screenshots, purchased backgrounds, remote hotlinks, recordings, or external media uploads were introduced. Existing files are copied byte-for-byte by the build. See `SOURCE-NOTES.md` for the supplied research snapshot and developer evidence boundaries.

| Local asset under `public/assets/` | Intrinsic pixels | Bytes | Origin / use boundary |
| --- | --- | --- | --- |
| `next-icon.webp` | 128 × 128 | 1,988 | Supplied portfolio package; original Next product-site captures |
| `next-dashboard.webp` | 1600 × 900 | 41,010 | Supplied portfolio package; original Next product-site captures |
| `next-schedule.webp` | 1600 × 900 | 27,206 | Supplied portfolio package; original Next product-site captures |
| `next-proposal.webp` | 800 × 1576 | 61,250 | Supplied portfolio package; original Next product-site captures |
| `office-icon.jpg` | 512 × 512 | 28,246 | Existing InOffice portfolio assets |
| `office-dashboard.jpg` | 444 × 960 | 59,636 | Existing InOffice portfolio assets |
| `office-calendar.jpg` | 444 × 960 | 64,483 | Existing InOffice portfolio assets |
| `trackinoffice/screen3.jpg` | 444 × 960 | 59,223 | Existing InOffice portfolio assets |
| `paatam/icon.jpg` | 512 × 512 | 29,237 | Existing Paatam portfolio assets; confirmed by the developer as the definitive Flutter app |
| `paatam/screen1.jpg` | 442 × 960 | 38,253 | Existing Paatam portfolio assets; confirmed by the developer as the definitive Flutter app |
| `paatam/screen2.jpg` | 442 × 960 | 30,650 | Existing Paatam portfolio assets; confirmed by the developer as the definitive Flutter app |
| `paatam/screen3.jpg` | 442 × 960 | 37,775 | Existing Paatam portfolio assets; confirmed by the developer as the definitive Flutter app |
| `paatam/screen4.jpg` | 442 × 960 | 22,614 | Existing Paatam portfolio assets; confirmed by the developer as the definitive Flutter app |

Images are already modest JPEG/WebP files; avoid lossy recompression of text-heavy app UI. Intrinsic sizes are recorded in `src/media.js`, screenshots preserve aspect ratio, hero images load eagerly, and below-the-fold images load lazily. Full-size links expose the original files.

`public/favicon.svg` and historical assets/PDFs remain available under their existing URLs. Historical diagram SVGs are preserved as assets but are not presented as real app screenshots or research results. The historical resume PDFs were not rewritten.

Fonts use platform-supplied system sans/Georgia and system script fallbacks; no licensed font binaries were imported. Presentation backgrounds are original CSS. Internal QA screenshots under `docs/qa/evidence/` are not copied to `dist/`.

## Simplified revision: captured applications and original Medium thumbnails

- `screens/qsl-manual.jpg`: actual local `Code/QSL/quant_strategy_lab` FastAPI/React interface. Ran SMA crossover on the built-in sample series without a ticker or network price request. Numbers in the screenshot are illustrative sample output. The original CDN scripts failed to render, so a temporary copy used the installed React runtime, local Chart.js 4.4.1, and esbuild to load the original unmodified JSX. The original FastAPI backend handled the request. No `.env` or credential was copied; AI mode was not executed.
- `screens/qsl-ai.jpg`: actual AI-mode configuration interface, with no credential entered and no model call. The screenshot’s `sk-…` text is the empty input placeholder.
- `screens/vrp.jpg`: actual local `Code/VRP` Streamlit dashboard, using its committed dataset and default filters.
- `screens/greeks.jpg`: actual public `HarshaMatta/GreeksVisualizer` `main.py`, cloned into a temporary directory and run with the existing VRP Python environment. Default call parameters shown; no project source changes.
- `articles/{vrp,american-2,american-1,options}.png`: the exact 320×214 thumbnails served on the author’s Medium profile, downloaded through the browser. Dates and titles were read from the public articles. The profile feed returned HTTP 403, so it was not used. No article body was republished.
- `src/notebook.json`: two verbatim code cells (indices 2 and 10) from the local `Code/VRP/notebooks/02_realized_volatility.ipynb`, whose remote is `HarshaMatta/VolatilityRiskPremium`. The site links to the original full notebook. The cells are displayed as source, not newly executed results.

The new capture servers are temporary QA tools, not portfolio dependencies or hosted backends. Asset dimensions, including these additions, are recorded in `src/media.js`.

## Follow-up: Next iOS card and deal.II contributions

`next/iphone-dashboard.webp` and `next/iphone-schedule.webp` are byte-for-byte copies of the existing Next product-site assets at `Code/projNext/docs/assets/`, each 800×1576. They already include phone bezels, so the card does not add a second frame. Both were visually inspected before use; no image editing or new capture was needed. The independent product-site source remains untouched.

On October 21, 2026, the GitHub API verified the author’s deal.II contributions: [#19327](https://github.com/dealii/dealii/pull/19327) merged February 25, [#19370](https://github.com/dealii/dealii/pull/19370) merged March 8, and [#19804](https://github.com/dealii/dealii/pull/19804) open. The interpolation explanation follows the actual merged patch: grid spacing is cached during construction rather than recomputed during interpolation calls. No benchmark or speedup figure is claimed. The open PR is labeled separately from merged work. The homepage is a static snapshot of those verified statuses.
