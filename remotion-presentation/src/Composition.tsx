import { Series } from "remotion";
import { renderTalkSlide, talkSlides } from "./slides";

export const VISUAL_SYSTEM_FPS = 60;
export const VISUAL_SYSTEM_WIDTH = 1920;
export const VISUAL_SYSTEM_HEIGHT = 1080;
export const VISUAL_SYSTEM_DURATION_IN_FRAMES =
  talkSlides.reduce((total, slide) => total + slide.durationInFrames, 0);

export const presenterTimeline = talkSlides.map((slide, index) => ({
  id: slide.id,
  index,
  startFrame: talkSlides
    .slice(0, index)
    .reduce((total, current) => total + current.durationInFrames, 0),
  durationInFrames: slide.durationInFrames,
}));

export const MyComposition = () => {
  return (
    <Series>
      {talkSlides.map((slide) => (
        <Series.Sequence
          key={slide.id}
          durationInFrames={slide.durationInFrames}
        >
          {renderTalkSlide(slide)}
        </Series.Sequence>
      ))}
    </Series>
  );
};
