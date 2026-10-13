/**
 * Authoritative Project Oracle & Specification Contracts
 * Harsha Matta Portfolio Rebuild Test Suite
 */

export const FEATURE_INVENTORY = [
  { id: 1, name: 'React 19 Root Mount', milestone: 'M1', category: 'Architecture' },
  { id: 2, name: 'TypeScript Strict Mode', milestone: 'M1', category: 'Architecture' },
  { id: 3, name: 'Vite Asset Pipeline', milestone: 'M1', category: 'Architecture' },
  { id: 4, name: 'Clean Content Layer', milestone: 'M2', category: 'Architecture' },
  { id: 5, name: 'Newsreader Display Serif', milestone: 'M1', category: 'Visual Identity' },
  { id: 6, name: 'Inter Sans-Serif Body', milestone: 'M1', category: 'Visual Identity' },
  { id: 7, name: 'JetBrains Mono Code', milestone: 'M1', category: 'Visual Identity' },
  { id: 8, name: 'Warm Paper Light Theme', milestone: 'M1', category: 'Visual Identity' },
  { id: 9, name: 'Obsidian Dark Theme', milestone: 'M1', category: 'Visual Identity' },
  { id: 10, name: 'Zero-Flicker Persistence', milestone: 'M1', category: 'Visual Identity' },
  { id: 11, name: 'Theme Toggle Interaction', milestone: 'M1', category: 'Visual Identity' },
  { id: 12, name: 'Flagship Next Presentation', milestone: 'M3', category: 'Projects' },
  { id: 13, name: 'Next Architecture Spec', milestone: 'M3', category: 'Projects' },
  { id: 14, name: 'Flagship deal.II Presentation', milestone: 'M3', category: 'Projects' },
  { id: 15, name: 'deal.II PR Differentiation', milestone: 'M3', category: 'Projects' },
  { id: 16, name: 'Flagship InOffice Presentation', milestone: 'M3', category: 'Projects' },
  { id: 17, name: 'InOffice Security Spec', milestone: 'M3', category: 'Projects' },
  { id: 18, name: 'Flagship VRP Presentation', milestone: 'M3', category: 'Projects' },
  { id: 19, name: 'VRP Methodological Disclaimers', milestone: 'M3', category: 'Projects' },
  { id: 20, name: 'Secondary Paatam Showcase', milestone: 'M4', category: 'Projects' },
  { id: 21, name: 'Secondary Greeks Visualizer', milestone: 'M4', category: 'Projects' },
  { id: 22, name: 'Secondary Option Profit Model', milestone: 'M4', category: 'Projects' },
  { id: 23, name: 'Secondary Multivariable Calc', milestone: 'M4', category: 'Projects' },
  { id: 24, name: 'Progressive Disclosure UI', milestone: 'M3', category: 'Case Studies' },
  { id: 25, name: 'Published Medium Stream', milestone: 'M4', category: 'Writing' },
  { id: 26, name: 'Writing Impression Metric', milestone: 'M4', category: 'Writing' },
  { id: 27, name: 'Lightbox Modal Focus Trap', milestone: 'M5', category: 'Accessibility' },
  { id: 28, name: 'Focus Restoration', milestone: 'M5', category: 'Accessibility' },
  { id: 29, name: 'Body Scroll Lock', milestone: 'M5', category: 'Accessibility' },
  { id: 30, name: 'Visible Focus Rings', milestone: 'M5', category: 'Accessibility' },
  { id: 31, name: 'Prefers-Reduced-Motion', milestone: 'M5', category: 'Accessibility' },
  { id: 32, name: 'Mobile Viewport (390px)', milestone: 'M2', category: 'Viewports' },
  { id: 33, name: 'Tablet Viewport (768px)', milestone: 'M2', category: 'Viewports' },
  { id: 34, name: 'Desktop Viewport (1440px)', milestone: 'M2', category: 'Viewports' },
  { id: 35, name: 'Resume PDF Integration', milestone: 'M1', category: 'Deployment' },
  { id: 36, name: 'GitHub Pages SPA 404 Fallback', milestone: 'M5', category: 'Deployment' },
  { id: 37, name: '.nojekyll Preservation', milestone: 'M1', category: 'Deployment' },
  { id: 38, name: 'GitHub Actions Deploy Workflow', milestone: 'M5', category: 'Deployment' },
  { id: 39, name: '20-Second Recruiter Heuristic', milestone: 'M2', category: 'Recruiter' }
];

