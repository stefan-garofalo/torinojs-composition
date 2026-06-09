import { Player } from "@remotion/player";
import {
  VISUAL_SYSTEM_FPS,
  VISUAL_SYSTEM_HEIGHT,
  VISUAL_SYSTEM_WIDTH,
} from "../Composition";
import { notificationCodeSnippets } from "../deck/notification-code-snippets";
import { renderDeckPreview } from "../deck/preview";
import {
  FullYellowNarrativeSlide,
  RightColumnClaimSlide,
} from "./narrative-slide";
import { renderTalkSlide } from "./render-slide";
import type { TalkSlide } from "./types";
import { titleVw, vw } from "../lib/viewport-units";

const templateDuration = 420;
const codeTemplateDuration = 540;

const templateSlides = [
  {
    id: "make-the-shape-visible",
    title: "Narrative opener",
    family: "narrative",
    durationInFrames: templateDuration,
    content: {
      subtitle: "A single thesis line",
    },
  },
  {
    id: "configuration-is-for-values",
    title: "Narrative bullets",
    family: "narrative",
    durationInFrames: templateDuration,
    content: {
      subtitle: "Composition is for shape",
      bullets: [
        "Stable row, new label: prop",
        "Stable row, loading state: prop",
        "New parts / actions / navigation: composition",
      ],
    },
  },
  {
    id: "structural-variation",
    title: "Yellow emphasis",
    family: "narrative",
    durationInFrames: templateDuration,
    content: {
      subtitle: "Some changes are values.\nSome changes are shapes.",
      emphasis: [
        "When variation is structural,",
        "make the structure visible.",
      ],
    },
  },
  {
    id: "internal-kit-public-api",
    title: "Inside / outside comparison",
    family: "narrative",
    durationInFrames: templateDuration,
    content: {
      leftItems: ["primitives", "context structure", "variant logic"],
      rightText: "named variants\nsupported shapes\nstable imports",
      emphasis: ["Flexibility inside.", "Local reasoning outside."],
    },
  },
  {
    id: "props-outside-branches-inside",
    title: "Code only",
    family: "code-only",
    durationInFrames: codeTemplateDuration,
    content: {
      subtitle: "single code surface",
      code: {
        language: "tsx",
        fileName: "notification-branches.tsx",
        code: `const href =
  type === "moderation" ? decisionHref :
  type === "dmRequest" ? requestHref :
  profileHref

const primary =
  primaryAction === "appeal" ? appeal :
  primaryAction === "accept" ? acceptRequest :
  undefined`,
      },
    },
  },
  {
    id: "post-like-clean",
    title: "Code + preview",
    family: "code-dx",
    durationInFrames: codeTemplateDuration,
    content: {
      previewMode: "final",
      previewFocus: [
        "code on the left",
        "final preview on the right",
        "one composed state",
      ],
      previewSteps: [
        {
          afterLine: 1,
          message: "Start with the final visual state.",
          variantId: "post-like",
        },
        {
          afterLine: 5,
          compact: true,
          message: "The preview stays stable while code appears.",
          reviewed: true,
          showActions: true,
          variantId: "post-like",
        },
      ],
      code: {
        language: "tsx",
        fileName: "post-like-notification.tsx",
        code: notificationCodeSnippets.postLikeClean,
      },
    },
  },
] as const satisfies readonly TalkSlide[];

const customTemplates = [
  {
    id: "full-yellow-opener",
    title: "Full yellow opener",
    durationInFrames: templateDuration,
    component: () => (
      <FullYellowNarrativeSlide
        subtitle={"One clear thesis line."}
        title={"Full yellow\nopener"}
      />
    ),
  },
  {
    id: "full-yellow-bullets",
    title: "Full yellow bullets",
    durationInFrames: templateDuration,
    component: () => (
      <FullYellowNarrativeSlide
        bullets={[
          "Start from one focused behavior.",
          "Add one interaction at a time.",
          "Show when the shape starts changing.",
          "Make the structure visible.",
        ]}
        title={"Full yellow bullets"}
      />
    ),
  },
  {
    id: "right-column-claim",
    title: "Right column claim",
    durationInFrames: templateDuration,
    component: () => (
      <RightColumnClaimSlide
        claim={"A small surface can hide a much larger product shape."}
        subtitle={"Same copy structure.\nDifferent visual weight."}
        title={"Right column\nclaim"}
      />
    ),
  },
] as const;

