import "./index.css";
import { Composition } from "remotion";
import {
  MyComposition,
  VISUAL_SYSTEM_DURATION_IN_FRAMES,
  VISUAL_SYSTEM_FPS,
  VISUAL_SYSTEM_HEIGHT,
  VISUAL_SYSTEM_WIDTH,
} from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={VISUAL_SYSTEM_DURATION_IN_FRAMES}
        fps={VISUAL_SYSTEM_FPS}
        width={VISUAL_SYSTEM_WIDTH}
        height={VISUAL_SYSTEM_HEIGHT}
      />
    </>
  );
};
