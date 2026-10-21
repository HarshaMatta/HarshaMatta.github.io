# QA — simplified local revision, October 21, 2026

Pre-publication verification record. The user approved publication on October 21, 2026, after reviewing the simplified design and follow-up changes. The existing main-branch Pages workflow remains unchanged. Earlier local-only statements below describe the verification stage.

## Build and source checks

- Mathematical tests passed: independent Black–Scholes references and 27 parameter combinations. Model functions were not changed.
- Production build and static site checks passed for nine routes: home, seven compatibility/project routes, and Articles.
- Checks cover pre-rendered H1/main, metadata/canonicals, every local image/link/stylesheet/script and cross-route anchor, image dimensions/alt attributes, chart summaries/tables, legacy public bytes, both resume PDFs, sitemap, standalone 404, and exclusion of temporary rendering modules/docs.
- `git diff --check` passed. No dependency or workflow changes were required.
- Original Medium thumbnails/titles/dates were inspected. VRP and Options link to the matching Medium article immediately after the project title. American-option articles remain in the article collection, without a fabricated association to another project. Full article bodies stay on Medium.
- Next cards link directly to `https://harshamatta.github.io/projNext/`; the old local demo is removed. `/next/` remains a minimal compatibility page linking to the same product site.

## Browser checks

Actual in-app browser checks at 375, 768, 1280, and 1440 pixels covered every route: 36 route/viewport combinations. Each had one H1, no page overflow, no loaded broken images, and no visible button/select/input/summary below 44px. Results: `docs/qa/simplified-viewport-results.json`.

An isolated copy of the build at port 4174 used `html { font-size: 200% }`. Computed body size was 32px. All nine routes at 375 and 1280 pixels fit without page overflow. This is an enlarged-text fixture, not a claim of native browser zoom testing. Results: `docs/qa/simplified-text200-results.json`.

Reviewed mobile and desktop screenshots for all eight primary pages; evidence filenames begin `simple-` under `docs/qa/evidence/`. Earlier filenames and earlier JSON files document the superseded editorial revision, not the current appearance. Fixed dashboard cropping, project-heading wrapping, enlarged-text social/attendance reflow, and compacted the desktop intro so first-row project identities appear sooner.

## Interactions checked

- Homepage filters: Apps = 3, Data & tools = 4, All = 7. Next destination is the separate product site.
- Skip link moves keyboard focus to main. Visible focus styles retained throughout; reduced-motion rules inspected.
- InOffice: Monday changes from Office to Remote; CSV export starts and confirms. Gallery selection reaches the settings screenshot.
- Paatam: all four gallery selections work. Copy leads with the developer-confirmed custom spaced repetition system; definitive Flutter screenshots have no version labels.
- Quant: source link and expandable AI/MCP interface screenshot work. Its actual local FastAPI application was started; a sample-data SMA backtest rendered real charts. AI mode was shown with an empty key field and was not executed.
- VRP: 2020 filter produces 12 chart/table observations. Two original notebook cells and matching article/source links are present. Code and chart tables scroll within their own panels.
- Greeks: underlying price 101, put, Gamma yields model price $7.54, Delta −0.373, Gamma 0.015, with the chart summary reflecting the selected point. Streamlit/source links precede the browser preview.
- Options: put with default assumptions yields $7.92; the companion article is directly under the title.
- No browser console errors or warnings in these portfolio checks.

## Scope and limits

The real Quant, VRP, and Greeks captures are described in `docs/asset-provenance.md`. Screenshot capture servers are temporary tools, not hosted services. No AI credential, live trading action, or native-app functionality was introduced. Paatam’s scheduling claim is developer-confirmed; this task did not independently test its Flutter algorithm. No screen-reader, physical-device, or multi-engine audit was performed. External hosted Streamlit uptime is separate from the verified local captures.

## Follow-up: contributions, iOS thumbnail, and footer

The next scoped revision replaces the macOS card image with two original Next iPhone screenshots, expands deal.II into a technical contribution panel, and restyles the shared social footer. GitHub API reads verified #19327 and #19370 as merged and #19804 as open on October 21, 2026; content follows the actual PRs and patch, without performance estimates.

Production build, site checks, and whitespace checks passed. Browser checks covered home, Articles, Paatam, and Greeks at 375, 768, 1159, and 1440 pixels (16 combinations) with no page overflow and all four social targets above 44px. Next’s direct product-site link is preserved. Keyboard focus was inspected on PR and footer links; the dark footer uses a light focus outline. Desktop and mobile screenshots document the new iOS card, contribution panel, and footer. See `followup-results.json` and `evidence/followup-*.jpg`. The mathematical model and existing demo code were not changed, so the earlier mathematical checks remain applicable. No publication occurred.
