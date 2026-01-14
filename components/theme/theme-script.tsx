const themeScript = `
(function() {
  const STORAGE_KEY = 'theme-preference';

  function getThemePreference() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  const theme = getThemePreference();
  document.documentElement.classList.toggle('dark', theme === 'dark');
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
