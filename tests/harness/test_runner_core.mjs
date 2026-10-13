/**
 * Core Test Runner Engine & Reporting Harness
 * Harsha Matta Portfolio Rebuild Test Suite
 */

import { performance } from 'node:perf_hooks';

const MILESTONE_ORDER = ['M1', 'M2', 'M3', 'M4', 'M5'];

function isMilestoneIncluded(testMilestone, targetMilestone, cumulative = false) {
  if (!targetMilestone) return true;
  if (!testMilestone) return false;
  if (!cumulative) return testMilestone === targetMilestone;
  const targetIdx = MILESTONE_ORDER.indexOf(targetMilestone);
  const testIdx = MILESTONE_ORDER.indexOf(testMilestone);
  return testIdx !== -1 && testIdx <= targetIdx;
}

export class TestHarness {
  constructor(options = {}) {
    this.options = {
      verbose: false,
      progressive: false,
      cumulative: false,
      filterTier: null,
      filterMilestone: null,
      filterFeature: null,
      ...options
    };
    this.tests = [];
    this.results = {
      passed: 0,
      failed: 0,
      skipped: 0,
      pending: 0,
      totalDurationMs: 0,
      failures: []
    };
  }

  register({ tier, featureId, milestone, name, fn, progressiveCheck = null }) {
    this.tests.push({
      tier,
      featureId,
      milestone,
      name,
      fn,
      progressiveCheck
    });
  }

  async run() {
    const startTime = performance.now();
    console.log('\n======================================================================');
    console.log('   HARSHA MATTA PORTFOLIO — COMPREHENSIVE E2E TEST TRACK RUNNER');
    console.log('======================================================================');
    console.log(`Execution Mode: ${this.options.progressive ? 'Progressive Milestone' : 'Strict Full Suite'}`);
    if (this.options.filterTier) console.log(`Tier Filter: Tier ${this.options.filterTier}`);
    if (this.options.filterMilestone) console.log(`Milestone Filter: ${this.options.filterMilestone}${this.options.cumulative ? ' (Cumulative)' : ''}`);
    if (this.options.filterFeature) console.log(`Feature Filter: Feature #${this.options.filterFeature}`);
    console.log('----------------------------------------------------------------------\n');

    let currentTier = null;
    let currentFeature = null;

    for (const test of this.tests) {
      // Filters
      if (this.options.filterTier && test.tier !== Number(this.options.filterTier)) {
        continue;
      }
      if (this.options.filterMilestone && !isMilestoneIncluded(test.milestone, this.options.filterMilestone, this.options.cumulative)) {
        continue;
      }
      if (this.options.filterFeature && test.featureId !== Number(this.options.filterFeature)) {
        continue;
      }

      // Grouping header
      if (test.tier !== currentTier) {
        currentTier = test.tier;
        console.log(`\n▶ TIER ${currentTier} EXECUTION:`);
      }
      if (test.featureId && test.featureId !== currentFeature) {
        currentFeature = test.featureId;
      }

      // Progressive check
      if (this.options.progressive && test.progressiveCheck) {
        const isReady = test.progressiveCheck();
        if (!isReady) {
          this.results.pending++;
          if (this.options.verbose) {
            console.log(`  ○ [PENDING] (M-${test.milestone || '?'}) ${test.name}`);
          }
          continue;
        }
      }

      const testStart = performance.now();
      try {
        await test.fn();
        const duration = (performance.now() - testStart).toFixed(1);
        this.results.passed++;
        if (this.options.verbose) {
          console.log(`  ✓ PASS (${duration}ms) [F#${test.featureId || '-'}] ${test.name}`);
        } else {
          process.stdout.write('.');
        }
      } catch (err) {
        const duration = (performance.now() - testStart).toFixed(1);
        if (this.options.progressive && test.milestone !== 'M1') {
          const isMissingFileError =
            err.code === 'ENOENT' ||
            err.message?.includes('must exist') ||
            err.message?.includes('Expected file to exist') ||
            err.message?.includes('received null') ||
            err.message?.includes('received undefined');

          if (isMissingFileError) {
            this.results.pending++;
            if (this.options.verbose) {
              console.log(`  ○ [PENDING] (M-${test.milestone || '?'}) ${test.name} — ${err.message}`);
            } else {
              process.stdout.write('o');
            }
            continue;
          }
        }
        this.results.failed++;
        this.results.failures.push({
          test,
          error: err,
          duration
        });
        if (this.options.verbose) {
          console.log(`  ✗ FAIL (${duration}ms) [F#${test.featureId || '-'}] ${test.name}`);
          console.log(`    ↳ Error: ${err.message}`);
        } else {
          process.stdout.write('F');
        }
      }
    }

    this.results.totalDurationMs = performance.now() - startTime;
    this.printSummary();

    return {
      exitCode: this.results.failed > 0 ? 1 : 0,
      results: this.results
    };
  }

  printSummary() {
    console.log('\n\n======================================================================');
    console.log('                          TEST SUITE SUMMARY                          ');
    console.log('======================================================================');
    console.log(`Total Executed:  ${this.results.passed + this.results.failed}`);
    console.log(`Passed:          ${this.results.passed}`);
    console.log(`Failed:          ${this.results.failed}`);
    if (this.results.pending > 0) {
      console.log(`Pending/Deferred:${this.results.pending}`);
    }
    console.log(`Duration:        ${(this.results.totalDurationMs / 1000).toFixed(2)}s`);
    console.log('----------------------------------------------------------------------');

    if (this.results.failures.length > 0) {
      console.log('\nDETAILED FAILURES:');
      this.results.failures.forEach((f, idx) => {
        console.log(`\n${idx + 1}) [Tier ${f.test.tier}] Feature #${f.test.featureId || 'N/A'}: ${f.test.name}`);
        console.log(`   Location/Milestone: ${f.test.milestone || 'General'}`);
        console.log(`   Message: ${f.error.message}`);
        if (f.error.actual !== undefined && f.error.expected !== undefined) {
          console.log(`   Actual:   ${JSON.stringify(f.error.actual)}`);
          console.log(`   Expected: ${JSON.stringify(f.error.expected)}`);
        }
        if (f.error.stack && this.options.verbose) {
          console.log(`   Stack:\n${f.error.stack.split('\n').slice(1, 4).join('\n')}`);
        }
      });
      console.log('\nSTATUS: ✗ TESTS FAILED');
    } else {
      console.log('\nSTATUS: ✓ ALL EXECUTED TESTS PASSED CLEANLY');
    }
    console.log('======================================================================\n');
  }
}
