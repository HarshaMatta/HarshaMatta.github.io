> Superseded by the user’s browser feedback. See `DESIGN.md` for the current simplified direction. The following is retained as the initial research record, not the current implementation specification.

# Portfolio design direction — October 21, 2026

## Brief and primary action

Recruiters, engineers, and product hiring managers should see Harsha’s identity, an actual app, and a path into credible work in the first desktop viewport. The primary action is exploring a project, followed by trying its browser sample or inspecting its source/article. Keep software, product, data, and business positioning. This upgrade remains local; do not push or deploy it.

## References inspected

1. https://land-book.com/ — Browser inspection of the public homepage after dismissing cookies showed medium-sized project previews, category filters, and clear labels. Borrow image-first scanning and compact project context, rather than any particular listed design. This helps a recruiter see tangible work before reading a biography.
2. https://styles.refero.design/ — Browser inspection showed a serif display headline, dark neutral surface, a restrained search field, category choices, and image cards. Borrow the deliberate type hierarchy and consistent spacing; use a warm light canvas appropriate to this portfolio. No individual commercial style was exported or copied.
3. https://doc.refero.design/skill/overview — Read the official methodology: establish a brief, research, synthesize one direction, define decisions, then implement and inspect. Use that sequence with this local decision record. No official skill is installed or claimed.
4. https://www.graphicalui.com/ — Read the public theme/component-state documentation and inspected the rendered hero. Borrow semantic roles and explicit states as a documentation approach. No theme export, proprietary GUI.md, component library, or paid editor was supplied or accessed. An attempted deeper browser inspection timed out; do not claim inspection of the editor.
5. https://mobbin.com/ — The public page text was retrieved and describes a library of app screens and flows. Browser layout inspection was attempted during the same timeout; record this as a limitation. Use ordinary semantic buttons, labels, selected states, and the existing functioning demos instead of claiming inspection of paid product flows.

## Candidates and decision

- **Editorial field notes (chosen):** warm paper, dark ink, serif explanations, precise system-sans controls, real screenshot plates, and generous but bounded whitespace. Product pages change composition according to their strongest evidence.
- **Product catalog:** denser neutral grid, technical labels, and uniform cards. Efficient for browsing, but less expressive of the mix of language learning, useful apps, and mathematics.

Choose editorial field notes because it connects human interests with inspectable engineering. Shared tokens establish continuity; native screenshots, language characters, architecture steps, and readable charts provide distinct project motifs. Use two system font families with platform script fallbacks; no remote fonts or decorative asset dependency.

## Route decisions

| Route | Lead evidence and composition |
| --- | --- |
| `/` | Split introduction and actual Next screenshot in the initial desktop viewport; compact evidence labels and seven work cards. |
| `/next/` | Wide screenshot plate and the review/approve/discard interaction immediately after the introduction; storage and conflict decisions below. |
| `/inoffice/` | Portrait dashboard, a sample workweek interaction, and native settings/calendar gallery. |
| `/paatam/` | Definitive Flutter screenshots and icon; a language-character motif and five-script flashcard sample. No separate version labels or references to work in progress. |
| `/quant-lab/` | Interactive workflow illustration, then a compact architecture sequence and source-backed strategy context. |
| `/vrp/` | Research heading, full-width historical chart, readable date/method context, and optional data table. |
| `/options/` | Compact mathematical introduction, calculator controls beside a price curve, hypothetical assumptions and a data view. |
| `/greeks/` | Sensitivity explanation, delta/gamma selector, units, and a data view; retain the original mathematical functions. |

## Implementation boundaries

Use reusable navigation, action links, media figures, galleries, evidence notes, demo panels, and footer. Maintain existing routes and relative links, legacy assets, resume URLs, and the independent Next site. Generate meaningful initial HTML and hydrate React for interactions. Do not add a backend, dark mode, external accounts, invented metrics, generated app screenshots, or media-service uploads.