export const AUTHORITATIVE_ORACLE = {
  profile: {
    fullName: 'Harsha Matta',
    institution: 'University of North Carolina at Chapel Hill',
    shortInstitution: 'UNC Chapel Hill',
    degree: 'B.S. in Applied Mathematics & Computer Science',
    expectedGraduation: 'May 2028',
    email: 'harsha.v.matta@gmail.com',
    location: 'Chapel Hill, NC',
    disciplines: [
      'Native Apple Systems',
      'C++ Scientific Computing',
      'Quantitative Finance'
    ],
    social: {
      github: 'https://github.com/HarshaMatta',
      linkedin: 'https://linkedin.com/in/harshamatta',
      medium: 'https://medium.com/@harsha.v.matta'
    }
  },

  themeTokens: {
    light: {
      canvas: '#FBF9F5',
      inkPrimary: '#2C2A29',
      inkSecondary: '#706E6B',
      cardSurface: '#FFFFFF',
      borderSubtle: '#E5E0D8',
      accent: '#0369A1'
    },
    dark: {
      canvas: '#0B0D0E',
      inkPrimary: '#F3F4F6',
      inkSecondary: '#CBD5E1',
      surface: '#141618',
      borderSubtle: 'rgba(255, 255, 255, 0.08)',
      accent: '#38BDF8'
    },
    typography: {
      serifFamily: 'Newsreader',
      sansFamily: 'Inter',
      monoFamily: 'JetBrains Mono'
    }
  },

  flagships: {
    next: {
      id: 'next',
      tagline: 'To-Do List and Calendar with AI Scheduling',
      appStoreId: '6781007283',
      landingPage: 'https://harshamatta.github.io/projNext/',
      iconPath: 'assets/next/icon.png',
      screenshots: [
        'assets/next/screen1.jpg',
        'assets/next/screen2.jpg',
        'assets/next/screen3.jpg'
      ],
      specTokens: ['[status: active]', '[date: YYYY-MM-DD]', '[time: HH:MM-HH:MM]', '[rolled: X]'],
      coreHighlights: [
        'Dual-file mirror paradigm (.md context + .tasks.md checkboxes)',
        'NSFilePresenter concurrency & line-level string-hash conflict resolution',
        'BYOK AI scheduling with strict interactive user-approval gate',
        'Systemic midnight rollover counter'
      ]
    },

    dealii: {
      id: 'dealii',
      repoUrl: 'https://github.com/dealii/dealii',
      diagramSvg: 'assets/dealii/affine_mapping.svg',
      prs: [
        {
          number: 19327,
          status: 'merged',
          date: '2026-02-25',
          title: 'Optimized InterpolatedUniformGridData delta_x caching'
        },
        {
          number: 19370,
          status: 'merged',
          date: '2026-03-08',
          title: 'Assert non-hypercube affine approximation'
        },
        {
          number: 19804,
          status: 'in_review',
          title: 'Fix real to unit cell affine approximation'
        }
      ]
    },

    trackinoffice: {
      id: 'trackinoffice',
      appStoreUrl: 'https://apps.apple.com/us/app/trackinoffice/id6762209341',
      appStoreId: '6762209341',
      iconPath: 'assets/trackinoffice/icon.jpg',
      screenshots: [
        'assets/trackinoffice/screen1.jpg',
        'assets/trackinoffice/screen2.jpg',
        'assets/trackinoffice/screen3.jpg'
      ],
      security: {
        keychainAttribute: 'kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly',
        storage: 'SwiftData encrypted SQLite',
        geofenceRadius: '50m - 500m',
        cooldownWindowMinutes: 30,
        formulaDefenseChars: ['=', '+', '-', '@']
      }
    },

    vrp: {
      id: 'vrp',
      streamlitUrl: 'https://volatilityriskpremium.streamlit.app/',
      githubUrl: 'https://github.com/HarshaMatta/VolatilityRiskPremium',
      mediumUrl: 'https://medium.com/@harsha.v.matta/volatility-risk-premium-a35d89502110',
      dashboardSvg: 'assets/quant/vrp_dashboard.svg',
      historicalHorizon: '15+ years (2010 - present)',
      positiveDaysRatio: '>85%',
      tailRiskEvents: ['Feb 2018 Volmageddon / XIV termination', 'March 2020 COVID crash'],
      instrumentCaveat: 'Variance swaps are statically replicable; volatility swaps carry unhedgeable convexity bias'
    }
  },

  secondaries: {
    paatam: {
      id: 'paatam',
      downloadsMetric: '275+ organic downloads',
      appStoreUrl: 'https://apps.apple.com/us/app/paatam/id6670503097',
      appStoreId: '6670503097',
      languages: ['Telugu', 'Hindi', 'Tamil', 'Kannada', 'Malayalam'],
      tech: ['PencilKit stroke heuristics', 'Spaced repetition', 'Swift/SwiftUI']
    },
    greeks: {
      id: 'greeks',
      streamlitUrl: 'https://greeksvisualizer.streamlit.app',
      githubUrl: 'https://github.com/HarshaMatta/GreeksVisualizer',
      previewSvg: 'assets/quant/greeks_dashboard.svg',
      greeks: ['Delta', 'Gamma', 'Theta', 'Vega', 'Rho']
    },
    optionprofit: {
      id: 'optionprofit',
      streamlitUrl: 'https://optionprofitmodel.streamlit.app',
      githubUrl: 'https://github.com/HarshaMatta/optionProfitModel',
      previewSvg: 'assets/quant/black_scholes_dashboard.svg',
      model: 'Black-Scholes European call/put valuation'
    },
    multivariable: {
      id: 'multivariable',
      stages: [
        'Stage 1: Direct string match against reference',
        'Stage 2: Algorithmic symbolic normalization & algebraic equivalence',
        'Stage 3: LLM prompt equivalence verification',
        'Stage 4: Deep solver verification'
      ],
      costLimiter: 'AICostLimiter middleware'
    }
  },

  articles: [
    {
      id: 'option-pricing',
      title: 'How do you price an option?',
      date: 'Feb 14, 2025',
      topic: 'Pricing Theory',
      url: 'https://medium.com/@harsha.v.matta/how-do-you-price-an-option-5fbdbce99280',
      coverSvg: 'assets/writing/option_pricing.svg'
    },
    {
      id: 'american-options-p1',
      title: 'How to Price an American Option, Part 1: The Portfolio Approach',
      date: 'Feb 18, 2025',
      topic: 'Derivatives',
      url: 'https://medium.com/@harsha.v.matta/how-to-price-an-american-option-part-1-portfolio-approach-df14612ef694',
      coverSvg: 'assets/writing/american_options_p1.svg'
    },
    {
      id: 'american-options-p2',
      title: 'How to Price an American Option, Part 2: The Risk-Neutral Approach',
      date: 'Feb 24, 2025',
      topic: 'Quantitative Modeling',
      url: 'https://medium.com/@harsha.v.matta/how-to-price-an-american-option-part-2-the-risk-neutral-approach-509ef168a3fe',
      coverSvg: 'assets/writing/american_options_p2.svg'
    },
    {
      id: 'vrp-paper',
      title: 'The Volatility Risk Premium',
      date: 'Mar 1, 2025',
      topic: 'Empirical Volatility',
      url: 'https://medium.com/@harsha.v.matta/volatility-risk-premium-a35d89502110',
      coverSvg: 'assets/writing/vrp_paper.svg'
    }
  ],

  writingImpressionsMetric: '3,400+ total impressions'
};

