export const JS_YELLOW = "#F0DB4F";
export const DARK_BASE = "#323330";

export const jsPalette = {
  yellow: JS_YELLOW,
  dark: DARK_BASE,
  darkBase: DARK_BASE,
} as const;

export const stageColors = {
  background: jsPalette.dark,
  javascriptYellow: jsPalette.yellow,
  darkBase: jsPalette.dark,
  foreground: "#F5F5F4",
  mutedForeground: "#C9C9C1",
  primary: jsPalette.yellow,
  primaryForeground: "#25250E",
  surface: "#262725",
  surfaceRaised: "#3B3C39",
  surfaceCode: "#232421",
  border: "#55564F",
  ring: jsPalette.yellow,
} as const;

export const stageRadius = {
  base: "0.625rem",
  xs: "0.3125rem",
  sm: "0.46875rem",
  md: "0.546875rem",
  lg: "0.625rem",
  xl: "0.9375rem",
} as const;

export const stageSpacing = {
  gutter: "5rem",
  gap: "2rem",
  panel: "1.5rem",
  compact: "1rem",
  inset: "0.75rem",
} as const;

export const stageTypography = {
  sans: '"Geist", "Avenir Next", "Segoe UI", sans-serif',
  mono: '"Geist Mono", "JetBrains Mono", "SFMono-Regular", monospace',
  title: {
    fontSize: "4.5rem",
    lineHeight: "1",
    fontWeight: 700,
  },
  body: {
    fontSize: "2rem",
    lineHeight: "1.25",
    fontWeight: 500,
  },
  code: {
    fontSize: "1.375rem",
    lineHeight: "1.55",
    fontWeight: 500,
  },
} as const;

export const stageMotion = {
  duration: {
    fast: 0.18,
    standard: 0.32,
    slow: 0.56,
  },
  easing: {
    standard: "cubic-bezier(0.16, 1, 0.3, 1)",
    emphasized: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
} as const;

export const stageTheme = {
  colors: stageColors,
  radius: stageRadius,
  spacing: stageSpacing,
  typography: stageTypography,
  motion: stageMotion,
} as const;

export type StageTheme = typeof stageTheme;
