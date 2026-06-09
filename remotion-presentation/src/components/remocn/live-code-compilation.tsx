"use client";

import type { ReactNode } from "react";
import { useCurrentFrame } from "remotion";
import { GlassCodeBlock } from "./glass-code-block";

export interface LiveCodeCompilationProps {
  accentColor?: string;
  background?: string;
  backdrop?: string;
  speed?: number;
  codeEvents?: readonly CodeEvent[];
  codeTitle?: string;
  codeMaxWidth?: number;
  codeFontSize?: number;
  codeBodyMinHeight?: number;
  previewLabel?: string;
  leftFlex?: number;
  rightFlex?: number;
  renderPreview?: (props: {
    accentColor: string;
    frame: number;
    ui: UIState;
  }) => ReactNode;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";
const MONO_FAMILY =
  "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace";

export interface UIState {
  background?: string;
  color?: string;
  padding?: string;
  borderRadius?: string;
  fontWeight?: number;
  label?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface CodeEvent {
  code: string;
  ui: UIState;
}

const DEFAULT_EVENTS: CodeEvent[] = [
  {
    code: "export function Button() {\n  return (\n    <button",
    ui: {},
  },
  { code: "\n      style={{", ui: {} },
  {
    code: '\n        background: "#3b82f6",',
    ui: { background: "#3b82f6" },
  },
  {
    code: '\n        color: "white",',
    ui: { color: "white" },
  },
  {
    code: '\n        padding: "12px 28px",',
    ui: { padding: "12px 28px" },
  },
  {
    code: '\n        borderRadius: "999px",',
    ui: { borderRadius: "999px" },
  },
  {
    code: "\n        fontWeight: 600,",
    ui: { fontWeight: 600 },
  },
  {
    code: "\n      }}\n    >\n      Ship it\n    </button>\n  );\n}",
    ui: { label: "Ship it" },
  },
];

const DWELL_FRAMES = 5;
const INITIAL_OFFSET = 8;

interface TimelineEntry extends CodeEvent {
  start: number;
  end: number;
}

function buildTimeline(events: readonly CodeEvent[]): TimelineEntry[] {
  let cursor = INITIAL_OFFSET;
  return events.map((ev) => {
    const start = cursor;
    const lineCount = Math.max(1, ev.code.split("\n").length);
    const end = start + lineCount * 5;
    cursor = end + DWELL_FRAMES;
    return { ...ev, start, end };
  });
}

export function LiveCodeCompilation({
  accentColor = "#3b82f6",
  background = "#070708",
  backdrop = "radial-gradient(ellipse at 20% 30%, rgba(59,130,246,0.08), transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(168,85,247,0.06), transparent 60%)",
  speed = 1,
  codeEvents = DEFAULT_EVENTS,
  codeTitle = "Button.tsx",
  codeMaxWidth = 560,
  codeFontSize = 14,
  codeBodyMinHeight = 360,
  previewLabel = "Preview",
  leftFlex = 1,
  rightFlex = 1,
  renderPreview,
  className,
}: LiveCodeCompilationProps) {
  const remotionFrame = useCurrentFrame();
  const timeline = buildTimeline(codeEvents);

  const fullCode = codeEvents.map((event) => event.code).join("");
  const previewUi: UIState = {};
  for (const t of timeline) {
    Object.assign(previewUi, t.ui);
  }
  const previewFrame = timeline[timeline.length - 1]?.end ?? remotionFrame;
  const buttonLabel = previewUi.label ?? "Button";

  const preview = renderPreview?.({
    accentColor,
    frame: previewFrame,
    ui: previewUi,
  }) ?? (
    <button
      type="button"
      style={{
        background: previewUi.background ?? "rgba(255,255,255,0.06)",
        color: previewUi.color ?? "rgba(255,255,255,0.4)",
        padding: previewUi.padding ?? "10px 20px",
        borderRadius: previewUi.borderRadius ?? "4px",
        fontWeight: previewUi.fontWeight ?? 400,
        fontSize: 18,
        fontFamily: FONT_FAMILY,
        border: previewUi.background
          ? "none"
          : "1px dashed rgba(255,255,255,0.15)",
        cursor: "pointer",
        boxShadow: previewUi.background
          ? `0 10px 30px ${previewUi.background}55, 0 0 0 1px rgba(255,255,255,0.08)`
          : "none",
      }}
    >
      {buttonLabel}
    </button>
  );

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        background,
        overflow: "hidden",
        fontFamily: FONT_FAMILY,
        display: "flex",
      }}
    >
      {/* subtle backdrop gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: backdrop,
        }}
      />

      {/* LEFT: Glass code window */}
      <div
        style={{
          flex: leftFlex,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 48,
          position: "relative",
        }}
      >
        <GlassCodeBlock
          background="transparent"
          code={fullCode}
          embedded
          fontSize={codeFontSize}
          glassColor="rgba(12,12,14,0.85)"
          height={codeBodyMinHeight + 40}
          showBackdrop={false}
          speed={speed}
          staggerFrames={5}
          title={codeTitle}
          width={codeMaxWidth}
        />
      </div>

      {/* RIGHT: Live preview */}
      <div
        style={{
          flex: rightFlex,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderLeft: "1px solid rgba(255,255,255,0.05)",
          background:
            "repeating-conic-gradient(rgba(255,255,255,0.018) 0deg 90deg, transparent 90deg 180deg) 0 0 / 28px 28px",
        }}
      >
        {/* Preview label */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: "#22c55e",
              boxShadow: "0 0 8px #22c55e",
            }}
          />
          <div
            style={{
              fontSize: 11,
              fontFamily: MONO_FAMILY,
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {previewLabel}
          </div>
        </div>

        {preview}
      </div>
    </div>
  );
}