// Mathematical and Business Logic Oracles

export function calculateLogReturn(pt, ptMinus1) {
  if (pt <= 0 || ptMinus1 <= 0) {
    throw new Error('Prices must be strictly positive');
  }
  return Math.log(pt / ptMinus1);
}

export function annualizeDailyVolatility(dailyStd) {
  if (dailyStd < 0) {
    throw new Error('Standard deviation cannot be negative');
  }
  return dailyStd * Math.sqrt(252);
}

export function calculateDailyVrp(vixPercentage, forwardRealizedVolAnnualized) {
  const vixDecimal = vixPercentage / 100;
  return vixDecimal - forwardRealizedVolAnnualized;
}

export function classifyMarketRegime(vixPercentage, spxClose, spx200DaySma) {
  if (vixPercentage >= 30) {
    return 'crisis';
  }
  if (vixPercentage < 20 && spxClose > spx200DaySma) {
    return 'bull';
  }
  return 'bear';
}

export function sanitizeCsvField(field) {
  if (typeof field !== 'string') return String(field);
  const trimmed = field.trimStart();
  const dangerousTriggers = ['=', '+', '-', '@'];
  if (dangerousTriggers.some(t => trimmed.startsWith(t))) {
    // Escape by prepending single quote to neutralize spreadsheet execution
    return `'${field}`;
  }
  return field;
}
