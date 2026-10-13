/**
 * Authoritative Published Technical Writing Data for Harsha Matta Portfolio
 * 4 Verified Articles on Medium covering Derivative Valuation,
 * American Options, and Empirical Volatility Risk Premia (3,400+ Total Impressions).
 */

import type { ArticleItem, WritingMetadata } from '../types';

export const writingMetadata: WritingMetadata = {
  totalImpressions: '3,400+',
  articlesCount: 4,
  platform: 'Medium',
  profileUrl: 'https://medium.com/@harsha.v.matta'
};

export const articles: ArticleItem[] = [
  // ==========================================
  // ARTICLE 1: Pricing Theory
  // ==========================================
  {
    id: 'how-do-you-price-an-option',
    title: 'How do you price an option?',
    topic: 'Pricing Theory',
    date: '2025-02-14',
    formattedDate: 'Feb 14, 2025',
    url: 'https://medium.com/@harsha.v.matta/how-do-you-price-an-option-5fbdbce99280',
    hook:
      'Foundations of derivative valuation: why options cannot be priced by forecasting stock direction alone, and how no-arbitrage mechanics and risk-neutral probabilities dictate fair value.',
    coverSvg: '/assets/writing/option_pricing.svg',
    readTime: '5 min read',
    takeaways: [
      'Explains why directional forecasting fails in option pricing due to asymmetric payoffs.',
      'Derives the foundational no-arbitrage principle and risk-neutral expectation framework.',
      'Demonstrates why options act as non-linear insurance contracts rather than speculative bets.'
    ]
  },

  // ==========================================
  // ARTICLE 2: American Options, Part 1
  // ==========================================
  {
    id: 'american-options-part-1',
    title: 'How to Price an American Option, Part 1: The Portfolio Approach',
    topic: 'Derivatives & Early Exercise',
    date: '2025-02-18',
    formattedDate: 'Feb 18, 2025',
    url: 'https://medium.com/@harsha.v.matta/how-to-price-an-american-option-part-1-portfolio-approach-df14612ef694',
    hook:
      'Replicating portfolio derivation, early exercise boundary conditions, and why American puts violate standard European put-call parity.',
    coverSvg: '/assets/writing/american_options_p1.svg',
    readTime: '7 min read',
    takeaways: [
      'Constructs dynamic replicating portfolios of underlying stock and risk-free borrowing.',
      'Derives the early exercise boundary condition mathematically.',
      'Analyzes why American call options on non-dividend paying stocks should never be exercised early.',
      'Examines how early exercise optionality breaks standard European put-call parity.'
    ]
  },

  // ==========================================
  // ARTICLE 3: American Options, Part 2
  // ==========================================
  {
    id: 'american-options-part-2',
    title: 'How to Price an American Option, Part 2: The Risk-Neutral Approach',
    topic: 'Quantitative Modeling',
    date: '2025-02-24',
    formattedDate: 'Feb 24, 2025',
    url: 'https://medium.com/@harsha.v.matta/how-to-price-an-american-option-part-2-the-risk-neutral-approach-509ef168a3fe',
    hook:
      'Discretizing continuous asset paths into binomial lattice trees, backward induction dynamic programming, and calculating early exercise premiums.',
    coverSvg: '/assets/writing/american_options_p2.svg',
    readTime: '8 min read',
    takeaways: [
      'Builds discrete Cox-Ross-Rubinstein binomial lattice trees for underlying price diffusion.',
      'Implements backward induction algorithms to check optimal early exercise at each node.',
      'Quantifies the exact early exercise premium of American contracts over European counterparts.'
    ]
  },

  // ==========================================
  // ARTICLE 4: The Volatility Risk Premium
  // ==========================================
  {
    id: 'the-volatility-risk-premium',
    title: 'The Volatility Risk Premium: Does the Market Consistently Overprice Fear?',
    topic: 'Empirical Volatility & Risk Premia',
    date: '2025-03-01',
    formattedDate: 'Mar 1, 2025 (Updated Jun 2026)',
    url: 'https://medium.com/@harsha.v.matta/volatility-risk-premium-a35d89502110',
    hook:
      'A 15-year empirical study of S&P 500 vs. VIX, proving that forward implied volatility exceeds realized volatility on >85% of days, driven by investor concave utility and institutional put hedging.',
    coverSvg: '/assets/writing/vrp_paper.svg',
    readTime: '11 min read',
    takeaways: [
      'Analyzes 15+ years of SPX and VIX daily market data using forward time-series alignment.',
      'Connects concave investor utility and loss aversion (prospect theory) to structural put overpricing.',
      'Partitions volatility regimes: Bull, Bear, and Crisis.',
      'Details variance swap payoff mechanics and transparently examines tail-risk drawdowns during 2018 Volmageddon and 2020 COVID.'
    ]
  }
];

export default articles;
