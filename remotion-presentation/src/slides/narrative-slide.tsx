import type { CSSProperties } from "react";
import { AbsoluteFill } from "remotion";
import { InlineHighlight } from "../components/remocn/inline-highlight";
import { MarkerHighlight } from "../components/remocn/marker-highlight";
import { StaggeredFadeUp } from "../components/remocn/staggered-fade-up";
import { stageTokens } from "../components/stage";

export interface NarrativeEmphasisLine {
  before?: string;
  highlight: string;
  after?: string;
}

export interface NarrativeTalkSlideProps {
  title: string;
  subtitle?: string;
  bullets?: readonly string[];
  emphasisLines?: readonly (string | NarrativeEmphasisLine)[];
  eyebrow?: string;
}

export function NarrativeTalkSlide({
  title,
  subtitle,
  bullets = [],
  emphasisLines = [],
  eyebrow,
}: NarrativeTalkSlideProps) {
  return (
    <AbsoluteFill style={slideShellStyle}>
      <main style={contentStyle}>
        <section style={copyColumnStyle}>
          {eyebrow ? <p style={eyebrowStyle}>{eyebrow}</p> : null}
          <div style={titleFrameStyle}>
            <StaggeredFadeUp
              background="transparent"
              color={stageTokens.color.text}
              fontSize={82}
              fontWeight={820}
              text={title}
            />
          </div>
          {subtitle ? <p style={subtitleStyle}>{subtitle}</p> : null}
        </section>

        <aside style={supportColumnStyle}>
          {bullets.length > 0 ? (
            <ul style={bulletListStyle}>
              {bullets.map((bullet, index) => (
                <li key={`${index}-${bullet}`} style={bulletStyle}>
                  <span style={bulletMarkerStyle} />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {emphasisLines.length > 0 ? (
            <div style={emphasisStackStyle}>
              {emphasisLines.map((line, index) => (
                <div key={emphasisKey(line, index)} style={emphasisFrameStyle}>
                  {typeof line === "string" ? (
                    <MarkerHighlight
                      baseColor={stageTokens.color.darkBase}
                      fontSize={34}
                      fontWeight={760}
                      highlight={line}
                      markerColor={stageTokens.color.jsYellow}
                    />
                  ) : (
                    <InlineHighlight
                      after={line.after}
                      baseColor={stageTokens.color.darkBase}
                      fontSize={34}
                      fontWeight={760}
                      highlight={line.highlight}
                      highlightColor="#b45309"
                      before={line.before ?? ""}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </aside>
      </main>
    </AbsoluteFill>
  );
}

function emphasisKey(
  line: string | NarrativeEmphasisLine,
  index: number,
) {
  return `${index}-${typeof line === "string" ? line : line.highlight}`;
}

const slideShellStyle: CSSProperties = {
  background: `linear-gradient(135deg, ${stageTokens.color.darkBase}, ${stageTokens.color.backgroundDeep})`,
  color: stageTokens.color.text,
  fontFamily: stageTokens.font.sans,
  overflow: "hidden",
};

const contentStyle: CSSProperties = {
  boxSizing: "border-box",
  display: "grid",
  gap: 72,
  gridTemplateColumns: "1.15fr 0.85fr",
  height: "100%",
  padding: `${stageTokens.stage.insetY}px ${stageTokens.stage.insetX}px`,
  width: "100%",
};

const copyColumnStyle: CSSProperties = {
  alignSelf: "center",
  display: "grid",
  gap: 28,
  minWidth: 0,
};

const supportColumnStyle: CSSProperties = {
  alignSelf: "center",
  display: "grid",
  gap: 28,
  minWidth: 0,
};

const titleFrameStyle: CSSProperties = {
  borderRadius: stageTokens.radius.card,
  height: 330,
  overflow: "hidden",
  position: "relative",
};

const eyebrowStyle: CSSProperties = {
  color: stageTokens.color.jsYellow,
  fontSize: 22,
  fontWeight: 800,
  letterSpacing: 0,
  margin: 0,
  textTransform: "uppercase",
};

const subtitleStyle: CSSProperties = {
  color: stageTokens.color.textMuted,
  fontSize: 40,
  lineHeight: 1.18,
  margin: 0,
  maxWidth: 980,
};

const bulletListStyle: CSSProperties = {
  display: "grid",
  gap: 18,
  listStyle: "none",
  margin: 0,
  padding: 0,
};

const bulletStyle: CSSProperties = {
  alignItems: "flex-start",
  background: stageTokens.color.surface,
  border: `1px solid ${stageTokens.color.border}`,
  borderRadius: stageTokens.radius.card,
  color: stageTokens.color.text,
  display: "grid",
  fontSize: 30,
  gap: 16,
  gridTemplateColumns: "16px 1fr",
  lineHeight: 1.26,
  padding: "22px 24px",
};

const bulletMarkerStyle: CSSProperties = {
  background: stageTokens.color.jsYellow,
  borderRadius: 999,
  height: 10,
  marginTop: 12,
  width: 10,
};

const emphasisStackStyle: CSSProperties = {
  display: "grid",
  gap: 16,
};

const emphasisFrameStyle: CSSProperties = {
  borderRadius: stageTokens.radius.card,
  height: 96,
  overflow: "hidden",
  position: "relative",
};
