# Portfolio architecture

Nine static React pages are generated with esbuild and React’s server renderer. `src/App.jsx` composes each route; `src/components.jsx` contains shared presentation primitives; `src/demos.jsx` contains browser-only state and controls; `src/Chart.jsx` provides plots, summaries, and data tables. `src/main.jsx` hydrates the same tree. No framework, router, server, animation library, or additional runtime dependency was introduced.

`src/data.js` exports the seven project records and four article records. Each project ID is its route; the homepage ID is `home`, and the article index ID is `articles`. Next cards link directly to `/projNext/`. Relative paths come from the shared path context so pages work at the domain root or beneath a project subpath. The `.nojekyll` marker, public routes, historical static assets, and resume URLs are retained. The separate `/projNext/` site is untouched.

`public/` is copied intact to generated `dist/`. The build pre-renders useful initial HTML, creates route-specific metadata, sitemap, standalone 404, and hashed JavaScript/CSS. The temporary render module is deleted. `docs/`, QA screenshots, and design references stay outside the deployment artifact.

## Checks

`npm test` preserves the independent price references and model invariants across 27 parameter combinations. `npm run build` generates the static artifact. `npm run test:site` verifies the nine initial HTML pages, route links/anchors, local resources, chart summaries/tables, static asset preservation, PDFs, metadata, sitemap, and 404. Actual browser checks and remaining limits are recorded in `docs/qa.md`.

## Review and publication

The simplified revision was approved for publication on October 21, 2026. The retained GitHub Actions workflow publishes `dist/` on pushes to `main`. Run the checks above before publishing and verify the completed workflow and deployed routes. Follow README instructions for local preview.
