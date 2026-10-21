export const projects = [
  {
    "id": "next",
    "name": "Next",
    "category": "Apps",
    "mark": "N",
    "color": "#1e503f",
    "description": "Tasks, calendar, and AI-assisted planning in a native Apple app.",
    "tech": [
      "Swift",
      "SwiftUI",
      "AppKit",
      "Markdown"
    ],
    "image": "next-schedule.webp",
    "icon": "next-icon.webp",
    "features": [
      [
        "Files you can read",
        "Tasks live in .tasks.md files in a folder you choose."
      ],
      [
        "A schedule you can shape",
        "A day timeline brings tasks alongside calendar commitments."
      ],
      [
        "Suggestions, then decisions",
        "Review proposed placements before applying changes."
      ]
    ],
    "gallery": [
      "next-dashboard.webp",
      "next-schedule.webp",
      "next-proposal.webp"
    ],
    "galleryCaptions": [
      "Next dashboard with tasks, projects, and a daily overview.",
      "Next schedule with a day timeline and planning controls.",
      "Next planning proposal for review before applying changes."
    ],
    "source": "https://harshamatta.github.io/projNext/",
    "destination": "https://harshamatta.github.io/projNext/"
  },
  {
    "id": "inoffice",
    "name": "InOffice Tracker",
    "category": "Apps",
    "mark": "↗",
    "color": "#216d56",
    "description": "An iPhone app for tracking office attendance, weekly goals, and hybrid work.",
    "tech": [
      "SwiftUI",
      "SwiftData",
      "CoreLocation",
      "Keychain"
    ],
    "image": "office-dashboard.jpg",
    "icon": "office-icon.jpg",
    "features": [
      [
        "Automatic check-ins",
        "The native app uses CoreLocation geofencing to record office visits."
      ],
      [
        "Progress in context",
        "Weekly and monthly views show attendance against your goals."
      ],
      [
        "Take your records with you",
        "CSV import and export support your existing workflow."
      ]
    ],
    "gallery": [
      "office-dashboard.jpg",
      "office-calendar.jpg",
      "trackinoffice/screen3.jpg"
    ],
    "galleryCaptions": [
      "Attendance dashboard with weekly, monthly, and yearly progress.",
      "Calendar view of office attendance.",
      "Workplace settings with geofence radius, location permissions, and office goals."
    ]
  },
  {
    "id": "paatam",
    "name": "Paatam",
    "category": "Apps",
    "mark": "అ",
    "color": "#6c4bb0",
    "description": "Learn Indian scripts with a custom spaced repetition system. Characters you miss return more often; familiar ones are spaced further apart.",
    "tech": [
      "Flutter",
      "Dart",
      "Spaced repetition"
    ],
    "image": "paatam/screen1.jpg",
    "icon": "paatam/icon.jpg",
    "gallery": [
      "paatam/screen1.jpg",
      "paatam/screen2.jpg",
      "paatam/screen3.jpg",
      "paatam/screen4.jpg"
    ],
    "galleryCaptions": [
      "Hindi character categories and progress overview.",
      "Language settings with Telugu as the known language and Tamil as the learning language.",
      "Tamil character categories and cross-script correspondences.",
      "A Hindi character review card with romanized correspondence."
    ],
    "features": [
      [
        "Custom spaced repetition",
        "Missed characters come back for more practice. Review intervals grow as recognition improves."
      ],
      [
        "Learn across scripts",
        "Use a language you know to learn Telugu, Tamil, Hindi, Kannada, or Malayalam."
      ],
      [
        "Track your progress",
        "Review characters, build mastery, and keep your learning preferences."
      ]
    ],
    "source": "https://github.com/HarshaMatta/paatam"
  },
  {
    "id": "quant-lab",
    "name": "Quant Strategy Lab",
    "category": "Data & tools",
    "mark": "Q",
    "color": "#4756aa",
    "description": "A strategy lab with deterministic backtesting and an AI/MCP proof of concept.",
    "tech": [
      "Python",
      "FastAPI",
      "MCP",
      "React"
    ],
    "features": [
      [
        "Explicit controls",
        "Select a strategy and parameters through the web interface."
      ],
      [
        "Inspectable orchestration",
        "MCP tools expose strategy discovery, sample data, price retrieval, and backtests."
      ],
      [
        "Bounded simulations",
        "The documented backtest is single-asset, long/flat, and close-to-close."
      ]
    ],
    "source": "https://github.com/HarshaMatta/quant_strategy_lab",
    "image": "screens/qsl-manual.jpg"
  },
  {
    "id": "vrp",
    "name": "Volatility Risk Premium",
    "category": "Data & tools",
    "mark": "σ",
    "color": "#6752a3",
    "description": "A Python research project comparing implied and forward realized volatility, with notebooks and a Streamlit dashboard.",
    "tech": [
      "Python",
      "Pandas",
      "NumPy",
      "Streamlit"
    ],
    "features": [
      [
        "An inspectable dataset",
        "The committed dataset includes SPX closes, VIX, and forward realized volatility."
      ],
      [
        "Regime exploration",
        "The original dashboard includes bull, bear, and crisis filters."
      ],
      [
        "A written explanation",
        "A companion article walks through the research question and interpretation."
      ]
    ],
    "source": "https://github.com/HarshaMatta/VolatilityRiskPremium",
    "image": "screens/vrp.jpg",
    "live": "https://volatilityriskpremium.streamlit.app/"
  },
  {
    "id": "options",
    "name": "Options Pricing",
    "category": "Data & tools",
    "mark": "ƒ",
    "color": "#a15535",
    "description": "Black–Scholes option pricing with a historical-data Streamlit app and an interactive calculator.",
    "tech": [
      "Python",
      "Pandas",
      "Streamlit",
      "Black–Scholes"
    ],
    "features": [
      [
        "Adjust the assumptions",
        "Explore spot price, volatility, and maturity."
      ],
      [
        "Compare call and put",
        "See how the same assumptions affect different payoffs."
      ],
      [
        "Go deeper in the source",
        "The original tool includes CSV preprocessing and historical calculations."
      ]
    ],
    "source": "https://github.com/HarshaMatta/optionProfitModel"
  },
  {
    "id": "greeks",
    "name": "Greeks Visualizer",
    "category": "Data & tools",
    "mark": "Δ",
    "color": "#476e83",
    "description": "A Streamlit dashboard for option pricing and all five Greeks: Delta, Gamma, Vega, Theta, and Rho.",
    "tech": [
      "Python",
      "NumPy",
      "Matplotlib",
      "Streamlit"
    ],
    "features": [
      [
        "A visual explanation",
        "Move the underlying price and inspect changing sensitivities."
      ],
      [
        "More than one view",
        "Switch between delta and gamma in the browser chart."
      ],
      [
        "A reusable plotting layer",
        "The original Python source separates mathematical functions from its plotting helper."
      ]
    ],
    "source": "https://github.com/HarshaMatta/GreeksVisualizer",
    "image": "screens/greeks.jpg",
    "live": "https://greeksvisualizer.streamlit.app/"
  }
];
export const articles = [
  {
    "id": "vrp",
    "title": "Volatility Risk Premium",
    "date": "2026-06-15",
    "displayDate": "Jun 15, 2026",
    "image": "articles/vrp.png",
    "url": "https://medium.com/@harsha.v.matta/volatility-risk-premium-a35d89502110",
    "project": "vrp"
  },
  {
    "id": "american-2",
    "title": "How to Price an American Option. Part 2: The Risk Neutral Approach",
    "date": "2026-02-10",
    "displayDate": "Feb 10, 2026",
    "image": "articles/american-2.png",
    "url": "https://medium.com/@harsha.v.matta/how-to-price-an-american-option-part-2-the-risk-neutral-approach-509ef168a3fe"
  },
  {
    "id": "american-1",
    "title": "How to Price an American Option. Part 1: Portfolio Approach.",
    "date": "2026-01-21",
    "displayDate": "Jan 21, 2026",
    "image": "articles/american-1.png",
    "url": "https://medium.com/@harsha.v.matta/how-to-price-an-american-option-part-1-portfolio-approach-df14612ef694"
  },
  {
    "id": "options",
    "title": "How do you Price an Option?",
    "date": "2025-04-05",
    "displayDate": "Apr 5, 2025",
    "image": "articles/options.png",
    "url": "https://medium.com/@harsha.v.matta/how-do-you-price-an-option-5fbdbce99280",
    "project": "options"
  }
];
