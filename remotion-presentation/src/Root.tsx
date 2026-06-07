import "./index.css";
import { Composition } from "remotion";
import {
  MyComposition,
  PresenterComposition,
  VISUAL_SYSTEM_DURATION_IN_FRAMES,
  VISUAL_SYSTEM_FPS,
  VISUAL_SYSTEM_HEIGHT,
  VISUAL_SYSTEM_WIDTH,
} from "./Composition";
import { presenterTimeline } from "./presenter/deck";
import { PRESENTATION_FPS } from "./timeline";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DarkJavaScriptVisualSystem"
        component={MyComposition}
        durationInFrames={VISUAL_SYSTEM_DURATION_IN_FRAMES}
        fps={VISUAL_SYSTEM_FPS}
        width={VISUAL_SYSTEM_WIDTH}
        height={VISUAL_SYSTEM_HEIGHT}
      />
      <Composition
        id="ComposableReactPresenter"
        component={PresenterComposition}
        durationInFrames={presenterTimeline.durationInFrames}
        fps={PRESENTATION_FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
