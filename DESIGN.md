# Design rules — project-first portfolio

This local revision follows the browser feedback from October 21, 2026. It supersedes the earlier editorial design direction.

Use the project name as its title. Describe what it does in one short paragraph. Avoid slogans, eyebrow copy, repeated explanations, and generic closing sections. The homepage contains projects, Medium articles, a compact deal.II link, and large social links; no About or contact-pitch section.

Use system sans throughout, near-white surfaces, dark text, restrained project accents, and clear spacing. Tokens live in `src/styles/tokens.css`; layout in `src/style.css`. Product cards have the original native app icon beside the title. Technical projects without an app logo use a simple mathematical mark.

Use actual screenshots rather than invented dashboards. InOffice and Paatam sit in CSS phone frames; retain Paatam’s staggered pair and original status bars. Desktop dashboard screenshots retain their full aspect ratio and open at full size. Next links directly to its separate product site.

Article metadata is centralized in `src/data.js`. The Articles page and homepage use the original Medium thumbnail, title, and publication date without editorial blurbs. Matching articles appear immediately below the project title, before the description and GitHub link. VRP and Options have verified matching articles; do not attach American-option articles to unrelated European-pricing tools or invent an article for another project.

Paatam’s custom spaced repetition system is the primary feature. Present the definitive Flutter app without version labels. Quant Strategy Lab has deterministic backtesting and an AI/MCP proof of concept. Greeks leads with the original Streamlit dashboard and source, followed by a smaller browser preview. VRP includes verbatim source cells from its original notebook, not fabricated pseudocode or executed outputs.

Keep native buttons/selects, labels, 44px control targets, visible 3px focus outlines, one main/H1, and image dimensions. Charts retain text summaries and optional keyboard-scrollable data tables. Code scrolls inside its own focusable panel. Reduced-motion CSS disables transitions and smooth scrolling. See `docs/qa.md` for the current verification record.

The follow-up homepage uses two original Next iPhone captures in its card, a compact deal.II contribution panel linking directly to verified PRs, and a dark footer with larger social tiles, restrained brand colors, and a light focus outline. Keep contribution explanations specific; distinguish open and merged work and avoid unsupported performance numbers.
