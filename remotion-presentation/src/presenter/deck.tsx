import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { sampleSlides } from "../slides";
import type { SampleSlideProps } from "../slides";
import { compileTimeline } from "../timeline";

export const presenterTimeline = compileTimeline(sampleSlides);

export function PresenterDeck() {
  const absoluteFrame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: "#09090b" }}>
      {presenterTimeline.slides.map((slide) => {
        const definition = sampleSlides[slide.index];
        const SlideComponent = definition.component;

        if (!SlideComponent) {
          return null;
        }

        const localFrame = absoluteFrame - slide.startFrame;

        return (
          <Sequence
            key={slide.id}
            from={slide.startFrame}
            durationInFrames={slide.durationInFrames}
          >
            <SlideComponent
              {...((definition.props ?? {}) as SampleSlideProps)}
              frame={localFrame}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}
