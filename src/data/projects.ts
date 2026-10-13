/**
 * Authoritative Projects Data for Harsha Matta Portfolio
 * Models 4 Flagships (Next, deal.II, InOffice Tracker, VRP Pipeline)
 * and 4 Curated Secondary Works (Paatam, Greeks Visualizer, Option Profit Model, Multivariable Calc)
 */

import type { ProjectItem } from '../types';

export const projects: ProjectItem[] = [
  // ==========================================
  // FLAGSHIP 1: Next (Universal Apple App)
  // ==========================================
  {
    id: 'next',
    title: 'Next',
    subtitle: 'Unified Markdown Workspace & Native Apple Productivity Suite',
    status: 'Public Beta / TestFlight',
    flagship: true,
    category: 'apple',
    appStoreId: '6781007283',
    description:
      'A native, multi-platform Apple productivity workspace combining task management, calendar scheduling, and local-first AI automation. Backed entirely by plain-text Markdown vaults with real-time iCloud Drive synchronization, eliminating database lock-in.',
    tags: [
      'Swift',
      'SwiftUI',
      'AppKit',
      'App Intents',
      'Apple Intelligence',
      'NSFilePresenter',
      'Local-First',
      'Markdown'
    ],
    metrics: [
      'Universal Apple Ecosystem (iOS, iPadOS, macOS, watchOS)',
      'App Store ID: 6781007283',
      '100% On-Device Sovereignty & Zero Server Telemetry'
    ],
    icon: '/assets/next/icon.png',
    media: [
      {
        src: '/assets/next/screen1.jpg',
        alt: 'Next App Daily Timeline Dashboard',
        caption: 'Tactile 24-hour daily timeline and metric dashboard with time-blocked events'
      },
      {
        src: '/assets/next/screen2.jpg',
        alt: 'Next App Multi-Day Schedule Grid',
        caption: 'Adaptive multi-day schedule and drag-and-drop time-blocking grid across 1, 2, 3, and 7-day spans'
      },
      {
        src: '/assets/next/screen3.jpg',
        alt: 'Next App Markdown Vault Task Backlog',
        caption: 'Local-first Markdown vault task backlog accordion weighting undated action items'
      }
    ],
    actions: [
      {
        label: 'Live Landing Page',
        url: 'https://harshamatta.github.io/projNext/',
        type: 'live',
        primary: true
      },
      {
        label: 'App Store (TestFlight)',
        url: 'https://apps.apple.com/app/id6781007283',
        type: 'app_store'
      },
      {
        label: 'GitHub Repository',
        url: 'https://github.com/HarshaMatta/projNext',
        type: 'github'
      }
    ],
    extendedCaseStudy: {
      overview:
        'Next reimagines personal productivity by treating plain-text files as a transparent relational store. Rather than trapping user commitments inside proprietary SQLite or CloudKit databases, every initiative is modeled as a dual-file Markdown pair (.md notes + .tasks.md checkboxes) with zero server lock-in.',
      architecture: [
        'The mirror paradigm: Complementary file pairs for each project—<Project>.md holds knowledge bases, meeting syllabi, and context; <Project>.tasks.md holds interactive checkboxes and scheduling tags. A root General.tasks.md serves as a catch-all backlog.',
        'Inline Metadata Token Specification: Extends standard Markdown checkboxes (- [ ]) with bracket tokens: [status: active | scheduled | completed], [date: YYYY-MM-DD], [time: HH:MM-HH:MM], and [rolled: X].',
        'Line-Level Concurrency Control: Computes a SHA string hash of target lines prior to disk writes. If an iCloud background sync modifies the file immediately prior to user interaction, the hash comparison fails, preventing write collisions and triggering a clean reload.',
        'Lifecycle Synchronization: Replaces battery-draining continuous file monitoring loops with lightweight scans on cold launches, scenePhase foregrounding, and remote iCloud change broadcasts (NSFilePresenter).',
        'Automated Normalization Sanitizer: Detects bare checkboxes created in external editors (Obsidian, VS Code) and automatically appends default status tokens.',
        'Systemic Midnight Rollover: Automatically scans open tasks past midnight, updates target dates to today, and increments the friction counter ([rolled: X]) without touching surrounding project notes. Clears rollover counter upon manual drag-and-drop scheduling.'
      ],
      technicalHighlights: [
        {
          title: 'Dual AI Engine & Interactive Approval Gate',
          detail:
            'Integrates on-device Apple Intelligence foundation models alongside Bring-Your-Own-Key (BYOK) external LLMs (OpenAI, Anthropic Claude, Gemini) with local Keychain storage. The AI parses backlogs and proposes schedule allocations in chat; strictly writes nothing to disk until the user reviews and taps "Approve Week Schedule".'
        },
        {
          title: 'Cross-Device Scaling Architecture',
          detail:
            'Automatically expands on iPadOS and macOS into a multi-pane NavigationSplitView. On watchOS, pushes pre-compiled daily schedule JSON snapshots directly to Apple complication timeline servers, avoiding iCloud parsing on Apple Watch.'
        },
        {
          title: 'Tactile Digital Paper Aesthetic',
          detail:
            'Pairs Warm Alabaster (#F4EFEA) canvas, Pressed Cotton (#FAF8F5) cards, and Charcoal Walnut (#2C2A29) ink with fine-ink 0.5pt borders and stationery drop shadows.'
        }
      ],
      caveatsOrChallenges: [
        'iCloud Drive sandbox security requires robust security-scoped bookmark lifecycle management across background application wakes.'
      ]
    }
  },

  // ==========================================
  // FLAGSHIP 2: deal.II (C++ Scientific HPC)
  // ==========================================
  {
    id: 'dealii',
    title: 'deal.II',
    subtitle: 'High-Performance Finite Element Scientific Computing Library',
    status: 'Active Open-Source Contributor',
    flagship: true,
    category: 'hpc',
    description:
      'Upstream contributions to an international high-performance C++ finite element library (1.7k+ stars) powering large-scale scientific simulations. Optimizing hot-path property evaluation routines and stabilizing non-linear affine coordinate transformations across distorted quadrilateral and hexahedral meshes.',
    tags: [
      'C++20',
      'HPC',
      'Finite Element Analysis',
      'MPI',
      'deal.II',
      'Numerical Analysis',
      'Coordinate Transformation'
    ],
    metrics: [
      '2 Upstream PRs Merged (#19327, #19370)',
      '1 PR in Active Review (#19804)',
      '1.7k+ Stars Repository with 450+ Contributors'
    ],
    diagramSvg: '/assets/dealii/affine_mapping.svg',
    actions: [
      {
        label: 'deal.II GitHub Repository',
        url: 'https://github.com/dealii/dealii',
        type: 'github',
        primary: true
      },
      {
        label: 'PR #19327 (Merged)',
        url: 'https://github.com/dealii/dealii/pull/19327',
        type: 'github'
      },
      {
        label: 'PR #19370 (Merged)',
        url: 'https://github.com/dealii/dealii/pull/19370',
        type: 'github'
      },
      {
        label: 'PR #19804 (In Review)',
        url: 'https://github.com/dealii/dealii/pull/19804',
        type: 'github'
      }
    ],
    verifiedPrs: [
      {
        prNumber: 19327,
        title: 'Optimize InterpolatedUniformGridData delta_x caching',
        url: 'https://github.com/dealii/dealii/pull/19327',
        status: 'merged',
        date: '2026-02-25',
        description:
          'Cached the grid-spacing increment array (delta_x) in InterpolatedUniformGridData::value(), eliminating redundant floating-point divisions across millions of quadrature evaluations during parallel MPI simulations.'
      },
      {
        prNumber: 19370,
        title: 'Add Assert to real_to_unit_cell_affine_approximation to catch non-hypercubes',
        url: 'https://github.com/dealii/dealii/pull/19370',
        status: 'merged',
        date: '2026-03-08',
        description:
          'Added explicit assertion checks in GridTools::affine_cell_approximation to catch non-hypercube geometries and prevent silent numerical divergence on unstructured mixed meshes.'
      },
      {
        prNumber: 19804,
        title: 'Fix real to unit cell affine approximation',
        url: 'https://github.com/dealii/dealii/pull/19804',
        status: 'in_review',
        date: '2026-05',
        description:
          'Stabilized the real-to-unit coordinate transformation in Mapping::transform_real_to_unit_cell for distorted quadrilateral and hexahedral cells, ensuring robust initial guesses for Newton–Raphson iteration and preventing solver divergence.'
      }
    ],
    extendedCaseStudy: {
      overview:
        'deal.II is a world-class C++ finite element library supporting parallel MPI simulations on supercomputers worldwide. My contributions address hot-path computational bottlenecks and numerical geometry mapping stability in production solvers.',
      architecture: [
        'Hot-Path Grid Caching Optimization (PR #19327): InterpolatedUniformGridData evaluates tabulated thermodynamic and material properties across millions of quadrature points during parallel finite element simulations. The legacy implementation recomputed the grid-spacing increments (delta_x) on every call. Caching delta_x eliminated redundant floating-point divisions on the inner computational loop.',
        'Non-Hypercube Geometric Boundary Guards (PR #19370): Implemented boundary assertions inside affine cell approximation routines to prevent solver divergence when encountering non-hypercube or simplex mesh elements.',
        'Affine Coordinate Inversion Stabilization (PR #19804): Inverting non-linear mappings from physical coordinates x in K back to reference unit cell x_hat in [0, 1]^d requires Newton–Raphson iterations. Distorted cell geometries can cause standard Newton iterations to diverge. My patch stabilizes the initial affine approximation guess, ensuring quadratic convergence.'
      ],
      technicalHighlights: [
        {
          title: 'Quadrilateral & Hexahedral Mapping Vector Diagram',
          detail:
            'Visualized in assets/dealii/affine_mapping.svg, illustrating the forward mapping x(x_hat) and inverse Newton step between unit reference space [0, 1]^d and physical mesh space K.'
        },
        {
          title: 'Rigorous Upstream Peer Review & Verification',
          detail:
            'Direct collaboration with deal.II core maintainers through GitHub pull requests, adhering to strict modern C++ guidelines, valgrind checks, and distributed regression test suites.'
        }
      ],
      caveatsOrChallenges: [
        'PR #19327 and PR #19370 are verified merged into upstream main; PR #19804 is currently in review while collaborating on extending GridTools::affine_cell_approximation to simplex and mixed cell topologies.'
      ],
      diagram: {
        svgPath: '/assets/dealii/affine_mapping.svg',
        title: 'Unit Reference to Physical Cell Affine Transformation',
        caption: 'Mapping from reference unit hypercube [0, 1]^d to distorted physical mesh cell K with Newton–Raphson inversion'
      }
    }
  },

  // ==========================================
  // FLAGSHIP 3: InOffice Tracker (iOS App)
  // ==========================================
  {
    id: 'trackinoffice',
    title: 'InOffice Tracker',
    subtitle: 'Privacy-First Hybrid Attendance Tracker with Hardware Geofencing',
    status: 'Published on App Store (5.0 ★)',
    flagship: true,
    category: 'apple',
    appStoreId: '6762209341',
    description:
      'A local-first, privacy-respecting iOS application for hybrid professionals. Combines CoreLocation hardware geofencing, SwiftData SQLite persistence, Keychain-secured coordinates, and CSV formula-injection shielding to automate attendance logging without cloud telemetry.',
    tags: [
      'Swift',
      'SwiftUI',
      'SwiftData',
      'CoreLocation',
      'MapKit',
      'iOS Keychain',
      'UserNotifications'
    ],
    metrics: [
      '5.0 ★ App Store Rating',
      '100% Offline-First Architecture',
      'Zero Cloud / Zero Telemetry Tracking'
    ],
    icon: '/assets/trackinoffice/icon.jpg',
    media: [
      {
        src: '/assets/trackinoffice/screen1.jpg',
        alt: 'InOffice Tracker Dashboard',
        caption: 'Goal progress rings and monthly attendance breakdown by work status'
      },
      {
        src: '/assets/trackinoffice/screen2.jpg',
        alt: 'InOffice Monthly Calendar Work Log',
        caption: 'Color-coded monthly calendar log with multi-date batch editing'
      },
      {
        src: '/assets/trackinoffice/screen3.jpg',
        alt: 'InOffice Geofence Radius Settings',
        caption: 'Custom workplace address search and adjustable 50m–500m geofence radius slider'
      }
    ],
    actions: [
      {
        label: 'View on App Store',
        url: 'https://apps.apple.com/us/app/trackinoffice/id6762209341',
        type: 'app_store',
        primary: true
      }
    ],
    extendedCaseStudy: {
      overview:
        'InOffice was built to solve corporate hybrid policy tracking without sacrificing employee privacy. By executing entirely on-device, it guarantees that sensitive employer coordinates and work schedules never touch an external server.',
      architecture: [
        'Hardware Geofencing: Utilizes CoreLocation circular region monitoring (CLCircularRegion) with customizable 50m–500m radius. Background OS kernel triggers local interactive notification upon boundary crossing: "Arrived at Office. Would you like to log today as In Office?" with a 30-minute cooldown window preventing redundant prompts.',
        'Keychain Cryptographic Storage: Workplace GPS coordinates are secured within iOS Keychain using kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly, allowing background CoreLocation system daemons to read coordinates while the phone remains locked in a pocket.',
        'SwiftData Local Persistence: Attendance history stored in local SQLite container protected by iOS Data Protection encryption.',
        'Spreadsheet Formula-Injection Defense: Sanitizes user notes during CSV export by escaping control characters (=, +, -, @) to prevent Dynamic Data Exchange (DDE) execution in Excel or Google Sheets.',
        'Dynamic Goal Scaling: Circular SwiftUI progress rings dynamically recalculate target days remaining in weekly, monthly, and yearly lock modes based on working days.'
      ],
      technicalHighlights: [
        {
          title: 'Zero Cloud Sovereignty',
          detail:
            'No user accounts, no analytics tracking, no external SDKs. Error diagnostics are logged locally via AppDiagnostics without remote log streaming.'
        },
        {
          title: 'Batch Calendar Management',
          detail:
            'Interactive monthly calendar with multi-day batch selection for bulk logging of In Office, Remote, PTO, or Holiday status.'
        }
      ],
      caveatsOrChallenges: [
        'iOS background location execution requires precise coordination between CLCircularRegion system daemons and interactive notification categories to minimize battery consumption.'
      ]
    }
  },

  // ==========================================
  // FLAGSHIP 4: Volatility Risk Premium Pipeline
  // ==========================================
  {
    id: 'vrp',
    title: 'Volatility Risk Premium Pipeline',
    subtitle: '15-Year Empirical Derivatives Research & Systematic Variance Harvesting',
    status: 'Completed Research & Live App',
    flagship: true,
    category: 'quant',
    description:
      'A comprehensive quantitative derivatives research pipeline evaluating 15+ years of SPX and VIX daily market data (2010–present). Characterized as empirical research and simulated backtest analyzing structural overpricing of forward implied volatility, partitioning historical market regimes, and simulating monthly variance swap harvesting strategies.',
    tags: [
      'Python',
      'Quantitative Finance',
      'Derivatives',
      'Streamlit',
      'yfinance',
      'Pandas',
      'Plotly',
      'Variance Swaps'
    ],
    metrics: [
      '15+ Years Historical Pipeline (2010–Present)',
      'VRP > 0 on >85% of Trading Days',
      '1.42 Backtested Sharpe Ratio'
    ],
    diagramSvg: '/assets/quant/vrp_dashboard.svg',
    actions: [
      {
        label: 'Live Streamlit Dashboard',
        url: 'https://volatilityriskpremium.streamlit.app/',
        type: 'live',
        primary: true
      },
      {
        label: 'GitHub Repository',
        url: 'https://github.com/HarshaMatta/VolatilityRiskPremium',
        type: 'github'
      },
      {
        label: 'Published Medium Paper',
        url: 'https://medium.com/@harsha.v.matta/volatility-risk-premium-a35d89502110',
        type: 'paper'
      }
    ],
    extendedCaseStudy: {
      overview:
        'The Volatility Risk Premium (VRP) reflects the structural spread between implied volatility (market expectation priced into index options) and realized volatility (actual index price movement). This project investigates the economic mechanisms driving this spread and models a systematic harvest strategy.',
      architecture: [
        'Data Ingestion & Log Returns: Ingests daily close prices for SPX (^GSPC) and VIX (^VIX) from 2010 to present via yfinance. Computes daily log returns r_t = ln(P_t / P_{t-1}) to ensure additivity across multi-day horizons.',
        'Rolling Realized Volatility: Calculates 30-day rolling sample standard deviation of log returns annualized: sigma_annual = sigma_30 * sqrt(252).',
        'Forward Time-Series Alignment: Shifts realized volatility backward by 30 trading days to align backward-looking historical volatility with the 30-day forward-looking horizon of VIX.',
        'VRP Calculation & Distribution: VRP_t = (VIX_t / 100) - forward_realized_vol_t. Empirical results show positive mean and median VRP, with VRP > 0 on over 85% of trading days.',
        'Economic Foundation: Rooted in investor concave utility and prospect theory. Institutional demand for downside put protection elevates option prices above fair actuarial value, artificially bidding up implied volatility.',
        'Market Regime Partitioning: Bull (VIX < 20% & SPX > 200d SMA), Crisis (VIX >= 30%), Bear (intermediate). Demonstrates that VRP expands reliably in bull regimes but severely inverts during crisis periods.',
        'Variance Swap Harvesting Simulation: Simulates monthly short variance positions using payoff proxy PnL = weight * (VIX_dec^2 - forward_realized_vol^2). Achieves a 1.42 Sharpe ratio across 2010–present.'
      ],
      technicalHighlights: [
        {
          title: 'Variance Swaps vs. Volatility Swaps',
          detail:
            'Explains why variance swaps (sigma^2) possess clean static replication via a continuum of option contracts across strikes (log contract of options), whereas volatility swaps (sigma) are dynamically unhedgeable due to non-linear convexity bias.'
        },
        {
          title: 'Interactive Streamlit Engine',
          detail:
            'Provides dynamic date range filtering, regime partitioning views, volatility-inverse position sizing, leverage caps, and a VIX >= 30% circuit breaker to halt entries during panic conditions.'
        }
      ],
      caveatsOrChallenges: [
        'Positive Carry with Severe Negative Skew: Short volatility strategies steadily collect small premiums punctuated by catastrophic tail-risk drawdowns (e.g. 2011 US Debt Downgrade, Feb 2018 Volmageddon / XIV liquidation, and March 2020 COVID crash).',
        'Execution Frictions: Backtested results assume frictionless roll dates and zero bid-ask spread; retail options implementations face margin calls and borrowing fees.'
      ],
      diagram: {
        svgPath: '/assets/quant/vrp_dashboard.svg',
        title: 'Volatility Risk Premium Streamlit Dashboard',
        caption: 'Interactive cloud dashboard modeling SPX vs VIX time series, VRP distribution, and variance swap P&L'
      }
    }
  },

  // ==========================================
  // SECONDARY 1: Paatam (Indic Script Tutor)
  // ==========================================
  {
    id: 'paatam',
    title: 'Paatam',
    subtitle: 'Indic Script Learning & Handwriting Companion',
    status: 'Published (275+ Organic Downloads)',
    flagship: false,
    category: 'apple',
    appStoreId: '6670503097',
    description:
      'A native iOS educational application designed to teach handwriting and character recognition for South Asian scripts (Telugu, Hindi, Tamil, Kannada, Malayalam). Features low-latency Apple PencilKit stroke tracing, geometric curve evaluation, and spaced-repetition memory scheduling.',
    tags: [
      'Swift',
      'SwiftUI',
      'PencilKit',
      'Spaced Repetition',
      'Haptics',
      'iOS'
    ],
    metrics: [
      '275+ Organic Downloads on iOS and Android',
      '5 Supported Indian Language Scripts',
      'Apple PencilKit Low-Latency Tracing Engine'
    ],
    icon: '/assets/paatam/icon.jpg',
    media: [
      {
        src: '/assets/paatam/screen1.jpg',
        alt: 'Paatam Script Selection Dashboard',
        caption: 'Main script selection dashboard and character categories'
      },
      {
        src: '/assets/paatam/screen2.jpg',
        alt: 'Paatam Stroke Tracing Canvas',
        caption: 'Interactive Apple PencilKit handwriting tracing with directional cues'
      },
      {
        src: '/assets/paatam/screen3.jpg',
        alt: 'Paatam Mastery Progress Rings',
        caption: 'Dynamic progress rings tracking vowels, consonants, and compound modifiers'
      },
      {
        src: '/assets/paatam/screen4.jpg',
        alt: 'Paatam Character Sound and Stroke Guide',
        caption: 'Pronunciation sound guide and character stroke order breakdowns'
      }
    ],
    actions: [
      {
        label: 'View on App Store',
        url: 'https://apps.apple.com/us/app/paatam/id6670503097',
        type: 'app_store',
        primary: true
      },
      {
        label: 'App Overview Page',
        url: '/paatam/index.html',
        type: 'internal'
      }
    ]
  },

  // ==========================================
  // SECONDARY 2: Greeks Visualizer
  // ==========================================
  {
    id: 'greeks',
    title: 'Options Greeks Real-Time Visualizer',
    subtitle: 'Multi-Asset Derivatives Sensitivity & Risk Surface Modeling',
    status: 'Completed & Live on Cloud',
    flagship: false,
    category: 'quant',
    description:
      'An interactive quantitative risk dashboard implementing Black-Scholes-Merton partial derivatives (Delta, Gamma, Theta, Vega, Rho) with real-time parameter sensitivity sliders and 3D surface visualizations.',
    tags: [
      'Python',
      'Pandas',
      'NumPy',
      'SciPy',
      'Plotly',
      'Streamlit',
      'Options Greeks',
      'Derivatives'
    ],
    metrics: [
      'Live Cloud Deployment via Streamlit',
      'Real-Time 3D Volatility & Strike Surface Plots',
      'Zero-Latency Vectorized NumPy Matrix Calculations'
    ],
    diagramSvg: '/assets/quant/greeks_dashboard.svg',
    actions: [
      {
        label: 'Live Greeks Visualizer',
        url: 'https://greeksvisualizer.streamlit.app',
        type: 'live',
        primary: true
      },
      {
        label: 'GitHub Repository',
        url: 'https://github.com/HarshaMatta/GreeksVisualizer',
        type: 'github'
      }
    ]
  },

  // ==========================================
  // SECONDARY 3: Option Profit Model
  // ==========================================
  {
    id: 'option-profit',
    title: 'Option Profit Model & Multi-Leg Payoff Profiler',
    subtitle: 'Black-Scholes-Merton Pricing & Dynamic Break-Even Analysis',
    status: 'Completed & Live on Cloud',
    flagship: false,
    category: 'quant',
    description:
      'An analytical options pricing and strategy simulation web application. Computes theoretical option prices, break-even thresholds, and multi-leg strategy payoff distributions across customizable price, volatility, and expiration scenarios.',
    tags: [
      'Python',
      'Pandas',
      'Streamlit',
      'Black-Scholes',
      'Risk-Neutral Valuation',
      'Payoff Profiling'
    ],
    metrics: [
      'Live Cloud App Deployment',
      'Analytical BSM Framework Implementation',
      'Dynamic Expiration Payoff Profiling'
    ],
    diagramSvg: '/assets/quant/black_scholes_dashboard.svg',
    actions: [
      {
        label: 'Live Profit Model',
        url: 'https://optionprofitmodel.streamlit.app',
        type: 'live',
        primary: true
      },
      {
        label: 'GitHub Repository',
        url: 'https://github.com/HarshaMatta/optionProfitModel',
        type: 'github'
      }
    ]
  },

  // ==========================================
  // SECONDARY 4: Multivariable Calc App
  // ==========================================
  {
    id: 'multivariable',
    title: 'iPadOS Multivariable Calculus Tutor',
    subtitle: 'PencilKit Handwriting Capture & 4-Stage Algorithmic Grading Pipeline',
    status: 'Advanced Prototype',
    flagship: false,
    category: 'education',
    description:
      'An iPadOS mathematical practice app featuring local LaTeX problem generation (gradients, double integrals, chain rule), PencilKit handwriting capture, Vision OCR stroke clustering, and a multi-stage grading pipeline (direct match -> symbolic normalization -> LLM equivalence).',
    tags: [
      'Swift',
      'SwiftUI',
      'PencilKit',
      'Vision OCR',
      'OpenAI API',
      'SwiftMath',
      'iPadOS'
    ],
    metrics: [
      '4-Stage Algorithmic Grading Pipeline',
      'Spatial-Temporal Vision OCR Clustering',
      'Built-in AICostLimiter Budget Controls'
    ],
    actions: []
  }
];

export default projects;
