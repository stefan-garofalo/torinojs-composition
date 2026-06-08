import type { presenterTimeline } from "../Composition";

export type SlideCue = (typeof presenterTimeline)[number];

export type CueCommand = "next" | "previous" | "first" | "last" | "replay";

export type CueTarget = {
  readonly cueIndex: number;
  readonly frame: number;
  readonly shouldPlay: boolean;
};

export function getCueIndexForFrame(cues: readonly SlideCue[], frame: number) {
  for (let index = cues.length - 1; index >= 0; index -= 1) {
    if (cues[index].startFrame <= frame) {
      return index;
    }
  }

  return 0;
}

export function getCueTarget(
  cues: readonly SlideCue[],
  currentCueIndex: number,
  command: CueCommand,
): CueTarget {
  const lastCueIndex = cues.length - 1;

  if (command === "first") {
    return { cueIndex: 0, frame: cues[0].startFrame, shouldPlay: false };
  }

  if (command === "last") {
    return {
      cueIndex: lastCueIndex,
      frame: getCueHoldFrame(cues[lastCueIndex]),
      shouldPlay: false,
    };
  }

  if (command === "previous") {
    const cueIndex = Math.max(currentCueIndex - 1, 0);
    return {
      cueIndex,
      frame: getCueHoldFrame(cues[cueIndex]),
      shouldPlay: false,
    };
  }

  if (command === "replay") {
    return {
      cueIndex: currentCueIndex,
      frame: cues[currentCueIndex].startFrame,
      shouldPlay: true,
    };
  }

  const cueIndex = Math.min(currentCueIndex + 1, lastCueIndex);
  return {
    cueIndex,
    frame: cues[cueIndex].startFrame,
    shouldPlay: cueIndex !== currentCueIndex,
  };
}

export function getCueHoldFrame(cue: SlideCue) {
  return cue.startFrame + cue.durationInFrames - 1;
}
