/**
 * Authoritative Quantitative Research Data for Harsha Matta Portfolio
 * Models Mathematical Formulations, Parameter Specifications,
 * Regime Attribution Rules, and Methodological Risk Disclaimers.
 */

import type { QuantProjectItem } from '../types';

export const quantProjects: QuantProjectItem[] = [
  // ==========================================
  // MODEL 1: Volatility Risk Premium (VRP)
  // ==========================================
  {
    id: 'vrp',
    title: 'The Volatility Risk Premium Pipeline',
    subtitle: '15-Year Empirical Study of S&P 500 Implied vs. Realized Volatility',
    category: 'volatility',
    description:
      'Empirical investigation into why S&P 500 index options systematically price forward volatility higher than realized market volatility across 15+ years of daily data (2010–present). Models investor concave utility, variance swap harvesting, and regime performance.',
    equations: [
      {
        name: 'Daily Log Returns',
        latex: 'r_t = \\ln\\left(\\frac{P_t}{P_{t-1}}\\right)',
        explanation:
          'Log returns are additive over time (\\sum r_t = \\ln(P_T / P_0)), ensuring that multi-day volatility scaling remains statistically symmetric and exact.'
      },
      {
        name: 'Annualized 30-Day Rolling Realized Volatility',
        latex: '\\sigma_{\\text{annual}, t} = \\sqrt{\\frac{1}{29}\\sum_{i=0}^{29}(r_{t-i} - \\bar{r})^2} \\times \\sqrt{252}',
        explanation:
          'Calculates historical standard deviation over a 30 trading-day window, annualized using the standard 252 trading-day market convention.'
      },
      {
        name: 'Volatility Risk Premium (VRP)',
        latex: '\\text{VRP}_t = \\text{vix\\_decimal}_t - \\sigma_{\\text{forward\\_realized}, t}',
        explanation:
          'Aligns forward-looking VIX (next 30 calendar days) with realized volatility shifted backward by 30 trading days. VRP > 0 indicates overpricing of fear.'
      },
      {
        name: 'Variance Swap Payoff Proxy',
        latex: '\\text{PnL} = w \\times \\left(\\text{vix\\_decimal}^2 - \\sigma_{\\text{forward\\_realized}}^2\\right)',
        explanation:
          'Receives fixed implied variance and pays floating realized variance per $1 notional. Directly replicates variance swap payoff mechanics.'
      }
    ],
    parameters: [
      {
        name: 'Historical Span',
        symbol: 'T',
        valueOrDefinition: '2010 – Present (15+ Years)',
        interpretation: 'Ingested via yfinance across SPX (^GSPC) and VIX (^VIX) daily closes.'
      },
      {
        name: 'Rolling Window',
        symbol: 'N',
        valueOrDefinition: '30 Trading Days',
        interpretation: 'Matches the 30-day forward horizon embedded in the Cboe VIX calculation.'
      },
      {
        name: 'Annualization Factor',
        symbol: '\\sqrt{252}',
        valueOrDefinition: '252 Days/Year',
        interpretation: 'Standard equity calendar convention converting daily dispersion to annual rates.'
      },
      {
        name: 'Forward Shift',
        symbol: '\\Delta t',
        valueOrDefinition: 'Shift Realized Back 30 Days',
        interpretation: 'Aligns contemporaneous VIX forward expectation with future realized variance.'
      }
    ],
    regimes: [
      {
        name: 'Bull Market Regime',
        condition: 'VIX < 20% & SPX > 200-day Simple Moving Average',
        behavior: 'Mean VRP = +4.2 percentage points. Steady positive carry harvesting.',
        riskLevel: 'low'
      },
      {
        name: 'Intermediate / Bear Regime',
        condition: '20% <= VIX < 30%',
        behavior: 'Elevated market dispersion; VRP remains positive but displays widening variance.',
        riskLevel: 'moderate'
      },
      {
        name: 'Crisis Inversion Regime',
        condition: 'VIX >= 30%',
        behavior: 'Extreme inverted spread (VRP < 0). Realized volatility spikes above implied index pricing.',
        riskLevel: 'severe'
      }
    ],
    caveats: [
      'Positive Carry with Severe Negative Skew: Short volatility strategies steadily collect small premiums punctuated by catastrophic tail-risk drawdowns (e.g. 2011 US Debt Downgrade, Feb 2018 Volmageddon / XIV liquidation, and March 2020 COVID crash).',
      'Variance Swaps vs. Volatility Swaps: Pure variance swaps (sigma^2) possess clean static replication via log contracts of options across strikes; volatility swaps (sigma) are dynamically unhedgeable due to non-linear convexity bias.',
      'Execution Frictions: Backtested models assume frictionless roll dates and zero bid-ask spread; retail options implementations face margin calls and borrowing fees.'
    ],
    liveUrl: 'https://volatilityriskpremium.streamlit.app/',
    githubUrl: 'https://github.com/HarshaMatta/VolatilityRiskPremium',
    paperUrl: 'https://medium.com/@harsha.v.matta/volatility-risk-premium-a35d89502110',
    previewSvg: '/assets/quant/vrp_dashboard.svg',
    metrics: [
      '15+ Years Historical Pipeline (2010–Present)',
      'VRP > 0 on >85% of Trading Days',
      '1.42 Backtested Sharpe Ratio'
    ],
    tags: ['Python', 'Quantitative Finance', 'Derivatives', 'Streamlit', 'Variance Swaps']
  },

  // ==========================================
  // MODEL 2: Greeks Visualizer
  // ==========================================
  {
    id: 'greeks',
    title: 'Options Greeks Real-Time Visualizer',
    subtitle: 'Black-Scholes-Merton Partial Derivatives & Sensitivity Analysis',
    category: 'derivatives',
    description:
      'Interactive analytical sensitivity model calculating analytical closed-form partial derivatives (Delta, Gamma, Theta, Vega, Rho) under the Black-Scholes-Merton framework. Visualizes risk surfaces across spot price, strike, and expiration horizons.',
    equations: [
      {
        name: 'Delta (Call)',
        latex: '\\Delta_C = \\frac{\\partial C}{\\partial S} = N(d_1)',
        explanation: 'Hedge ratio: Sensitivity of call option price to changes in underlying asset price.'
      },
      {
        name: 'Gamma',
        latex: '\\Gamma = \\frac{\\partial^2 V}{\\partial S^2} = \\frac{N\'(d_1)}{S \\sigma \\sqrt{T}}',
        explanation: 'Option curvature: Rate of change of Delta with respect to underlying asset price.'
      },
      {
        name: 'Vega',
        latex: '\\mathcal{V} = \\frac{\\partial V}{\\partial \\sigma} = S \\sqrt{T} N\'(d_1)',
        explanation: 'Volatility sensitivity: Dollar price change per 1% absolute shift in implied volatility.'
      },
      {
        name: 'Theta (Call)',
        latex: '\\Theta_C = -\\frac{S N\'(d_1) \\sigma}{2\\sqrt{T}} - r K e^{-rT} N(d_2)',
        explanation: 'Time decay: Rate of option value erosion per calendar day as maturity approaches.'
      }
    ],
    parameters: [
      {
        name: 'Spot Price',
        symbol: 'S',
        valueOrDefinition: 'Current Asset Price',
        interpretation: 'Baseline market price of the underlying equity or index.'
      },
      {
        name: 'Strike Price',
        symbol: 'K',
        valueOrDefinition: 'Exercise Price',
        interpretation: 'Contractual price at which the option holder can buy or sell.'
      },
      {
        name: 'Time to Maturity',
        symbol: 'T',
        valueOrDefinition: 'Years to Expiration',
        interpretation: 'Fraction of year remaining until option contract expiration date.'
      },
      {
        name: 'Implied Volatility',
        symbol: '\\sigma',
        valueOrDefinition: 'Annualized Dispersion',
        interpretation: 'Annualized standard deviation of asset price returns priced into option premium.'
      }
    ],
    caveats: [
      'Constant Volatility Assumption: Standard BSM assumes flat volatility, ignoring the real-world volatility smile and skew across strikes.',
      'Continuous Trading & No Jump Risk: Ignores discrete overnight market gaps and trading halts.'
    ],
    liveUrl: 'https://greeksvisualizer.streamlit.app',
    githubUrl: 'https://github.com/HarshaMatta/GreeksVisualizer',
    previewSvg: '/assets/quant/greeks_dashboard.svg',
    metrics: ['Interactive 3D Surface Plots', 'Real-Time Vectorized Greeks', 'Live Cloud App'],
    tags: ['Python', 'Streamlit', 'NumPy', 'SciPy', 'Plotly', 'Greeks']
  },

  // ==========================================
  // MODEL 3: Option Profit Model
  // ==========================================
  {
    id: 'option-profit',
    title: 'Option Profit Model & Multi-Leg Payoff Profiler',
    subtitle: 'Black-Scholes-Merton Pricing & Break-Even Optimization',
    category: 'pricing',
    description:
      'Quantitative multi-leg options strategy profiler calculating theoretical fair value, intrinsic/extrinsic value splits, break-even price barriers, and expiration profit/loss curves across calls, puts, spreads, and collars.',
    equations: [
      {
        name: 'Black-Scholes Call Price',
        latex: 'C(S, t) = S N(d_1) - K e^{-r(T-t)} N(d_2)',
        explanation: 'Closed-form analytical pricing formula for European call options on non-dividend assets.'
      },
      {
        name: 'Black-Scholes Put Price',
        latex: 'P(S, t) = K e^{-r(T-t)} N(-d_2) - S N(-d_1)',
        explanation: 'Closed-form analytical pricing formula for European put options on non-dividend assets.'
      },
      {
        name: 'd1 Calculation',
        latex: 'd_1 = \\frac{\\ln(S/K) + (r + \\sigma^2/2)(T-t)}{\\sigma \\sqrt{T-t}}',
        explanation: 'Standardized moneyness adjusted for expected drift under the risk-neutral measure.'
      },
      {
        name: 'd2 Calculation',
        latex: 'd_2 = d_1 - \\sigma\\sqrt{T-t}',
        explanation: 'Probability of option expiring in the money under the risk-neutral measure.'
      }
    ],
    parameters: [
      {
        name: 'Risk-Free Rate',
        symbol: 'r',
        valueOrDefinition: 'Annualized Yield',
        interpretation: 'Continuously compounded risk-free rate (e.g., US Treasury yield).'
      },
      {
        name: 'Break-Even Call',
        symbol: 'BE_C',
        valueOrDefinition: 'K + Premium',
        interpretation: 'Spot price required at expiration for long call to achieve zero profit/loss.'
      },
      {
        name: 'Break-Even Put',
        symbol: 'BE_P',
        valueOrDefinition: 'K - Premium',
        interpretation: 'Spot price required at expiration for long put to achieve zero profit/loss.'
      }
    ],
    caveats: [
      'Lognormal Diffusion Assumption: Assumes stock prices follow geometric Brownian motion with continuous paths, excluding discrete price jumps and overnight gaps.',
      'Frictionless Markets: Assumes zero transaction fees, zero borrowing constraints, and continuous delta hedging.'
    ],
    liveUrl: 'https://optionprofitmodel.streamlit.app',
    githubUrl: 'https://github.com/HarshaMatta/optionProfitModel',
    previewSvg: '/assets/quant/black_scholes_dashboard.svg',
    metrics: ['Analytical BSM Engine', 'Break-Even Profiles', 'Live Cloud App'],
    tags: ['Python', 'Pandas', 'Streamlit', 'Black-Scholes', 'Derivatives']
  }
];

export default quantProjects;
