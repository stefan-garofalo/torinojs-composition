import type { CSSProperties } from "react";
import { AbsoluteFill } from "remotion";
import { StaggeredFadeUp } from "../components/remocn/staggered-fade-up";
import { stageTokens } from "../components/stage";
import { titleVw, vw } from "../lib/viewport-units";

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
  variant?: "dark" | "yellow";
}

export interface RightColumnClaimSlideProps {
  title: string;
  subtitle: string;
  claim: string;
}

export interface FullYellowNarrativeSlideProps {
  title: string;
  subtitle?: string;
  bullets?: readonly string[];
}

export function NarrativeTalkSlide({
  title,
  subtitle,
  bullets = [],
  emphasisLines = [],
  eyebrow,
  variant = "dark",
}: NarrativeTalkSlideProps) {
  const subtitleLineCount = subtitle ? subtitle.split("\n").length : 0;
  const hasSupport = bullets.length > 0 || emphasisLines.length > 0;
  const hasComparison = bullets.length > 0 && emphasisLines.length > 0;
  const isYellow = variant === "yellow";

  return (
    <AbsoluteFill style={isYellow ? yellowSlideShellStyle : slideShellStyle}>
      <div style={topRuleClusterStyle}>
        <span style={isYellow ? yellowRuleStubStyle : ruleStubStyle} />
        <span style={isYellow ? yellowRuleLineStyle : ruleLineStyle} />
      </div>

      <main
        style={{
          ...contentStyle,
          gridTemplateColumns: hasSupport ? "1.05fr 0.95fr" : "1fr",
        }}
      >
        <section style={copyColumnStyle}>
          {eyebrow ? (
            <p style={isYellow ? yellowEyebrowStyle : eyebrowStyle}>
              {eyebrow}
            </p>
          ) : null}
          <div style={titleFrameStyle}>
            <StaggeredFadeUp
              background="transparent"
              color={isYellow ? fullYellowCopyColor : stageTokens.color.text}
              fontSize={titleVw(54)}
              fontWeight={700}
              justifyContent="flex-start"
              lineHeight={1.05}
              text={title}
            />
          </div>
          {subtitle ? (
            <div
              style={{
                ...subtitleFrameStyle,
                height: subtitleLineCount > 1 ? 112 : 62,
              }}
            >
              <StaggeredFadeUp
                background="transparent"
                color={
                  isYellow ? fullYellowCopyColor : stageTokens.color.textMuted
                }
                distance={14}
                fontSize={vw(28)}
                fontWeight={500}
                justifyContent="flex-start"
                letterSpacing={0}
                lineHeight={1.22}
                startFrame={18}
                staggerDelay={3}
                text={subtitle}
              />
            </div>
          ) : null}
          {hasComparison ? (
            <div
              style={{
                ...comparisonSubtitleStyle,
                color: isYellow ? fullYellowCopyColor : stageTokens.color.jsYellow,
              }}
            >
              {emphasisLines.slice(0, 2).map((line, index) => (
                <span key={emphasisKey(line, index)}>
                  {renderPlainLine(line)}
                </span>
              ))}
            </div>
          ) : null}
        </section>

        {hasSupport ? <aside style={supportColumnStyle}>
          {hasComparison ? (
            <ComparisonSupport
              bullets={bullets}
              emphasisLines={emphasisLines}
            />
          ) : bullets.length > 0 ? (
            <ul style={bulletListStyle}>
              {bullets.map((bullet, index) => (
                <li
                  key={`${index}-${bullet}`}
                  style={isYellow ? yellowBulletStyle : bulletStyle}
                >
                  <span
                    style={isYellow ? yellowBulletMarkerStyle : bulletMarkerStyle}
                  >
                    {index + 1}
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {!hasComparison && emphasisLines.length > 0 ? (
            <div style={emphasisStackStyle}>
              {emphasisLines.map((line, index) => (
                <div key={emphasisKey(line, index)} style={emphasisFrameStyle}>
                  {renderEmphasisLine(line)}
                </div>
              ))}
            </div>
          ) : null}
        </aside> : null}
      </main>

      <span style={isYellow ? yellowBottomRuleStyle : bottomRuleStyle} />
    </AbsoluteFill>
  );
}

export function RightColumnClaimSlide({
  title,
  subtitle,
  claim,
}: RightColumnClaimSlideProps) {
  return (
    <AbsoluteFill style={slideShellStyle}>
      <main style={rightColumnContentStyle}>
        <section style={rightColumnCopyStyle}>
          <h1 style={rightColumnTitleStyle}>{title}</h1>
          <p style={rightColumnSubtitleStyle}>{subtitle}</p>
        </section>

        <aside style={claimColumnStyle}>
          <p style={claimTextStyle}>{claim}</p>
          <span style={claimRuleStyle} />
        </aside>
      </main>
    </AbsoluteFill>
  );
}

export function FullYellowNarrativeSlide({
  title,
  subtitle,
  bullets = [],
}: FullYellowNarrativeSlideProps) {
  return (
    <NarrativeTalkSlide
      bullets={bullets}
      subtitle={subtitle}
      title={title}
      variant="yellow"
    />
  );
}

function ComparisonSupport({
  bullets,
  emphasisLines,
}: {
  bullets: readonly string[];
  emphasisLines: readonly (string | NarrativeEmphasisLine)[];
}) {
  const publicTerms = emphasisLines.slice(2);

  return (
    <div style={comparisonStyle}>
      <ComparisonBox label="Inside" terms={bullets} />

      {publicTerms.length > 0 ? (
        <ComparisonBox
          label="Outside"
          terms={publicTerms.map(renderPlainLine)}
        />
      ) : null}
    </div>
  );
}

function ComparisonBox({
  label,
  terms,
}: {
  label: string;
  terms: readonly string[];
}) {
  return (
    <section style={comparisonPanelStyle}>
      <span style={comparisonKickerStyle}>{label}</span>
      <div style={tokenRailStyle}>
        {terms.map((term) => (
          <span key={term} style={tokenStyle}>
            {term}
          </span>
        ))}
      </div>
    </section>
  );
}

function emphasisKey(
  line: string | NarrativeEmphasisLine,
  index: number,
) {
  return `${index}-${typeof line === "string" ? line : line.highlight}`;
}

function renderEmphasisLine(line: string | NarrativeEmphasisLine) {
  if (typeof line === "string") {
    return <span style={emphasisTextStyle}>{line}</span>;
  }

  return (
    <span style={emphasisTextStyle}>
      {line.before}
      <span style={emphasisTextStrongStyle}>{line.highlight}</span>
      {line.after}
    </span>
  );
}

function renderPlainLine(line: string | NarrativeEmphasisLine) {
  if (typeof line === "string") {
    return line;
  }

  return `${line.before ?? ""}${line.highlight}${line.after ?? ""}`;
}

const slideShellStyle: CSSProperties = {
  background: `radial-gradient(circle at 12% 14%, rgba(240, 219, 79, 0.12), transparent 28%), linear-gradient(135deg, ${stageTokens.color.darkBase}, ${stageTokens.color.backgroundDeep})`,
  color: stageTokens.color.text,
  fontFamily: stageTokens.font.sans,
  overflow: "hidden",
};

const fullYellowCopyColor = "#434343";

const yellowSlideShellStyle: CSSProperties = {
  background: stageTokens.color.jsYellow,
  color: fullYellowCopyColor,
  fontFamily: stageTokens.font.sans,
  overflow: "hidden",
};

const contentStyle: CSSProperties = {
  boxSizing: "border-box",
  display: "grid",
  gap: 76,
  height: "100%",
  padding: `168px ${stageTokens.stage.insetX}px 150px`,
  width: "100%",
};

const copyColumnStyle: CSSProperties = {
  alignSelf: "center",
  display: "grid",
  gap: 34,
  minWidth: 0,
};

const supportColumnStyle: CSSProperties = {
  alignSelf: "center",
  display: "grid",
  gap: 24,
  minWidth: 0,
};

const titleFrameStyle: CSSProperties = {
  height: 190,
  overflow: "hidden",
  position: "relative",
};

const eyebrowStyle: CSSProperties = {
  color: stageTokens.color.jsYellow,
  fontSize: vw(22),
  fontWeight: 800,
  letterSpacing: 0,
  margin: 0,
  textTransform: "uppercase",
};

const yellowEyebrowStyle: CSSProperties = {
  ...eyebrowStyle,
  color: fullYellowCopyColor,
};

const subtitleFrameStyle: CSSProperties = {
  maxWidth: 980,
  overflow: "hidden",
  position: "relative",
};

const bulletListStyle: CSSProperties = {
  display: "grid",
  gap: 20,
  listStyle: "none",
  margin: 0,
  padding: 0,
};

const bulletStyle: CSSProperties = {
  alignItems: "center",
  background: "rgba(245, 245, 244, 0.045)",
  border: `1px solid rgba(240, 219, 79, 0.22)`,
  borderLeft: `10px solid ${stageTokens.color.jsYellow}`,
  borderRadius: 0,
  color: stageTokens.color.text,
  display: "grid",
  fontSize: vw(29),
  gap: 22,
  gridTemplateColumns: "34px 1fr",
  lineHeight: 1.2,
  minHeight: 76,
  padding: "18px 28px 18px 22px",
};

const bulletMarkerStyle: CSSProperties = {
  color: stageTokens.color.jsYellow,
  fontFamily: stageTokens.font.mono,
  fontSize: vw(18),
  fontWeight: 800,
  lineHeight: 1,
};

const yellowBulletStyle: CSSProperties = {
  ...bulletStyle,
  background: "rgba(67, 67, 67, 0.055)",
  border: "1px solid rgba(67, 67, 67, 0.28)",
  borderLeft: `10px solid ${fullYellowCopyColor}`,
  color: fullYellowCopyColor,
};

const yellowBulletMarkerStyle: CSSProperties = {
  ...bulletMarkerStyle,
  color: fullYellowCopyColor,
};

const emphasisStackStyle: CSSProperties = {
  display: "grid",
  gap: 22,
};

const emphasisFrameStyle: CSSProperties = {
  alignItems: "center",
  background: stageTokens.color.jsYellow,
  boxSizing: "border-box",
  color: stageTokens.color.darkBase,
  display: "flex",
  minHeight: 106,
  padding: "22px 28px",
  position: "relative",
};

const emphasisTextStyle: CSSProperties = {
  color: stageTokens.color.darkBase,
  fontSize: vw(36),
  fontWeight: 600,
  letterSpacing: 0,
  lineHeight: 1.06,
};

const emphasisTextStrongStyle: CSSProperties = {
  color: stageTokens.color.darkBase,
};

const comparisonStyle: CSSProperties = {
  display: "grid",
  gap: 20,
};

const comparisonPanelStyle: CSSProperties = {
  border: `1px solid rgba(240, 219, 79, 0.28)`,
  borderLeft: `10px solid ${stageTokens.color.jsYellow}`,
  boxSizing: "border-box",
  display: "grid",
  gap: 16,
  padding: "22px 28px 24px",
};

const comparisonKickerStyle: CSSProperties = {
  color: stageTokens.color.jsYellow,
  fontFamily: stageTokens.font.mono,
  fontSize: vw(18),
  fontWeight: 800,
  letterSpacing: 0,
  textTransform: "uppercase",
};

const tokenRailStyle: CSSProperties = {
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  gap: 14,
};

const tokenStyle: CSSProperties = {
  background: "rgba(245, 245, 244, 0.075)",
  color: stageTokens.color.text,
  fontSize: vw(26),
  fontWeight: 650,
  lineHeight: 1,
  padding: "15px 18px",
};

const comparisonSubtitleStyle: CSSProperties = {
  color: stageTokens.color.jsYellow,
  display: "grid",
  fontSize: vw(28),
  fontWeight: 600,
  gap: 8,
  lineHeight: 1.08,
  maxWidth: 720,
};

const topRuleClusterStyle: CSSProperties = {
  alignItems: "center",
  display: "grid",
  gap: 344,
  gridTemplateColumns: "58px 1fr",
  left: stageTokens.stage.insetX,
  position: "absolute",
  right: stageTokens.stage.insetX,
  top: 86,
};

const ruleStubStyle: CSSProperties = {
  background: stageTokens.color.jsYellow,
  display: "block",
  height: 10,
};

const ruleLineStyle: CSSProperties = {
  background: "rgba(245, 245, 244, 0.72)",
  display: "block",
  height: 9,
};

const yellowRuleStubStyle: CSSProperties = {
  ...ruleStubStyle,
  background: fullYellowCopyColor,
};

const yellowRuleLineStyle: CSSProperties = {
  ...ruleLineStyle,
  background: fullYellowCopyColor,
};

const bottomRuleStyle: CSSProperties = {
  background: "rgba(245, 245, 244, 0.72)",
  bottom: 72,
  display: "block",
  height: 9,
  left: 482,
  position: "absolute",
  right: stageTokens.stage.insetX,
};

const yellowBottomRuleStyle: CSSProperties = {
  ...bottomRuleStyle,
  background: fullYellowCopyColor,
};

const rightColumnContentStyle: CSSProperties = {
  boxSizing: "border-box",
  display: "grid",
  gridTemplateColumns: "1fr 0.38fr",
  height: "100%",
  width: "100%",
};

const rightColumnCopyStyle: CSSProperties = {
  alignSelf: "center",
  display: "grid",
  gap: 28,
  paddingLeft: 180,
  paddingRight: 120,
};

const rightColumnTitleStyle: CSSProperties = {
  color: stageTokens.color.jsYellow,
  fontSize: titleVw(54),
  fontWeight: 700,
  letterSpacing: 0,
  lineHeight: 1.05,
  margin: 0,
  maxWidth: 1080,
  whiteSpace: "pre-line",
};

const rightColumnSubtitleStyle: CSSProperties = {
  color: stageTokens.color.textMuted,
  fontSize: vw(28),
  fontWeight: 460,
  letterSpacing: 0,
  lineHeight: 1.08,
  margin: 0,
  maxWidth: 820,
  whiteSpace: "pre-line",
};

const claimColumnStyle: CSSProperties = {
  alignItems: "center",
  background: stageTokens.color.jsYellow,
  color: stageTokens.color.darkBase,
  display: "grid",
  gridTemplateRows: "1fr auto 1fr",
  padding: "0 76px",
};

const claimTextStyle: CSSProperties = {
  alignSelf: "end",
  color: stageTokens.color.darkBase,
  fontSize: vw(20),
  fontWeight: 460,
  letterSpacing: 0,
  lineHeight: 1.18,
  margin: 0,
  whiteSpace: "pre-line",
};

const claimRuleStyle: CSSProperties = {
  background: stageTokens.color.darkBase,
  display: "block",
  height: 10,
  marginTop: 260,
  width: 84,
};
