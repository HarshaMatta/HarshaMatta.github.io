# Test Infrastructure: Independent E2E Test Track

## 1. Executive Summary

This document establishes the architecture, methodology, and execution instructions for the independent **E2E Testing Track** of Harsha Matta's portfolio rebuild (`HarshaMatta.github.io`).

The testing track operates under strict **opaque-box principles**, with every assertion and expected output derived authoritative sources:
1. `ORIGINAL_REQUEST.md`: Core requirements, visual identity, project hierarchy, verified URLs, and acceptance criteria.
2. `PROJECT.md`: Global specification, 39-feature inventory, milestone boundaries (M1–M5), and interface contracts.
3. Authoritative primary documents: October 2026 UNC Chapel Hill Resume (`public/assets/Harsha_Matta_Resume.pdf`), deal.II upstream merged PRs (#19327, #19370) vs in-review PR (#19804), and project reference notes in `01_Projects/`.

---

## 2. Test Runner Architecture

The test suite is structured as a self-contained, high-performance Node.js ESM test suite located in `tests/`:

```
tests/
├── harness/
│   ├── assertions.mjs        # WCAG contrast calculator, deep equality, PDF validator, URL checker
│   ├── dom_simulator.mjs     # Theme engine, localStorage quota simulator, WCAG focus trap, scroll lock, viewport layout
│   ├── project_oracle.mjs    # Authoritative ground truth, mathematical equations, regime rules, CSV sanitization
│   └── test_runner_core.mjs  # Test registry, progressive execution engine, timing, formatting, reporting
├── tier1_feature_coverage.mjs   # Tier 1: Isolated happy-path coverage (>=5 tests per feature across all 39 features = 195 tests)
├── tier2_boundary_corner.mjs    # Tier 2: Boundary, corner & stress cases (>=5 tests per feature across all 39 features = 195 tests)
├── tier3_cross_feature.mjs      # Tier 3: Pairwise cross-feature interactions (16 combination tests)
├── tier4_real_world_scenarios.mjs # Tier 4: Real-world recruiter & candidate user journeys (20 scenario tests)
└── run_e2e_tests.mjs            # Executable CLI test runner entrypoint
```

### Key Architectural Strengths:
- **Zero External Test Runner Dependency**: Runs natively in modern Node.js (`node >= 20`, host: Node v25.8.1) without heavy browser overhead or network flakes.
- **Progressive Testability**: Features a `--progressive` flag that evaluates milestones progressively without aborting on features from future unbuilt milestones, while strict mode enforces 100% completion for the final milestone gate.
- **Granular Filtering**: Filter tests by Tier (`--tier 1..4`), Milestone (`--milestone M1..M5`), or Feature (`--feature 1..39`).

---

## 3. Four-Tier Test Taxonomy

The test suite organizes **426 automated tests** across four systematic tiers:

| Tier | Name | Target Coverage | Scope & Purpose | Total Tests |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1** | **Feature Coverage** | $\ge 5$ tests per feature | Isolated happy-path verification of each feature in the 39-feature inventory. | **195** |
| **Tier 2** | **Boundary & Corner Cases** | $\ge 5$ tests per feature | Extremes, rapid theme switching, quota exceeded, focus cycles, invalid math inputs, formula injection vectors. | **195** |
| **Tier 3** | **Cross-Feature Interactions** | Pairwise interactions | Interactions between multiple subsystems (e.g., Theme + Lightbox, Deep Routing + Mobile, Focus Trap + Diagram). | **16** |
| **Tier 4** | **Real-World Scenarios** | $\ge 20$ user journeys | End-to-end recruiter, hiring manager, quant PM, mobile user, and accessibility journeys. | **20** |
| **Total** | | | **Full E2E Test Suite** | **426** |

---

## 4. Complete Feature Coverage Matrix (39 Features)

| # | Feature Name | Milestone | Tier 1 Tests | Tier 2 Tests | Tier 3 Pairings | Tier 4 Scenarios | Total Tests |
|---|--------------|-----------|--------------|--------------|-----------------|------------------|-------------|
| 1 | React 19 Root Mount | M1 | 5 | 5 | X12 | S20 | 12 |
| 2 | TypeScript Strict Mode | M1 | 5 | 5 | - | S20 | 11 |
| 3 | Vite Asset Pipeline | M1 | 5 | 5 | - | S13 | 11 |
| 4 | Clean Content Layer | M2 | 5 | 5 | X12 | S1, S20 | 12 |
| 5 | Newsreader Display Serif | M1 | 5 | 5 | - | S15 | 11 |
| 6 | Inter Sans-Serif Body | M1 | 5 | 5 | - | S15 | 11 |
| 7 | JetBrains Mono Code | M1 | 5 | 5 | X7 | S3, S9 | 13 |
| 8 | Warm Paper Light Theme | M1 | 5 | 5 | X16 | S7, S15 | 13 |
| 9 | Obsidian Dark Theme | M1 | 5 | 5 | X16 | S7, S15 | 13 |
| 10 | Zero-Flicker Persistence | M1 | 5 | 5 | X3, X16 | S7 | 14 |
| 11 | Theme Toggle Interaction | M1 | 5 | 5 | X1, X9 | S7 | 13 |
| 12 | Flagship Next Presentation | M3 | 5 | 5 | X8 | S2 | 12 |
| 13 | Next Architecture Spec | M3 | 5 | 5 | - | S2 | 11 |
| 14 | Flagship deal.II Presentation | M3 | 5 | 5 | X4 | S3 | 12 |
| 15 | deal.II PR Differentiation | M3 | 5 | 5 | X7 | S3 | 12 |
| 16 | Flagship InOffice Presentation | M3 | 5 | 5 | X13 | S9 | 12 |
| 17 | InOffice Security Spec | M3 | 5 | 5 | X13 | S9 | 12 |
| 18 | Flagship VRP Presentation | M3 | 5 | 5 | X5, X15 | S4, S17 | 14 |
| 19 | VRP Methodological Disclaimers | M3 | 5 | 5 | X5, X15 | S4 | 13 |
| 20 | Secondary Paatam Showcase | M4 | 5 | 5 | X14 | S10 | 12 |
| 21 | Secondary Greeks Visualizer | M4 | 5 | 5 | - | S10, S17 | 12 |
| 22 | Secondary Option Profit Model | M4 | 5 | 5 | - | S10, S17 | 12 |
| 23 | Secondary Multivariable Calc | M4 | 5 | 5 | - | S10 | 11 |
| 24 | Progressive Disclosure UI | M3 | 5 | 5 | X5 | S2, S9 | 13 |
| 25 | Published Medium Stream | M4 | 5 | 5 | X11 | S8 | 12 |
| 26 | Writing Impression Metric | M4 | 5 | 5 | - | S8 | 11 |
| 27 | Lightbox Modal Focus Trap | M5 | 5 | 5 | X1, X4, X8, X11 | S6 | 15 |
| 28 | Focus Restoration | M5 | 5 | 5 | X4, X8 | S6 | 13 |
| 29 | Body Scroll Lock | M5 | 5 | 5 | - | S6 | 11 |
| 30 | Visible Focus Rings | M5 | 5 | 5 | X7 | S6 | 12 |
| 31 | Prefers-Reduced-Motion | M5 | 5 | 5 | X3 | S19 | 12 |
| 32 | Mobile Viewport (390px) | M2 | 5 | 5 | X2, X5, X6 | S5 | 14 |
| 33 | Tablet Viewport (768px) | M2 | 5 | 5 | X14 | - | 11 |
| 34 | Desktop Viewport (1440px) | M2 | 5 | 5 | X5, X9 | S1 | 13 |
| 35 | Resume PDF Integration | M1 | 5 | 5 | X6 | S1 | 12 |
| 36 | GitHub Pages SPA 404 Fallback | M5 | 5 | 5 | X2, X10 | S14 | 13 |
| 37 | `.nojekyll` Preservation | M1 | 5 | 5 | X10 | S13 | 12 |
| 38 | GitHub Actions Deploy Workflow | M5 | 5 | 5 | - | S13 | 11 |
| 39 | 20-Second Recruiter Heuristic | M2 | 5 | 5 | - | S1 | 11 |
| **Total** | **39 Features** | | **195** | **195** | **16** | **20** | **426** |

---

## 5. How to Run the Tests

The test suite is invoked using the standard Node.js command line runner.

### 5.1 Quick Start (Progressive Mode)
Run all currently verifiable tests across all tiers, deferring features from pending future milestones:
```bash
node tests/run_e2e_tests.mjs --progressive
```

### 5.2 Milestone-Specific Gates
Verify a specific milestone's criteria during development:
```bash
# Milestone 1: Toolchain, Theme System & Asset Setup
node tests/run_e2e_tests.mjs --milestone M1 --progressive

# Milestone 2: Content Layer & Responsive Shell
node tests/run_e2e_tests.mjs --milestone M2 --progressive

# Milestone 3: Flagship Projects & Case Studies
node tests/run_e2e_tests.mjs --milestone M3 --progressive

# Milestone 4: Secondary Projects & Published Writing
node tests/run_e2e_tests.mjs --milestone M4 --progressive

# Milestone 5: Accessibility, Lightbox & GitHub Pages
node tests/run_e2e_tests.mjs --milestone M5 --progressive
```

### 5.3 Tier-Specific Audits
```bash
node tests/run_e2e_tests.mjs --tier 1 --progressive   # Feature Coverage (195 tests)
node tests/run_e2e_tests.mjs --tier 2 --progressive   # Boundary & Corner Cases (195 tests)
node tests/run_e2e_tests.mjs --tier 3                 # Pairwise Cross-Feature Interactions (16 tests)
node tests/run_e2e_tests.mjs --tier 4                 # Real-World Scenarios (20 tests)
```

### 5.4 Feature-Specific Isolation
To test an individual feature from the 39-feature inventory:
```bash
node tests/run_e2e_tests.mjs --feature 10             # Feature 10: Zero-Flicker Persistence
node tests/run_e2e_tests.mjs --feature 15             # Feature 15: deal.II PR Differentiation
node tests/run_e2e_tests.mjs --feature 18             # Feature 18: Volatility Risk Premium
```

### 5.5 Strict Full-Suite Verification (Final Gate)
Runs all 426 tests in strict mode without any deferrals. Exit code `0` confirms complete readiness for production deployment:
```bash
node tests/run_e2e_tests.mjs
```

---

## 6. Simulation & Verification Harnesses

### 6.1 WCAG 2.2 Relative Luminance and Contrast Calculator (`assertions.mjs`)
Calculates precise relative luminance and contrast ratio according to W3C WCAG 2.2 specifications:
$$L = 0.2126 \times R_{\text{linear}} + 0.7152 \times G_{\text{linear}} + 0.0722 \times B_{\text{linear}}$$
$$\text{Contrast Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05}$$
Used to assert:
- Warm Paper Light: `#2C2A29` on `#FBF9F5` $\ge 12:1$ (exceeds WCAG AAA 7:1)
- Obsidian Dark: `#F3F4F6` on `#0B0D0E` $\ge 17:1$ (exceeds WCAG AAA 7:1)
- Focus rings: `#0369A1` on `#FBF9F5` $\ge 3:1$ and `#38BDF8` on `#141618` $\ge 3:1$

### 6.2 DOM & Storage Simulator (`dom_simulator.mjs`)
- `LocalStorageSimulator`: Emulates browser storage, cross-tab events, and `QuotaExceededError` exception throwing.
- `ThemeEngineSimulator`: Validates synchronous `<head>` anti-flash script and React `ThemeContext` state changes.
- `FocusTrapSimulator`: Simulates Tab / Shift+Tab cyclical navigation, Escape key modal dismissal, and focus restoration to trigger elements.
- `ScrollLockSimulator`: Validates body overflow freezing (`overflow: hidden`), scroll position preservation, and multi-modal stacking.
- `LayoutSimulator`: Evaluates horizontal overflow bounds across 390px, 768px, and 1440px viewports.

### 6.3 Mathematical & Business Logic Oracles (`project_oracle.mjs`)
- Daily log returns: $r_t = \ln(P_t / P_{t-1})$
- Annualized rolling volatility: $\sigma_{\text{annual}} = \sigma_{30} \times \sqrt{252}$
- Daily VRP: $\text{VRP}_t = (\text{VIX}_t / 100) - \sigma_{\text{realized}, t}$
- Regime classifier: Bull ($\text{VIX} < 20$ & $\text{SPX} > \text{200-SMA}$), Crisis ($\text{VIX} \ge 30$), Bear
- Spreadsheet formula-injection defense: Sanitizes leading `=`, `+`, `-`, `@` characters.

---

## 7. Quality & Integrity Standards

1. **No Mock Facades**: Every test asserts observable, concrete behaviors, mathematical invariants, or file contents.
2. **Deterministic & Isolated**: Each test runs independently without cross-test state leakage or ordering dependencies.
3. **Escalation Protocol**: Implementation defects discovered during milestone verification are escalated immediately to implementing agents without altering test expectations.
