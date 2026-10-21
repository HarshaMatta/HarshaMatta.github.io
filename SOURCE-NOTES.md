# Source notes — October 21, 2026

This is a portfolio implementation, not a full native-app audit. No private repository source is included in this package. Read selected files and repository trees; distinguish implemented source from tested or shipped behavior.

| Project | Inspected evidence | Snapshot / boundary |
|---|---|---|
| Next | Private `projNext`: `APP_OVERVIEW.md`, `docs/index.html`, MarkdownFileSystemEngine.swift, SchedulingConflictValidator.swift, recursive tree; existing public product site screenshots | `6498bba6525510feb9df7dc688181e08958617f4`; selected storage/conflict logic read, full app not built. Existing screenshots are not newly generated app output. |
| InOffice | Existing personal portfolio screenshots and supplied developer/resume descriptions | Native repo not found in accessible inventory. Features are developer-reported. Browser data fictional. |
| Paatam | Public `paatam`: `lib/main.dart`, `lib/FlashPage.dart`, bundled character data, `lib/FourPage.dart` | `77a46e6c66c66665ed19bca6e5e69b310b7adf82`; original Flutter flashcards. Stub quiz is not promoted as complete. |
| Quant Strategy Lab | `docs/architecture.md`, `src/mcp_quant/strategies.py`, repository tree | `2ee78b077c0b096c0dc927810e010a2051315570`; actual SMA/RSI/channel implementations read. Test files exist, not executed. |
| VRP | `src/app.py`, committed CSV, repository tree | `8c24aedfa9822591ed3d489508ea7328a2aafa0e`; 196 monthly last-available observations Jan2010–Apr2026. Uses VIX decimal and forward realized vol scaled to percentages. Methodology not independently validated. |
| Options Pricing | `Streamlit_OptionsProfit.py` | `7ac5dffcbe7b666dcd5dc49a3852463ebefae251`; original historical tool distinct from newly implemented browser model. |
| Greeks Visualizer | `main.py` | `de704134e0805939e995334cfc0200d572fe40d7`; five original Greeks, browser only price/delta/gamma. |
| Personal site | Public `HarshaMatta.github.io`, existing website, published Medium article pages, public deal.II contribution evidence | Website tree `259e2d1030bde8c497a0fa2854b064bd559be865`; personal claims grounded in existing material, not inferred from LinkedIn access. |

Public sources: https://harshamatta.github.io/ ; https://harshamatta.github.io/projNext/ ; https://github.com/HarshaMatta ; https://medium.com/@harsha.v.matta . Specific repository/article links are in `src/data.js`.

Design direction: calm product storytelling, real screenshots, short technical explanations, immediately usable browser samples. Reference patterns reviewed: Things feature storytelling (https://culturedcode.com/things/features/) and Linear feature organization (https://linear.app/features). No branding or proprietary layouts copied. GitHub Pages static constraints reviewed at https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages .

## Saved assets integrated after the initial replacement

The Paatam page uses the four existing `public/assets/paatam/screen*.jpg` images and `public/assets/paatam/icon.jpg`. The developer confirmed that these screenshots show the definitive Flutter app, including its refreshed interface. They are presented directly as Paatam screenshots, without separate version labels. The browser flashcard sample remains an illustration rather than a port of the app.

InOffice's existing `public/assets/trackinoffice/screen3.jpg` supplies the workplace settings screenshot in its gallery. Captions describe visible UI rather than infer additional tested behavior.
