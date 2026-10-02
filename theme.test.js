import test from 'node:test';
import assert from 'node:assert';
import { getInitialTheme, toggleTheme } from './theme.js';

test('getInitialTheme should respect saved theme in localStorage over system preference', () => {
  assert.strictEqual(getInitialTheme('dark', false), 'dark');
  assert.strictEqual(getInitialTheme('light', true), 'light');
});

test('getInitialTheme should respect system preference when no valid saved theme exists', () => {
  assert.strictEqual(getInitialTheme(null, true), 'dark');
  assert.strictEqual(getInitialTheme(null, false), 'light');
  assert.strictEqual(getInitialTheme(undefined, true), 'dark');
  assert.strictEqual(getInitialTheme('', false), 'light');
});

test('toggleTheme should switch between dark and light', () => {
  assert.strictEqual(toggleTheme('light'), 'dark');
  assert.strictEqual(toggleTheme('dark'), 'light');
});
