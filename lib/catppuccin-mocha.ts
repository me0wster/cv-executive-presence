/**
 * Catppuccin Mocha Theme
 * Official color palette: https://github.com/catppuccin/catppuccin
 */

export const catppuccinMocha = {
  // Base colors
  rosewater: "#f5e0dc",
  flamingo: "#f2cdcd",
  pink: "#f5c2e7",
  mauve: "#cba6f7",
  red: "#f38ba8",
  maroon: "#eba0ac",
  peach: "#fab387",
  yellow: "#f9e2af",
  green: "#a6e3a1",
  teal: "#94e2d5",
  sky: "#89dceb",
  sapphire: "#74c7ec",
  blue: "#89b4fa",
  lavender: "#b4befe",
  
  // Text colors
  text: "#cdd6f4",
  subtext1: "#bac2de",
  subtext0: "#a6adc8",
  
  // Overlay colors
  overlay2: "#9399b2",
  overlay1: "#7f849c",
  overlay0: "#6c7086",
  
  // Surface colors
  surface2: "#585b70",
  surface1: "#45475a",
  surface0: "#313244",
  
  // Background colors
  base: "#1e1e2e",
  mantle: "#181825",
  crust: "#11111b",
} as const;

/**
 * Semantic color mappings for terminal UI
 */
export const terminalColors = {
  background: catppuccinMocha.base,
  foreground: catppuccinMocha.text,
  
  // Terminal-specific
  prompt: catppuccinMocha.green,
  command: catppuccinMocha.text,
  error: catppuccinMocha.red,
  success: catppuccinMocha.green,
  warning: catppuccinMocha.yellow,
  info: catppuccinMocha.blue,
  
  // UI elements
  border: catppuccinMocha.surface1,
  borderLight: catppuccinMocha.surface0,
  
  // Text variants
  textPrimary: catppuccinMocha.text,
  textSecondary: catppuccinMocha.subtext0,
  textMuted: catppuccinMocha.overlay1,
  textDim: catppuccinMocha.overlay0,
  
  // Accent colors
  accent: catppuccinMocha.blue,
  accentHover: catppuccinMocha.sapphire,
  link: catppuccinMocha.blue,
  highlight: catppuccinMocha.mauve,
  
  // Window controls
  closeButton: catppuccinMocha.red,
  minimizeButton: catppuccinMocha.yellow,
  maximizeButton: catppuccinMocha.green,
} as const;

/**
 * Export color utilities
 */
export type CatppuccinColor = keyof typeof catppuccinMocha;
export type TerminalColor = keyof typeof terminalColors;
