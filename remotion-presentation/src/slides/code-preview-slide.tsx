import { interpolate, useCurrentFrame } from "remotion";
import { MockNotificationPreview } from "../components/preview/mock-notification-preview";
import {
  LiveCodeCompilation,
  type CodeEvent,
} from "../components/remocn/live-code-compilation";
import {
  FullStage,
  Kicker,
  PresenterPanel,
} from "../components/presenter/stage-primitives";
import { stageTokens } from "../components/stage";
import {
  DEFAULT_POST_CUE_PADDING_FRAMES,
  PANEL_OR_LARGE_TRANSITION_FRAMES,
  TEXT_OR_SMALL_TRANSITION_FRAMES,
} from "../timeline";
import type { SampleSlideProps } from "./sample-slide-props";
import type { SlideDefinition } from "./types";

const codeCueStart = 0;
const previewCueStart = 84;
const shapeCueStart = 162;
const slideChangeCueStart = 228;
const slideChangeHold = slideChangeCueStart + TEXT_OR_SMALL_TRANSITION_FRAMES;

const notificationCodeEvents: CodeEvent[] = [
  {
    code: `type NotificationShape =
  | { kind: "follow"; actor: User }
  | { kind: "like"; actor: User; post: Post }
  | { kind: "moderation"; decisionId: string };
`,
    ui: { variant: "shape" },
  },
  {
    code: `
function NotificationItem({ shape }: Props) {
  return (
    <NotificationShell>`,
    ui: { variant: "shell" },
  },
  {
    code: `
      <NotificationIcon shape={shape} />
      <NotificationCopy shape={shape} />`,
    ui: { variant: "content" },
  },
  {
    code: `
      <NotificationActions shape={shape} />
    </NotificationShell>
  );
}`,
    ui: { variant: "actions", label: "Review" },
  },
];

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
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateRows: "auto minmax(0, 1fr) auto",
          gap: 24,
          padding: `${stageTokens.stage.insetY}px ${stageTokens.stage.insetX}px`,
        }}
      >
        <div
          style={{
            opacity: codeOpacity,
            transform: `translateX(${codeX}px)`,
          }}
        >
          <Kicker>compound component</Kicker>
          <h1
            style={{
              margin: "18px 0 0",
              fontSize: 56,
              lineHeight: 1,
              fontWeight: 780,
              letterSpacing: 0,
              maxWidth: 1180,
            }}
          >
            Put the shape in the type, then let the UI assemble itself.
          </h1>
        </div>

        <PresenterPanel
          style={{
            opacity: previewOpacity,
            background: stageTokens.color.surfaceCode,
          }}
        >
          <LiveCodeCompilation
            accentColor={stageTokens.color.jsYellow}
            background={stageTokens.color.surfaceCode}
            backdrop="radial-gradient(circle at 18% 18%, rgba(240,219,79,0.12), transparent 34%)"
            codeEvents={notificationCodeEvents}
            codeTitle="NotificationItem.tsx"
            codeMaxWidth={760}
            codeFontSize={16}
            codeBodyMinHeight={488}
            leftFlex={1.08}
            rightFlex={0.92}
            previewLabel="Preview"
            speed={2.9}
            renderPreview={({ frame: previewFrame }) => (
              <MockNotificationPreview
                frame={previewFrame}
                revealStartFrame={previewCueStart}
              />
            )}
          />
        </PresenterPanel>

        <PresenterPanel
          style={{
            opacity: shapeOpacity,
            padding: "22px 28px",
            background: stageTokens.color.jsYellow,
            color: "#25250E",
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
