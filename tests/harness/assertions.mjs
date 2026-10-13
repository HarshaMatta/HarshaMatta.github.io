/**
 * Opaque-Box E2E Testing Assertion Library
 * Harsha Matta Portfolio Rebuild Test Suite
 */

import fs from 'node:fs';

export class AssertionError extends Error {
  constructor(message, actual, expected) {
    super(message);
    this.name = 'AssertionError';
    this.actual = actual;
    this.expected = expected;
  }
}

export function assert(condition, message = 'Assertion failed') {
  if (!condition) {
    throw new AssertionError(message, condition, true);
  }
}

export function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new AssertionError(
      message || `Expected ${JSON.stringify(actual)} to strictly equal ${JSON.stringify(expected)}`,
      actual,
      expected
    );
  }
}

export function assertNotEqual(actual, expected, message) {
  if (actual === expected) {
    throw new AssertionError(
      message || `Expected actual not to equal ${JSON.stringify(expected)}`,
      actual,
      expected
    );
  }
}

export function assertDeepEqual(actual, expected, message) {
  const actualStr = JSON.stringify(actual);
  const expectedStr = JSON.stringify(expected);
  if (actualStr !== expectedStr) {
    throw new AssertionError(
      message || `Expected deep equality:\nActual:   ${actualStr}\nExpected: ${expectedStr}`,
      actual,
      expected
    );
  }
}

export function assertIncludes(haystack, needle, message) {
  if (haystack === null || haystack === undefined) {
    throw new AssertionError(
      message || `Expected target to be defined, but received ${haystack} when checking for ${JSON.stringify(needle)}`,
      haystack,
      needle
    );
  }
  if (typeof haystack === 'string') {
    if (!haystack.includes(needle)) {
      throw new AssertionError(
        message || `Expected string to include ${JSON.stringify(needle)}`,
        haystack,
        needle
      );
    }
  } else if (Array.isArray(haystack)) {
    if (!haystack.includes(needle)) {
      throw new AssertionError(
        message || `Expected array to include ${JSON.stringify(needle)}`,
        haystack,
        needle
      );
    }
  } else if (haystack && typeof haystack === 'object') {
    if (!(needle in haystack)) {
      throw new AssertionError(
        message || `Expected object to have key ${JSON.stringify(needle)}`,
        haystack,
        needle
      );
    }
  } else {
    throw new AssertionError(
      message || `Cannot check inclusion in non-collection type: ${typeof haystack}`,
      haystack,
      needle
    );
  }
}

export function assertNotIncludes(haystack, needle, message) {
  if (haystack === null || haystack === undefined) {
    return;
  }
  if (typeof haystack === 'string' && haystack.includes(needle)) {
    throw new AssertionError(
      message || `Expected string NOT to include ${JSON.stringify(needle)}`,
      haystack,
      needle
    );
  } else if (Array.isArray(haystack) && haystack.includes(needle)) {
    throw new AssertionError(
      message || `Expected array NOT to include ${JSON.stringify(needle)}`,
      haystack,
      needle
    );
  }
}

export function assertMatch(string, regex, message) {
  if (typeof string !== 'string') {
    throw new AssertionError(
      message || `Expected string matching ${regex}, but received ${typeof string}: ${JSON.stringify(string)}`,
      string,
      regex.toString()
    );
  }
  if (!regex.test(string)) {
    throw new AssertionError(
      message || `Expected string to match ${regex}:\nReceived: ${string}`,
      string,
      regex.toString()
    );
  }
}

export function assertNotMatch(string, regex, message) {
  if (regex.test(string)) {
    throw new AssertionError(
      message || `Expected string NOT to match ${regex}:\nReceived: ${string}`,
      string,
      regex.toString()
    );
  }
}

export function assertThrows(fn, expectedPattern, message) {
  let threw = false;
  let caughtError = null;
  try {
    fn();
  } catch (err) {
    threw = true;
    caughtError = err;
  }
  if (!threw) {
    throw new AssertionError(
      message || 'Expected function to throw an error, but it returned normally',
      null,
      'Error'
    );
  }
  if (expectedPattern) {
    const errText = caughtError?.message || String(caughtError);
    if (expectedPattern instanceof RegExp) {
      if (!expectedPattern.test(errText)) {
        throw new AssertionError(
          `Expected thrown error to match ${expectedPattern}, but got: "${errText}"`,
          errText,
          expectedPattern.toString()
        );
      }
    } else if (typeof expectedPattern === 'string') {
      if (!errText.includes(expectedPattern)) {
        throw new AssertionError(
          `Expected thrown error to contain "${expectedPattern}", but got: "${errText}"`,
          errText,
          expectedPattern
        );
      }
    }
  }
}

/**
 * WCAG 2.2 Relative Luminance and Contrast Ratio Calculation
 */
function parseHexColor(hex) {
  const cleanHex = hex.replace('#', '').trim();
  let r, g, b;
  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  } else {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return { r, g, b };
}

function sRgbToLinear(c) {
  const normalized = c / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : Math.pow((normalized + 0.055) / 1.055, 2.4);
}

export function getRelativeLuminance(hex) {
  const { r, g, b } = parseHexColor(hex);
  const rL = sRgbToLinear(r);
  const gL = sRgbToLinear(g);
  const bL = sRgbToLinear(b);
  return 0.2126 * rL + 0.7152 * gL + 0.0722 * bL;
}

export function calculateContrastRatio(foregroundHex, backgroundHex) {
  const lum1 = getRelativeLuminance(foregroundHex);
  const lum2 = getRelativeLuminance(backgroundHex);
  const brighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (brighter + 0.05) / (darker + 0.05);
}

export function assertContrastRatio(foregroundHex, backgroundHex, minRatio, message) {
  const ratio = calculateContrastRatio(foregroundHex, backgroundHex);
  if (ratio < minRatio) {
    throw new AssertionError(
      message || `Contrast ratio ${ratio.toFixed(2)}:1 between ${foregroundHex} and ${backgroundHex} is less than required minimum ${minRatio}:1`,
      ratio,
      minRatio
    );
  }
}

export function assertFileExists(filePath, message) {
  if (!fs.existsSync(filePath)) {
    throw new AssertionError(
      message || `Expected file to exist at path: ${filePath}`,
      false,
      true
    );
  }
}

export function assertValidUrl(urlString, message) {
  try {
    const url = new URL(urlString);
    if (!['http:', 'https:', 'mailto:'].includes(url.protocol)) {
      throw new Error(`Invalid protocol: ${url.protocol}`);
    }
  } catch (err) {
    throw new AssertionError(
      message || `Invalid URL: "${urlString}" (${err.message})`,
      urlString,
      'Valid URL'
    );
  }
}

export function assertValidPdf(filePath, message) {
  assertFileExists(filePath, message || `PDF file does not exist: ${filePath}`);
  const stat = fs.statSync(filePath);
  if (stat.size < 1000) {
    throw new AssertionError(
      `PDF file is suspiciously small (${stat.size} bytes): ${filePath}`,
      stat.size,
      '>= 1000 bytes'
    );
  }
  const buffer = Buffer.alloc(10);
  const fd = fs.openSync(filePath, 'r');
  fs.readSync(fd, buffer, 0, 10, 0);
  fs.closeSync(fd);
  const header = buffer.toString('utf-8', 0, 5);
  if (!header.startsWith('%PDF-')) {
    throw new AssertionError(
      `File at ${filePath} is not a valid PDF (header was: "${header}")`,
      header,
      '%PDF-'
    );
  }
}
