import type { CSSProperties } from "react";
import { AbsoluteFill } from "remotion";
import { GlassCodeBlock } from "../components/remocn/glass-code-block";
import { stageTokens } from "../components/stage";

export interface CodeOnlyTalkSlideProps {
  code: string;
  title?: string;
  subtitle?: string;
  codeTitle?: string;
}

export function CodeOnlyTalkSlide({
  code,
  title,
  subtitle,
  codeTitle = "slide.tsx",
}: CodeOnlyTalkSlideProps) {
  return (
    <AbsoluteFill style={slideShellStyle}>
      <main style={contentStyle}>
        {title || subtitle ? (
          <header style={headerStyle}>
            {title ? <h2 style={titleStyle}>{title}</h2> : null}
            {subtitle ? <p style={subtitleStyle}>{subtitle}</p> : null}
          </header>
        ) : null}

        <div style={codeFrameStyle}>
          <GlassCodeBlock
            background={stageTokens.color.backgroundDeep}
            code={code}
            fontSize={30}
            glassColor="rgba(18, 18, 17, 0.78)"
            height={760}
            title={codeTitle}
            width={1500}
          />
        </div>
      </main>
    </AbsoluteFill>
  );
}

const slideShellStyle: CSSProperties = {
  background: stageTokens.color.backgroundDeep,
  color: stageTokens.color.text,
  fontFamily: stageTokens.font.sans,
  overflow: "hidden",
};

const contentStyle: CSSProperties = {
  boxSizing: "border-box",
  display: "grid",
  gap: 28,
  gridTemplateRows: "auto 1fr",
  height: "100%",
  padding: `${stageTokens.stage.insetY}px ${stageTokens.stage.insetX}px`,
  width: "100%",
};

const headerStyle: CSSProperties = {
  display: "grid",
  gap: 10,
};

const titleStyle: CSSProperties = {
  color: stageTokens.color.text,
  fontSize: 50,
  fontWeight: 780,
  letterSpacing: 0,
  lineHeight: 1.05,
  margin: 0,
};

const subtitleStyle: CSSProperties = {
  color: stageTokens.color.textMuted,
  fontSize: 27,
  lineHeight: 1.22,
  margin: 0,
};

const codeFrameStyle: CSSProperties = {
  minHeight: 0,
  position: "relative",
};
