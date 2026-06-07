import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { StageCodeBlock } from "./code";
import { stageTokens } from "./tokens";

export interface StageAction {
  label: string;
  tone?: "accent" | "neutral";
}

export interface StageMetric {
  label: string;
  value: string;
}

export interface DxPanelItem {
  label: string;
  value: string;
  detail?: string;
}

export interface NarrativeStageProps {
  eyebrow?: string;
  title?: string;
  body?: string;
  points?: readonly string[];
  actions?: readonly StageAction[];
  metrics?: readonly StageMetric[];
}

export interface CodeOnlyStageProps {
  eyebrow?: string;
  title?: string;
  code?: string;
  codeTitle?: string;
  caption?: string;
}

export interface CodeDxStageProps {
  eyebrow?: string;
  title?: string;
  code?: string;
  codeTitle?: string;
  panelTitle?: string;
  panelSubtitle?: string;
  items?: readonly DxPanelItem[];
  actions?: readonly StageAction[];
}

const DEFAULT_POINTS = [
  "Dark neutral surfaces keep projector contrast stable.",
  "JavaScript yellow is a cue, not a background.",
  "Cards and controls stay compact enough for code to breathe.",
] as const;

const DEFAULT_CODE = `export function useDeckState() {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 90], [0, 1]);

  return {
    accent: "#F0DB4F",
    visible: progress > 0.18,
  };
}`;

const DEFAULT_DX_ITEMS = [
  {
    label: "Runtime",
    value: "Remotion 60fps",
    detail: "Deterministic frame math",
  },
  {
    label: "Theme",
    value: "Dark JS",
    detail: "#F0DB4F on #323330",
  },
  {
    label: "Preview",
    value: "Stage-safe",
    detail: "1920 x 1080 readable",
  },
] as const;

export function NarrativeStage({
  eyebrow = "Narrative",
  title = "Readable JavaScript stories on a dark stage",
  body = "A presentation primitive for thesis slides, chapter openers, and explanation beats.",
  points = DEFAULT_POINTS,
  actions = [
    { label: "Frame the idea", tone: "accent" },
    { label: "Show the code", tone: "neutral" },
  ],
  metrics = [
    { label: "Canvas", value: "1920 x 1080" },
    { label: "Rhythm", value: "112 / 84 safe inset" },
  ],
}: NarrativeStageProps) {
  return (
    <StageShell family="narrative">
      <div
        style={{
          display: "grid",
          gap: 44,
          gridTemplateColumns: "1.35fr 0.65fr",
          height: "100%",
        }}
      >
        <div style={{ alignSelf: "center", maxWidth: 1040 }}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 style={titleStyle}>{title}</h1>
          <p style={bodyStyle}>{body}</p>
          <ActionRow actions={actions} />
        </div>
        <StageCard
          style={{
            alignSelf: "center",
            display: "grid",
            gap: 18,
            padding: 28,
          }}
        >
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
          <ul
            style={{
              display: "grid",
              gap: 14,
              listStyle: "none",
              margin: "10px 0 0",
              padding: 0,
            }}
          >
            {points.map((point) => (
              <li key={point} style={pointStyle}>
                <span style={bulletStyle} />
                {point}
              </li>
            ))}
          </ul>
        </StageCard>
      </div>
    </StageShell>
  );
}

export function CodeOnlyStage({
  eyebrow = "Code",
  title = "One readable code surface per idea",
  code = DEFAULT_CODE,
  codeTitle = "useDeckState.ts",
  caption = "Large mono type, low visual noise, and a single accent color for API shape.",
}: CodeOnlyStageProps) {
  return (
    <StageShell family="code-only">
      <div style={{ display: "grid", gap: 26, height: "100%" }}>
        <header>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 style={sectionTitleStyle}>{title}</h2>
        </header>
        <StageCodeBlock
          code={code}
          title={codeTitle}
          style={{ minHeight: 650 }}
        />
        <p style={{ ...captionStyle, maxWidth: 980 }}>{caption}</p>
      </div>
    </StageShell>
  );
}

export function CodeDxStage({
  eyebrow = "Code + DX",
  title = "Code stays primary while the panel explains the payoff",
  code = DEFAULT_CODE,
  codeTitle = "visual-system.ts",
  panelTitle = "Developer experience panel",
  panelSubtitle = "Compact shadcn-style cards support the code instead of competing with it.",
  items = DEFAULT_DX_ITEMS,
  actions = [{ label: "Apply token", tone: "accent" }],
}: CodeDxStageProps) {
  return (
    <StageShell family="code-dx">
      <div
        style={{
          display: "grid",
          gap: stageTokens.stage.gap,
          gridTemplateColumns: "1.1fr 0.9fr",
          height: "100%",
        }}
      >
        <div style={{ display: "grid", gap: 24 }}>
          <header>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 style={sectionTitleStyle}>{title}</h2>
          </header>
          <StageCodeBlock
            code={code}
            title={codeTitle}
            style={{ minHeight: 690 }}
          />
        </div>
        <StageCard
          style={{
            alignSelf: "end",
            display: "grid",
            gap: 20,
            minHeight: 690,
            padding: 30,
          }}
        >
          <div>
            <h3 style={panelTitleStyle}>{panelTitle}</h3>
            <p style={captionStyle}>{panelSubtitle}</p>
          </div>
          <div style={{ display: "grid", gap: 14 }}>
            {items.map((item) => (
              <DxPanelRow item={item} key={item.label} />
            ))}
          </div>
          <ActionRow actions={actions} style={{ marginTop: "auto" }} />
        </StageCard>
      </div>
    </StageShell>
  );
}

