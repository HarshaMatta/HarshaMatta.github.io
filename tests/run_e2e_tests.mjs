#!/usr/bin/env node
/**
 * Master E2E Test Track Runner CLI
 * Harsha Matta Portfolio Rebuild Test Suite
 *
 * Usage:
 *   node tests/run_e2e_tests.mjs [options]
 *
 * Options:
 *   --progressive         Run in progressive mode (defers tests whose milestone files are not yet created)
 *   --tier <1-4>          Run tests only for the specified Tier
 *   --milestone <M1-M5>   Run tests only for the specified Milestone
 *   --feature <1-39>      Run tests only for the specified Feature number
 *   --verbose, -v         Display detailed output for each executed test
 *   --help, -h            Show this help documentation
 */

import { TestHarness } from './harness/test_runner_core.mjs';
import { registerTier1Tests } from './tier1_feature_coverage.mjs';
import { registerTier2Tests } from './tier2_boundary_corner.mjs';
import { registerTier3Tests } from './tier3_cross_feature.mjs';
import { registerTier4Tests } from './tier4_real_world_scenarios.mjs';

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    progressive: false,
    cumulative: false,
    verbose: false,
    filterTier: null,
    filterMilestone: null,
    filterFeature: null
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--progressive') {
      options.progressive = true;
    } else if (arg === '--cumulative') {
      options.cumulative = true;
    } else if (arg === '--verbose' || arg === '-v') {
      options.verbose = true;
    } else if (arg === '--tier') {
      options.filterTier = Number(args[++i]);
    } else if (arg === '--milestone') {
      options.filterMilestone = args[++i].toUpperCase();
    } else if (arg === '--feature') {
      options.filterFeature = Number(args[++i]);
    } else if (arg === '--help' || arg === '-h') {
      console.log(`
Master E2E Test Track Runner — Harsha Matta Portfolio

Options:
  --progressive         Run in progressive mode (defers tests for unbuilt milestones)
  --cumulative          Run all milestones up to and including the target milestone
  --tier <1-4>          Filter by test tier (1: Coverage, 2: Boundary, 3: Cross, 4: Scenarios)
  --milestone <M1-M5>   Filter by implementation milestone (M1 through M5)
  --feature <1-39>      Filter by Feature ID from PROJECT.md Feature Inventory
  --verbose, -v         Show detailed test output with durations and locations
  --help, -h            Show help
      `);
      process.exit(0);
    }
  }

  return options;
}

async function main() {
  const options = parseArgs();
  const harness = new TestHarness(options);

  // Register all tiers
  registerTier1Tests(harness);
  registerTier2Tests(harness);
  registerTier3Tests(harness);
  registerTier4Tests(harness);

  const { exitCode } = await harness.run();
  process.exit(exitCode);
}

main().catch(err => {
  console.error('Fatal Test Runner Error:', err);
  process.exit(1);
});
