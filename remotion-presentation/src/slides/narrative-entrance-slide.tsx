import { interpolate, useCurrentFrame } from "remotion";
import {
  FullStage,
  Kicker,
  PresenterPanel,
} from "../components/presenter/stage-primitives";
import { StaggeredFadeUp } from "../components/remocn/staggered-fade-up";
import { stageTokens } from "../components/stage";
import {
  DEFAULT_POST_CUE_PADDING_FRAMES,
  PANEL_OR_LARGE_TRANSITION_FRAMES,
  TEXT_OR_SMALL_TRANSITION_FRAMES,
} from "../timeline";
import type { SampleSlideProps } from "./sample-slide-props";
import type { SlideDefinition } from "./types";

const headlineCueStart = 0;
const thesisCueStart = 90;
const structureCueStart = 150;
const slideChangeCueStart = 210;
const slideChangeHold = slideChangeCueStart + TEXT_OR_SMALL_TRANSITION_FRAMES;

export function NarrativeEntranceSlide({ frame }: SampleSlideProps) {
  const remotionFrame = useCurrentFrame();
  const currentFrame = frame ?? remotionFrame;

  const thesisOpacity = interpolate(
    currentFrame,
    [thesisCueStart, thesisCueStart + TEXT_OR_SMALL_TRANSITION_FRAMES],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const thesisY = interpolate(
    currentFrame,
    [thesisCueStart, thesisCueStart + TEXT_OR_SMALL_TRANSITION_FRAMES],
    [18, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const structureOpacity = interpolate(
    currentFrame,
    [structureCueStart, structureCueStart + PANEL_OR_LARGE_TRANSITION_FRAMES],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const structureY = interpolate(
    currentFrame,
    [structureCueStart, structureCueStart + PANEL_OR_LARGE_TRANSITION_FRAMES],
    [28, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <FullStage background="#f8fafc">
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateRows: "1fr 310px",
          color: "#09090b",
        }}
      >
        <div style={{ position: "relative", overflow: "hidden" }}>
          <StaggeredFadeUp
            text="Make the shape visible"
            color="#09090b"
            fontSize={104}
            fontWeight={760}
            staggerDelay={3}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            borderTop: "1px solid rgba(9,9,11,0.1)",
          }}
        >
          <div
            style={{
              padding: "48px 64px",
              background: stageTokens.color.jsYellow,
            }}
          >
            <Kicker style={{ color: "#25250E" }}>
              React API design
            </Kicker>
            <div
              style={{
                opacity: thesisOpacity,
                transform: `translateY(${thesisY}px)`,
                marginTop: 24,
                maxWidth: 520,
                fontSize: 38,
                lineHeight: 1.1,
                fontWeight: 720,
              }}
            >
              A component API should reveal the product shapes it supports.
            </div>
          </div>

          <div style={{ padding: "48px 64px", background: "#ffffff" }}>
            <PresenterPanel
              style={{
                opacity: structureOpacity,
                transform: `translateY(${structureY}px)`,
                height: "100%",
                padding: 34,
                background: stageTokens.color.surfaceCode,
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  color: stageTokens.color.textMuted,
                  lineHeight: 1.4,
                }}
              >
                Structural variation is not a prettier prop list. It changes
                parts, actions, navigation, and permissions.
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 34,
                  right: 34,
                  bottom: 34,
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 12,
                }}
              >
                {["parts", "actions", "navigation", "permissions"].map(
                  (label) => (
                    <div
                      key={label}
                      style={{
                        padding: "14px 12px",
                        borderRadius: 6,
                        background: "rgba(255,255,255,0.06)",
                        color: stageTokens.color.text,
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: 650,
                      }}
                    >
                      {label}
                    </div>
                  ),
                )}
              </div>
            </PresenterPanel>
          </div>
        </div>
      </div>
    </FullStage>
  );
}

export const narrativeEntranceSlide: SlideDefinition<SampleSlideProps> = {
  id: "sample-narrative-entrance",
  title: "Make the shape visible",
  durationInFrames: slideChangeHold + DEFAULT_POST_CUE_PADDING_FRAMES,
  component: NarrativeEntranceSlide,
  cues: [
    {
      id: "narrative.headline",
      kind: "content",
      label: "headline entrance",
      startFrame: headlineCueStart,
      holdFrame: thesisCueStart,
    },
    {
      id: "narrative.thesis",
      kind: "content",
      label: "thesis line entrance",
      startFrame: thesisCueStart,
      holdFrame: structureCueStart,
    },
    {
      id: "narrative.structure",
      kind: "content",
      label: "structural variation detail entrance",
      startFrame: structureCueStart,
      holdFrame: slideChangeCueStart,
    },
    {
      id: "narrative.slide-change",
      kind: "slide-change",
      label: "clean cut to code plus preview sample",
      startFrame: slideChangeCueStart,
      holdFrame: slideChangeHold,
    },
  ],
};