export const CodePlusDxStage = CodeDxStage;

function StageShell({
  children,
  family,
}: {
  children: ReactNode;
  family: "narrative" | "code-only" | "code-dx";
}) {
  return (
    <AbsoluteFill
      data-stage-family={family}
      style={{
        background: `radial-gradient(circle at 8% 14%, rgba(240, 219, 79, 0.14), transparent 30%), linear-gradient(135deg, ${stageTokens.color.darkBase}, ${stageTokens.color.backgroundDeep})`,
        color: stageTokens.color.text,
        fontFamily: stageTokens.font.sans,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          boxSizing: "border-box",
          height: "100%",
          padding: `${stageTokens.stage.insetY}px ${stageTokens.stage.insetX}px`,
          position: "relative",
          width: "100%",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
}

function StageCard({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <section
      style={{
        background: stageTokens.color.surface,
        border: `1px solid ${stageTokens.color.border}`,
        borderRadius: stageTokens.radius.card,
        boxShadow: "0 22px 70px rgba(0, 0, 0, 0.28)",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

function ActionRow({
  actions,
  style,
}: {
  actions: readonly StageAction[];
  style?: CSSProperties;
}) {
  return (
    <div style={{ display: "flex", gap: 12, ...style }}>
      {actions.map((action) => (
        <button
          key={action.label}
          style={{
            background:
              action.tone === "accent"
                ? stageTokens.color.jsYellow
                : stageTokens.color.surfaceElevated,
            border: `1px solid ${
              action.tone === "accent"
                ? "rgba(240, 219, 79, 0.72)"
                : stageTokens.color.border
            }`,
            borderRadius: stageTokens.radius.control,
            color:
              action.tone === "accent"
                ? stageTokens.color.darkBase
                : stageTokens.color.text,
            fontFamily: stageTokens.font.sans,
            fontSize: 21,
            fontWeight: 700,
            lineHeight: 1,
            padding: "13px 17px",
          }}
          type="button"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        color: stageTokens.color.jsYellow,
        fontSize: 20,
        fontWeight: 800,
        letterSpacing: 0,
        margin: "0 0 16px",
        textTransform: "uppercase",
      }}
    >
      {children}
    </p>
  );
}

function MetricCard({ metric }: { metric: StageMetric }) {
  return (
    <div
      style={{
        background: stageTokens.color.surfaceElevated,
        border: `1px solid ${stageTokens.color.border}`,
        borderRadius: stageTokens.radius.card,
        padding: "20px 22px",
      }}
    >
      <div
        style={{
          color: stageTokens.color.textSubtle,
          fontSize: 18,
          marginBottom: 8,
        }}
      >
        {metric.label}
      </div>
      <div
        style={{
          color: stageTokens.color.text,
          fontFamily: stageTokens.font.mono,
          fontSize: 30,
          fontWeight: 700,
        }}
      >
        {metric.value}
      </div>
    </div>
  );
}

function DxPanelRow({ item }: { item: DxPanelItem }) {
  return (
    <div
      style={{
        border: `1px solid ${stageTokens.color.border}`,
        borderRadius: stageTokens.radius.card,
        padding: "18px 20px",
      }}
    >
      <div
        style={{
          color: stageTokens.color.textSubtle,
          fontSize: 17,
          marginBottom: 7,
        }}
      >
        {item.label}
      </div>
      <div
        style={{
          color: stageTokens.color.text,
          fontSize: 27,
          fontWeight: 750,
          lineHeight: 1.12,
        }}
      >
        {item.value}
      </div>
      {item.detail ? <p style={rowDetailStyle}>{item.detail}</p> : null}
    </div>
  );
}

const titleStyle: CSSProperties = {
  color: stageTokens.color.text,
  fontSize: 78,
  fontWeight: 820,
  letterSpacing: 0,
  lineHeight: 0.98,
  margin: "0 0 30px",
  maxWidth: 1040,
};

const sectionTitleStyle: CSSProperties = {
  color: stageTokens.color.text,
  fontSize: 48,
  fontWeight: 800,
  letterSpacing: 0,
  lineHeight: 1.04,
  margin: 0,
};

const panelTitleStyle: CSSProperties = {
  color: stageTokens.color.text,
  fontSize: 36,
  fontWeight: 780,
  letterSpacing: 0,
  lineHeight: 1.08,
  margin: "0 0 12px",
};

const bodyStyle: CSSProperties = {
  color: stageTokens.color.textMuted,
  fontSize: 34,
  lineHeight: 1.32,
  margin: "0 0 34px",
  maxWidth: 860,
};

const captionStyle: CSSProperties = {
  color: stageTokens.color.textMuted,
  fontSize: 24,
  lineHeight: 1.34,
  margin: 0,
};

const rowDetailStyle: CSSProperties = {
  color: stageTokens.color.textSubtle,
  fontSize: 19,
  lineHeight: 1.35,
  margin: "8px 0 0",
};

const pointStyle: CSSProperties = {
  alignItems: "flex-start",
  color: stageTokens.color.textMuted,
  display: "grid",
  fontSize: 21,
  gap: 12,
  gridTemplateColumns: "14px 1fr",
  lineHeight: 1.32,
};

const bulletStyle: CSSProperties = {
  background: stageTokens.color.jsYellow,
  borderRadius: 999,
  display: "block",
  height: 8,
  marginTop: 11,
  width: 8,
};
