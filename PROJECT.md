# Portfolio implementation

The October 21, 2026 supplied portfolio replaces the previous React/TypeScript/Vite single-page design. The active implementation uses React JSX, esbuild, local CSS, and route-specific static HTML. The old theme, sidebar, modals, and design-specific simulated-DOM tests have been removed.

## Interfaces and publication

`src/data.js` exports the seven project records and writing links used by both React and the build. Each project ID is its static route. Each generated HTML document sets `body[data-page]` to choose its React page; the homepage uses `home`. Links and bundled resources are relative to the page directory. No server router is required.

`public/` is the source of static assets. `dist/` is the complete deployable artifact; never publish the source repository root. The build owns all page HTML, `sitemap.xml`, `404.html`, and `.nojekyll`. The standalone 404 uses absolute production links so it also works for nested missing paths. Keep the separate `/projNext/` repository/site untouched.

## Verification

`npm test` checks independent option-price references and model invariants over 27 combinations. After `npm run build`, `npm run test:site` checks all eight HTML routes, resource references, data-driven screenshots, canonical metadata, sitemap, static asset preservation, PDF headers, and the standalone 404.

Browser review covers all pages at mobile, tablet, and desktop sizes; keyboard focus; filters; approval/discard/reset; attendance CSV export; flashcards; strategy steps; historical filters; finance controls; and screenshot galleries. GitHub Actions repeats mathematical and output checks before deployment.
