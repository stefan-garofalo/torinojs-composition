import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { presenterTimeline } from "./presenter/deck";
import { PRESENTATION_FPS } from "./timeline";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ComposableReactPresenter"
        component={MyComposition}
        durationInFrames={presenterTimeline.durationInFrames}
        fps={PRESENTATION_FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
