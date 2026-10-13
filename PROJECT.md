# Project: Harsha Matta Personal Portfolio Rebuild & Strategic Redesign

## Architecture
- **Framework & Runtime**: React 19 (`react`, `react-dom`) with TypeScript 5 (Strict Mode: `noImplicitAny`, `strictNullChecks`, `noUnusedLocals`, `noUnusedParameters`).
- **Bundler & Build Tool**: Vite 6 (`@vitejs/plugin-react`).
- **Styling & Tokens**: Tailwind CSS v3 with PostCSS and custom color/font tokens (`font-serif`: Newsreader, `font-sans`: Inter, `font-mono`: JetBrains Mono; `paper`: #FBF9F5, `obsidian`: #0B0D0E, `accent`: #0369A1 / #38BDF8).
- **Icons**: Lucide React (`lucide-react`) for accessible, crisp SVG icons.
- **Content Layer (`src/data/`)**: Complete separation of structured domain data from presentation components. Strongly typed via `src/types/index.ts`.
- **Theme Architecture**: Dual-theme (`light` / `dark`) with zero layout shift and zero theme flash via synchronous pre-render `<head>` execution script, synchronized with `ThemeContext` and `localStorage`.
- **Layout Model**: Responsive hybrid: 2-column editorial on desktop (sticky left sidebar + smooth right content stream) and single-column stack on mobile/tablet (compact sticky header + section navigation), strictly bounded to 0 horizontal overflow across 390px, 768px, and 1440px.
- **Accessibility & Modals**: WCAG 2.2 AA compliant Lightbox Modal with focus trap, focus restoration, Escape key dismissal, body scroll lock, and visible keyboard rings.
- **Deployment & Static Routing**: Static output into `dist/`, `dist/404.html` SPA fallback, `.nojekyll` preservation, and automated GitHub Actions CI/CD workflow at `.github/workflows/deploy.yml`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | React 19 Root Mount | Entrypoint mounting React root component via `createRoot` | M1 | survey |
| 2 | TypeScript Strict Mode | Strict type checking without `any` across all components and data | M1 | survey |
| 3 | Vite Asset Pipeline | Bundler and dev server compiling TS/TSX/CSS into optimized `dist/` | M1 | survey |
| 4 | Clean Content Layer | Type-safe data modules decoupling content from presentation | M2 | survey |
| 5 | Newsreader Display Serif | Editorial serif typography for headings and article titles | M1 | survey |
| 6 | Inter Sans-Serif Body | Clean sans-serif typography for body text, tags, and navigation | M1 | survey |
| 7 | JetBrains Mono Code | Monospace font for code tokens, equations, and technical badges | M1 | survey |
| 8 | Warm Paper Light Theme | Warm paper aesthetic (#FBF9F5 canvas, #2C2A29 ink, warm card borders) | M1 | survey |
| 9 | Obsidian Dark Theme | Deep obsidian aesthetic (#0B0D0E canvas, #38BDF8 celestial cyan accent) | M1 | survey |
| 10 | Zero-Flicker Persistence | Synchronous `<head>` script preventing theme flash before hydration | M1 | survey |
| 11 | Theme Toggle Interaction | Accessible toggle button with SVG sun/moon icons and aria-label | M1 | survey |
| 12 | Flagship Next Presentation | Rich presentation of native Apple Markdown workspace + local AI | M3 | survey |
| 13 | Next Architecture Spec | Case study: `.tasks.md` split mirror, line hashing, BYOK AI approval gate | M3 | survey |
| 14 | Flagship deal.II Presentation | C++ HPC finite element contributions and quadrilateral mapping diagram | M3 | survey |
| 15 | deal.II PR Differentiation | Verifiable badges distinguishing merged PRs (#19327, #19370) from PR in review (#19804) | M3 | survey |
| 16 | Flagship InOffice Presentation | Privacy-first iOS hybrid attendance tracker with hardware geofencing | M3 | survey |
| 17 | InOffice Security Spec | Case study: Keychain `kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly` + CSV formula defense | M3 | survey |
| 18 | Flagship VRP Presentation | Quantitative derivatives research pipeline over 15+ yrs SPX/VIX | M3 | survey |
| 19 | VRP Methodological Disclaimers | Case study: negative skew, variance vs vol swap convexity, XIV/COVID tail risk | M3 | survey |
| 20 | Secondary Paatam Showcase | Indic script tutor with 275+ organic downloads, PencilKit tracing, spaced repetition | M4 | survey |
| 21 | Secondary Greeks Visualizer | Real-time interactive options Greeks visualizer with live Streamlit link | M4 | survey |
| 22 | Secondary Option Profit Model | Black-Scholes analytical option profit and loss model with live Streamlit link | M4 | survey |
| 23 | Secondary Multivariable Calc | iPadOS multivariable calculus tutor with Vision OCR & 4-stage grading pipeline | M4 | survey |
| 24 | Progressive Disclosure UI | Expandable drawers/modals revealing architectural case studies on demand | M3 | survey |
| 25 | Published Medium Stream | 4 verified quantitative finance Medium articles with covers and published dates | M4 | survey |
| 26 | Writing Impression Metric | 3,400+ total impressions metric badge in Technical Writing header | M4 | survey |
| 27 | Lightbox Modal Focus Trap | Keyboard Tab/Shift+Tab focus trap inside open screenshot/diagram modal | M5 | survey |
| 28 | Focus Restoration | Returns focus to trigger thumbnail upon lightbox close | M5 | survey |
| 29 | Body Scroll Lock | Freezes background window scroll when modal is active | M5 | survey |
| 30 | Visible Focus Rings | High-contrast `:focus-visible` outlines on all interactive elements | M5 | survey |
| 31 | Prefers-Reduced-Motion | Respects system motion reduction by disabling animations and smooth scrolling | M5 | survey |
| 32 | Mobile Viewport (390px) | Single-column responsive layout with 0 horizontal overflow | M2 | survey |
| 33 | Tablet Viewport (768px) | Adaptive intermediate grid with fluid media cards | M2 | survey |
| 34 | Desktop Viewport (1440px) | Two-column editorial layout with fixed left sidebar and scrolling content stream | M2 | survey |
| 35 | Resume PDF Integration | Copies Oct 2026 resume to `public/assets/Harsha_Matta_Resume.pdf` with working download links | M1 | survey |
| 36 | GitHub Pages SPA 404 Fallback | Generates `dist/404.html` identical to `dist/index.html` to support deep URL refreshes | M5 | survey |
| 37 | `.nojekyll` Preservation | Ensures `public/.nojekyll` is output to `dist/.nojekyll` for GitHub Pages | M1 | survey |
| 38 | GitHub Actions Deploy Workflow | Configures `.github/workflows/deploy.yml` for automated GitHub Pages publishing | M5 | survey |
| 39 | 20-Second Recruiter Heuristic | Instant clarity of Harsha's identity, UNC Chapel Hill education, and 3 core disciplines | M2 | survey |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Foundation, Toolchain & Design System | Package setup (React 19, TS strict, Vite, Tailwind, Lucide), fonts, dual-theme tokens & anti-flash script, asset relocation to `public/assets/`, resume copy, `.nojekyll`. | none | DONE |
| M2 | Content Layer, Types & Responsive Layout Shell | TypeScript interfaces (`src/types/index.ts`), structured data (`src/data/`), 2-column desktop sidebar + mobile header, scrollspy, resume links, 20-second recruiter clarity. | M1 | IN_PROGRESS |
| M3 | Flagship Projects & Technical Case Studies | Custom presentations for Next, deal.II (PR badges & affine SVG), InOffice Tracker, and VRP (formulas & caveats). Progressive disclosure case study drawers. | M2 | PLANNED |
| M4 | Secondary Works, Published Writing & Background | Paatam, Greeks Visualizer, Option Profit Model, Multivariable Calc; 4 Medium articles with covers; Leadership, Experience, Education coursework chips. | M3 | PLANNED |
| M5 | Accessibility, Lightbox Modal & GitHub Pages Deployment | Accessible Lightbox modal (focus trap, focus restoration, scroll lock), visible focus rings, prefers-reduced-motion, `404.html` SPA fallback, `.github/workflows/deploy.yml`. | M4 | PLANNED |
| Final | E2E Verification & Adversarial Coverage Hardening | Run 100% of E2E test suite (Tiers 1-4); perform Tier 5 adversarial coverage audit; independent forensic integrity verification. | M5, Test Suite Ready | PLANNED |

## Interface Contracts

### M1 ↔ M2: Theme & Asset Contracts
- **Theme Interface**:
  ```typescript
  export type Theme = 'light' | 'dark';
  export interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
  }
  ```
- **Asset Contract**:
  - `public/assets/Harsha_Matta_Resume.pdf`: Valid PDF file (Oct 2026 version).
  - `public/assets/next/`: `icon.png`, `screen1.jpg`, `screen2.jpg`, `screen3.jpg`.
  - `public/assets/trackinoffice/`: `icon.jpg`, `screen1.jpg`, `screen2.jpg`, `screen3.jpg`.
  - `public/assets/paatam/`: `icon.jpg`, `screen1.jpg`, `screen2.jpg`, `screen3.jpg`, `screen4.jpg`.
  - `public/assets/dealii/affine_mapping.svg`: Vector diagram.
  - `public/assets/quant/`: `vrp_dashboard.svg`, `greeks_dashboard.svg`, `black_scholes_dashboard.svg`.
  - `public/assets/writing/`: `option_pricing.svg`, `american_options_p1.svg`, `american_options_p2.svg`, `vrp_paper.svg`.

### M2 ↔ M3/M4: Content & Data Contract (`src/types/index.ts`)
- All components consume strongly typed records exported from `src/data/`:
  - `profile`: `ProfileData`
  - `projects`: `ProjectItem[]`
  - `quantProjects`: `QuantProjectItem[]`
  - `articles`: `ArticleItem[]`
  - `leadership`: `LeadershipItem[]`
  - `experience`: `ExperienceItem[]`
  - `education`: `EducationData`

### M3/M4 ↔ M5: Lightbox & Accessibility Contract
- **Lightbox Interface**:
  ```typescript
  export interface LightboxMedia {
    src: string;
    alt: string;
    caption: string;
  }
  export interface LightboxContextValue {
    openLightbox: (media: LightboxMedia, triggerElement: HTMLElement) => void;
    closeLightbox: () => void;
    isOpen: boolean;
    activeMedia: LightboxMedia | null;
  }
  ```

## Code Layout
```
HarshaMatta.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages deployment action
├── public/
│   ├── .nojekyll                   # Bypass Jekyll processing
│   ├── robots.txt                  # Search engine permissions
│   ├── sitemap.xml                 # XML sitemap
│   └── assets/                     # All static media & PDF assets
│       ├── Harsha_Matta_Resume.pdf # Oct 2026 authoritative resume
│       ├── resume.pdf              # Backward-compatible alias
│       ├── dealii/
│       ├── next/
│       ├── trackinoffice/
│       ├── paatam/
│       ├── quant/
│       └── writing/
├── src/
│   ├── context/
│   │   ├── ThemeContext.tsx        # Zero-flicker theme provider & hook
│   │   └── LightboxContext.tsx     # Accessible modal controller & state
│   ├── types/
│   │   └── index.ts                # Strict domain entity definitions
│   ├── data/
│   │   ├── profile.ts              # Bio, contacts, education headline
│   │   ├── projects.ts             # Flagship & secondary project definitions
│   │   ├── quant.ts                # Quant research tools & mathematical models
│   │   ├── articles.ts             # Verified Medium writing catalog
│   │   ├── leadership.ts           # Campus & nonprofit leadership roles
│   │   ├── experience.ts           # Professional & open-source experience
│   │   └── education.ts            # UNC Chapel Hill coursework & skill inventory
│   ├── components/
│   │   ├── layout/
│   │   │   ├── DesktopSidebar.tsx  # Sticky left navigation sidebar
│   │   │   ├── MobileHeader.tsx    # Responsive compact header
│   │   │   └── Footer.tsx          # Colophon, status indicator, copyright
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx     # 20-second recruiter clarity summary
│   │   │   ├── ProjectsSection.tsx # Flagship initiatives custom showcase
│   │   │   ├── QuantSection.tsx    # VRP, Greeks, Option Profit Model
│   │   │   ├── WritingSection.tsx  # Medium articles gallery
│   │   │   ├── ExperienceSection.tsx # CyberWIN, deal.II, Unilever
│   │   │   ├── LeadershipSection.tsx # UNC AI Task Force, Sangam, Technospire
│   │   │   ├── EducationSection.tsx # UNC Chapel Hill degree & skills grid
│   │   │   └── ContactSection.tsx  # Verified contact links & resume download
│   │   ├── ui/
│   │   │   ├── ProjectCard.tsx     # Asymmetric card with interactive tags
│   │   │   ├── CaseStudyModal.tsx  # Progressive disclosure deep-dive drawer
│   │   │   ├── LightboxModal.tsx   # WCAG 2.2 AA modal with focus trap
│   │   │   ├── ThemeToggle.tsx     # Accessible sun/moon switch
│   │   │   └── Badge.tsx           # Status & PR verification badge
│   ├── index.css                   # Tailwind imports & custom design tokens
│   ├── App.tsx                     # Main application tree & scrollspy
│   └── main.tsx                    # React 19 entrypoint
├── index.html                      # HTML shell with anti-flash script & typography
├── package.json                    # Project scripts & dependencies
├── tsconfig.json                   # TypeScript strict mode configuration
├── tsconfig.node.json              # TypeScript Vite config configuration
├── vite.config.ts                  # Vite build & bundle configuration
├── tailwind.config.js              # Tailwind custom theme & color tokens
└── postcss.config.js               # PostCSS plugins
```
