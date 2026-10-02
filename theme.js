/**
 * Theme logic module
 */

export function getInitialTheme(savedTheme, prefersDark) {
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }
  return prefersDark ? 'dark' : 'light';
}

export function toggleTheme(currentTheme) {
  return currentTheme === 'dark' ? 'light' : 'dark';
}
