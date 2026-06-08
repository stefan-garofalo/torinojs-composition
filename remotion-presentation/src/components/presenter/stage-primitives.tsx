import type { CSSProperties, ReactNode } from "react";
import { stageTokens } from "../stage";

type FullStageProps = {
  children: ReactNode;
  background?: string;
};

export function FullStage({
  children,
  background,
}: FullStageProps) {
  return (
    <div
      style={{
        background:
          background ??
          `radial-gradient(circle at 8% 14%, rgba(240, 219, 79, 0.14), transparent 30%), linear-gradient(135deg, ${stageTokens.color.darkBase}, ${stageTokens.color.backgroundDeep})`,
        color: stageTokens.color.text,
        fontFamily: stageTokens.font.sans,
        height: "100%",
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

export function StageGrid({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        gridTemplateColumns: "minmax(0, 0.95fr) minmax(0, 1.05fr)",
        gap: stageTokens.stage.gap,
        padding: `${stageTokens.stage.insetY}px ${stageTokens.stage.insetX}px`,
      }}
    >
      {children}
    </div>
  );
}

type PanelProps = {
  children: ReactNode;
  style?: CSSProperties;
};

export function PresenterPanel({ children, style }: PanelProps) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: stageTokens.radius.card,
        border: `1px solid ${stageTokens.color.border}`,
        background: stageTokens.color.surface,
        boxShadow: "0 36px 100px rgba(0,0,0,0.32)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Kicker({ children, style }: PanelProps) {
  return (
    <div
      style={{
        fontFamily: stageTokens.font.mono,
        fontSize: 22,
        color: stageTokens.color.jsYellow,
        textTransform: "uppercase",
        letterSpacing: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
