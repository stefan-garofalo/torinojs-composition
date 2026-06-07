import { DARK_BASE, JS_YELLOW, stageTheme } from "../../theme";

export const stageTokens = {
  color: {
    jsYellow: JS_YELLOW,
    darkBase: DARK_BASE,
    background: stageTheme.colors.surface,
    backgroundDeep: "#1b1c1d",
    surface: stageTheme.colors.surface,
    surfaceElevated: stageTheme.colors.surfaceRaised,
    surfaceCode: stageTheme.colors.surfaceCode,
    border: "rgba(245, 245, 244, 0.12)",
    borderStrong: "rgba(240, 219, 79, 0.44)",
    text: stageTheme.colors.foreground,
    textMuted: stageTheme.colors.mutedForeground,
    textSubtle: "#A7A89F",
    codeText: "#f4f4ef",
    codeComment: "#8b8d88",
    codeKeyword: JS_YELLOW,
    codeString: "#9be28f",
    codePunctuation: "#b9bab4",
  },
  font: {
    sans:
      "var(--font-geist-sans), Geist, ui-sans-serif, system-ui, sans-serif",
    mono:
      "var(--font-geist-mono), Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace",
  },
  radius: {
    card: 8,
    control: 6,
    code: 8,
  },
  stage: {
    width: 1920,
    height: 1080,
    insetX: 112,
    insetY: 84,
    gap: 40,
  },
} as const;

export type StageTokens = typeof stageTokens;