export function SlideOverview() {
  return (
    <main style={pageStyle}>
      <header style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Slide templates</h1>
          <p style={subtitleStyle}>Reusable layouts, not every deck beat.</p>
        </div>
        <a href="/" style={linkStyle}>Presenter</a>
      </header>

      <section style={gridStyle}>
        {templateSlides.map((slide, index) => (
          <article key={slide.id} style={cardStyle}>
            <div style={metaStyle}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{slide.id}</span>
            </div>
            <div style={previewFrameStyle}>
              <Player
                acknowledgeRemotionLicense
                allowFullscreen={false}
                clickToPlay={false}
                component={() =>
                  renderTalkSlide(slide, { renderPreview: renderDeckPreview })
                }
                compositionHeight={VISUAL_SYSTEM_HEIGHT}
                compositionWidth={VISUAL_SYSTEM_WIDTH}
                controls={false}
                doubleClickToFullscreen={false}
                durationInFrames={slide.durationInFrames}
                fps={VISUAL_SYSTEM_FPS}
                initialFrame={Math.max(0, slide.durationInFrames - 2)}
                spaceKeyToPlayOrPause={false}
                style={playerStyle}
              />
            </div>
            <h2 style={slideTitleStyle}>{slide.title}</h2>
          </article>
        ))}
        {customTemplates.map((template, index) => (
          <article key={template.id} style={cardStyle}>
            <div style={metaStyle}>
              <span>
                {String(templateSlides.length + index + 1).padStart(2, "0")}
              </span>
              <span>{template.id}</span>
            </div>
            <div style={previewFrameStyle}>
              <Player
                acknowledgeRemotionLicense
                allowFullscreen={false}
                clickToPlay={false}
                component={template.component}
                compositionHeight={VISUAL_SYSTEM_HEIGHT}
                compositionWidth={VISUAL_SYSTEM_WIDTH}
                controls={false}
                doubleClickToFullscreen={false}
                durationInFrames={template.durationInFrames}
                fps={VISUAL_SYSTEM_FPS}
                initialFrame={Math.max(0, template.durationInFrames - 2)}
                spaceKeyToPlayOrPause={false}
                style={playerStyle}
              />
            </div>
            <h2 style={slideTitleStyle}>{template.title}</h2>
          </article>
        ))}
      </section>
    </main>
  );
}

const pageStyle = {
  background: "#0b0b0f",
  boxSizing: "border-box",
  color: "#f5f5f0",
  fontFamily:
    "var(--font-geist-sans), Geist, ui-sans-serif, system-ui, sans-serif",
  minHeight: "100vh",
  padding: "clamp(1rem, 4vw, 2.5rem)",
} satisfies React.CSSProperties;

const headerStyle = {
  alignItems: "end",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 28,
} satisfies React.CSSProperties;

const titleStyle = {
  fontSize: titleVw(44),
  fontWeight: 850,
  letterSpacing: 0,
  lineHeight: 1.08,
  margin: 0,
} satisfies React.CSSProperties;

const subtitleStyle = {
  color: "rgba(245, 245, 240, 0.68)",
  fontSize: vw(18),
  margin: "10px 0 0",
} satisfies React.CSSProperties;

const linkStyle = {
  border: "1px solid rgba(240, 219, 79, 0.45)",
  color: "#f0db4f",
  fontSize: vw(15),
  fontWeight: 750,
  padding: "10px 14px",
  textDecoration: "none",
} satisfies React.CSSProperties;

const gridStyle = {
  display: "grid",
  gap: 22,
  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
} satisfies React.CSSProperties;

const cardStyle = {
  background: "rgba(245, 245, 240, 0.045)",
  border: "1px solid rgba(245, 245, 240, 0.12)",
  boxSizing: "border-box",
  padding: 14,
} satisfies React.CSSProperties;

const metaStyle = {
  alignItems: "center",
  color: "#f0db4f",
  display: "flex",
  fontFamily:
    "var(--font-geist-mono), Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: vw(12),
  fontWeight: 750,
  gap: 10,
  justifyContent: "space-between",
  marginBottom: 10,
  minHeight: 18,
} satisfies React.CSSProperties;

const previewFrameStyle = {
  aspectRatio: "16 / 9",
  background: "#111",
  overflow: "hidden",
  width: "100%",
} satisfies React.CSSProperties;

const playerStyle = {
  height: "100%",
  width: "100%",
} satisfies React.CSSProperties;

const slideTitleStyle = {
  color: "#f5f5f0",
  fontSize: titleVw(19),
  fontWeight: 800,
  lineHeight: 1.12,
  margin: "12px 0 0",
} satisfies React.CSSProperties;
