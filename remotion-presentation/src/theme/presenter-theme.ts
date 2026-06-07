export {
  DEFAULT_POST_CUE_PADDING_FRAMES,
  PANEL_OR_LARGE_TRANSITION_FRAMES as LARGE_TRANSITION_FRAMES_600MS,
  PRESENTATION_FPS as PRESENTER_FPS,
  TEXT_OR_SMALL_TRANSITION_FRAMES as SMALL_TRANSITION_FRAMES_300MS,
} from "../timeline";

export const presenterTheme = {
  fontSans:
    "var(--font-geist-sans), Inter, -apple-system, BlinkMacSystemFont, sans-serif",
  fontMono:
    "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
  colors: {
    ink: "#09090b",
    paper: "#f8fafc",
    muted: "#a1a1aa",
    line: "rgba(255,255,255,0.1)",
    panel: "#101014",
    panelSoft: "#17171d",
    yellow: "#facc15",
    cyan: "#22d3ee",
    green: "#22c55e",
    red: "#f43f5e",
  },
} as const;
