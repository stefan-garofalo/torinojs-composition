import type { CSSProperties, ReactNode } from "react";
import { presenterTheme } from "../../theme/presenter-theme";

type FullStageProps = {
  children: ReactNode;
  background?: string;
};

export function FullStage({
  children,
  background = presenterTheme.colors.ink,
}: FullStageProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        background,
        color: presenterTheme.colors.paper,
        fontFamily: presenterTheme.fontSans,
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
        gap: 56,
        padding: "96px 104px",
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
        borderRadius: 8,
        border: `1px solid ${presenterTheme.colors.line}`,
        background: presenterTheme.colors.panel,
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
        fontFamily: presenterTheme.fontMono,
        fontSize: 22,
        color: presenterTheme.colors.yellow,
        textTransform: "uppercase",
        letterSpacing: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
