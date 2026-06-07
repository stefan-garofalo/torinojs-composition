import { interpolate, useCurrentFrame } from "remotion";
import { MockNotificationPreview } from "../components/preview/mock-notification-preview";
import {
  FullStage,
  Kicker,
  PresenterPanel,
  StageGrid,
} from "../components/presenter/stage-primitives";
import { GlassCodeBlock } from "../components/remocn/glass-code-block";
import {
  DEFAULT_POST_CUE_PADDING_FRAMES,
  PANEL_OR_LARGE_TRANSITION_FRAMES,
  TEXT_OR_SMALL_TRANSITION_FRAMES,
} from "../timeline";
import { presenterTheme } from "../theme/presenter-theme";
import type { SampleSlideProps } from "./sample-slide-props";
import type { SlideDefinition } from "./types";

const codeCueStart = 0;
const previewCueStart = 84;
const shapeCueStart = 162;
const slideChangeCueStart = 228;
const slideChangeHold = slideChangeCueStart + TEXT_OR_SMALL_TRANSITION_FRAMES;

const notificationCode = `type NotificationShape =
  | { kind: "follow"; actor: User }
  | { kind: "like"; actor: User; post: Post }
  | { kind: "moderation"; decisionId: string };

function NotificationItem({ shape }: Props) {
  return (
    <NotificationShell>
      <NotificationIcon shape={shape} />
      <NotificationCopy shape={shape} />
      <NotificationActions shape={shape} />
    </NotificationShell>
  );
}`;

export function CodePreviewSlide({ frame }: SampleSlideProps) {
  const remotionFrame = useCurrentFrame();
  const currentFrame = frame ?? remotionFrame;

  const codeOpacity = interpolate(
    currentFrame,
    [codeCueStart, codeCueStart + TEXT_OR_SMALL_TRANSITION_FRAMES],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const codeX = interpolate(
    currentFrame,
    [codeCueStart, codeCueStart + PANEL_OR_LARGE_TRANSITION_FRAMES],
    [-28, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const previewOpacity = interpolate(
    currentFrame,
    [previewCueStart, previewCueStart + PANEL_OR_LARGE_TRANSITION_FRAMES],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const shapeOpacity = interpolate(
    currentFrame,
    [shapeCueStart, shapeCueStart + TEXT_OR_SMALL_TRANSITION_FRAMES],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <FullStage>
      <StageGrid>
        <div
          style={{
            display: "grid",
            gridTemplateRows: "auto minmax(0, 1fr)",
            gap: 24,
            opacity: codeOpacity,
            transform: `translateX(${codeX}px)`,
          }}
        >
          <div>
            <Kicker>compound component</Kicker>
            <h1
              style={{
                margin: "18px 0 0",
                fontSize: 56,
                lineHeight: 1,
                fontWeight: 780,
                letterSpacing: 0,
              }}
            >
              Put the shape in the type, then let the UI assemble itself.
            </h1>
          </div>

          <PresenterPanel>
            <GlassCodeBlock
              code={notificationCode}
              title="NotificationItem.tsx"
              width={720}
              height={620}
              fontSize={17}
              background="#101014"
              glassColor="rgba(15,15,19,0.9)"
              staggerFrames={3}
            />
          </PresenterPanel>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateRows: "1fr 180px",
            gap: 24,
            opacity: previewOpacity,
          }}
        >
          <PresenterPanel
            style={{
              display: "grid",
              placeItems: "center",
              background: "#15151b",
            }}
          >
            <MockNotificationPreview
              frame={currentFrame}
              revealStartFrame={previewCueStart}
            />
          </PresenterPanel>

          <PresenterPanel
            style={{
              opacity: shapeOpacity,
              padding: 28,
              background: presenterTheme.colors.yellow,
              color: presenterTheme.colors.ink,
            }}
          >
            <div
              style={{
                fontSize: 34,
                lineHeight: 1.08,
                fontWeight: 780,
              }}
            >
              The rendered surface stays familiar. The supported shape stops
              hiding in branches.
            </div>
          </PresenterPanel>
        </div>
      </StageGrid>
    </FullStage>
  );
}

export const codePreviewSlide: SlideDefinition<SampleSlideProps> = {
  id: "sample-code-plus-preview",
  title: "Code plus notification preview",
  durationInFrames: slideChangeHold + DEFAULT_POST_CUE_PADDING_FRAMES,
  component: CodePreviewSlide,
  cues: [
    {
      id: "code-preview.code",
      kind: "content",
      label: "code block entrance",
      startFrame: codeCueStart,
      holdFrame: previewCueStart,
    },
    {
      id: "code-preview.mock-preview",
      kind: "content",
      label: "mocked notification preview entrance",
      startFrame: previewCueStart,
      holdFrame: shapeCueStart,
    },
    {
      id: "code-preview.shape",
      kind: "content",
      label: "shape contrast line entrance",
      startFrame: shapeCueStart,
      holdFrame: slideChangeCueStart,
    },
    {
      id: "code-preview.slide-change",
      kind: "slide-change",
      label: "clean cut out of code plus preview sample",
      startFrame: slideChangeCueStart,
      holdFrame: slideChangeHold,
    },
  ],
};
