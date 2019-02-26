import defaultTheme from './defaultTheme';

const themes = {
  default: defaultTheme,
};

export function getTheme(themeName = null) {
  if (!themeName) {
    return defaultTheme;
  }

  const theme = themes[themeName];
  if (!theme) {
    return defaultTheme;
  }

  return theme;
}

export default themes;
