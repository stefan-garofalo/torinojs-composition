import { Player, type PlayerRef } from "@remotion/player";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  MyComposition,
  presenterTimeline,
  VISUAL_SYSTEM_DURATION_IN_FRAMES,
  VISUAL_SYSTEM_FPS,
  VISUAL_SYSTEM_HEIGHT,
  VISUAL_SYSTEM_WIDTH,
} from "../Composition";
import {
  type CueCommand,
  getCueHoldFrame,
  getCueIndexForFrame,
  getCueTarget,
} from "./navigation";

export function PresenterPlayer() {
  const playerRef = useRef<PlayerRef>(null);
  const targetHoldFrameRef = useRef<number | null>(null);
  const [cueIndex, setCueIndex] = useState(0);

  const runCommand = useCallback(
    (command: CueCommand) => {
      const player = playerRef.current;
      if (!player) {
        return;
      }

      const currentFrame = player.getCurrentFrame();
      const frameCueIndex = getCueIndexForFrame(
        presenterTimeline,
        currentFrame,
      );
      const navigationCueIndex =
        command === "previous" || command === "replay"
          ? cueIndex
          : frameCueIndex;
      const target = getCueTarget(
        presenterTimeline,
        navigationCueIndex,
        command,
      );

      setCueIndex(target.cueIndex);
      targetHoldFrameRef.current = target.shouldPlay
        ? getCueHoldFrame(presenterTimeline[target.cueIndex])
        : null;
      player.seekTo(target.frame);

      if (target.shouldPlay) {
        player.play();
        return;
      }

      player.pause();
    },
    [cueIndex],
  );

  useEffect(() => {
    const player = playerRef.current;
    if (!player) {
      return;
    }

    const onFrameUpdate = ({ detail }: { detail: { frame: number } }) => {
      const targetHoldFrame = targetHoldFrameRef.current;
      if (targetHoldFrame === null || detail.frame < targetHoldFrame) {
        return;
      }

      targetHoldFrameRef.current = null;
      player.pause();
      player.seekTo(targetHoldFrame);
    };

    player.addEventListener("frameupdate", onFrameUpdate);
    return () => player.removeEventListener("frameupdate", onFrameUpdate);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        runCommand("next");
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        runCommand("previous");
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        runCommand("first");
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        runCommand("last");
        return;
      }

      if (event.key.toLowerCase() === "r") {
        event.preventDefault();
        runCommand("replay");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [runCommand]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#0b0b0f",
      }}
    >
      <Player
        ref={playerRef}
        component={MyComposition}
        compositionWidth={VISUAL_SYSTEM_WIDTH}
        compositionHeight={VISUAL_SYSTEM_HEIGHT}
        durationInFrames={VISUAL_SYSTEM_DURATION_IN_FRAMES}
        fps={VISUAL_SYSTEM_FPS}
        controls={false}
        clickToPlay={false}
        doubleClickToFullscreen={false}
        spaceKeyToPlayOrPause={false}
        allowFullscreen={false}
        acknowledgeRemotionLicense
        style={{
          width: "100vw",
          height: "100vh",
        }}
      />
    </div>
  );
}
